import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api';

// Thunk to fetch vendor dashboard by provider ID
export const fetchVendorDashboard = createAsyncThunk(
  'vendorDashboard/fetchVendorDashboard',
  async (providerId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/api/admin/vendor-dashboard/${providerId}`);
      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to fetch vendor dashboard data');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching vendor dashboard data');
    }
  }
);

// Slice definition
const vendorDashboardSlice = createSlice({
  name: 'vendorDashboard',
  initialState: {
    data: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorDashboard.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchVendorDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchVendorDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vendorDashboardSlice.reducer;
