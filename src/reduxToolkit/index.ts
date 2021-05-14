import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toolkitSlice from "./toolkitSlice";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  toolkit: toolkitSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
