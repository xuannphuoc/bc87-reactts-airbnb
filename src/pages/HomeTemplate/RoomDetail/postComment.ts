import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import api from "../../../services/apiServices";

export interface PostComment {
  maPhong: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
}

interface Stateslice {
  data: PostComment | null;
  loading: boolean;
  error: null | AxiosError;
}

const initialState: Stateslice = {
  data: null,
  loading: false,
  error: null,
};

export const postComment = createAsyncThunk(
  "postComment",
  async (data: PostComment, { rejectWithValue }) => {
    try {
      const response = await api.post("binh-luan", data);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const postCommentReducer = createSlice({
  name: "commentReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(postComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AxiosError;
    });
  },
});

export default postCommentReducer.reducer;
