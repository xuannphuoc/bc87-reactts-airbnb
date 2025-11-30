import type { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/apiServices";
type Room = {
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
      const response = await api.get(`phong-thue/${id}`);
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
