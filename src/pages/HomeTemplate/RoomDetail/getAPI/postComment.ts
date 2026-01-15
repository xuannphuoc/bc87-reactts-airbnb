import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import axios from "axios";
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
let token = null;
const localData = localStorage.getItem("userLogin");
const sessionData = sessionStorage.getItem("userLogin");

if (localData) {
  token = JSON.parse(localData).token;
} else if (sessionData) {
  token = JSON.parse(sessionData).token;
}

export const postComment = createAsyncThunk<any, PostComment>(
  "postCommentReducer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/binh-luan`,
        method: "POST",
        data,
        headers: {
          token: token,
          tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI0MjAwMCwiZXhwIjoxNzc0MzcxNjAwfQ.-W4bvmZuRBJxryMtPHaMnmm11rdGxNTYol7fLRQid1g",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const postCommentReducer = createSlice({
  name: "commentReducer",
  initialState,
  reducers: {
    resetComment: (state) => {
      state.loading = false,
      state.data = null,
      state.error = null
    }
  },
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

export const {resetComment} = postCommentReducer.actions
export default postCommentReducer.reducer;
