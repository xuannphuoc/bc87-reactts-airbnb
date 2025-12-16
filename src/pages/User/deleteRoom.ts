import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const deleteReducer = createAsyncThunk(
  "deleteReducer",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/dat-phong/${id}`,
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

const deleteSlice = createSlice({
  name: "getUserSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteReducer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteReducer.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(deleteReducer.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default deleteSlice.reducer;
