import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../interceptors/axiosConfig';

export const fetchSuppliers = createAsyncThunk('suppliers/fetchSuppliers', async () => {
  const response = await axiosInstance.get('/api/suppliers');
  return response.data;
});

export const fetchSuppliersByID = createAsyncThunk('suppliers/fetchSuppliersByID', async (SupplierID) => {
  const response = await axiosInstance.get(`/api/suppliers/${SupplierID}`);
  return response.data;
});

export const createSupplier = createAsyncThunk('suppliers/createSupplier', async (payload) => {
  const response = await axiosInstance.post('/api/suppliers', payload );
  return response.data;
});

export const editSupplier = createAsyncThunk('suppliers/editSupplier', async (payload) => {
  console.log('editSupplier:', payload);
  const response = await axiosInstance.put(`/api/suppliers`, payload );
  return response.data;
});

const supplierSlice = createSlice({
  name: 'suppliers',
  initialState: {
    suppliers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suppliers = action.payload;
        console.log(state.suppliers);
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSuppliersByID.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSuppliersByID.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suppliers = action.payload;
      })
      .addCase(fetchSuppliersByID.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createSupplier.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.suppliers.push(action.payload);
      })
      .addCase(createSupplier.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default supplierSlice.reducer;
