import '../Assets/Css/bootstrap.min.css';
import "./CheckoutItems.css";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// @component
import { notification } from 'antd';

// @redux
import { cartUser } from '../../redux/cart/selector';
import { resetCart } from "../../redux/cart/actions"

// @utility
import { formatToCurrencyVND } from "../../utility/index"

// @service
import { createOrder } from '../../service/order';

// @constants
import { SUCCESS, METHOD_PAYMENT } from '../../constants';

const CheckoutItems = () => {
  const dispatch = useDispatch()

  const userCart = useSelector(cartUser)

  const [fullName, setFullName] = useState("")
  const [mail, setMail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [methodPayment, setMethodPayment] = useState("")

  const [loading, setLoading] = useState(false)

  // console.log("userCart", userCart)

  const fetchCreateOrder = async () => {
    try {
      setLoading(true)
      const payload = {
        userId: userCart?.userId,
        cartInfo: {
          _id: userCart?._id,
          userId: userCart?.userId,
          totalPrice: userCart?.totalPrice,
          listProduct: userCart?.listProduct?.map(item => {
            return {
              ...item,
              product: item?.productId
            }
          })
        },
        infoOrder: {
          fullName,
          mail,
          phone,
          address
        },
        statusOrder: 0,
        methodPayment
      }
      const res = await createOrder(payload)
      if (res?.retCode === SUCCESS) {
        notification.success({
          message: "Successfully",
          description: res?.retText,
          duration: 2,
        })
        dispatch(resetCart())
        setTimeout(() => {
          window.location.href = "/"
        }, 2000)
      } else {
        notification.error({
          message: "Fail",
          description: res?.retText,
          duration: 2,
        })
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
      notification.error({
        message: "Fail",
        description: err?.message,
        duration: 2,
      })
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="container">
      {/* <!-- Header --> */}
      <header className="checkout-header text-center">
        <img src="logo.png" alt="Logo" />
      </header>

      {/* <!-- Checkout Steps --> */}
      <div className="checkout-steps text-center">
        <h3>Checkout</h3>
        {/* <!-- <p>Shipping &rarr; Payment &rarr; Review</p> --> */}
      </div>

      {/* <!-- Main Content --> */}
      <div className="row">
        {/* <!-- Shipping Address --> */}
        <div className="col-md-8">
          <h4>Shipping Address</h4>
          <form>
            <div className="form-group">
              <input type="text" className="form-control" id="fullName" placeholder=" " value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <label for="fullName">Full Name</label>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="mail" placeholder=" " value={mail} onChange={(e) => setMail(e.target.value)} />
              <label for="mail">Email</label>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="phone" placeholder=" " value={phone} onChange={(e) => setPhone(e.target.value)} />
              <label for="phone">Phone</label>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="address" placeholder=" " value={address} onChange={(e) => setAddress(e.target.value)} />
              <label for="address">Address</label>
            </div>
            <div className="form-group">
              <select id="methodPayment" className="form-control" defaultValue={METHOD_PAYMENT.COD} onChange={(e) => { setMethodPayment(e.target.value) }}>
           
                <option value={METHOD_PAYMENT.ATM_BANKING}>Atm banking</option>
                <option value={METHOD_PAYMENT.COD}>COD</option>
                {/* <option>State 3</option> */}
              </select>
              <label for="methodPayment">Method payment</label>
            </div>
          </form>
          {/*     
            <!-- Payment Details --> */}
          {/* <!-- <h4>Payment Details</h4>
            <form>
              <div className="form-group">
                <input type="text" className="form-control" id="cardName" placeholder=" ">
                <label for="cardName">Name on Card</label>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" id="cardNumber" placeholder=" ">
                <label for="cardNumber">Card Number</label>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" id="expiration" placeholder=" ">
                <label for="expiration">Expiration</label>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" id="cvv" placeholder=" ">
                <label for="cvv">CVV</label>
              </div>
            </form> --> */}
        </div>

        {/* <!-- Order Summary --> */}
        <div className="col-md-4">
          <div className="order-summary">
            <h4>Order Summary</h4>
            {userCart?.listProduct?.map((item, index) => {
              return (
                <p key={index}> {item?.product?.name} x {item?.quantity} <span className="float-right">{formatToCurrencyVND(item?.product?.price)}</span></p>
              )
            })}
            <hr />
            <p>Total <span className="float-right">{formatToCurrencyVND(userCart?.totalPrice)}</span></p>
          </div>
          <div>
            <p>Banking Information:
              <br/> 
              MB Bank: 0943709292
              <br/> 
              Nội dung chuyển khoản: Tên và Số điện thoại khách mua hàng
            </p>
          </div>
        </div>
      </div>
      <button type="button" className="btn btn-rounded" onClick={() => { fetchCreateOrder() }} disabled={loading}>Place Order</button>

    </div>

  );
};

export default CheckoutItems;