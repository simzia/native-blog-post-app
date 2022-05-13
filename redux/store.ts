import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { blogReducer } from "./slices/blogSlices";
import { albumReducer } from "./slices/albumSlices";
// import { albumReducer } from "./slices/albumSlices";
export const store = configureStore({
  reducer: {
    blogReducer,
    albumReducer
  }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>