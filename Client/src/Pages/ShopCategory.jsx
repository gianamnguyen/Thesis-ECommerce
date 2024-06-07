import "./CSS/ShopCategory.css";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// @assets
import dropdown_icon from '../Components/Assets/dropdown_icon.png'

// @components
import Item from "../Components/Item/Item";

// @servie
import { getListProducts } from '../service/product'

// @constants
import { PAGE_NUMBER, PAGE_LIMIT, SUCCESS } from "../constants/index"

const ShopCategory = (props) => {
  const { categoryId } = useParams()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalItems, setTotalItems] = useState(0)

  // console.log("params", categoryId)

  useEffect(() => {
    const payload = {
      page: PAGE_NUMBER,
      size: PAGE_LIMIT,
      category: categoryId
    }
    fetchGetListProducts(payload);
  }, [categoryId])

  const fetchGetListProducts = async (payload) => {
    try {
      setLoading(true)
      const res = await getListProducts(payload)
      if (res?.retCode === SUCCESS) {
        setProducts(res?.retData?.products)
        setTotalItems(res?.retData?.totalItems)
      } else {
        setProducts([])
        setTotalItems(0)
      }
      // console.log("res", res)
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="shopcategory">
      {loading
        ? <h1 style={{ textAlign: "center", padding: "10px 0 10px 0" }}>Loading...</h1>
        : (
          <>
            <img src={props.banner} className="shopcategory-banner" alt="" />
            <div className="shopcategory-indexSort">
              <p><span>Showing 1 - {PAGE_NUMBER}</span> out of {totalItems} Products</p>
              <div className="shopcategory-sort">Sort by  <img src={dropdown_icon} alt="" /></div>
            </div>
            <div className="shopcategory-products">
              {products.map((item, i) => {
                return <Item id={item?._id} key={i} name={item?.name} image={item?.image[0]?.url} new_price={item?.price} old_price={item?.price} />
              })}
            </div>
            <div className="shopcategory-loadmore">
              <Link to='/' style={{ textDecoration: 'none' }}>Explore More</Link>
            </div>
          </>
        )}
    </div>
  );
};

export default ShopCategory;
