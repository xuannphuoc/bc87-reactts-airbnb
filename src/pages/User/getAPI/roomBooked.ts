import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

type RoomState = {
  data: Room[];
  loading: boolean;
  error: string | null;
};

const initialState: RoomState = {
  data: [],
  loading: false,
  error: null,
};

export const getRoomsDetail = createAsyncThunk<Room, number>(
  "room/getRoomsDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${id}`,
        {
          headers: {
            tokenCybersoft:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjI3LzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDU2OTYwMDAwMCIsIm5iZiI6MTc0NzI0MjAwMCwiZXhwIjoxNzc0NzE3MjAwfQ.YJSCMUqM4JgIqsDiGq9fxRp3AOrIdxBO4t7xxj6K8dY",
          },
        }
      );
      return response.data.content; // ✅ 1 ROOM
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userRoomsSlice = createSlice({
  name: "userRooms",
  initialState,
  reducers: {
    clearRooms(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoomsDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoomsDetail.fulfilled, (state, action) => {
        state.loading = false;
        const exists = state.data.find((room) => room.id === action.payload.id);
        if (!exists) state.data.push(action.payload);
      })
      .addCase(getRoomsDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userRoomsSlice.reducer;
export const { clearRooms } = userRoomsSlice.actions;
