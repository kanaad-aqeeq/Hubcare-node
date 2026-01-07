import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api'; // Adjust this path if needed

// Thunk to fetch promo campaign report
export const fetchPromoCampaignReport = createAsyncThunk(
  'promoCampaignReport/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/admin/promo-campaign-report');
      console.log('Promo Campaign Report Response:', response.data);

      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to fetch campaign report');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Error fetching campaign report');
    }
  }
);

// Slice
const promoCampaignReportSlice = createSlice({
  name: 'promoCampaignReport',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromoCampaignReport.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchPromoCampaignReport.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPromoCampaignReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default promoCampaignReportSlice.reducer;
