import './RelatedProducts.css'

import React from 'react'

// @components
import Item from '../Item/Item'
import { Empty } from 'antd'

const RelatedProducts = ({ productId, products }) => {
  const displayProducts = products?.filter(item => item?._id !== productId)
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {displayProducts?.length > 0
          ? displayProducts.map((item, i) => {
            return <Item id={item?._id} key={i} name={item?.name} image={item?.image[0]?.url} new_price={item?.price} old_price={item?.price} />
          })
          : <Empty />}
      </div>
    </div>
  )
}

export default RelatedProducts
