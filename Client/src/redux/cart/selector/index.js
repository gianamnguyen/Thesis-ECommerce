import { createSelector } from "reselect";

export const reducer = (state) => state?.cart;

export const cartUser = createSelector(
  reducer,
  (data) => data?.cart
);

export const loadingCart = createSelector(reducer, (data) => data?.loading);

export const failCart = createSelector(reducer, (data) => data?.fail);

export const successCart = createSelector(reducer, (data) => data?.success);