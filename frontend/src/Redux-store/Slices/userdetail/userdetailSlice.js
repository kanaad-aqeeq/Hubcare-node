// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api';

export const fetchSingleUser = createAsyncThunk(
  'fetchSingleUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/api/admin/single-user/${userId}`);
      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to fetch user details');
      }
    } catch (error) {
      return rejectWithValue('Error fetching user details');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],            // list of users
    selectedUser: null,  // single user details
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // existing fetchAllUsers cases...

      // single user fetch cases
      .addCase(fetchSingleUser.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.selectedUser = null;
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedUser = null;
      });
  },
});

export default userSlice.reducer;
