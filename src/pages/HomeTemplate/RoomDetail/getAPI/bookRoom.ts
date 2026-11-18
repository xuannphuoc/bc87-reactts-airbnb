import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import api from "@/services/apiServices";

export interface FormBookRom {
  id?: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number;
}

type InitialState = {
  data: FormBookRom | null;
  loading: boolean;
  error: null | AxiosError;
};

const initialState: InitialState = {
  data: null,
  loading: false,
  error: null,
};

export const bookRoomReducer = createAsyncThunk<any, FormBookRom>(
  "bookRoomReducer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api({
        url: `dat-phong`,
        method: "POST",
        data,
      });
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const bookRoomSlice = createSlice({
  name: "bookRoomSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.data = null;
      state.error = null;
    },
    resetBookRoom: (state) => {
      state.loading = false,
      state.data = null,
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(bookRoomReducer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(bookRoomReducer.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(bookRoomReducer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AxiosError;
    });
  },
});
export const {resetBookRoom} = bookRoomSlice.actions
export default bookRoomSlice.reducer;
