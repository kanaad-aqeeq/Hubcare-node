// Redux-store/Slices/serviceReports/categoryToggleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../../utils/Api';

// Adjust this base URL as needed


export const toggleCategoryStatus = createAsyncThunk(   
  "category/toggleStatus",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await API.put(`api/category/toggle/${categoryId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
  }
);

const categoryToggleSlice = createSlice({
  name: "categoryToggle",
  initialState: {
    toggledCategory: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearToggleMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleCategoryStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(toggleCategoryStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.toggledCategory = action.payload;
        state.message = action.payload.message || "Status updated.";
      })
      .addCase(toggleCategoryStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to toggle status.";
      });
  },
});

export const { clearToggleMessage } = categoryToggleSlice.actions;

export default categoryToggleSlice.reducer;
