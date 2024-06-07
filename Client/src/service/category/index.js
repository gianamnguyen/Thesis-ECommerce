import apiMethod from "../../utility/apiMethod";
import { API_CATEGORY } from "./api"

export const getListCategories = async (payload) => {
  const { data } = await apiMethod.get(API_CATEGORY.GET_LIST)
  return data
}