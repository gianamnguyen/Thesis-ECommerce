import React, { useState, useEffect } from 'react'
import { BrowserProvider, parseEther } from "ethers"
import { useLocation, useNavigate } from 'react-router-dom';

// @component
import { notification } from 'antd';

import { getEthExchangeRate, getUsdToVndExchangeRate } from '../service/common'

const WALLET_ADDRESS_OWNER = "0xf45Cc55776A1E8a9dae85FdF37d62108Fcc80437"

export const usdToEth = (usdAmount, ethRate) => {
  return usdAmount / ethRate;
}

function PayWithMetamask() {
  const location = useLocation()
  const navigate = useNavigate()
  const { orderId, totalPrice } = location?.state || {}
  // console.log("location", location)

  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState("")
  const [ether, setEther] = useState("")
  const [error, setError] = useState("");

  useEffect(() => {
    onInitData()
  }, [])

  const onInitData = async () => {
    const ethRate = await getEthExchangeRate();
    const vndRate = await getUsdToVndExchangeRate()
    const usdAmount = totalPrice / vndRate
    const ethAmount = usdToEth(usdAmount, ethRate).toFixed(10);

    setAddress(WALLET_ADDRESS_OWNER)
    setEther(ethAmount)
    // form.setValue("address", WALLET_ADDRESS_OWNER)
    // form.setValue("ether", ethAmount)
  }

  const startPayment = async ({ ether, addr }) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found, Please install it.")
      await window?.ethereum?.send("eth_requestAccounts")
      const provider = new BrowserProvider(window?.ethereum)
      const signer = await provider.getSigner()
      await provider._getAddress(addr)
      const tx = (await signer).sendTransaction({
        to: addr,
        value: parseEther(ether)
      })
      // console.log("data", { ether, addr })
      Promise.resolve(tx).
        then(data => {
          console.log("data tx", data)
          if (Object.keys(data).length > 0) {
            console.log("pay sucess")
            notification.success({
              message: "Pay order successfully!",
              description: "Your order has been successfully paid",
              duration: 2,
            })
            setTimeout(() => {
              navigate("/thank", {
                state: {
                  idOrderForMetamaskPayment: orderId
                }
              })
            }, 1000)
            //   DiaglogPopup({
            //     icon: <IconSuccess />,
            //     title: "Pay order successfully!",
            //     description: "Your order has been successfully paid",
            //     textButtonOk: "Continue",
            //     textButtonCancel: "",
            //     isBtnCancel: false,
            //     closeOnClickOverlay: false,
            //     className: "max-[1024px]:w-[380px]",
            //     onSubmit: () => {
            //       SlideInModal.hide()
            //       router.push(redirectSuccess)
            //     },
            //     onCancle: () => { }
            //   })
          }
        })
        .catch(error => {
          // console.log("err", error.message);
          const regex = /user rejected action/;
          const result = error.message.match(regex);
          setError(/* error.message */result)
        })
    } catch (err) {
      setError(err?.message)
      console.log("FETCHING FAIL!", err.message);
    }
  }

  return (
    <div className='mx-auto w-75 my-5'>
      <h1>Pay with metamask</h1>
      <div>
        <form>
          <div className="form-group">
            <input type="text" className="form-control" id="address" placeholder=" " value={address} onChange={(e) => setAddress(e.target.value)} />
            <label htmlFor="address">Address wallet</label>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="ether" placeholder=" " value={ether} onChange={(e) => setEther(e.target.value)} />
            <label htmlFor="ether">Price</label>
          </div>
        </form>
        {!!error && (<h1 className="bg-red-200 p-4 rounded-lg text-base font-bold tracking-widest text-red-600">{error}</h1>)}
        <button
          type="button"
          className="btn btn-rounded"
          onClick={async () => {
            await startPayment({
              ether: ether,
              addr: address
            })
          }}
          disabled={loading}
        >
          Payment
        </button>
      </div>
    </div>
  )
}

export default PayWithMetamask