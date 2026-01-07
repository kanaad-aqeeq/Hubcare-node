import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api';

// Async thunk to fetch user booking details
export const fetchUserBookingDetails = createAsyncThunk(
  'userBooking/fetchUserBookingDetails',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`api/admin/user-overall-booking-history/${userId}`);
      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to fetch booking details');
      }
    } catch (error) {
      return rejectWithValue('Error fetching booking details');
    }
  }
);

// Slice for user booking details
const userBookingSlice = createSlice({
  name: 'userBooking',
  initialState: {
    bookingDetails: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBookingDetails.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.bookingDetails = null;
      })
      .addCase(fetchUserBookingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingDetails = action.payload;
      })
      .addCase(fetchUserBookingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.bookingDetails = null;
      });
  },
});

export default userBookingSlice.reducer;
