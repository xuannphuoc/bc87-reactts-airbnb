// uploadAvatar.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/services/apiServices";

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
    const res = await api.post(
      "users/upload-avatar",
      formData
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
