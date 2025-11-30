import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import axios from "axios";

interface RoomRent {
  id: number;
  tenPhong: string;
  khach: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  maViTri: number;
  hinhAnh: string;
}

type InitialState = {
  data: RoomRent | null;
  loading: boolean;
  error: null | AxiosError;
};

const initialState: InitialState = {
  data: null,
  loading: false,
  error: null,
};

let token = null;
const tokenUserStringLocal = localStorage.getItem("userLogin");
const tokenUserStringSesion = sessionStorage.getItem("userLogin");
if (tokenUserStringLocal) {
  const tokenUserString = localStorage.getItem("userLogin");
  token = tokenUserString ? JSON.parse(tokenUserString) : null;
} else if (tokenUserStringSesion) {
  const tokenUserString = localStorage.getItem("userLogin");
  token = tokenUserString ? JSON.parse(tokenUserString) : null;
}

export const bookRoomReducer = createAsyncThunk(
  "bookRoomReducer",
  async (roomRent, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/thue-phong`,
        method: "POST",
        data: roomRent,
        headers: {
          token,
          tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI0MjAwMCwiZXhwIjoxNzc0MzcxNjAwfQ.-W4bvmZuRBJxryMtPHaMnmm11rdGxNTYol7fLRQid1g",
        },
      });
      return response.data.content;
    } catch (error) {
      console.log(rejectWithValue(error));
    }
  }
);

const bookRoomSlice = createSlice({
  name: "bookRoomSlice",
  initialState,
  reducers: {},
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
      state.error = action.error as AxiosError;
    });
  },
});

export default bookRoomSlice.reducer;
