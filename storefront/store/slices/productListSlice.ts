import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state using that type
interface ProductListState {
  products: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductListState = {
  products: [],
  status: 'idle',
  error: null,
};

// Thunk to fetch products from an API
const fetchProducts = createAsyncThunk(
  'productList/fetchProducts',
  async () => {
    const response = await axios.get('/api/products');
    return response.data;
  }
);

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched products to the array
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

// Export the async thunk
export { fetchProducts };

// Export the reducer to be used in the store
export default productListSlice.reducer;
