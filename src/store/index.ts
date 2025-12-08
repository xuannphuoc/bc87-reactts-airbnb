import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/AdminTemplate/AuthPage/slice";
import userTbReducer from "../pages/AdminTemplate/_components/Topbar/slice"
import userReducer from "./../pages/AdminTemplate/DashboardPage/ManageUser/slice";
import roomReducer from "./../pages/AdminTemplate/DashboardPage/ManageRoom/silce";
import locationReducer from "./../pages/AdminTemplate/DashboardPage/ManageLocation/slice";
import bookingReducer from "./../pages/AdminTemplate/DashboardPage/ManageBooking/slice";
import LocationSlice from "./../pages/HomeTemplate/components/Navbar/slice";
import getDataPageSlice from "./../pages/HomeTemplate/HomePage/components/Discover/discoverSlice";
import SignUpReducer from "../pages/HomeTemplate/components/Signup/slice";
import LoginReducer from "../pages/HomeTemplate/components/Signin/slice";
import RoomSlice from "./../pages/HomeTemplate/components/Navbar/getRoom";
import getDataRoomSlice from "./../pages/HomeTemplate/ListLocal/getDetailRoom";
import commentSlice from "./../pages/HomeTemplate/ListLocal/getComment";
import postCommentReducer from "./../pages/HomeTemplate/RoomDetail/postComment";
import getLocalIdSlice from "./../pages/HomeTemplate/ListLocal/getLocalId";
import bookRoomSlice from "./../pages/HomeTemplate/RoomDetail/bookRoom";
import getRoomByUserSlice from "./../pages/User/getRoomByUser";
import putUserSlice from "./../pages/User/getRoomByUser";
import getUserSlice from "./../pages/User/getRoomByUser";
import userRoomsSlice from "./../pages/User/roomBooked";
export const store = configureStore({
  reducer: {
    authReducer,
    userTbReducer,
    userReducer,
    roomReducer,
    locationReducer,
    bookingReducer,
    LocationSlice,
    getDataPageSlice,
    SignUpReducer,
    LoginReducer,
    RoomSlice,
    getDataRoomSlice,
    commentSlice,
    postCommentReducer,
    getLocalIdSlice,
    bookRoomSlice,
    getRoomByUserSlice,
    putUserSlice,
    getUserSlice,
    userRoomsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
