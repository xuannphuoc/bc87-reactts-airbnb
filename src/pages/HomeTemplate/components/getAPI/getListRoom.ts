import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import api from "@/services/apiServices";
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
    const response = await api({
      url: `phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`,
      method: "GET",
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
      state.data = [];
      state.error = null;
      })
      .addCase(getListDataRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getListDataRoom.rejected, (state, action) => {
      if (action.meta.aborted) return;
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

export default listDataRoomSlice.reducer;
