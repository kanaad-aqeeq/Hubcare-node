// Redux-store/Slices/serviceReports/subCategoryDeleteSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../utils/Api";

// Async thunk for deleting a sub-category
export const deleteSubCategory = createAsyncThunk(
  "subCategory/delete",
  async (subCategoryId, { rejectWithValue }) => {
    try {
      const response = await API.put(`api/sub_category/delete/${subCategoryId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
  }
);

const subCategoryDeleteSlice = createSlice({
  name: "subCategoryDelete",
  initialState: {
    loading: false,
    error: null,
    success: false,
    message: null,
  },
  reducers: {
    clearSubCategoryDeleteState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Sub-category deleted successfully.";
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete sub-category.";
      });
  },
});

export const { clearSubCategoryDeleteState } = subCategoryDeleteSlice.actions;

export default subCategoryDeleteSlice.reducer;
