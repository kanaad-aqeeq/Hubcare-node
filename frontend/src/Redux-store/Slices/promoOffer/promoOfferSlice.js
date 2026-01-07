import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api'; // Adjust if path differs

// Thunk to fetch promo offers
export const fetchPromoOffers = createAsyncThunk(
  'promoOffer/fetchPromoOffers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('api/promo-offer/offers');
      console.log('Promo Offer Response:', response.data);

      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue('Failed to fetch promo offers');
      }
    } catch (error) {
      return rejectWithValue('Error fetching promo offers');
    }
  }
);

// Slice
const promoOfferSlice = createSlice({
  name: 'promoOffer',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromoOffers.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchPromoOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPromoOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default promoOfferSlice.reducer;
