import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import api from "@/services/apiServices";
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
  error: string | null;
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
      const response = await api({
        url: "auth/signup",
        method: "POST",
        data: account,
      });
      return response.data.content;
    } catch (error) {
      const failure = error as AxiosError<{ message?: string }>;
      return rejectWithValue(failure.response?.data?.message ?? "Đăng ký thất bại.");
    }
  }
);

const SignUpReducer = createSlice({
  name: "SignUpReducer",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading =false,
      state.data = null,
      state.error =null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(SignUp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(SignUp.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(SignUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export const { resetAuthState } = SignUpReducer.actions;
export default SignUpReducer.reducer;
