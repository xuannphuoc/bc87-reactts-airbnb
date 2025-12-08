import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../../services/apiServices";

// Types
export interface Room {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  maViTri: number;
  hinhAnh: string;
}

interface RoomState {
  rooms: Room[];
  isLoading: boolean;
  error: string | null;
  selectedRoom: Room | null;
}

// Async thunks
export const fetchRooms = createAsyncThunk(
  "room/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("phong-thue");
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.content || "Lỗi khi tải danh sách phòng"
      );
    }
  }
);

export const fetchRoomById = createAsyncThunk(
  "room/fetchRoomById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`phong-thue/${id}`);
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.content || "Lỗi khi tải thông tin phòng"
      );
    }
  }
);

export const createRoom = createAsyncThunk(
  "room/createRoom",
  async (roomData: Omit<Room, "id">, { rejectWithValue }) => {
    try {
      const response = await api.post("phong-thue", roomData);
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.content || "Lỗi khi tạo phòng"
      );
    }
  }
);

export const updateRoom = createAsyncThunk(
  "room/updateRoom",
  async (
    { id, roomData }: { id: number; roomData: Omit<Room, "id"> },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`phong-thue/${id}`, { id, ...roomData });
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.content || "Lỗi khi cập nhật phòng"
      );
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "room/deleteRoom",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`phong-thue/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.content || "Lỗi khi xóa phòng"
      );
    }
  }
);

export const uploadRoomImage = createAsyncThunk(
  "room/uploadRoomImage",
  async (
    { roomId, formData }: { roomId: number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        `phong-thue/upload-hinh-phong?maPhong=${roomId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.content || "Lỗi khi tải ảnh phòng"
      );
    }
  }
);

// Initial state
const initialState: RoomState = {
  rooms: [],
  isLoading: false,
  error: null,
  selectedRoom: null,
};

// Slice
const roomReducer = createSlice({
  name: "room",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedRoom: (state) => {
      state.selectedRoom = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch rooms
    builder.addCase(fetchRooms.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.rooms = action.payload;
    });
    builder.addCase(fetchRooms.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch room by id
    builder.addCase(fetchRoomById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchRoomById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedRoom = action.payload;
    });
    builder.addCase(fetchRoomById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Create room
    builder.addCase(createRoom.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.rooms.push(action.payload);
    });
    builder.addCase(createRoom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Update room
    builder.addCase(updateRoom.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateRoom.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.rooms.findIndex(
        (room) => room.id === action.payload.id
      );
      if (index !== -1) {
        state.rooms[index] = action.payload;
      }
    });
    builder.addCase(updateRoom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Delete room
    builder.addCase(deleteRoom.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteRoom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.rooms = state.rooms.filter((room) => room.id !== action.payload);
    });
    builder.addCase(deleteRoom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Upload room image
    builder.addCase(uploadRoomImage.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(uploadRoomImage.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(uploadRoomImage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, clearSelectedRoom } = roomReducer.actions;
export default roomReducer.reducer;
