import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api'; // Adjust the import path based on your project

// Async thunk to delete (via PUT) a category
export const deleteCategory = createAsyncThunk(
  'deleteCategory/delete',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await API.put(`api/category/delete/${categoryId}`);
      if (response.data.status) {
        return categoryId; // Optionally return to update local state
      } else {
        return rejectWithValue('Failed to delete category');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error deleting category'
      );
    }
  }
);

// Slice
const deleteCategorySlice = createSlice({
  name: 'deleteCategory',
  initialState: {
    loading: false,
    success: false,
    error: '',
  },
  reducers: {
    resetDeleteCategoryState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = '';
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetDeleteCategoryState } = deleteCategorySlice.actions;
export default deleteCategorySlice.reducer;
