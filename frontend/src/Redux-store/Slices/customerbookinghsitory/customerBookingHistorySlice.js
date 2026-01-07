import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api';

// Async thunk to fetch all booking history
export const fetchBookingHistory = createAsyncThunk(
  'bookingHistory/fetchBookingHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/admin/booking-history');
      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to fetch booking history');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error fetching booking history'
      );
    }
  }
);

// Slice for booking history
const bookingHistorySlice = createSlice({
  name: 'bookingHistory',
  initialState: {
    data: null,
    loading: false,
    error: '',
  },
  reducers: {
    clearBookingHistory(state) {
      state.data = null;
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingHistory.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchBookingHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBookingHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBookingHistory } = bookingHistorySlice.actions;

export default bookingHistorySlice.reducer;
