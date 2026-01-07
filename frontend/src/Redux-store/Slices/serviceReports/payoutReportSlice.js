import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api'; // Adjust the path as per your project

// Async thunk to fetch payout report
export const fetchPayoutReport = createAsyncThunk(
  'payoutReport/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/admin/payout-report');
      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to fetch payout report');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error fetching payout report'
      );
    }
  }
);

// Slice
const payoutReportSlice = createSlice({
  name: 'payoutReport',
  initialState: {
    payoutData: [],
    loading: false,
    error: '',
  },
  reducers: {
    resetPayoutReportState: (state) => {
      state.payoutData = [];
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayoutReport.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchPayoutReport.fulfilled, (state, action) => {
        state.loading = false;
        state.payoutData = action.payload;
      })
      .addCase(fetchPayoutReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPayoutReportState } = payoutReportSlice.actions;
export default payoutReportSlice.reducer;
