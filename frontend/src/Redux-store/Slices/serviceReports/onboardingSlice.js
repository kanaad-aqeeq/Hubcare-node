import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api'; // Adjust path if needed

// Async thunk to fetch onboarding report
export const fetchOnboardingReport = createAsyncThunk(
  'onboardingReport/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/admin/onboarding-report');
      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to fetch onboarding report');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error fetching onboarding report'
      );
    }
  }
);

// Slice
const onboardingReportSlice = createSlice({
  name: 'onboardingReport',
  initialState: {
    onboardingData: [],
    loading: false,
    error: '',
  },
  reducers: {
    resetOnboardingReportState: (state) => {
      state.onboardingData = [];
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOnboardingReport.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchOnboardingReport.fulfilled, (state, action) => {
        state.loading = false;
        state.onboardingData = action.payload;
      })
      .addCase(fetchOnboardingReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOnboardingReportState } = onboardingReportSlice.actions;
export default onboardingReportSlice.reducer;
