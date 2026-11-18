import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import api from "@/services/apiServices";

import { type UserData } from "../../HomeTemplate/components/_Type/type.tsx";

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

export const getUser = createAsyncThunk<UserData, number>(
  "user/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api({
        url: `users/${id}`,
        method: "GET",
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
  reducers: {
    clearUser: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as AxiosError;
    });
  },
});

export const { clearUser } = getUserSlice.actions;
export default getUserSlice.reducer;
