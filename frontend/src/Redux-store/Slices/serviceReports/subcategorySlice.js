// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import API from '../../../utils/Api'; // Adjust the path if needed

// // Async thunk to fetch all subcategories
// export const fetchAllSubcategories = createAsyncThunk(
//   'subcategories/fetchAllSubcategories',
//   async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
//     try {
//       const response = await API.get(`api/sub_category/all-subCategories?page=${page}&limit=${limit}`);
//       if (response.data.status) {
//         return response.data.data;
//       } else {
//         return rejectWithValue('Failed to fetch subcategories');
//       }
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Error fetching subcategories'
//       );
//     }
//   }
// );

// // Slice for subcategory data
// const subcategoriesSlice = createSlice({
//   name: 'subcategories',
//   initialState: {
//     subcategories: [],
//      totalCount: 0,
//     totalPages: 0,
//     currentPage: 1,
//     loading: false,
//     error: '',
//   },
//   reducers: {
//     resetSubcategoriesState: (state) => {
//       state.subcategories = [];
//        state.totalCount = 0;
//       state.totalPages = 0;
//       state.currentPage = 1;
//       state.loading = false;
//       state.error = '';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllSubcategories.pending, (state) => {
//         state.loading = true;
//         state.subcategories = action.payload.data;
//         state.totalCount = action.payload.totalCount;
//         state.totalPages = action.payload.totalPages; 
//         state.currentPage = action.payload.page;
//         state.error = '';
//       })
//       .addCase(fetchAllSubcategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.subcategories = action.payload;
//       })
//       .addCase(fetchAllSubcategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetSubcategoriesState } = subcategoriesSlice.actions;
// export default subcategoriesSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api';

// Async thunk to fetch subcategories with pagination
export const fetchAllSubcategories = createAsyncThunk(
  'subcategories/fetchAllSubcategories',
  async ({ page = 1, limit = 10,searchText = ''  }, { rejectWithValue }) => {
    try {
      const response = await API.get(`api/sub_category/all-subCategories?page=${page}&limit=${limit}&searchText=${searchText}`);
      console.log("Subcategory API Response in slice...:", response.data);
      if (response.data.status) {
        return {
          subcategories: response.data.data, // assuming your API returns this
          totalCount: response.data.totalCount,
          totalPages: response.data.totalPages,
          currentPage: page,
        };
      } else {
        return rejectWithValue('Failed to fetch subcategories');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error fetching subcategories'
      );
    }
  }
);

const subcategoriesSlice = createSlice({
  name: 'subcategories',
  initialState: {
    subcategories: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: '',
  },
  reducers: {
    resetSubcategoriesState: (state) => {
      state.subcategories = [];
      state.totalCount = 0;
      state.totalPages = 0;
      state.currentPage = 1;
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubcategories.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchAllSubcategories.fulfilled, (state, action) => {
         console.log("Fetched subcategories:", action.payload);
        state.loading = false;
        state.subcategories = action.payload.subcategories;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchAllSubcategories.rejected, (state, action) => {
         console.error("Fetch error in slice:", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSubcategoriesState } = subcategoriesSlice.actions;
export default subcategoriesSlice.reducer;
