import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api'; // adjust the path if needed

// Async thunk to fetch revenue report
export const fetchRevenueReport = createAsyncThunk(
  'revenue/fetchRevenueReport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/admin/revenue-report');
      if (response.data?.status) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to fetch revenue report');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error fetching revenue report'
      );
    }
  }
);

const revenueReportSlice = createSlice({
  name: 'revenueReport',
  initialState: {
    report: [],
    loading: false,
    error: '',
  },
  reducers: {
    resetRevenueReport: (state) => {
      state.report = [];
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenueReport.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchRevenueReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchRevenueReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRevenueReport } = revenueReportSlice.actions;
export default revenueReportSlice.reducer;
