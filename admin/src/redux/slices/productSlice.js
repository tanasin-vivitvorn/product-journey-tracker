import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../interceptors/axiosConfig';
import supplier from '@/pages/supplier/supplier';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axiosInstance.get('/api/products');
  return response.data;
});
export const createProduct = createAsyncThunk('products/createProduct', async (product) => {
  const response = await axiosInstance.post('/api/products/create', product);
  return response.data;
});
export const editProduct = createAsyncThunk('products/editProduct', async (product) => {
  const response = await axiosInstance.put('/api/products', product);
  return response.data;
});
export const createJourney = createAsyncThunk('products/createJourney', async (journey) => {
  console.log('journey:',journey);
  const response = await axiosInstance.post('/api/product-journey-attributes', journey);
  return response.data;
});
export const fetchProductTypes = createAsyncThunk('product/fetchProductTypes', async () => {
  const response = await axiosInstance.get('/api/product-types');
  return response.data;
});
export const fetchProductAttributeTemplate = createAsyncThunk(
  'product/fetchProductAttributeTemplate',
  async (productTypeId) => {
    const response = await axiosInstance.get(`/api/product-types/${productTypeId}`);
    return response.data;
  }
);
export const fetchProductData = createAsyncThunk(
  'product/fetchProductData',
  async (productId) => {
    const response = await axiosInstance.get(`/api/products/${productId}`);
    return response.data;
  }
);
export const fetchJourneys = createAsyncThunk('product/fetchJourneys', async (productTypeId) => {
  const response = await axiosInstance.get(`/api/journeys/${productTypeId}`);
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    product: null,
    productTypes: [],
    formData: [],
    answerData: [],
    journeyData: [],
    supplier: null,
    journeys: [],
    selectedProductID: null, 
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelectedProductID(state, action) {
      state.selectedProductID = action.payload;
    },
    clearSelectedProductID(state) {
      state.selectedProductID = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling product fetching
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'success';
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.status = 'success';
        state.items.push(action.payload);
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createJourney.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createJourney.fulfilled, (state, action) => {
        state.status = 'success';
        state.journeyData.map(obj => action.payload.templates.find(o => o.id === obj.id) || obj);
      })
      .addCase(createJourney.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductTypes.fulfilled, (state, action) => {
        state.productTypes = action.payload;
      })
      .addCase(fetchProductTypes.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.product = action.payload.product;
        state.formData = action.payload.predefinedElements;
        state.answerData = action.payload.predefinedElementsAnswer;
        state.journeyData = action.payload.predefinedJourneyElements;
        state.supplier = action.payload.supplier;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        console.log(action);
        state.error = action.error.message;
      })
      .addCase(fetchProductAttributeTemplate.fulfilled, (state, action) => {
        console.log(action.payload);
        state.formData = JSON.parse(action.payload[0].ProductTemplates[0].FieldTemplate);
        state.journeyData = action.payload[0].ProductJourneys;
        // state.formData = action.payload.predefinedElements;
        // state.answerData = action.payload.predefinedElementsAnswer;
      })
      .addCase(fetchProductAttributeTemplate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchJourneys.fulfilled, (state, action) => {
        state.journeyData = action.payload;
      })
      .addCase(fetchJourneys.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setSelectedProductID, clearSelectedProductID } = productSlice.actions;

export default productSlice.reducer;
