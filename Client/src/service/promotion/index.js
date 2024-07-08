import apiMethod from "../../utility/apiMethod";
import { API_PROMOTION } from "./api"

export const getPromotions = async (payload) => {
  const { data } = await apiMethod.post(API_PROMOTION.GET_PROMOTIONS, payload)
  return data
}

export const applyPromotion = async (payload) => {
  const { data } = await apiMethod.post(API_PROMOTION.APPLY_PROMOTION, payload)
  return data
}

export const cancelPromotion = async (payload) => {
  const { data } = await apiMethod.post(API_PROMOTION.CANCEL_PROMOTION, payload)
  return data
}