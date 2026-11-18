import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import api from "@/services/apiServices";

export interface RoomByUser {
  id: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number;
}

export interface RoomByUserState {
  data: RoomByUser[];
  loading: boolean;
  error: AxiosError | null;
  success: boolean;
}

const initialState: RoomByUserState = {
  data: [],
  loading: false,
  error: null,
  success: false,
};
export const getRoomByUser = createAsyncThunk<RoomByUser[], number>(
  "user/getRoomByUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `dat-phong/lay-theo-nguoi-dung/${id}`
      );
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const roomByUserSlice = createSlice({
  name: "roomByUserSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoomByUser.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getRoomByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(getRoomByUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AxiosError;
      state.success = false;
    });
  },
});

export default roomByUserSlice.reducer;
