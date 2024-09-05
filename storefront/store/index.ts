import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './slices/productListSlice';
import productDetailReducer from './slices/productDetailSlice';

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetail: productDetailReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
