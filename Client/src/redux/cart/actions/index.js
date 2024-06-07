import * as Actions from "../constants"

export const setCart = (payload) => {
  return {
    type: Actions.SET_CART,
    payload
  }
}

export const getCart = (payload) => {
  return {
    type: Actions.GET_CART,
    payload
  }
}

export const createCart = (payload) => {
  return {
    type: Actions.CREATE_CART,
    payload
  }
}

export const deleteCart = (payload) => {
  return {
    type: Actions.DELETE_CART,
    payload
  }
}

export const removeItemCart = (payload) => {
  return {
    type: Actions.REMOVE_ITEM_CART,
    payload
  }
}

export const resetCart = (payload) => {
  return {
    type: Actions.RESET_CART,
    payload
  }
}

export const setSuccessCart = (payload) => {
  return {
    type: Actions.SET_SUCCESS_CART,
    payload
  }
}

export const setFailCart = (payload) => {
  return {
    type: Actions.SET_FAIL_CART,
    payload
  }
}

export const setLoadingCart = (payload) => {
  return {
    type: Actions.SET_LOADING_CART,
    payload
  }
}