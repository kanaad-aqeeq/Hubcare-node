// Helper function to decode JWT without using jwt-decode package
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT", error);
    return null;
  }
}

export const setToken = (token) => {
  localStorage.setItem("token", token);
  try {
    const decoded = parseJwt(token);
    if (decoded?.exp) {
      // localStorage.setItem("token_expiry", decoded.exp * 1000); // Optional
    }
  } catch (e) {
    console.error("Invalid token in setToken", e);
  }
};

export const setUserId = (userId) => {
  localStorage.setItem("userId", userId);
};

export const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return { token: token };
  } else {
    return { token: null, refresh_token: null };
  }
};

export const refreshAccessToken = async () => {
  try {
    setToken(localStorage.getItem("token"));
    return localStorage.getItem("token");
  } catch (error) {
    console.log("Failed to refresh", error);
    throw error;
  }
};

// export const isTokenExpired = (token) => {
//   if (!token) return true;
//   try {
//     const decoded = parseJwt(token);
//     if (!decoded?.exp) return true;
//     const now = Date.now() / 1000;
//     return decoded.exp < now;
//   } catch (error) {
//     console.error("Failed to decode token", error);
//     return true;
//   }
// };

// export const clearToken = () => {
//   const hasRedirected = sessionStorage.getItem("hasRedirected");
//   if (!hasRedirected) {
//     sessionStorage.setItem("hasRedirected", "true");
//     localStorage.removeItem("token");
//     localStorage.removeItem("isLogin");
//     localStorage.removeItem("persist:root");
//     localStorage.removeItem("fcm_token");
//     localStorage.removeItem("UserType");
//     window.location.href = "/login";
//   } else {
//     console.log("clearToken called but redirect already done this session.");
//   }
// };

// export const clearIfTokenExpired = () => {
//   const tokenExpiry = localStorage.getItem("token_expiry");
//   if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
//     console.log("Token expired, clearing...");
//     clearToken();
//     localStorage.clear(); // Optional: clears all localStorage
//   }
// };
  