import { configureStore } from "@reduxjs/toolkit";
import sneakers from "./slices/sneakersSlice";
import cart from "./slices/itemCartSlice";
import favorite from "./slices/itemFavoriteSlice";
import orders from "./slices/ordersSlice";

export const store = configureStore({
  reducer: {
    sneakers,
    cart,
    favorite,
    orders,
  },
});
