import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { productsSlice } from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    products: productsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
