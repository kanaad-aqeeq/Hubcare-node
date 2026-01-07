import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api'; // Adjust path as needed

// Async thunk to fetch provider performance report
export const fetchProviderPerformanceReport = createAsyncThunk(
  'providerPerformance/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/admin/provider-performance-report');
        console.log('provider performance Report Response:', response.data);
      if (response.data.status) {
        return response.data.status;
      } else {
        return rejectWithValue('Failed to fetch provider performance report');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error fetching provider performance report'
      );
    }
  }
);

// Slice
const providerPerformanceSlice = createSlice({
  name: 'providerPerformance',
  initialState: {
    reportData: [],
    loading: false,
    error: '',
  },
  reducers: {
    resetProviderPerformanceState: (state) => {
      state.reportData = [];
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviderPerformanceReport.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchProviderPerformanceReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reportData = action.payload;
      })
      .addCase(fetchProviderPerformanceReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProviderPerformanceState } = providerPerformanceSlice.actions;
export default providerPerformanceSlice.reducer;
