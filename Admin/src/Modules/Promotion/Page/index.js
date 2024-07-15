import "../bootstrap.scss";
import "../responsive.scss";

import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import moment from "moment/moment";

// @selector
import { getUserData } from "@store/user/selector";
import { getCodeLanguage } from "@store/common/selectors";

// @constants
import {
  RETCODE_SUCCESS,
  PAGE_DEFAULT,
  LIMIT_DEFAULT,
} from "@configs/contants";

// @services
import { getListPromotion, deletePromotion } from "../Store/service";

// @antd
import { Table, notification, Carousel, Input, Image } from "antd";
const { Search } = Input;

// @utility
import { formatToCurrencyVND } from "@utility/common";

// @svg and img
import { DeleteIcon, EditIcon, NextIcon, PrevIcon } from "../assets/svg";
import classNames from "classnames";

function CategoryPage() {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [listCategories, setListCategories] = useState([]);

  useEffect(() => {
    fetchGetListCategory();
  }, []);

  const fetchGetListCategory = async () => {
    try {
      setLoading(true);
      const req = {
        page: 1,
        size: 10000000,
        promotionSearch: ""
      }
      const res = await getListPromotion(req);
      console.log('res', res)
      if (res?.retCode === 0) {
        setListCategories(res?.retData?.promotions);
      }
    } catch (err) {
      console.log("FETCH FAIL", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeleteCategory = async (id) => {
    try {
      const res = await deletePromotion(id);
      if (res?.retCode === RETCODE_SUCCESS) {
        notification.success({
          message: "Successfully",
          description: "Delete product successfully",
          duration: 2,
        });
        fetchGetListCategory();
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

  const goToCreateCategory = () => {
    history.push("/manage-promotion/create-promotion");
  };

  const goToEditProduct = (record) => {
    // console.log("record", record?._id);
    history.push({
      pathname: "/manage-promotion/update-promotion",
      state: {
        idPromotion: record?._id,
      },
    });
  };

  const columnsTable = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   key: "image",
    //   render: (imageUrl) => {
    //     return (
    //       <Image
    //         width={100}
    //         height={100}
    //         src={imageUrl}
    //       />
    //     )
    //   }
    // },
    {
      title: "Day create",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) =>
        createdAt && moment(createdAt).isValid()
          ? moment(createdAt).format("DD/MM/YYYY") : "--",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <span className={classNames("", status === "draft" ? "text-warning" : "text-success")}>{status === "draft" ? "Draft" : "Publish"}</span>
        )
      }
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
              onClick={() => goToEditProduct(record)}
            >
              <EditIcon />
            </div>
            <div
              onClick={() => fetchDeleteCategory(record?._id)}
              className="delete-icon d-flex flex-column justify-content-center align-items-center"
            >
              <DeleteIcon />
            </div>
          </div>
        );
      },
      width: 100
    },
  ];

  return (
    <div className="manage-products">
      <div className="d-flex flex-row justify-content-between align-items-center mb-3">
        <h1 className="manage-products__title">Categories List</h1>

        <div className="d-flex flex-row justify-content-center align-items-center gap-3">
          <button
            className="manage-products__create"
            onClick={goToCreateCategory}
          >
            Create category
          </button>
        </div>
      </div>
      <Table
        rowKey={(record) => record?.key}
        columns={columnsTable}
        dataSource={listCategories}
        loading={loading}
        pagination={false}
      />
    </div>
  )
}

export default CategoryPage