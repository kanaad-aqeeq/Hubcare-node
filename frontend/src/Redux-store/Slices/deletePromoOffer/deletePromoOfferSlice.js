import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api'; // adjust if needed

// 🔄 Async thunk to delete a promo offer by offerId
export const deletePromoOffer = createAsyncThunk(
  'promoOffer/delete',
  async (offerId, { rejectWithValue }) => {
    try {
      const response = await API.post(`api/promo-offer/delete-offer/${offerId}`);
       console.log("PopupDelete offerId:", offerId);
      if (response.data.status) {
        return offerId; // Return offerId to remove it from list in UI
      } else {
        return rejectWithValue(response.data.message || 'Failed to delete offer');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error deleting offer'
      );
    }
  }
);

// Slice definition
const deletePromoOfferSlice = createSlice({
  name: 'deletePromoOffer',
  initialState: {
    loading: false,
    success: false,
    error: '',
  },
  reducers: {
    resetDeletePromoOfferState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deletePromoOffer.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = '';
      })
      .addCase(deletePromoOffer.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deletePromoOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetDeletePromoOfferState } = deletePromoOfferSlice.actions;
export default deletePromoOfferSlice.reducer;
