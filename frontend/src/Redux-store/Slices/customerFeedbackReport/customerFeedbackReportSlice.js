import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api'; // adjust path as needed

// Async thunk to fetch customer feedback report
export const fetchCustomerFeedbackReport = createAsyncThunk(
  'customerFeedback/fetchCustomerFeedbackReport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/admin/customer-feedback-report');
      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to fetch feedback report');
      }
    } catch (error) {
      return rejectWithValue('Error fetching feedback report');
    }
  }
);

// Slice
const customerFeedbackSlice = createSlice({
  name: 'customerFeedback',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerFeedbackReport.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchCustomerFeedbackReport.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCustomerFeedbackReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default customerFeedbackSlice.reducer;
