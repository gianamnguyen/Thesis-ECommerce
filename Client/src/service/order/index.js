import apiMethod from "../../utility/apiMethod"
import { API_ORDER } from "./api"

export const createOrder = async (payload) => {
  const { data } = await apiMethod.post(API_ORDER.CREATE_ORDER, payload)
  return data
}

export const getListOrderClient = async (payload) => {
  const { data } = await apiMethod.post(API_ORDER.GET_LIST_ORDER_CLIENT, payload)
  return data
}

export const getDetailOrderClient = async (payload) => {
  const { data } = await apiMethod.get(API_ORDER.GET_DETAIL_ORDER_CLIENT + `/${payload}`)
  return data
}

export const createPaymentWithMOMO = async (payload) => {
  const { data } = await apiMethod.post(API_ORDER.CREATE_PAYMENT_MOMO, {
    ...payload
  })
  return data
}