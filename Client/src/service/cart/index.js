import apiMethod from "../../utility/apiMethod";
import { API_CART } from "./api";

export const pushItemToCart = async (payload) => {
  const { data } = await apiMethod.post(API_CART.CREATE_CART, payload)
  return data
}

export const getUserCart = async (payload) => {
  const { data } = await apiMethod.post(API_CART.GET_USER_CART, payload)
  return data
}

export const deleteItemInCart = async (payload) => {
  const { data } = await apiMethod.post(API_CART.DELETE_ITEM_IN_CART, payload)
  return data
}

export const removeOneItemInCart = async (payload) => {
  const { data } = await apiMethod.put(API_CART.REMOVE_ONE_ITEM_IN_CART, payload)
  return data
}