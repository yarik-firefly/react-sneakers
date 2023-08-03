import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosCartDelete, setItemCart } from "./itemCartSlice";

export const axiosOrdersPost = createAsyncThunk(
  "orders/axiosOrdersPost",

  async (_, { dispatch, getState }) => {
    const { itemCart } = getState().cart;
    const delay = (ms) => {
      new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };
    try {
      await axios.post("https://64ad3197b470006a5ec58319.mockapi.io/orders", {
        items: itemCart,
      });
      
      dispatch(ordersPost(itemCart));

      for (let i = 0; i < itemCart.length; i++) {
        const item = itemCart[i];
        dispatch(axiosCartDelete(item.id));
        delay(1000);
      }
      dispatch(setItemCart([]));
    } catch (error) {
      alert("Не удалось оформить заказ :(");
    }
  }
);

export const axiosOrdersGet = createAsyncThunk(
  "orders/axiosOrdersGet",
  async (_, { dispatch }) => {
    const { data } = await axios.get(
      "https://64ad3197b470006a5ec58319.mockapi.io/orders"
    );
    dispatch(setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], [])));
  }
);

const initialState = {
  orders: [],
  statusPost: "loading" | "success" | "rejected",
  statusGet: "loading" | "success" | "rejected",
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    ordersPost(state, action) {
      state.orders.push(action.payload);
    },
  },
  extraReducers: {
    [axiosOrdersGet.pending]: (state) => {
      state.statusGet = "loading";
      state.orders = [];
    },
    [axiosOrdersGet.fulfilled]: (state) => {
      state.statusGet = "success";
    },
    [axiosOrdersGet.rejected]: (state) => {
      state.statusGet = "rejected";
    },
    //===================================
    [axiosOrdersPost.pending]: (state) => {
      state.statusPost = "loading";
    },
    [axiosOrdersPost.fulfilled]: (state) => {
      state.statusPost = "success";
    },
    [axiosOrdersPost.rejected]: (state) => {
      state.statusPost = "rejected";
    },
  },
});

export const { setOrders, ordersPost } = ordersSlice.actions;

export default ordersSlice.reducer;
