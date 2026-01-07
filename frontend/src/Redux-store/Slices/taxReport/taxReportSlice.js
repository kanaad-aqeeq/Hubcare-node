// src/Redux-store/Slices/taxReport/taxReportSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api';

// Async thunk to fetch tax report
export const fetchTaxReport = createAsyncThunk(
  'taxReport/fetchTaxReport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/admin/tax-report');
      if (response.data?.status) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data?.message || 'Failed to fetch tax report');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error fetching tax report'
      );
    }
  }
);

// Slice definition
const taxReportSlice = createSlice({
  name: 'taxReport',
  initialState: {
    report: [],
    loading: false,
    error: '',
  },
  reducers: {
    resetTaxReportState: (state) => {
      state.report = [];
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaxReport.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchTaxReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchTaxReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTaxReportState } = taxReportSlice.actions;
export default taxReportSlice.reducer;
