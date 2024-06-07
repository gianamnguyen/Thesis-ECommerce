import { all } from "redux-saga/effects";

import cartSaga from "./cart/saga"

export function* rootSagas() {
  yield all([cartSaga()])
}