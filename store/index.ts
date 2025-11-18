import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./slices/exampleSlice";
import languageReducer from "./slices/languageSlice";
import feedbackReducer from "./slices/feedbackSlice";
import masterDataReducer from "./slices/masterDataSlice";

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    language: languageReducer,
    feedback: feedbackReducer,
    masterData: masterDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
