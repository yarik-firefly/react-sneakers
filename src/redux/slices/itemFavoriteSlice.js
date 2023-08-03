import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const axiosFavorite = createAsyncThunk(
  "favorite/axiosFavorite",
  async (_, { dispatch }) => {
    const { data } = await axios.get(
      "https://64aa95030c6d844abede97df.mockapi.io/favorite"
    );
    // dispatch(setItemFavorite(data));
    dispatch(setItemFavorite(data));
  }
);

export const axiosFavoritePost = createAsyncThunk(
  "favorite/axiosFavoritePost",

  async (obj, { dispatch, getState }) => {
    try {
      const itemFavorite = getState().favorite.itemFavorite;
      if (itemFavorite.find((item) => item.id === obj.id)) {
        await axios.delete(
          `https://64aa95030c6d844abede97df.mockapi.io/favorite/${obj.id}`
        );
        dispatch(removeFromFavorite(obj.id));
      } else {
        await axios.post(
          "https://64aa95030c6d844abede97df.mockapi.io/favorite",
          obj
        );
        dispatch(addToFavorite(obj));
      }
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  itemFavorite: [],
  // fillHeart: false,
  // favorited: true,
  status: "loading" | "success" | "rejected",
};

const itemFavoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setItemFavorite(state, action) {
      state.itemFavorite = action.payload;
    },
    addToFavorite(state, action) {
      state.itemFavorite.push(action.payload);
    },
    removeFromFavorite(state, action) {
      state.itemFavorite = state.itemFavorite.filter(
        (item) => item.id !== action.payload
      );
    },
    // setFillHeart(state, action) {
    //   state.fillHeart = action.payload;
    // },
  },
  // extraReducers: (builder) => {
  // builder.addCase(axiosFavorite.pending, (state) => {
  //   state.status = "loading";
  //   state.itemFavorite = [];
  // });
  // builder.addCase(axiosFavorite.fulfilled, (state, action) => {
  //   state.itemFavorite = action.payload;
  //   state.status = "success";
  // });
  // builder.addCase(axiosFavorite.rejected, (state) => {
  //   state.status = "rejected";
  //   state.itemFavorite = [];
  // });
  //==================================================================
  // builder.addCase(axiosFavoritePost.pending, (state) => {
  //   state.status = "loading";
  //   state.itemFavorite = [];
  // });
  // builder.addCase(axiosFavoritePost.fulfilled, (state, action) => {
  //   state.itemFavorite.push(action.payload);
  //   state.status = "success";
  // });
  // builder.addCase(axiosFavoritePost.rejected, (state) => {
  //   state.status = "rejected";
  //   state.itemFavorite = [];
  // });
  // },
});

export const {
  setItemFavorite,
  addToFavorite,
  setFillHeart,
  removeFromFavorite,
} = itemFavoriteSlice.actions;

export default itemFavoriteSlice.reducer;
