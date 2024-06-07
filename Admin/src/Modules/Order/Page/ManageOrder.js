import "../bootstrap.scss";
import "../responsive.scss";

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import moment from "moment/moment";

// @selector
import { getUserData } from "@store/user/selector";
import { getCodeLanguage } from "@store/common/selectors";

// @service
import { getListOrders, deleteDetailOrder } from "../Store/service";

// @constants
import {
  RETCODE_SUCCESS,
  PAGE_DEFAULT,
  LIMIT_DEFAULT,
} from "@configs/contants";

// @antd
import { Table, notification, Carousel, Input } from "antd";

// @utility
import { formatToCurrencyVND } from "@utility/common";

// @svg and img
import { DeleteIcon, EditIcon } from "../../Products/assets/svg";

let timeoutId;

const Home = () => {
  const history = useHistory();
  const userInfo = useSelector(getUserData);
  const codeLanguage = useSelector((state) => getCodeLanguage(state));

  const [loading, setLoading] = useState(false);
  const [listProducts, setListProducts] = useState([]);
  const [page, setPage] = useState({});

  useEffect(() => {
    const payload = {
      page: PAGE_DEFAULT,
      size: LIMIT_DEFAULT,
      code: searchData,
    };
    fetchGetListOrders(payload);
  }, []);

  const fetchGetListOrders = async (payload) => {
    try {
      setLoading(true);
      const res = await getListOrders(payload);
      if (res?.data?.retCode === RETCODE_SUCCESS) {
        const { orders, ...rest } = res?.data?.retData || {};
        const listData = orders?.map((item, index) => {
          return {
            key: index,
            ...item,
          };
        });
        setListProducts(listData);
        setPage(rest);
      }
    } catch (err) {
      console.log("FETCH FAIL", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeleteOrder = async (item) => {
    try {
      const res = await deleteDetailOrder({
        idOrder: item?._id,
      });
      if (res?.data?.retCode === RETCODE_SUCCESS) {
        notification.success({
          message: "Successfully",
          description: "Delete product successfully",
          duration: 2,
        });
        const payload = {
          page: PAGE_DEFAULT,
          size: LIMIT_DEFAULT,
          code: searchData,
        };
        fetchGetListOrders(payload);
      } else {
        notification.error({
          message: "Fail",
          description: "Delete product unsuccessfully",
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  };

  const goToEditOrder = (record) => {
    // console.log("record", record?._id);
    history.push({
      pathname: "/manage-order/update-order",
      state: {
        idOrder: record?._id,
      },
    });
  };

  const columnsTable = [
    {
      title: "Code order",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Customer",
      dataIndex: "infoOrder",
      key: "infoOrder",
      render: (data) => {
        // console.log("data", data)
        return (
          <div className="">
            <h1 style={{ fontSize: 16, fontWeight: 700 }}>{data?.fullName}</h1>
            <p style={{ fontSize: 12, fontWeight: 500 }}>{data?.mail}</p>
            <p style={{ fontSize: 12, fontWeight: 500 }}>{data?.phone}</p>
            <p style={{ fontSize: 12, fontWeight: 500 }}>{data?.address}</p>
          </div>
        )
      },
    },
    {
      title: "Total",
      dataIndex: "cartInfo",
      key: "cartId",
      render: (data) => {
        return formatToCurrencyVND(data.totalPrice);
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => {
        return date && moment(date).isValid()
          ? moment(date).format("MM/DD/YYYY")
          : "--";
      },
    },
    {
      title: "Status",
      dataIndex: "statusOrder",
      key: "statusOrder",
      render: (statusOrder) => {
        if (statusOrder === 0) {
          return <span className="alert alert-warning" style={{ fontWeight: 700 }}>Pending</span>;
        } else if (statusOrder === 1) {
          return <span className="alert alert-success" style={{ fontWeight: 700 }}>Successfully</span>;
        } else {
          return <span className="alert alert-danger" style={{ fontWeight: 700 }}>Cancel</span>;
        }
      },
    },
    {
      title: "Method",
      dataIndex: "methodPayment",
      key: "methodPayment",
      render: (methodPayment) => {
        if (methodPayment === "cod") {
          return "COD";
        } else {
          return "Atm-banking";
        }
      },
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => {
        // console.log("item", record);
        return (
          <div className="d-flex flex-row justify-content-between align-items-center">
            {record.statusOrder === 0 ? (
              <div
                className="edit-icon d-flex flex-column justify-content-center align-items-center"
                onClick={() => goToEditOrder(record)}
              >
                <EditIcon />
              </div>
            ) : null}
            <div
              onClick={() => fetchDeleteOrder(record)}
              className="delete-icon d-flex flex-column justify-content-center align-items-center"
            >
              <DeleteIcon />
            </div>
          </div>
        );
      },
    },
  ];

  // search
  const [input, setInput] = React.useState("");
  const [prevSearch, setPrevSearch] = React.useState("");
  const [searchData, setSearchData] = React.useState("");

  useEffect(() => {
    if (searchData) {
      // console.log("search data", searchData);
      const payload = {
        page: PAGE_DEFAULT,
        size: LIMIT_DEFAULT,
        code: searchData,
      };
      fetchGetListOrders(payload);
    }
  }, [searchData]);

  const handleSeachItem = (e) => {
    const search = e.target.value;
    setInput(search);
    setPrevSearch(search);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      if (search !== prevSearch || search === "") {
        // console.log("value", search);
        setSearchData(search);
      }
    }, 1000);
  };

  return (
    <div className="manage-products">
      <div className="d-flex flex-row justify-content-between align-items-center mb-3">
        <h1 className="manage-products__title">Orders List</h1>

        <div className="d-flex flex-row justify-content-center align-items-center gap-3">
          <Input
            placeholder="Enter your customer to search"
            onChange={(e) => handleSeachItem(e)}
            value={input}
          />
        </div>
      </div>
      <Table
        rowKey={(record) => record?.key}
        columns={columnsTable}
        dataSource={listProducts}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          pageSize: LIMIT_DEFAULT,
          current: +page?.currentPage + 1,
          total: page?.totalItems,
          onChange: (pageitem) => {
            // console.log("pageitem", pageitem);
            const payload = {
              page: pageitem,
              size: LIMIT_DEFAULT,
              code: searchData,
            };
            fetchGetListOrders(payload);
          },
        }}
      />
    </div>
  );
};
export default Home;
