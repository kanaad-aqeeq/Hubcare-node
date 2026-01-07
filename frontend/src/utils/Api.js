// // src/utils/api.js
// import axios from "axios";


// const baseURL = import.meta.env.VITE_BASE_URL

// const API = axios.create({
//   baseURL: "http://192.168.1.7:3017/",
  
// });

// // If token needed
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;






//************************************** */




// src/utils/api.js
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const API = axios.create({
  baseURL,
});

API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access_token");
  const token = localStorage.getItem("access_token") 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("persist:root");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );


API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error); // Add this for debugging
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("persist:root");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


export default API;

