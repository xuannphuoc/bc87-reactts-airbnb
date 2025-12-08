import { type DetailRoom } from "../HomeTemplate/components/Navbar/getRoom";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export interface UserRoomsState {
  roomIds: number[];
  rooms: DetailRoom[];
  loading: boolean;
  error: string | null;
}

export const getRoomsDetail = createAsyncThunk<DetailRoom[], number[]>(
  "getRoomsDetail",
  async (roomIds, { rejectWithValue }) => {
    try {
      const promises = roomIds.map((id) =>
        axios({
          url: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${id}`,
          method: "GET",
          headers: {
            tokenCybersoft:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI0MjAwMCwiZXhwIjoxNzc0MzcxNjAwfQ.-W4bvmZuRBJxryMtPHaMnmm11rdGxNTYol7fLRQid1g",
          },
        })
      );
      const responses = await Promise.all(promises);
      return responses.map((res) => res.data.content);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: UserRoomsState = {
  roomIds: [],
  rooms: [],
  loading: false,
  error: null,
};

const userRoomsSlice = createSlice({
  name: "userRooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoomsDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRoomsDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.rooms = action.payload;
    });
    builder.addCase(getRoomsDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default userRoomsSlice.reducer;
