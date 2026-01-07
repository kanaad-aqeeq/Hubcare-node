// features/category/categoryCreateSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api';

// // Async thunk to create a category
// export const createCategory = createAsyncThunk(
//   'category/createCategory',
//   async (categoryData, { rejectWithValue }) => {
//     try {
//       const response = await API.post('api/category/create', categoryData);
//       if (response.data?.status) {
//         return response.data.data;
//       } else {
//         return rejectWithValue(response.data?.message || 'Failed to create category');
//       }
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Error creating category'
//       );
//     }
//   }
// );


export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await API.post('api/category/create', categoryData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data?.status) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data?.message || 'Failed to create category');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error creating category'
      );
    }
  }
);


// Slice for creating category
const categoryCreateSlice = createSlice({
  name: 'categoryCreate',
  initialState: {
    category: null,
    loading: false,
    error: '',
    success: false,
  },
  reducers: {
    resetCategoryCreateState: (state) => {
      state.category = null;
      state.loading = false;
      state.error = '';
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.success = false;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
        state.success = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetCategoryCreateState } = categoryCreateSlice.actions;
export default categoryCreateSlice.reducer;
