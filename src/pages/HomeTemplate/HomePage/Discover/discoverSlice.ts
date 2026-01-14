import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import api from "@/services/apiServices";

export type Paganation = {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
};

type GroupPaga = {
  pageIndex: number;
  pageSize: number;
  totalRow: number;
  keywords: null | string;
  data: Paganation[];
  dateTime: string;
};

type PagaState = {
  dataPaga: GroupPaga | null;
  loading: boolean;
  error: null | AxiosError;
};

const initialState: PagaState = {
  dataPaga: null,
  loading: false,
  error: null,
};

export const getDataPaga = createAsyncThunk(
  "getDataPaga",
  async (__, { rejectWithValue }) => {
    try {
      const respone = await api.get(
        "vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=10"
      );
      return respone.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getDataPageSlice = createSlice({
  name: "getDataPageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataPaga.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDataPaga.fulfilled, (state, action) => {
      state.loading = false;
      state.dataPaga = action.payload;
    });
    builder.addCase(getDataPaga.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AxiosError;
    });
  },
});

export default getDataPageSlice.reducer;
