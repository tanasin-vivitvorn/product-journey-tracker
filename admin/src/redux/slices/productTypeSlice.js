import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../interceptors/axiosConfig';

// Async thunk for fetching product types
export const fetchProductTypes = createAsyncThunk(
  'productTypes/fetchProductTypes',
  async () => {
    const response = await axiosInstance.get('/api/product-types/search?searchQuery=&page=1&pageSize=5');
    return response.data;
  }
);

// Async thunk for creating a new product type
export const createProductType = createAsyncThunk(
  'productTypes/createProductType',
  async (newProductType) => {
    console.log(newProductType);
    const response = await axiosInstance.post('/api/product-types', { ProductTypeName: newProductType , CreateBy: 1});
    return response.data;
  }
);

const productTypeSlice = createSlice({
  name: 'productTypes',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
      })
      .addCase(fetchProductTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProductType.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default productTypeSlice.reducer;
