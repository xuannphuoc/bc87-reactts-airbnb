import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export interface PutUserState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const initialState: PutUserState<PutUser> = {
  data: null,
  loading: false,

  error: null,
};

export const putUserReducer = createAsyncThunk<
  PutUser,
  PutUser,
  { rejectValue: string }
>("putUserReducer", async (formUser, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `https://airbnbnew.cybersoft.edu.vn/api/users/${formUser.id}`,
      formUser,
      {
        headers: {
          tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjI3LzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDU2OTYwMDAwMCIsIm5iZiI6MTc0NzI0MjAwMCwiZXhwIjoxNzc0NzE3MjAwfQ.YJSCMUqM4JgIqsDiGq9fxRp3AOrIdxBO4t7xxj6K8dY",
        },
      }
    );
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Cập nhật thất bại");
  }
});

const putUserSlice = createSlice({
  name: "putUserSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(putUserReducer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(putUserReducer.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(putUserReducer.rejected, (state, action) => {
      state.loading = false;

      state.error = action.payload ?? "Có lỗi xảy ra";
    });
  },
});

export default putUserSlice.reducer;
