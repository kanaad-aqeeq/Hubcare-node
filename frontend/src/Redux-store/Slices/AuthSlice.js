// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isAuthenticated: false,
//   user: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login(state, action) {
//       state.isAuthenticated = true;
//       state.user = action.payload;
//     },
//     logout(state) {
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;





//   // src/redux/Slices/AuthSlice.js
//   import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//   import API from "../../utils/Api";
//   import { setToken, setUserId } from "../../utils/tokenHandler";
//   // import { AuthSlice } from "./Slices";

//   // Step 1: Async Thunk
//   // export const loginUser = createAsyncThunk("auth/loginUser", async (formData, thunkAPI) => {
//   //   try {
//   //     const response = await API.post("api/login", formData);
//   //     return response.data;
//   //   } catch (error) {
//   //     return thunkAPI.rejectWithValue(error.response.data || { message: "Login failed" });
//   //   }
//   // });

//   export const loginUser = createAsyncThunk("auth/loginUser", async (formData, thunkAPI) => {
//   try {
//     const response = await API.post("api/login", formData);
//     const { token, userId, userRole } = response.data;

//     if (token) {
//       setToken(token); // stores access_token
//       localStorage.setItem("isLogin", "1");
//     }

//     if (userId) {
//       setUserId(userId); // stores userId
//     }

//     if (userRole) {
//       localStorage.setItem("UserType", userRole);
//     }

//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response?.data || { message: "Login failed" });
//   }
// });


//   const initialState = {
//     isAuthenticated: false,
//     user: null,
//     token: null,
//     loading: false,
//     error: null,
//   };

//   const authSlice = createSlice({
//     name: "auth",
//     initialState,
//    reducers: {
//     logout(state) {
//       state.isAuthenticated = false;
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("userId");
//       localStorage.removeItem("userRole");
//       localStorage.removeItem("isLogin");
//       localStorage.removeItem("persist:root");
//     },
//   },
//     extraReducers: (builder) => {
//       builder
//         .addCase(loginUser.pending, (state) => {
//           state.loading = true;
//           state.error = null;
//         })
//         .addCase(loginUser.fulfilled, (state, action) => {
//           state.loading = false;
//           state.user = action.payload.user;
//           state.token = action.payload.token;
//           state.isAuthenticated = true;
//           localStorage.setItem("token", action.payload.token); // optional
//         })
//         .addCase(loginUser.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.payload.message;
//         });
//     },
//   });





//   export const { login, logout } = authSlice.actions;
//   export default authSlice.reducer;










import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/Api";
import { setToken, setUserId } from "../../utils/tokenHandler";

export const loginUser = createAsyncThunk("auth/loginUser", async (formData, thunkAPI) => {
  try {
    const response = await API.post("api/login", formData);
    console.log("Login response:", response);
    const { token, userId, userRole } = response.data;
    console.log("Extracted token:", token);

    if (token) {
      setToken(token); // stores access_token
      console.log("Token set in localStorage");
      localStorage.setItem("isLogin", "1");
    } else {
      console.warn("No token found in response");
    }

    if (userId) {
      setUserId(userId); // stores userId
      console.log("UserId set in localStorage");
    }

    if (userRole) {
      localStorage.setItem("UserType", userRole);
      console.log("UserRole set in localStorage");
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return thunkAPI.rejectWithValue(error.response?.data || { message: "Login failed" });
  }
});





export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkAPI) => {
  try {
    const response = await API.post("api/logout");
    console.log("Logout response:", response);

    // Clear tokens and user info
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem(" ");
    localStorage.removeItem("persist:root");

    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    return thunkAPI.rejectWithValue(error.response?.data || { message: "Logout failed" });
  }
});




const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("persist:root");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(loginUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload.user;
      //   state.token = action.payload.token;
      //   state.isAuthenticated = true;
      //   localStorage.setItem("token", action.payload.token); // optional
      // })

      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, userId, userRole } = action.payload.data;

        if (token) {
          localStorage.setItem("access_token", token);  // 🔥 This is the key fix
        }

        if (userRole) {
          localStorage.setItem("UserType", userRole);
        }

        if (userId) {
          localStorage.setItem("userId", userId);
        }

        state.isAuthenticated = true;
        state.user = action.payload.data;
      })


      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

        .addCase(logoutUser.fulfilled, (state) => {
    state.isAuthenticated = false;
    state.user = null;
    state.token = null;
    state.loading = false;
    state.error = null;
  })
  .addCase(logoutUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload.message || "Logout failed";
  });


  },
})







export const { logout } = authSlice.actions;
export default authSlice.reducer;
