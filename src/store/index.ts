import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/AdminTemplate/AuthPage/slice";
import userReducer from "./../pages/AdminTemplate/DashboardPage/ManageUser/slice";
import roomReducer from "./../pages/AdminTemplate/DashboardPage/ManageRoom/silce"

export const store = configureStore({
  reducer: { authReducer, userReducer, roomReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
