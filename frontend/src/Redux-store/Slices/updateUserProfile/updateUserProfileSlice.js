// Redux-store/Slices/userProfile/updateUserProfileSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../../utils/Api';

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  "userProfile/update",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await API.put("api/update-profile", profileData);

      if (response.data.status) {
        return response.data.user;
      } else {
        return rejectWithValue(response.data.message || "Update failed");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const updateUserProfileSlice = createSlice({
  name: "updateUserProfile",
  initialState: {
    user: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearUpdateProfileState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successMessage = "User profile updated successfully";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearUpdateProfileState } = updateUserProfileSlice.actions;
export default updateUserProfileSlice.reducer;
