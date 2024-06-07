import { USER_INFO } from "../constants";

export function formatToCurrencyVND(number) {
  if (number) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(0);
}

export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem(USER_INFO))
}

export const getUserToken = () => {
  return JSON.parse(localStorage.getItem(USER_INFO))?.accessToken
}