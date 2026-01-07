// features/category/categoryDeleteSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api';

// Async thunk to delete a category
export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await API.put(`api/category/delete/${categoryId}`);
      
      if (response.data?.status) {
        return { categoryId, message: response.data?.message };
      } else {
        return rejectWithValue(response.data?.message || 'Failed to delete category');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error deleting category'
      );
    }
  }
);

const categoryDeleteSlice = createSlice({
  name: 'categoryDelete',
  initialState: {
    loading: false,
    success: false,
    error: '',
    deletedCategoryId: null,
  },
  reducers: {
    resetCategoryDeleteState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = '';
      state.deletedCategoryId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = '';
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.deletedCategoryId = action.payload.categoryId;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetCategoryDeleteState } = categoryDeleteSlice.actions;
export default categoryDeleteSlice.reducer;
