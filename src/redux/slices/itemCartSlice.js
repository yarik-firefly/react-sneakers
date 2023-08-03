import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const axiosCartGet = createAsyncThunk(
  "cart/axiosCartGet",
  async (_, { dispatch }) => {
    const { data } = await axios.get(
      "https://64aa95030c6d844abede97df.mockapi.io/cart"
    );
    dispatch(setItemCart(data));
  }
);

export const axiosCartPost = createAsyncThunk(
  "cart/axiosCartPost",

  async function (obj, { dispatch }) {
    try {
      dispatch(addToCart(obj));
      await axios.post("https://64aa95030c6d844abede97df.mockapi.io/cart", obj);
    } catch (error) {
      console.log(error);
    }
  }
);

export const axiosCartDelete = createAsyncThunk(
  "cart/axiosCartDelete",
  async (obj, { dispatch }) => {
    dispatch(deleteFromCart(obj.id));

    await axios.delete(
      `https://64aa95030c6d844abede97df.mockapi.io/cart/${obj.id}`
    );
  }
);

const initialState = {
  itemCart: [],
  status: "loading" | "success" | "rejected",
  // findItem: {},
};

const itemCartsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItemCart(state, action) {
      state.itemCart = action.payload;
    },
    addToCart(state, action) {
      state.itemCart.push(action.payload);
      // if (findItem) {
      //   state.itemCart = itemCart.filter(
      //     (item) => Number(item.parentId) !== Number(action.payload.id)
      //   );
      // } else {
      //   state.itemCart.push(action.payload);
      // }
    },
    deleteFromCart(state, action) {
      state.itemCart = state.itemCart.filter(
        (item) => item.id !== action.payload
      );
    },
    extraReducers: (builder) => {
      builder.addCase(axiosCartGet.pending, (state) => {
        state.status = "loading";
        state.itemCart = [];
      });
      builder.addCase(axiosCartGet.fulfilled, (state, action) => {
        state.itemCart = action.payload;
        state.status = "success";
      });
      builder.addCase(axiosCartGet.rejected, (state) => {
        state.status = "rejected";
        state.itemCart = [];
      });
      // ==========================================================

      builder.addCase(axiosCartPost.pending, (state) => {
        state.status = "loading";
        state.itemCart = [];
      });
      builder.addCase(axiosCartPost.fulfilled, (state, action) => {
        state.itemCart.push(action.payload);
        state.status = "success";
      });
      builder.addCase(axiosCartPost.rejected, (state) => {
        state.status = "rejected";
      });
      //==============================================================

      // builder.addCase(axiosCartDelete.pending, (state) => {
      //   state.status = "loading";
      //   // state.itemCart = [];
      // });
      // builder.addCase(axiosCartDelete.fulfilled, (state, action) => {
      //   state.itemCart.filter((item) => item.id !== action.payload);
      //   state.status = "success";
      // });
      // builder.addCase(axiosCartDelete.rejected, (state) => {
      //   state.status = "rejected";
      // });
    },
  },
});

export const { setItemCart, addToCart, deleteFromCart } =
  itemCartsSlice.actions;

export default itemCartsSlice.reducer;
