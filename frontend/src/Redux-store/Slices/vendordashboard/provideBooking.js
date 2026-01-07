import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api'; // Consistent usage

export const fetchProviderBookings = createAsyncThunk(
  'providerBooking/fetchProviderBookings',
  async (providerId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/api/admin/provider-bookings/${providerId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch provider bookings');
    }
  }
);

const providerBookingSlice = createSlice({
  name: 'providerBooking',
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviderBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviderBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchProviderBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default providerBookingSlice.reducer;
