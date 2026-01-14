import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/pages/AdminTemplate/AuthPage/slice";
import userTbReducer from "@/pages/AdminTemplate/_components/Topbar/slice";
import userReducer from "@/pages/AdminTemplate/DashboardPage/ManageUser/slice";
import roomReducer from "@/pages/AdminTemplate/DashboardPage/ManageRoom/silce";
import locationReducer from "@/pages/AdminTemplate/DashboardPage/ManageLocation/slice";
import bookingReducer from "@/pages/AdminTemplate/DashboardPage/ManageBooking/slice";
import LocationSlice from "@/pages/HomeTemplate/components/getAPI/navbar";
import getDataPageSlice from "@/pages/HomeTemplate/HomePage/Discover/discoverSlice";
import SignUpReducer from "@/pages/HomeTemplate/components/Register/register";
import LoginReducer from "@/pages/HomeTemplate/components/Login/login";
import listDataRoomSlice from "@/pages/HomeTemplate/components/getAPI/getListRoom";
import detailRoomSlice from "@/pages/HomeTemplate/ListLocal/getAPI/getDetailRoom.ts";
import commentSlice from "@/pages/HomeTemplate/ListLocal/getAPI/getComment.ts";
import postCommentReducer from "@/pages/HomeTemplate/RoomDetail/getAPI/postComment.ts";
import getLocalIdSlice from "@/pages/HomeTemplate/ListLocal/getAPI/getLocalId.ts";
import bookRoomSlice from "@/pages/HomeTemplate/RoomDetail/getAPI/bookRoom.ts";
import putUserSlice from "@/pages/User/getAPI/putUser.ts";
import getUserSlice from "@/pages/User/getAPI/getUser.ts";
import userRoomsSlice from "@/pages/User/getAPI/roomBooked";
import roomByUserSlice from "@/pages/User/getAPI/getRoomByUser";
import putAvatarSlice from "@/pages/User/getAPI/uploadAvatar";
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
    listDataRoomSlice,
    detailRoomSlice,
    commentSlice,
    postCommentReducer,
    getLocalIdSlice,
    bookRoomSlice,
    roomByUserSlice,
    putUserSlice,
    getUserSlice,
    userRoomsSlice,
    putAvatarSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
