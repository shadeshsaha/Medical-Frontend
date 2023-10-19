import { baseApi } from "./api/baseApi";
import { cartSlice } from "./slice/cartSlice";
// import { cartSlice } from "./features/slice/cart/cartSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  cart: cartSlice.reducer,
};
