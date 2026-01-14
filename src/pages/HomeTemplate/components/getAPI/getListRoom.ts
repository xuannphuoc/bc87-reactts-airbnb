import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import axios from "axios";
import type { DetailRoom } from "../_Type/type";

export type StateRoom = {
  data: DetailRoom[];
  loading: boolean;
  error: null | AxiosError;
};

const initialState: StateRoom = {
  data: [],
  loading: false,
  error: null,
};

export const getListDataRoom = createAsyncThunk<
  DetailRoom[],
  number,
  {
    rejectValue: AxiosError;
  }
>("list/getListDataRoom", async (id, { rejectWithValue }) => {
  try {
    const response = await axios({
      url: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`,
      method: "GET",
      headers: {
        tokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI0MjAwMCwiZXhwIjoxNzc0MzcxNjAwfQ.-W4bvmZuRBJxryMtPHaMnmm11rdGxNTYol7fLRQid1g",
      },
    });

    return response.data.content;
  } catch (error) {
    return rejectWithValue(error as AxiosError);
  }
});

const listDataRoomSlice = createSlice({
  name: "RoomSlice",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DetailRoom[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListDataRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListDataRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getListDataRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

export default listDataRoomSlice.reducer;
