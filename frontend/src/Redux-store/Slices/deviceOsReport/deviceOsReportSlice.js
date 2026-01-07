import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api'; // Adjust the path as needed

// Async thunk to fetch device OS report
export const fetchDeviceOsReport = createAsyncThunk(
  'deviceOsReport/fetchDeviceOsReport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/admin/device-os-report');
      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to fetch device OS report');
      }
    } catch (error) {
      return rejectWithValue('Error fetching device OS report');
    }
  }
);

// Slice
const deviceOsReportSlice = createSlice({
  name: 'deviceOsReport',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeviceOsReport.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchDeviceOsReport.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDeviceOsReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deviceOsReportSlice.reducer;
