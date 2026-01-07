// import { setToken } from "../../utils/tokenHandler";

// export const adminLogin = createAsyncThunk("admin/login", async (formData, { rejectWithValue }) => {
//   try {
//     const response = await Api.post("admin/login", formData);

//     if (response.data?.token) {
//       setToken(response.data.token);
//       localStorage.setItem("isLogin", '1');
//       localStorage.setItem("UserType", response.data.role || "admin");
//     }

//     return response;
//   } catch (error) {
//     if (error.response && error.response.data) {
//       return rejectWithValue(error.response.data);
//     } else {
//       return rejectWithValue(error.message);
//     }
//   }
// });
