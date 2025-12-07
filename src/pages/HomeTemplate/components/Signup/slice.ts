import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import axios from "axios";
export type Account = {
  // id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
};

export type StateInitial = {
  data: null | Account;
  loading: boolean;
  error: null | AxiosError;
};

const initialState: StateInitial = {
  data: null,
  loading: false,
  error: null,
};

export const SignUp = createAsyncThunk(
  "SignUp",
  async (account: Account, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: "https://airbnbnew.cybersoft.edu.vn/api/auth/signup",
        method: "POST",
        data: account,
        headers: {
          tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI0MjAwMCwiZXhwIjoxNzc0MzcxNjAwfQ.-W4bvmZuRBJxryMtPHaMnmm11rdGxNTYol7fLRQid1g",
        },
      });
      return response.data.content;
    } catch (error) {
      return console.log(rejectWithValue(error));
    }
  }
);

const SignUpReducer = createSlice({
  name: "SignUpReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SignUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(SignUp.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(SignUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AxiosError;
    });
  },
});

export default SignUpReducer.reducer;
