import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api'; // Adjust the path as needed

// Async thunk to add a new promo offer
export const addPromoOffer = createAsyncThunk(
  'addOffer/add',   
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await API.post('api/promo-offer/add-offer', formdata);
      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message || 'Failed to add offer');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error adding offer'
      );
    }
  }
);

// Slice
const promoOfferSlice = createSlice({
  name: 'addOffer',
  initialState: {
    offer: null,
    loading: false,
    error: '',
    successMessage: '',
    success: false, // ✅ add this
  },
  reducers: {
    resetPromoOfferState: (state) => {
      state.offer = null;
      state.loading = false;
      state.error = '';
      state.successMessage = '';
       state.success = false; // ✅ reset success flag
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPromoOffer.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.successMessage = '';
      })
      .addCase(addPromoOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offer = action.payload;
        state.successMessage = 'Offer created successfully';
          state.success = true; // set success true
      })
      .addCase(addPromoOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPromoOfferState } = promoOfferSlice.actions;
export default promoOfferSlice.reducer;
