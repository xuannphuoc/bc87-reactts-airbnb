import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import api from "@/services/apiServices";
import { type Account } from "./index.tsx";
import type { DemoSession } from "@/services/demoSession";
export type StateInitial = {
  data: DemoSession | null;
  loading: boolean;
  error: string | null;
};

const initialState: StateInitial = {
  data: null,
  loading: false,
  error: null,
};

export const Login = createAsyncThunk<DemoSession, Account,
{
  rejectValue: string
}>(
  "login",
  async (account: Account, { rejectWithValue }) => {
    try {
      const response = await api({
        url: "auth/signin",
        method: "POST",
        data: account,
      });
      return response.data.content;
    } catch (error) {
      const err = error as AxiosError<{ content?: string; message?: string }>
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
    builder.addCase(Login.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload ?? "Đăng nhập thất bại";
});
  },
});

export const {logout} = LoginReducer.actions
export const {resetLogin} = LoginReducer.actions
export default LoginReducer.reducer;
