// src/Redux-store/Slices/transactionReport/transactionReportSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api';

// Async thunk to fetch transaction report
export const fetchTransactionReport = createAsyncThunk(
  'transactionReport/fetchTransactionReport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/admin/transaction-report');
      if (response.data?.status) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data?.message || 'Failed to fetch transaction report');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error fetching transaction report'
      );
    }
  }
);

// Slice definition
const transactionReportSlice = createSlice({
  name: 'transactionReport',
  initialState: {
    report: [],
    loading: false,
    error: '',
  },
  reducers: {
    resetTransactionReportState: (state) => {
      state.report = [];
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionReport.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchTransactionReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchTransactionReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTransactionReportState } = transactionReportSlice.actions;
export default transactionReportSlice.reducer;
