
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// GET API - Fetch all banner sliders
export const getAllBanners = createAsyncThunk(
  'banner/getAllBanners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`api/banner/slider`);
      return response.data.data; // return the "data" array
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

const bannerSlice = createSlice({
  name: 'banner',
  initialState: {
    bannerList: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    resetBannerState: (state) => {
      state.bannerList = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBanners.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllBanners.fulfilled, (state, action) => {
        state.bannerList = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBannerState } = bannerSlice.actions;
export default bannerSlice.reducer;
