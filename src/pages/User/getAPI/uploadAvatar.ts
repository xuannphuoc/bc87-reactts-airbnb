// uploadAvatar.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type UploadAvatarState = {
  data: any;
  loading: boolean;
  error: string | null;
};

const initialState: UploadAvatarState = {
  data: null,
  loading: false,
  error: null,
};

export const putAvatar = createAsyncThunk<
  any,
  FormData,
  { rejectValue: string }
>("user/uploadAvatar", async (formData, { rejectWithValue }) => {
  try {
    const userLogin =
      JSON.parse(localStorage.getItem("userLogin") || "null") ||
      JSON.parse(sessionStorage.getItem("userLogin") || "null");

    const token = userLogin?.token;

    const res = await axios.post(
      "https://airbnbnew.cybersoft.edu.vn/api/users/upload-avatar",
      formData,
      {
        headers: {
          token,
          tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjI3LzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDU2OTYwMDAwMCIsIm5iZiI6MTc0NzI0MjAwMCwiZXhwIjoxNzc0NzE3MjAwfQ.YJSCMUqM4JgIqsDiGq9fxRp3AOrIdxBO4t7xxj6K8dY",
        },
      }
    );

    return res.data.content;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.content || "Upload avatar failed"
    );
  }
});

const putAvatarSlice = createSlice({
  name: "putAvatarSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(putAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(putAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(putAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      });
  },
});

export default putAvatarSlice.reducer;
