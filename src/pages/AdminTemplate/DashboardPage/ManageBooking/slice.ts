import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../../services/apiServices";

// Types
export interface Booking {
  id: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number;
}

interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  selectedBooking: Booking | null;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
  selectedBooking: null,
};

// Async thunks
export const fetchBookings = createAsyncThunk(
  "booking/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dat-phong");
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tải danh sách đặt phòng"
      );
    }
  }
);

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData: Omit<Booking, "id">, { rejectWithValue }) => {
    try {
      const response = await api.post("/dat-phong", bookingData);
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi tạo đặt phòng"
      );
    }
  }
);

export const updateBooking = createAsyncThunk(
  "booking/updateBooking",
  async (
    { id, bookingData }: { id: number; bookingData: Booking },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/dat-phong/${id}`, bookingData);
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi cập nhật đặt phòng"
      );
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "booking/deleteBooking",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/dat-phong/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lỗi khi xóa đặt phòng"
      );
    }
  }
);

// Slice
const bookingReducer = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSelectedBooking: (state, action) => {
      state.selectedBooking = action.payload;
    },
    clearSelectedBooking: (state) => {
      state.selectedBooking = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch bookings
    builder.addCase(fetchBookings.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBookings.fulfilled, (state, action) => {
      state.loading = false;
      state.bookings = action.payload;
    });
    builder.addCase(fetchBookings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create booking
    builder.addCase(createBooking.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.bookings.push(action.payload);
    });
    builder.addCase(createBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update booking
    builder.addCase(updateBooking.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateBooking.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.bookings.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    });
    builder.addCase(updateBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete booking
    builder.addCase(deleteBooking.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.bookings = state.bookings.filter((b) => b.id !== action.payload);
    });
    builder.addCase(deleteBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setSelectedBooking, clearSelectedBooking, clearError } =
  bookingReducer.actions;
export default bookingReducer.reducer;
