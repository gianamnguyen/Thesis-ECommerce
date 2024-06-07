import * as Actions from "../constants"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"

const initialState = {
  cart: {},
  loading: false,
  success: "",
  fail: ""
}

const cartReducer = (state = initialState, action = {}) => {
  // console.log("data", { state, action })
  switch (action?.type) {
    case Actions.SET_SUCCESS_CART:
      return {
        ...state,
        success: action?.payload
      }
    case Actions.SET_FAIL_CART:
      return {
        ...state,
        fail: action?.payload
      }
    case Actions.SET_LOADING_CART:
      return {
        ...state,
        loading: action?.payload
      }
    case Actions.RESET_CART:
      return initialState
    case Actions.SET_CART:
      return {
        ...state,
        cart: action?.payload
      };
    default:
      return initialState
  }
}

const persistConfig = {
  key: "Cart",
  storage,
  blacklist: ["loading", "fail", "success"],
};

export default persistReducer(persistConfig, cartReducer);