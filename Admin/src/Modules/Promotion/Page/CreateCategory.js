import "../bootstrap.scss";
import "../responsive.scss";

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";

// @utility
import { uploadImg } from "../../../utility/UploadImg";

// @components
import {
  Form,
  Input,
  Button,
  notification,
  Select,
  DatePicker,
  Modal,
  Upload,
  message,
  Spin,
  InputNumber
} from "antd";
// const { Option } = Select;
import { PlusOutlined } from "@ant-design/icons";

// @service
import { createPromotion, updatePromotion, getDetailPromotion } from "../Store/service";

// @constants
import { RETCODE_SUCCESS } from "@configs/contants";
import { convertToSlug } from "../../../utility/common";

const CreateCategory = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();

  const { idPromotion } = location.state || {};
  console.log("s", location)
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const [detailCate, setDetailCate] = useState({})

  const [imgBase64, setImgBase64] = useState();
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    form.setFieldValue("status", "draft")
    if (idPromotion) {
      fetchDetailCategory();
      // handleFormChange();
    }
  }, []);

  useEffect(async () => {
    if (imgBase64) {
      try {
        setLoadingUpload(true);
        const res = await uploadImg(imgBase64);
        if (res?.status === 200) {
          const listImg = {
            uid: res?.data?.version_id,
            url: res?.data?.secure_url,
          };
          setFileList((prev) => [...prev, listImg]);
          setImgBase64();
        }
      } catch (err) {
        console.log("FETCH FAIL!", err);
      } finally {
        setLoadingUpload(false);
      }
    }
  }, [imgBase64]);

  const fetchDetailCategory = async () => {
    try {
      const res = await getDetailPromotion(idPromotion);
      console.log("res", res)
      if (res?.retCode === RETCODE_SUCCESS) {
        onInitData(res?.retData);
        setDetailCate(detailCate)
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  };

  const onInitData = (dataCategory) => {
    if (dataCategory && Object.keys(dataCategory).length > 0) {
      const {
        name,
        description,
        status,
        // imageUrl,
        discount,
        quantity
      } = dataCategory || {};
      // const dataImg = {
      //   uid: "1",
      //   url: imageUrl
      // }
      // setFileList((prev) => [...prev, dataImg]);
      form.setFieldsValue({
        name,
        description,
        status,
        discount,
        quantity
      });
    }
  };

  const getBase64Img = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgBase64(reader.result);
    };
  };

  const onFinish = async (values) => {
    // console.log("values", fileList);
    const { imageUrl, ...rest } = values || {};
    try {
      setLoading(true);
      const res = idPromotion
        ? await updatePromotion({
          ...values, 
          idPromotion,
          image: "https://res.cloudinary.com/dh5uzwer0/image/upload/v1677316046/x3swcx4goincskm8jhyt.jpg"
        })
        : await createPromotion({
          ...values,
          image: "https://res.cloudinary.com/dh5uzwer0/image/upload/v1677316046/x3swcx4goincskm8jhyt.jpg"
        });

      if (res?.retCode === RETCODE_SUCCESS) {
        notification.success({
          message: "Successfully",
          description: res?.retText,
          duration: 2,
        });
        setTimeout(() => {
          history.push("/manage-promotion");
        }, 1000);
      } else {
        notification.error({
          message: "Fail",
          description: "Create fail",
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    const hasValues = form.getFieldsValue();
    setIsDisable(
      hasErrors ||
      !hasValues?.name ||
      !hasValues?.description
      // !hasValues?.image ||
      // !hasValues?.status
    );
  };

  const handleCancel = () => setPreviewOpen(false);

  const validateFile = (file) => {
    // console.log("hihi", file);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("Your image must less than 10MB");
    }
    return isJpgOrPng && isLt10M;
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
  };

  const handleChange = async (props) => {
    const { file, fileList } = props || {};
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (isJpgOrPng) await getBase64Img(file?.originFileObj);
  };

  const handleRemove = (e) => {
    // console.log("e", e);
    const fileRemoved = fileList?.filter((item) => item?.uid !== e?.uid);
    setFileList(fileRemoved);
  };

  const uploadButton = (
    <Spin spinning={loadingUpload}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </Spin>
  );

  return (
    <div className="create-product">
      <div className="mb-3">
        <h1 className="create-product__title">Create promotion</h1>
      </div>

      <div className="create-product__formCreate">
        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFieldsChange={handleFormChange}
          className="box-form row"
          requiredMark={false}
        >
          <Form.Item
            name="name"
            className="form-custom col-6 ps-3 pe-3"
            label={`Name`}
            rules={[
              {
                required: true,
                message: "Please, enter your category's name",
              },
            ]}
          >
            <Input
              autoFocus
              className="input-field"
              placeholder={`Enter your category's name`}
            />
          </Form.Item>

          <Form.Item
            name="description"
            className="form-custom col-6 ps-3 pe-3"
            label={`Description`}
            rules={[
              {
                required: true,
                message: "Please, enter your description",
              },
            ]}
          >
            <Input
              className="input-field"
              placeholder={`Enter your description`}
            />
          </Form.Item>

          {/* <Form.Item
            name="imageUrl"
            className="form-custom col-6 ps-3 pe-3"
            label={`Image`}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              customRequest={(options) => {
                const { file } = options || {};
                options.onSuccess(file, options.file);
              }}
              beforeUpload={validateFile}
              onPreview={handlePreview}
              onChange={handleChange}
              onRemove={(e) => handleRemove(e)}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={""}
              footer={null}
              onCancel={handleCancel}
              centered
            >
              <img
                alt="preview-img"
                style={{ width: "100%" }}
                src={previewImage}
              />
            </Modal>
          </Form.Item> */}

          <Form.Item
            name="status"
            className="form-custom col-6 ps-3 pe-3"
            label={`Status`}
          >
            <Select
              defaultValue="draft"
              style={{ width: 120 }}
              // onChange={handleChange}
              options={[
                { value: 'draft', label: 'Draft' },
                { value: 'publish', label: 'Publish' }
              ]}
            />
          </Form.Item>
          
          <Form.Item
            name="discount"
            className="form-custom col-6 ps-3 pe-3"
            label={`Discount`}
            rules={[
              {
                required: true,
                message: "Please, enter your discount",
              },
            ]}
          >
            <InputNumber
              className="input-field"
              placeholder={`Enter your discount`}
              formatter={val => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              style={{
                width: "100%",
                borderRadius: "8px"
              }}
            />
          </Form.Item>

          <Form.Item
            name="quantity"
            className="form-custom col-6 ps-3 pe-3"
            label={`Quantity`}
            rules={[
              {
                required: true,
                message: "Please, enter your quantity",
              },
            ]}
          >
            <InputNumber
              className="input-field"
              placeholder={`Enter your quantity`}
              formatter={val => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              style={{
                width: "100%",
                borderRadius: "8px"
              }}
            />
          </Form.Item>

          <div className="d-flex flex-row justify-content-end align-items-center">
            <Button
              className={classNames({
                "submit-btn": true,
                disable: idPromotion ? false : isDisable,
              })}
              disabled={idPromotion ? false : isDisable}
              loading={loading}
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateCategory;
