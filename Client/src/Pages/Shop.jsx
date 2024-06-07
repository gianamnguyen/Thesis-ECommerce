import React, { useEffect, useState } from 'react'

// @components
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'

// @service
import { getListProducts } from '../service/product'

// @constants
import { PAGE_NUMBER, PAGE_LIMIT, SUCCESS } from "../constants/index"

const Shop = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const payload = {
      page: PAGE_NUMBER,
      size: PAGE_LIMIT
    }
    fetchGetListProducts(payload);
  }, [])

  const fetchGetListProducts = async (payload) => {
    try {
      setLoading(true)
      const res = await getListProducts(payload)
      if (res?.retCode === SUCCESS) {
        setProducts(res?.retData?.products)
      } else {
        setProducts([])
      }
      // console.log("res", res)
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div>
      <Hero />
      {loading
        ? <h1 style={{ textAlign: "center", padding: "10px 0 10px 0" }}>Loading...</h1>
        : <Popular data={products} />
      }
      <Offers />
      {loading
        ? <h1 style={{ textAlign: "center", padding: "10px 0 10px 0" }}>Loading...</h1>
        : <NewCollections data={products} />
      }
      <NewsLetter />
    </div>
  )
}

export default Shop
