import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import axios from "axios";

export interface PutUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
}

export interface PutUserState {
  data: PutUser | null;
  loading: boolean;
  error: null | AxiosError;
  success: boolean;
}

const initialState: PutUserState = {
  data: null,
  loading: false,
  success: false,
  error: null,
};

export const putUserReducer = createAsyncThunk<any, PutUser>(
  "putUserReducer",
  async (formUser, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/users/${formUser.id}`,
        method: "PUT",
        data: formUser,
        headers: {
          tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI0MjAwMCwiZXhwIjoxNzc0MzcxNjAwfQ.-W4bvmZuRBJxryMtPHaMnmm11rdGxNTYol7fLRQid1g",
        },
      });
      return response.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const putUserSlice = createSlice({
  name: "putUserSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(putUserReducer.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(putUserReducer.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(putUserReducer.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload as AxiosError;
    });
  },
});

export default putUserSlice.reducer;
