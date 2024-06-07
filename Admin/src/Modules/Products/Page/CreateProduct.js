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
const { Option } = Select;
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

// @service
import {
  createProduct,
  getDetailProduct,
  updateProduct,
} from "../Store/service";
import { getListCategory } from "../../Category/Store/service";
import { getAllAttribute } from "../../Attribute/Store/service";

// @constants
import { RETCODE_SUCCESS } from "@configs/contants";

const CreateProduct = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();

  const { idProduct } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const [imgBase64, setImgBase64] = useState();
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  const [listAttributes, setListAttributes] = useState([]);

  useEffect(() => {
    if (listCategories?.length === 0) {
      form.setFieldValue("category", "664ec1f6632d1222e97d9a8a")
      fetchGetListCategory()
      fetchGetListAttribute()
    }
    if (idProduct) {
      fetchDetailProduct();
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

  const fetchDetailProduct = async () => {
    try {
      const res = await getDetailProduct({
        idProduct,
      });
      if (res?.data?.retCode === RETCODE_SUCCESS) {
        onInitData(res?.data?.retData);
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  };

  const onInitData = (dataProduct) => {
    if (dataProduct && Object.keys(dataProduct).length > 0) {
      const {
        name,
        description,
        price,
        image,
        category,
        attributes
      } = dataProduct || {};
      setFileList(image);
      form.setFieldsValue({
        name,
        description,
        price,
        category,
        attributes
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

  const fetchGetListCategory = async () => {
    try {
      // setLoading(true);
      const res = await getListCategory();
      // console.log('res', res)
      if (res?.retCode === RETCODE_SUCCESS) {
        const list = res?.retData?.map((item) => {
          return {
            value: item?._id,
            label: item?.name
          }
        })
        setListCategories(list);
      }
    } catch (err) {
      console.log("FETCH FAIL", err);
    } finally {
      // setLoading(false);
    }
  };

  const fetchGetListAttribute = async () => {
    try {
      setLoading(true);
      const res = await getAllAttribute();
      // console.log('res', res)
      if (res?.retCode === RETCODE_SUCCESS) {
        const listAtt = res?.retData?.map((item) => {
          return {
            value: item?._id,
            label: item?.name
          }
        })
        setListAttributes(listAtt);
      }
    } catch (err) {
      console.log("FETCH FAIL", err);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    // console.log("values", values);
    const { image, ...rest } = values || {};
    try {
      setLoading(true);
      const { data } = idProduct
        ? await updateProduct({
          idProduct,
          image: fileList,
          ...rest,
        })
        : await createProduct({
          image: fileList,
          ...rest,
        });

      if (data?.retCode === RETCODE_SUCCESS) {
        notification.success({
          message: "Successfully",
          description: data?.retText,
          duration: 2,
        });
        setTimeout(() => {
          history.push("/manage-products");
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
      !hasValues?.description ||
      // !hasValues?.image ||
      !hasValues?.price ||
      !hasValues?.category
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
        <h1 className="create-product__title">
          {idProduct ? "Update product" : "Create product"}
        </h1>
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
            label={`Product name`}
            rules={[
              {
                required: true,
                message: "Please, enter your product name",
              },
            ]}
          >
            <Input
              autoFocus
              className="input-field"
              placeholder={`Enter your product name`}
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

          <Form.Item
            name="image"
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
              {fileList.length >= 8 ? null : uploadButton}
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
          </Form.Item>

          <Form.Item
            name="price"
            className="form-custom col-6 ps-3 pe-3"
            label={`Price`}
            rules={[
              {
                required: true,
                message: "Please, enter your price",
              },
            ]}
          >
            <InputNumber
              className="input-field"
              placeholder={`Enter your price`}
              formatter={val => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              style={{
                width: "100%",
                borderRadius: "8px"
              }}
            />
          </Form.Item>

          <Form.Item
            name="category"
            className="form-custom col-6 ps-3 pe-3"
            label={`Category`}
            rules={[
              {
                required: true,
                message: "Please, select category",
              },
            ]}
          >
            <Select
              style={{ width: 120 }}
              options={listCategories}
            />
          </Form.Item>

          <Form.List name="attributes">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div className="d-flex flex-row justify-content-start align-items-center gap-4">
                    <Form.Item
                      {...restField}
                      name={[name, 'attributeId']}
                      rules={[{ required: true, message: 'Select product attribute' }]}
                      label={`Attribute`}
                    >
                      <Select
                        style={{ width: 120 }}
                        options={listAttributes}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'option']}
                      rules={[{ required: true, message: 'Missing last name' }]}
                      label={`Option`}
                    >
                      <Input placeholder="Enter product option" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </div>
                ))}
                <Form.Item>
                  <div style={{
                    marginLeft: 16,
                    marginRight: 16
                  }}>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add more attribute
                    </Button>
                  </div>
                </Form.Item>
              </>
            )}
          </Form.List>

          <div className="d-flex flex-row justify-content-end align-items-center">
            <Button
              className={classNames({
                "submit-btn": true,
                disable: idProduct ? false : isDisable,
              })}
              disabled={idProduct ? false : isDisable}
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

export default CreateProduct;
