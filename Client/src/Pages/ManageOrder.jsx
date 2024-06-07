import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useNavigate } from "react-router-dom"

// @service
import { getListOrderClient } from '../service/order'

// @constants
import { PAGE_LIMIT, PAGE_NUMBER, LIMIT_DEFAULT, SUCCESS } from '../constants'

// @utility
import { getUserInfo } from '../utility'
import { formatToCurrencyVND } from '../utility'

// @antd
import {
  EditOutlined
} from '@ant-design/icons';
import { Table } from 'antd'

let timeoutId;

function ManageOrder() {
  const navigate = useNavigate()
  // console.log("history", history.p)

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState({});

  // search
  const [input, setInput] = React.useState("");
  const [prevSearch, setPrevSearch] = React.useState("");
  const [searchData, setSearchData] = React.useState("");

  useEffect(() => {
    const req = {
      "page": PAGE_NUMBER,
      "size": PAGE_LIMIT,
      "code": "",
      "userId": getUserInfo()?.id
    }
    fetchGetListOrderClient(req)
  }, [searchData])

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

  const fetchGetListOrderClient = async (payload) => {
    try {
      setLoading(true)
      const res = await getListOrderClient(payload)
      if (res?.retCode === SUCCESS) {
        const { orders, ...rest } = res?.retData || {};
        const listData = orders?.map((item, index) => {
          return {
            key: index,
            ...item,
          };
        });
        setOrders(listData);
        setPage(rest);
      }
      // console.log("res", res)
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

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
            <div
              className="edit-icon d-flex flex-column justify-content-center align-items-center"
              onClick={() => goToDetailOrder(record)}
            >
              <EditOutlined />
            </div>
          </div>
        );
      },
    },
  ];

  const goToDetailOrder = (idOrder) => {
    // console.log(idOrder)
    navigate(`/manage-orders/${idOrder?._id}`)
  }

  return (
    <div className='container'>
      <div className='pt-3 pb-3'>
        <h1 className='text-uppercase'>Manage Order</h1>
      </div>
      <Table
        rowKey={(record) => record?.key}
        columns={columnsTable}
        dataSource={orders}
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
            fetchGetListOrderClient(payload);
          },
        }}
      />
    </div>
  )
}

export default ManageOrder