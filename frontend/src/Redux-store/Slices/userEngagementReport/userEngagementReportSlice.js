import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api'; // Adjust the path as needed

// Thunk to fetch user engagement report
export const fetchUserEngagementReport = createAsyncThunk(
  'userEngagementReport/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/admin/user-engagement-report');
      console.log('User Engagement Report Response:', response.data);

      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to fetch user engagement report');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Error fetching user engagement report');
    }
  }
);

// Slice
const userEngagementReportSlice = createSlice({
  name: 'userEngagementReport',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserEngagementReport.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchUserEngagementReport.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserEngagementReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userEngagementReportSlice.reducer;
