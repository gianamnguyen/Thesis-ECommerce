import React, { useEffect } from 'react'
import { updateDetailOrder } from '../service/order'
import { useLocation } from "react-router-dom"

function Thank() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get('orderId');
  const resultCode = params.get('resultCode');
  // console.log("resultCode", resultCode)

  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    if (parseInt(resultCode) === 1006) {
      return
    } else {
      if (orderId) {
        fetchUpdateDetailOrder()
      }
    }
  }, [orderId])

  const fetchUpdateDetailOrder = async () => {
    try {
      setLoading(true)
      const req = {
        id: orderId,
        statusOrder: 1
      }
      return await updateDetailOrder(req)

    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: 500
    }}>
      {loading ? <h1 style={{ fontSize: 30 }}>Loading...</h1> : (
        <>
          {parseInt(resultCode) === 1006
            ? (
              <>
                <h1>Payment fail</h1>
                <p>Please try to pay your order as soon as possible</p>
              </>
            )
            : (
              <>
                <h1>Thanks for your payment</h1>
                <p>We had confirmed that your money are sent to the owner's account of the store</p>
              </>
            )}
        </>
      )}
    </div>
  )
}

export default Thank