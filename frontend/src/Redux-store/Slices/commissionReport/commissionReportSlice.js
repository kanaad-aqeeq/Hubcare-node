// src/Redux-store/Slices/commissionReport/commissionReportSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api';

// Async thunk to fetch commission report
export const fetchCommissionReport = createAsyncThunk(
  'commissionReport/fetchCommissionReport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/admin/commission-report');
      if (response.data?.status) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data?.message || 'Failed to fetch commission report');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error fetching commission report'
      );
    }
  }
);

// Slice definition
const commissionReportSlice = createSlice({
  name: 'commissionReport',
  initialState: {
    report: [],
    loading: false,
    error: '',
  },
  reducers: {
    resetCommissionReportState: (state) => {
      state.report = [];
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommissionReport.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchCommissionReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchCommissionReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCommissionReportState } = commissionReportSlice.actions;
export default commissionReportSlice.reducer;
