import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// @component
import Breadcrums from '../Components/Breadcrums/Breadcrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
import { Empty, Spin } from 'antd'

// @service
import { getDetailProduct, getListProducts } from '../service/product'

// @constants
import { SUCCESS, PAGE_NUMBER, PAGE_LIMIT } from '../constants'

const Product = () => {
  const { productId } = useParams();

  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState({})
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (productId) {
      fetchGetDetailProduct(productId)
    }
  }, [productId])

  const fetchGetDetailProduct = async (payload) => {
    try {
      const res = await getDetailProduct(payload)
      if (res?.retCode === SUCCESS) {
        setProduct(res?.retData)
        const payload = {
          page: PAGE_NUMBER,
          size: PAGE_LIMIT,
          category: res?.retData?.category?._id
        }
        fetchGetListProducts(payload);
      } else {
        setProduct({})
      }
      // console.log("res", res)
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

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

  // console.log("product", product)
  return (
    <Spin spinning={loading}>
      <Breadcrums product={product} />
      {
        Object.keys(product).length > 0
          ? <ProductDisplay product={product} />
          : <Empty />
      }
      <DescriptionBox content={product?.description} />
      <RelatedProducts productId={productId} products={products} />
    </Spin>
  )
}

export default Product
