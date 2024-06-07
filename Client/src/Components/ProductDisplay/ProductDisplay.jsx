import "./ProductDisplay.css";

import React from "react";
import { useDispatch } from "react-redux";

// @assets
// import star_icon from "../Assets/star_icon.png";
// import star_dull_icon from "../Assets/star_dull_icon.png";

// @redux
import { createCart } from "../../redux/cart/actions";

// @utility
import { formatToCurrencyVND, getUserInfo } from "../../utility";

const ProductDisplay = (props) => {
  const { product } = props;

  const dispatch = useDispatch()

  // console.log("product", product)
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {product?.image?.map((item, index) => {
            return <img key={index} src={item?.url} alt={item?.uid} />
          })}
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product?.image[0]?.url} alt="img" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product?.name}</h1>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-new">{formatToCurrencyVND(product?.price)}</div>
        </div>
        <div style={{ paddingBottom: 16 }} className="productdisplay-right-description">
          {product?.description}
        </div>
        {/* <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div> */}
        <button
          onClick={() => {
            const payload = {
              userId: getUserInfo()?.id,
              productId: product?._id,
              quantity: 1,
              price: product?.price
            }
            dispatch(createCart(payload))
          }}
        >
          ADD TO CART
        </button>
        <p className="productdisplay-right-category">
          <span style={{ fontWeight: 700 }}>Category : </span>
          {product?.category?.name}
        </p>
        <p className="productdisplay-right-category">
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Attributes :</div>
          <div className="">
            {product?.attributes?.map((ele, idx) => {
              return (
                <React.Fragment key={idx}>
                  <div style={{ marginBottom: 2 }}>{ele?.attributeId?.name}: {ele?.option}</div>
                </React.Fragment>
              )
            })}
          </div>
        </p>
      </div >
    </div >
  );
};

export default ProductDisplay;
