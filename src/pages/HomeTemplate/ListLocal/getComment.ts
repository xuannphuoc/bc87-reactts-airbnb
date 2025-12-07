import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import api from "../../../services/apiServices";

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
  loading: boolean;
  error: null | AxiosError;
}

const initialState: StateLisce = {
  data: [],
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
    builder.addCase(getComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getComment.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AxiosError;
    });
  },
});

export default commentSlice.reducer;
