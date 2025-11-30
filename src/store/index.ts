import { configureStore } from "@reduxjs/toolkit";
import LocationSlice from "./../pages/HomeTemplate/components/Navbar/slice";
import getDataPageSlice from "./../pages/HomeTemplate/HomePage/discover";
import SignUpReducer from "../pages/HomeTemplate/components/Signup/slice";
import LoginReducer from "../pages/HomeTemplate/components/Signin/slice";
import RoomSlice from "./../pages/HomeTemplate/components/Navbar/getRoom";
import getDataRoomSlice from "./../pages/HomeTemplate/DetailRoomPage/getDetailRoom";
import commentSlice from "./../pages/HomeTemplate/DetailRoomPage/getComment";
import postCommentReducer from "./../pages/HomeTemplate/RoomDetail/postComment";
export const store = configureStore({
  reducer: {
    LocationSlice,
    getDataPageSlice,
    SignUpReducer,
    LoginReducer,
    RoomSlice,
    getDataRoomSlice,
    commentSlice,
    postCommentReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
