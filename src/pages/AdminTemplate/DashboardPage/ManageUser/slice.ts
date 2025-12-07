import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "./../../../../services/apiServices";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  avatar?: string;
  gender: boolean;
  role: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  name: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
  avatar?: string;
}

export interface UpdateUserPayload {
  id: number;
  email?: string;
  name?: string;
  phone?: string;
  birthday?: string;
  gender?: boolean;
  role?: string;
  avatar?: string;
}

interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
  };
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  success: false,
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
  },
};


export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to load user list"
      );
    }
  }
);


export const getUsersPagination = createAsyncThunk(
  "user/getUsersPagination",
  async (
    { pageIndex, pageSize }: { pageIndex: number; pageSize: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(
        `/users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to load user list"
      );
    }
  }
);


export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to load user list"
      );
    }
  }
);


export const searchUserByName = createAsyncThunk(
  "user/searchUserByName",
  async (userName: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/search/${userName}`);
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "User not found"
      );
    }
  }
);


export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData: CreateUserPayload, { rejectWithValue }) => {
    try {
      const response = await api.post("/users", userData);
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to create new user"
      );
    }
  }
);


export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData: UpdateUserPayload, { rejectWithValue }) => {
    try {
      const { id, ...data } = userData;
      const response = await api.put(`/users/${id}`, data);
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to update user"
      );
    }
  }
);


export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId: number, { rejectWithValue }) => {
    try {
      await api.delete(`/users?id=${userId}`);
      return userId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to delete user"
      );
    }
  }
);


export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to upload avatar"
      );
    }
  }
);


const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    resetUserState: () => initialState,
  },
  extraReducers: (builder) => {
    // Get All Users
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Users Pagination
    builder
      .addCase(getUsersPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersPagination.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.pagination = {
          currentPage: action.payload.pageIndex,
          pageSize: action.payload.pageSize,
          totalCount: action.payload.totalRow,
        };
      })
      .addCase(getUsersPagination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get User By ID
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Search User By Name
    builder
      .addCase(searchUserByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUserByName.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(searchUserByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create User
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });

    // Update User
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });

    // Delete User
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Upload Avatar
    builder
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (state.currentUser) {
          state.currentUser.avatar = action.payload.avatar;
        }
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSuccess, setCurrentUser, resetUserState } =
  userReducer.actions;

export default userReducer.reducer;
