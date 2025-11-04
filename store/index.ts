import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./slices/exampleSlice";
import languageReducer from "./slices/languageSlice";
import feedbackReducer from "./slices/feedbackSlice";

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    language: languageReducer,
    feedback: feedbackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
