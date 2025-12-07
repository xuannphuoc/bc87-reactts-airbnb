import type { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export type Room = {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
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
};
interface StateRoom {
  data: Room | null;
  loading: boolean;
  error: null | AxiosError;
}
const initialState: StateRoom = {
  data: null,
  loading: false,
  error: null,
};

export const getDataRoom = createAsyncThunk(
  "getDataRoom",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${id}`,
        headers: {
          tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI0MjAwMCwiZXhwIjoxNzc0MzcxNjAwfQ.-W4bvmZuRBJxryMtPHaMnmm11rdGxNTYol7fLRQid1g",
        },
      });
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getDataRoomSlice = createSlice({
  name: "getDataRoomSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataRoom.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDataRoom.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getDataRoom.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AxiosError;
    });
  },
});
export default getDataRoomSlice.reducer;
