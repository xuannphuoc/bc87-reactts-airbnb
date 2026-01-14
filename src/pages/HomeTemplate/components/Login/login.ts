import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import axios from "axios";
import { type Account } from "./index.tsx";
import { putUserReducer } from "@/pages/User/getAPI/putUser.ts";
import type { UserData } from "../_Type/type.tsx";
export type StateInitial = {
  data: null | UserData;
  loading: boolean;
  error: null | AxiosError;
};

const initialState: StateInitial = {
  data: null,
  loading: false,
  error: null,
};

export const Login = createAsyncThunk(
  "Login",
  async (account: Account, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: "https://airbnbnew.cybersoft.edu.vn/api/auth/signin",
        method: "POST",
        data: account,
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI0MjAwMCwiZXhwIjoxNzc0MzcxNjAwfQ.-W4bvmZuRBJxryMtPHaMnmm11rdGxNTYol7fLRQid1g",
        },
      });
      return response.data.content;
    } catch (error) {
      return console.log(rejectWithValue(error));
    }
  }
);

const LoginReducer = createSlice({
  name: "LoginReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(Login.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(putUserReducer.fulfilled, (state, action) => {
      if (state.data) {
        state.data = {
          ...state.data,
          ...action.payload,
        };
      }
    });

    builder.addCase(Login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AxiosError;
    });
  },
});

export default LoginReducer.reducer;
