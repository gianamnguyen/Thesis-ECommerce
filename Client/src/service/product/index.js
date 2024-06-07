import apiMethod from "../../utility/apiMethod";
import { API_PRODUCT } from "./api"

export const getListProducts = async (payload) => {
  const { data } = await apiMethod.post(API_PRODUCT.GET_LIST, payload)
  return data
}

export const getDetailProduct = async (payload) => {
  const { data } = await apiMethod.get(API_PRODUCT.GET_DETAIL + `/${payload}`)
  return data
}