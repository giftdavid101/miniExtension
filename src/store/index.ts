import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: loginSlice,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type TypedDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<TypedDispatch>();
