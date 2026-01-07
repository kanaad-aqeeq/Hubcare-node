import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api'; // adjust path as needed

// Thunk to fetch push notification report
export const fetchPushNotificationReport = createAsyncThunk(
  'pushNotificationReport/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/admin/push-notification-report');
      console.log('Push Notification Report Response:', response.data);

      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to fetch push notification report');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Error fetching push notification report');
    }
  }
);

// Slice
const pushNotificationReportSlice = createSlice({
  name: 'pushNotificationReport',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPushNotificationReport.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchPushNotificationReport.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPushNotificationReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pushNotificationReportSlice.reducer;
