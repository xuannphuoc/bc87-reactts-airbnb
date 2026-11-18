import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import api from "../../../../services/apiServices";

export interface Comments {
  id: number;
  ngayBinhLuan: string;
  saoBinhLuan: number;
  noiDung: string;
  tenNguoiBinhLuan: string;
  avatar: string;
}

interface StateLisce {
  data: Comments[];
  roomId: number | null;
  loading: boolean;
  error: null | AxiosError;
}

const initialState: StateLisce = {
  data: [],
  roomId: null,
  loading: false,
  error: null,
};

export const getComment = createAsyncThunk(
  "getComment",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `binh-luan/lay-binh-luan-theo-phong/${id}`
      );
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {
    setComment: (state, action: PayloadAction<Comments[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getComment.pending, (state, action) => {
      state.loading = true;
      if (state.roomId !== action.meta.arg) state.data = [];
      state.roomId = action.meta.arg;
      state.error = null;
    });
    builder.addCase(getComment.fulfilled, (state, action) => {
      if (state.roomId !== action.meta.arg) return;
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getComment.rejected, (state, action) => {
      if (action.meta.aborted || state.roomId !== action.meta.arg) return;
      state.loading = false;
      state.error = action.payload as AxiosError;
    });
  },
});

export default commentSlice.reducer;
