import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import axios from "axios";
import { type Account } from "./index.tsx";
import { putUserReducer } from "@/pages/User/getAPI/putUser.ts";
import type { UserData } from "../_Type/type.tsx";
export type StateInitial = {
  data: UserData | null;
  loading: boolean;
  error: string | null;
};

const initialState: StateInitial = {
  data: null,
  loading: false,
  error: null,
};

export const Login = createAsyncThunk<UserData, Account, 
{
  rejectValue: string
}>(
  "login",
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
      const err = error as AxiosError<any>
      const message =  err.response?.data?.content || err.response?.data?.message || "Tài khoản or mật khẩu không chính xác"
      return rejectWithValue(message)
    }
  }
);

const LoginReducer = createSlice({
  name: "LoginReducer",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null,
      state.error = null,
      localStorage.removeItem("userLogin")
      sessionStorage.removeItem("userLogin")
    },
    resetLogin: (state) => {
      state.loading = false,
      state.data= null,
      state.error = null

    }
  },
  extraReducers: (builder) => {
    builder.addCase(Login.pending, (state) => {
      state.loading = true;
      state.error = null;
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
    state.error = action.payload ?? "Đăng nhập thất bại";
});
  },
});

export const {logout} = LoginReducer.actions
export const {resetLogin} = LoginReducer.actions
export default LoginReducer.reducer;
