import { createSlice, createAsyncThunk,type PayloadAction } from "@reduxjs/toolkit";
import api from "./../../../../services/apiServices";

// Types
export interface Location {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

export interface LocationFormData {
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

interface LocationState {
  locations: Location[];
  loading: boolean;
  error: string | null;
  selectedLocation: Location | null;
}

const initialState: LocationState = {
  locations: [],
  loading: false,
  error: null,
  selectedLocation: null,
};

// Async Thunks
export const fetchLocations = createAsyncThunk(
  "location/fetchLocations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/vi-tri");
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tải danh sách vị trí"
      );
    }
  }
);

export const createLocation = createAsyncThunk(
  "location/createLocation",
  async (data: LocationFormData, { rejectWithValue }) => {
    try {
      const response = await api.post("/vi-tri", data);
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tạo vị trí"
      );
    }
  }
);

export const updateLocation = createAsyncThunk(
  "location/updateLocation",
  async (
    { id, data }: { id: number; data: LocationFormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/vi-tri/${id}`, data);
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi cập nhật vị trí"
      );
    }
  }
);

export const deleteLocation = createAsyncThunk(
  "location/deleteLocation",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/vi-tri/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi xóa vị trí"
      );
    }
  }
);

export const uploadLocationImage = createAsyncThunk(
  "location/uploadImage",
  async ({ id, file }: { id: number; file: File }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("formFile", file);
      const response = await api.post(
        `/vi-tri/upload-hinh-vitri?maViTri=${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi upload hình ảnh"
      );
    }
  }
);


const locationReducer = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSelectedLocation: (state, action: PayloadAction<Location | null>) => {
      state.selectedLocation = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Locations
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Location
      .addCase(createLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.locations.push(action.payload);
      })
      .addCase(createLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Location
      .addCase(updateLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.locations.findIndex(
          (loc) => loc.id === action.payload.id
        );
        if (index !== -1) {
          state.locations[index] = action.payload;
        }
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Location
      .addCase(deleteLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = state.locations.filter(
          (loc) => loc.id !== action.payload
        );
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Upload Image
      .addCase(uploadLocationImage.fulfilled, (state, action) => {
        const index = state.locations.findIndex(
          (loc) => loc.id === action.payload.id
        );
        if (index !== -1) {
          state.locations[index] = action.payload;
        }
      });
  },
});

export const { setSelectedLocation, clearError } = locationReducer.actions;
export default locationReducer.reducer;
