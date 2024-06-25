import React, { useEffect } from 'react'
import { updateDetailOrder } from '../service/order'
import { useLocation } from "react-router-dom"

function Thank() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get('orderId');
  // console.log("orderId", orderId)
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    if (orderId) {
      fetchUpdateDetailOrder()
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
      <h1>Thanks for your payment</h1>
      <p>We had confirmed that your money are sent to the owner's account of the store</p>
    </div>
  )
}

export default Thank