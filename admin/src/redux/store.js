import { configureStore } from '@reduxjs/toolkit';
import productTypeReducer from './slices/productTypeSlice';
import productReducer from './slices/productSlice';
import supplierReducer from './slices/supplierSlice';

const store = configureStore({
  reducer: {
    productTypes: productTypeReducer,
    products: productReducer,
    suppliers: supplierReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false, // Optional: if you have non-serializable values in your store
    }),
});

export default store;