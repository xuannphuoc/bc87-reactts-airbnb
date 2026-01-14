import type { AxiosError } from "axios";
import api from "../../../../services/apiServices";
import type { Location } from "../_Type/type.tsx";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type StateLocation = {
  data: Location[] | null;
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
