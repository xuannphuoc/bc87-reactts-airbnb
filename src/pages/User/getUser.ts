import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import axios from "axios";

import { type UserData } from "../HomeTemplate/components/Navbar";

export interface UserState {
  data: UserData | null;
  loading: boolean;
  error: null | AxiosError;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

export const getUserReducer = createAsyncThunk<UserData, number>(
  "getUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/users/${id}`,
        method: "GET",
        headers: {
          tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI0MjAwMCwiZXhwIjoxNzc0MzcxNjAwfQ.-W4bvmZuRBJxryMtPHaMnmm11rdGxNTYol7fLRQid1g",
        },
      });
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getUserSlice = createSlice({
  name: "getUserSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserReducer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserReducer.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getUserReducer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AxiosError;
    });
  },
});

export default getUserSlice.reducer;
