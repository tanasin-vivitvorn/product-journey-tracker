import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state using that type
interface ProductDetailState {
  product: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductDetailState = {
  product: null,
  status: 'idle',
  error: null,
};

// Thunk to fetch a product detail by ID from an API
const fetchProductDetail = createAsyncThunk(
  'productDetail/fetchProductDetail',
  async (productId: string) => {
    const response = await axios.get(`/api/products/${productId}`);
    return response.data;
  }
);

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product details';
      });
  },
});

// Export the async thunk
export { fetchProductDetail };

// Export the reducer to be used in the store
export default productDetailSlice.reducer;
