import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import axios from "axios";

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

let token = null;

const localData = localStorage.getItem("userLogin");
const sessionData = sessionStorage.getItem("userLogin");

if (localData) {
  token = JSON.parse(localData).token;
} else if (sessionData) {
  token = JSON.parse(sessionData).token;
}

export const bookRoomReducer = createAsyncThunk<any, FormBookRom>(
  "bookRoomReducer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/dat-phong`,
        method: "POST",
        data,
        headers: {
          token: `Bearer ${token?.token}`,
          tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI0MjAwMCwiZXhwIjoxNzc0MzcxNjAwfQ.-W4bvmZuRBJxryMtPHaMnmm11rdGxNTYol7fLRQid1g",
        },
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
