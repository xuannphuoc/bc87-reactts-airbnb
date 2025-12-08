import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import axios from "axios";

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
export const getRoomByUserReducer = createAsyncThunk<RoomByUser[], number>(
  "getRoomByUserReducer",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://airbnbnew.cybersoft.edu.vn/api/dat-phong/lay-theo-nguoi-dung/${id}`,
        {
          headers: {
            tokenCybersoft:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI0MjAwMCwiZXhwIjoxNzc0MzcxNjAwfQ.-W4bvmZuRBJxryMtPHaMnmm11rdGxNTYol7fLRQid1g",
          },
        }
      );
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const getRoomByUserSlice = createSlice({
  name: "getRoomByUserSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoomByUserReducer.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getRoomByUserReducer.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(getRoomByUserReducer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AxiosError;
      state.success = false;
    });
  },
});

export default getRoomByUserSlice.reducer;
