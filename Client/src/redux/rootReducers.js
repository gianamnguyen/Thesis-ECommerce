import { combineReducers } from "redux";

// import notificationReducer from "./notification/reducers"
import cartReducer from "./cart/reducer"

const rootReducer = combineReducers({
  cart: cartReducer
})

export default rootReducer