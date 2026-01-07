// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import API from '../../../utils/Api'; // Adjust the path based on your project structure

// // Async thunk to fetch all categories
// export const fetchAllCategories = createAsyncThunk(
//   'categories/fetchAllCategories',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await API.get('api/category/all-categories');
//       if (response.data.status) {
//         return response.data.data;
//       } else {
//         return rejectWithValue('Failed to fetch categories');
//       }
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || 'Error fetching categories'
//       );
//     }
//   }
// );

// // Slice for category data
// const categoriesSlice = createSlice({
//   name: 'categories',
//   initialState: {
//     categories: [],
//     loading: false,
//     error: '',
//   },
//   reducers: {
//     resetCategoriesState: (state) => {
//       state.categories = [];
//       state.loading = false;
//       state.error = '';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllCategories.pending, (state) => {
//         state.loading = true;
//         state.error = '';
//       })
//       .addCase(fetchAllCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.categories = action.payload;
//       })
//       .addCase(fetchAllCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetCategoriesState } = categoriesSlice.actions;
// export default categoriesSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/Api';
// // Async thunk to fetch all categories


export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAllCategories',
  async ({ page = 1, limit = 10 ,searchText = '' }, { rejectWithValue }) => {
    try {
      const response = await API.get(`api/category/all-categories?page=${page}&limit=${limit}&searchText=${searchText}`);
      if (response.data.status) {
        return response.data;
      } else {
        return rejectWithValue('Failed to fetch categories');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error fetching categories'
      );
    }
  }
);





// // Slice for category data



const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: '',
  },
  reducers: {
    resetCategoriesState: (state) => {
      state.categories = [];
      state.totalCount = 0;
      state.totalPages = 0;
      state.currentPage = 1;
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});





export const { resetCategoriesState } = categoriesSlice.actions;
export default categoriesSlice.reducer;
