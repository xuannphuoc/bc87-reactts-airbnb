import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/apiServices";
import type { AxiosError } from "axios";
type LocalId = {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
};
interface StateLocal {
  data: LocalId | null;
  loading: boolean;
  error: null | AxiosError;
}
const initialState: StateLocal = {
  data: null,
  loading: false,
  error: null,
};

export const getLocalId = createAsyncThunk(
  "getLocalId",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `https://airbnbnew.cybersoft.edu.vn/api/vi-tri/${id}`
      );
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getLocalIdSlice = createSlice({
  name: "getLocalIdSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLocalId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLocalId.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getLocalId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AxiosError;
    });
  },
});
export default getLocalIdSlice.reducer;
