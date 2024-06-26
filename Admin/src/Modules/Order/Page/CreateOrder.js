import "../bootstrap.scss";
import "../responsive.scss";

import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";

// @components
import { Form, Button, notification, Spin } from "antd";

// @service
import { getDetailOrder, updateDetailOrder } from "../Store/service";

// @constants
import { RETCODE_SUCCESS } from "@configs/contants";

// @utility
import { formatToCurrencyVND } from "@utility/common";

const CreateProduct = () => {
  const history = useHistory();
  const location = useLocation();

  const { idOrder } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [detailOrder, setDetailOrder] = useState({});

  const [loadingConfirm, setLoadingConfirm] = useState(false);

  useEffect(() => {
    if (idOrder) {
      fetchDetailProduct();
      // handleFormChange();
    }
  }, []);

  const fetchDetailProduct = async () => {
    try {
      setLoading(true);
      const res = await getDetailOrder({
        idOrder,
      });
      if (res?.data?.retCode === RETCODE_SUCCESS) {
        // onInitData(res?.data?.retData);
        setDetailOrder(res?.data?.retData);
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    try {
      setLoadingConfirm(true);
      const payload = {
        idOrder,
        statusOrder: 1,
      };
      const { data } = await updateDetailOrder(payload);

      if (data?.retCode === RETCODE_SUCCESS) {
        notification.success({
          message: "Successfully",
          description: data?.retText,
          duration: 2,
        });
        setTimeout(() => {
          history.push("/manage-order");
        }, 1000);
      } else {
        notification.error({
          message: "Fail",
          description: "Update fail",
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoadingConfirm(false);
    }
  };
  // console.log("detailOrder", detailOrder)

  return (
    <div className="create-product">
      <div className="mb-3">
        <h1 className="create-product__title">Confirm payment order</h1>
      </div>
      {detailOrder && Object.keys(detailOrder).length > 0 ? (
        <div className="create-product__formCreate">
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
                        {detailOrder?.statusOrder === 0 && (
                          <span className="text-warning">Pending payment</span>
                        )}
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
              <div className="col-12">
                <div className="d-flex flex-row justify-content-end align-items-center">
                  <Button
                    className="btn-confirm"
                    onClick={() => onFinish()}
                    loading={loadingConfirm}
                  >
                    Confirm payment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Spin spinning={loading} size="large" />
        </div>
      )}
    </div>
  );
};

export default CreateProduct;
