import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/apiServices";
import type { User } from "./index";
import { AxiosError } from "axios";

type AuthState = {
  loading: boolean;
  data: typeof adminInfo;
  error: AxiosError<{ content: string }> | null;
};

const adminInfoString = localStorage.getItem("ADMIN_INFO");
const adminInfo = adminInfoString ? JSON.parse(adminInfoString) : null;

const initialState: AuthState = {
  loading: false,
  data: adminInfo,
  error: null,
};

export const authenLogin = createAsyncThunk(
  "authLogin",
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await api.post(`auth/signin`, user);
      const authInfo = response.data.content.user;
      // Check permission user
      if (authInfo.role === "USER" || authInfo.role === "user") {
        return rejectWithValue({
          response: {
            data: { content: "You don't have permission to access !" },
          },
        });
      }

      // local storage
      localStorage.setItem("ADMIN_INFO", JSON.stringify(authInfo));

      return authInfo;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authenLogin.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(authenLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(authenLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AxiosError<{ content: string }>;
    });
  },
});

export default authReducer.reducer;
