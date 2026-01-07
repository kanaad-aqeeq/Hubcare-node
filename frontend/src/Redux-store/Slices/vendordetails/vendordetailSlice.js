import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from '../../../utils/Api';

// Async thunk to fetch vendor details
export const fetchVendorDetails = createAsyncThunk(
  "vendorDetails/fetchVendorDetails",
  async (userId , { rejectWithValue }) => {
    try {
      const response = await API.get(`/api/admin/single-user/${userId}`);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const vendorDetailsSlice = createSlice({
  name: "vendorDetails",
  initialState: {
    vendor: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearVendorDetails: (state) => {
      state.vendor = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload.data || null;
      })
      .addCase(fetchVendorDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearVendorDetails } = vendorDetailsSlice.actions;

export default vendorDetailsSlice.reducer;
