
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// @service
import { getDetailOrderClient } from '../service/order'

// @constants
import { SUCCESS } from '../constants'

// @antd
import { Spin } from 'antd'

// @utility
import { formatToCurrencyVND } from "../utility"

function OrderDetail() {
  const { orderId } = useParams()
  // console.log("param", orderId)

  const [loading, setLoading] = useState(false)
  const [detailOrder, setDetailOrder] = useState({})

  useEffect(() => {
    fetchGetDetailOrder(orderId)
  }, [orderId])

  const fetchGetDetailOrder = async (payload) => {
    try {
      setLoading(true)
      const res = await getDetailOrderClient(payload)
      if (res?.retCode === SUCCESS) {
        setDetailOrder(res?.retData)
      } else {
        setDetailOrder({})
      }
      // console.log("res", res)
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  const renderText = (id) => {
    switch (id) {
      case 0:

        return <span className="alert alert-warning">Pending </span>;
      case 1:

        return <span className="alert alert-success">Success </span>;
      case 2:

        return <span className="alert alert-fail">Fail </span>;

      default:
        return;
    }
  }

  return (
    <Spin spinning={loading}>
      <div className="create-product__formCreate pt-3 pb-3">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="order-payment-information">
                <h3 className="order-payment-information__title">
                  Order Information
                </h3>
                <div className="order-payment-information__content">
                  <div className="order-payment-information__content-box">
                    <h4>Order detail:</h4>
                    <p>Id order: {detailOrder?._id}</p>
                    <p>
                      Status:{" "}
                      {renderText(detailOrder?.statusOrder)}
                    </p>
                    <p>
                      Method:{" "}
                      {detailOrder?.methodPayment === "cod"
                        ? "COD"
                        : "Atm-banking"}{" "}
                    </p>
                  </div>
                  <div className="order-payment-information__content-box">
                    <h4>Customer:</h4>
                    <p>Full name: {detailOrder?.infoOrder?.fullName}</p>
                    <p>Email: {detailOrder?.infoOrder?.mail}</p>
                    <p>Phone number: {detailOrder?.infoOrder?.phone}</p>
                    <p>Address: {detailOrder?.infoOrder?.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="order-summary">
                <h4>Order Summary</h4>
                {detailOrder?.cartInfo?.listProduct?.map((item, index) => {
                  return (
                    <p key={index}> {item?.product?.name} x {item?.quantity} <span className="float-right">{formatToCurrencyVND(item?.product?.price)}</span></p>
                  )
                })}
                <hr />
                <p>Total <span className="float-right">{formatToCurrencyVND(detailOrder?.cartInfo?.totalPrice)}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default OrderDetail