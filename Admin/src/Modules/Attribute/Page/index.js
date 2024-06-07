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
import { getAllAttribute, deleteAttribute, updateStatusAttribute } from "../Store/service";

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
  const [listAttributes, setListAttributes] = useState([]);

  useEffect(() => {
    fetchGetListAttribute();
  }, []);

  const fetchGetListAttribute = async () => {
    try {
      setLoading(true);
      const res = await getAllAttribute();
      // console.log('res', res)
      if (res?.retCode === RETCODE_SUCCESS) {
        setListAttributes(res?.retData);
      }
    } catch (err) {
      console.log("FETCH FAIL", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeleteAttribute = async (id) => {
    try {
      const res = await deleteAttribute(id);
      if (res?.retCode === RETCODE_SUCCESS) {
        notification.success({
          message: "Successfully",
          description: "Delete attribute successfully",
          duration: 2,
        });
        fetchGetListAttribute();
      } else {
        notification.error({
          message: "Fail",
          description: "Delete attribute unsuccessfully",
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  };

  const goToCreateAttribute = () => {
    history.push("/manage-attribute/create-attribute");
  };

  const goToEditAttribute = (record) => {
    // console.log("record", record?._id);
    history.push({
      pathname: "/manage-attribute/update-attribute",
      state: {
        idAttribute: record?._id,
      },
    });
  };

  const fetchUpdateStatusAttribute = async (id) => {
    try {
      const req = {
        attributeId: id
      }
      const res = await updateStatusAttribute(req);
      if (res?.retCode === RETCODE_SUCCESS) {
        notification.success({
          message: "Successfully",
          description: "Delete attribute successfully",
          duration: 2,
        });
        fetchGetListAttribute();
      } else {
        notification.error({
          message: "Fail",
          description: "Delete attribute unsuccessfully",
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
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
              onClick={() => fetchUpdateStatusAttribute(record?._id)}
            >
              <EditIcon />
            </div>
            <div
              onClick={() => fetchDeleteAttribute(record?._id)}
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
        <h1 className="manage-products__title">Attributes List</h1>

        <div className="d-flex flex-row justify-content-center align-items-center gap-3">
          <button
            className="manage-products__create"
            onClick={goToCreateAttribute}
          >
            Create attribute
          </button>
        </div>
      </div>
      <Table
        rowKey={(record) => record?.key}
        columns={columnsTable}
        dataSource={listAttributes}
        loading={loading}
        pagination={false}
      />
    </div>
  )
}

export default CategoryPage