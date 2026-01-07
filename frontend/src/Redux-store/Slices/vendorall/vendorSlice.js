// src/redux/slices/vendorSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api';

// Async thunk to fetch all vendors
export const fetchAllVendors = createAsyncThunk(
  'vendors/fetchAllVendors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/admin/all-vendor');
      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to fetch vendors');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const vendorSlice = createSlice({
  name: 'vendors',
  initialState: {
    vendorList: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVendors.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchAllVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorList = action.payload;
      })
      .addCase(fetchAllVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vendorSlice.reducer;
