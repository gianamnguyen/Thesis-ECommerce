import apiMethod from "../../utility/apiMethod";
import { API_AUTHENTICATION } from "./api";

export const signIn = async (payload) => {
  const { data } = await apiMethod.post(API_AUTHENTICATION.SIGN_IN, payload)
  return data
}

export const signUp = async (payload) => {
  const { data } = await apiMethod.post(API_AUTHENTICATION.SIGN_UP, payload)
  return data
}

