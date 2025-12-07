import type { AxiosError } from "axios";
import api from "../../../../services/apiServices";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export type Location = {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
};

type StateLocation = {
  data: null | Location[];
  loading: boolean;
  error: null | AxiosError;
};

const initialState: StateLocation = {
  data: null,
  loading: false,
  error: null,
};

export const getDataLocation = createAsyncThunk(
  "getDataLocation",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.get("vi-tri");
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const LocationSlice = createSlice({
  name: "LocationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataLocation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDataLocation.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getDataLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AxiosError;
    });
  },
});

export default LocationSlice.reducer;
