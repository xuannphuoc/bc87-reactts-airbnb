import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "@/services/apiServices";

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
    const response = await api.put(
      `users/${formUser.id}`,
      formUser
    );
    return response.data.content;
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
