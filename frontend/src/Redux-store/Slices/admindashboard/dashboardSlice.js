// // src/redux/slices/dashboardSlice.js

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import API from "../../../utils/Api"; // path sahi set karein

// // Initial State
// const initialState = {
//   overallHistory: {
//     isLoading: false,
//     data: null,
//     error: null,
//   },
// };

// // AsyncThunk for OverallHistory API
// export const fetchOverallHistory = createAsyncThunk(
//   "dashboard/fetchOverallHistory",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await API.get("/api/admin/dashboard");
//       if (response.data.status) {
//         return response.data.data;
//       } else {
//         return rejectWithValue("Failed to fetch dashboard data");
//       }
//     } catch (error) {
//       return rejectWithValue("Error fetching data");
//     }
//   }
// );

// // Slice
// const dashboardSlice = createSlice({
//   name: "dashboard",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchOverallHistory.pending, (state) => {
//         state.overallHistory.isLoading = true;
//         state.overallHistory.error = null;
//       })
//       .addCase(fetchOverallHistory.fulfilled, (state, action) => {
//         state.overallHistory.isLoading = false;
//         state.overallHistory.data = action.payload;
//       })
//       .addCase(fetchOverallHistory.rejected, (state, action) => {
//         state.overallHistory.isLoading = false;
//         state.overallHistory.error = action.payload;
//       });
//   },
// });

// export default dashboardSlice.reducer;





import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api';

export const fetchDashboard = createAsyncThunk(
  'dashboard/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/api/admin/dashboard');
      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to fetch dashboard data');
      }
    } catch (error) {
      return rejectWithValue('Error fetching data');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
