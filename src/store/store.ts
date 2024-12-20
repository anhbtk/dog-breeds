import { configureStore } from "@reduxjs/toolkit";
import dogReducer from "../reducers/dogReducer";

const store = configureStore({
  reducer: dogReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
