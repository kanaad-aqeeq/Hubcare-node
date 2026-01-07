import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api'; // Adjust the path as per your project structure

// // Async thunk to fetch performance report
// export const fetchPerformanceReport = createAsyncThunk(
//   'performanceReport/fetchPerformanceReport',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await API.get('api/admin/performance-report');
//       console.log("thunk response..................", response.data)
//       if (response.data.status) {
//         return response.data.data;
//       } else {
//         return rejectWithValue('Failed to fetch performance report');
//       }
//     } catch (error) {
//       return rejectWithValue('Error fetching performance report');
//     }
//   }
// );


export const fetchPerformanceReport = createAsyncThunk(
  'performanceReport/fetchPerformanceReport',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/admin/performance-report');
      console.log("thunk response..................", response.data);
      
      if (response.data.status) {
        return response.data.report; // ✅ Fix: access "report" directly
      } else {
        return rejectWithValue('Failed to fetch performance report');
      }
    } catch (error) {
      return rejectWithValue('Error fetching performance report');
    }
  }
);







// Slice
const performanceReportSlice = createSlice({
  name: 'performanceReport',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerformanceReport.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchPerformanceReport.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPerformanceReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default performanceReportSlice.reducer;
