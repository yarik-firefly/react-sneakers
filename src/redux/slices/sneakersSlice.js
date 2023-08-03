import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const axiosSneakers = createAsyncThunk(
  "sneakers/axiosSneakers",
  async () => {
    const { data } = await axios.get(
      "https://6490ad001e6aa71680cba4bb.mockapi.io/sneakers"
    );
    return data;
  }
);

const initialState = {
  sneakers: [],
  status: "loading" | "success" | "rejected",
  searchValue: "",
};

const sneakersSlice = createSlice({
  name: "sneakers",
  initialState,
  reducers: {
    setSneakers(state, action) {
      state.sneakers = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(axiosSneakers.pending, (state) => {
      state.status = "loading";
      state.sneakers = [];
    });
    builder.addCase(axiosSneakers.fulfilled, (state, action) => {
      state.sneakers = action.payload;
      state.status = "success";
    });
    builder.addCase(axiosSneakers.rejected, (state) => {
      state.status = "rejected";
      state.sneakers = [];
    });
  },
});

export const { setSneakers, setSearchValue, setFilteredItem } =
  sneakersSlice.actions;

export default sneakersSlice.reducer;
