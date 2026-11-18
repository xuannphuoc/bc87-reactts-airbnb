import type { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/services/apiServices";
import type { DetailRoom } from "../../components/_Type/type.tsx";
interface StateRoom {
  data: DetailRoom | null;
  loading: boolean;
  error: null | AxiosError;
}
const initialState: StateRoom = {
  data: null,
  loading: false,
  error: null,
};

export const getDetailRoom = createAsyncThunk(
  "detail/getDetailRoom",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api({
        method: "GET",
        url: `phong-thue/${id}`,
      });
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const detailRoomSlice = createSlice({
  name: "getDataRoomSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDetailRoom.pending, (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    });
    builder.addCase(getDetailRoom.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getDetailRoom.rejected, (state, action) => {
      if (action.meta.aborted) return;
      state.loading = false;
      state.error = action.payload as AxiosError;
    });
  },
});
export default detailRoomSlice.reducer;
