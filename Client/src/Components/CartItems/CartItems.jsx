import "./CartItems.css";

import React from "react";
import { useSelector, useDispatch } from "react-redux";

// @assets
import cross_icon from "../Assets/cart_cross_icon.png";

// @redux
import { cartUser, loadingCart } from "../../redux/cart/selector";
import { deleteCart } from "../../redux/cart/actions"

// @utility
import { formatToCurrencyVND, getUserInfo } from "../../utility";
import { Empty, Spin } from "antd";
import { Link } from "react-router-dom";

const CartItems = () => {
  const userCart = useSelector(cartUser)
  const cartLoading = useSelector(loadingCart)

  const dispatch = useDispatch()

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      <Spin spinning={cartLoading}>
        {userCart?.listProduct?.length > 0
          ? userCart?.listProduct?.map((item, index) => {
            return (
              <div key={`${index}-${item?._id}`}>
                <div className="cartitems-format-main cartitems-format">
                  <img className="cartitems-product-icon" src={item?.product?.image[0]?.url} alt={item?.product?.image[0]?.uid} />
                  <p className="cartitems-product-title">{item?.product?.name}</p>
                  <p>{formatToCurrencyVND(item?.product?.price)}</p>
                  <button className="cartitems-quantity">{item?.quantity}</button>
                  <p>{formatToCurrencyVND(item?.total)}</p>
                  <img
                    onClick={() => {
                      const payload = {
                        userId: getUserInfo()?.id,
                        productId: item?.productId
                      }
                      dispatch(deleteCart(payload))
                    }}
                    className="cartitems-remove-icon"
                    src={cross_icon}
                    alt=""
                  />
                </div>
                <hr />
              </div>
            )
          })
          : <Empty />}
      </Spin>

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{formatToCurrencyVND(userCart?.totalPrice)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{formatToCurrencyVND(userCart?.totalPrice)}</h3>
            </div>
          </div>
          <Link to={"/checkout"}>
            <button>PROCEED TO CHECKOUT</button>
          </Link>

        </div>
        {/* <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CartItems;
