import { configureStore, combineReducers } from "@reduxjs/toolkit";
import addressReducer from "./address/addressReducer";

const rootReducer = combineReducers({
  addressReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
