import React from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = (props) => {
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {props.data.map((item, i) => {
          return <Item id={item?._id} key={i} name={item?.name} image={item?.image[0]?.url} new_price={item?.price} old_price={item?.price} />
        })}
      </div>
    </div>
  )
}

export default NewCollections
