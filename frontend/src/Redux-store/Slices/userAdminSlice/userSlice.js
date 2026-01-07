  // src/redux/slices/userSlice.js
  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
  import API from '../../../utils/Api';

  export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async (_, { rejectWithValue }) => {
      try {
        const response = await API.get('/api/admin/all-user');
        if (response.data.status) {
          return response.data.data;
        } else {
          return rejectWithValue('Failed to fetch users');
        }
      } catch (error) {
        return rejectWithValue('Error fetching users');
      }
    }
  );

  const userSlice = createSlice({
    name: 'users',
    initialState: {
      data: [],
      loading: false,
      error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllUsers.pending, (state) => {
          state.loading = true;
          state.error = '';
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

  export default userSlice.reducer;
