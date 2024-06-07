import * as Actions from "../constants"
import { put, call, takeEvery, takeLatest } from "redux-saga/effects";

// @antd
import { notification } from "antd";

// @constants
import { SUCCESS } from "../../../constants";

// @sevice
import {
  pushItemToCart,
  getUserCart,
  deleteItemInCart
} from "../../../service/cart";

function* fetchPushItemToCart({ payload }) {
  // console.log("payload", payload)
  try {
    yield put({ type: Actions.SET_LOADING_CART, payload: true });
    const res = yield call(pushItemToCart, payload);
    if (res?.retCode === SUCCESS) {
      yield put({ type: Actions.SET_CART, payload: res?.retData });
      yield put({ type: Actions.SET_SUCCESS_CART, payload: res?.retText });
      notification.success({
        message: "Successfully",
        description: res?.retText,
        duration: 2,
      })
    } else {
      yield put({ type: Actions.SET_FAIL_CART, payload: res?.retText });
      notification.error({
        message: "Fail",
        description: res?.retText,
        duration: 2,
      })
    }
  } catch (err) {
    console.log("ERROR!", err);
    yield put({ type: Actions.SET_FAIL_CART, payload: err?.message });
    notification.error({
      message: "Fail",
      description: err?.message,
      duration: 2,
    })
  } finally {
    yield put({ type: Actions.SET_LOADING_CART, payload: false });
  }
}

function* fetchGetUserCart({ payload }) {
  // console.log("payload", payload)
  try {
    yield put({ type: Actions.SET_LOADING_CART, payload: true });
    const res = yield call(getUserCart, payload);
    if (res?.retCode === SUCCESS) {
      yield put({ type: Actions.SET_CART, payload: res?.retData });
      yield put({ type: Actions.SET_SUCCESS_CART, payload: res?.retText });
    } else {
      yield put({ type: Actions.SET_FAIL_CART, payload: res?.retText });
    }
  } catch (err) {
    console.log("ERROR!", err);
    yield put({ type: Actions.SET_FAIL_CART, payload: err?.message });
  } finally {
    yield put({ type: Actions.SET_LOADING_CART, payload: false });
  }
}

function* fetchDeleteItemInCart({ payload }) {
  // console.log("payload", payload)
  try {
    yield put({ type: Actions.SET_LOADING_CART, payload: true });
    const res = yield call(deleteItemInCart, payload);
    if (res?.retCode === SUCCESS) {
      yield put({ type: Actions.SET_CART, payload: res?.retData });
      yield put({ type: Actions.SET_SUCCESS_CART, payload: res?.retText });
      notification.success({
        message: "Successfully",
        description: res?.retText,
        duration: 2,
      })
    } else {
      yield put({ type: Actions.SET_FAIL_CART, payload: res?.retText });
      notification.error({
        message: "Fail",
        description: res?.retText,
        duration: 2,
      })
    }
  } catch (err) {
    console.log("ERROR!", err);
    yield put({ type: Actions.SET_FAIL_CART, payload: err?.message });
    notification.error({
      message: "Fail",
      description: err?.message,
      duration: 2,
    })
  } finally {
    yield put({ type: Actions.SET_LOADING_CART, payload: false });
  }
}

export default function* cartSaga() {
  yield takeEvery(Actions.CREATE_CART, fetchPushItemToCart);
  yield takeLatest(Actions.GET_CART, fetchGetUserCart);
  yield takeEvery(Actions.DELETE_CART, fetchDeleteItemInCart);
}
