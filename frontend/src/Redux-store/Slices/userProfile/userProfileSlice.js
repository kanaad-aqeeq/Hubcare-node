import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api';

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/get-user-profile');
      console.log('User Profile API Response:', response.data);

      if (response.data.status) {
        return response.data.user;
      } else {
        return rejectWithValue('Failed to fetch user profile');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error fetching user profile'
      );
    }
  }
);

// Create slice
const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    user: null,
    loading: false,
    error: '',
  },
  reducers: {
    resetUserProfile: (state) => {
      state.user = null;
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        console.error('User Profile Fetch Error:', action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
