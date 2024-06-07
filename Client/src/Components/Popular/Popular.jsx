import React from 'react'
import './Popular.css'
import Item from '../Item/Item'

const Popular = (props) => {
  // console.log("props", props?.data)
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {props.data.map((item, i) => {
          return <Item id={item?._id} key={i} name={item?.name} image={item?.image[0]?.url} new_price={item?.price} old_price={item?.price} />
        })}
      </div>
    </div>
  )
}

export default Popular
