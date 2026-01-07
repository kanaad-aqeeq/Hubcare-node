// import React from "react";
// import {  Logo } from "../../../assets/images";
// import { Link } from "react-router-dom";

// const Login = () => {
//   return (
//     <>
//       {/* <div class="login-bg" style={{ backgroundImage: `url(${LoginBg})` }}> */}
//         <div className="auth-wraper">
//           <div className="auth-wraper-inner">
//             <div className="auth-card">
//               <div class="auth-top">
//                 <div class="login-logo">
//                   <img alt="Logo" src={Logo} />
//                 </div>
//                 <h3>Admin Panel</h3>
//               </div>
//               <div className="auth-main">
//                 <div className="form-inputs">
//                   <label className="form-label">
//                     Email<i>*</i>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control"
//                     placeholder="Enter email here"
//                   />
//                 </div>
//                 <div className="form-inputs">
//                   <label className="form-label">
//                     Password<i>*</i>
//                   </label>
//                   <input
//                     type="password"
//                     name="newpassword"
//                     className="form-control"
//                     placeholder="**********"
//                   />
//                 </div>
//                 <div className="auth-btn">
//                   <Link to="/" className="btn primary-btn">
//                     Login
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       {/* </div> */}
//     </>
//   );
// };

// export default Login;






// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Logo } from "../../../assets/images";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!email || !password) {
//       toast.error("Please enter both email and password");
//       return;
//     }

//     try {
//       const response = await axios.post("http://192.168.1.7:3017/api/login", {
//         email,
//         password,
//       });

//       if (response.data.status) {
//         // Save token and user info
//         const { token, userRole, userId } = response.data.data;
//         localStorage.setItem("token", token);
//         localStorage.setItem("userRole", userRole);
//         localStorage.setItem("userId", userId);

//         toast.success("Login successful");

//         // Redirect to dashboard or protected page
//         navigate("/");
//       } else {
//         toast.error(response.data.message || "Login failed");
//       }
//     } catch (error) {
//       toast.error("Login failed. Please check your credentials.");
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <div className="auth-wraper">
//       <div className="auth-wraper-inner">
//         <div className="auth-card">
//           <div className="auth-top">
//             <div className="login-logo">
//               <img alt="Logo" src={Logo} />
//             </div>
//             <h3>Admin Panel</h3>
//           </div>
//           <div className="auth-main">
//             <div className="form-inputs">
//               <label className="form-label">
//                 Email<i>*</i>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control"
//                 placeholder="Enter email here"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="form-inputs">
//               <label className="form-label">
//                 Password<i>*</i>
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 className="form-control"
//                 placeholder="**********"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="auth-btn">
//               <button onClick={handleLogin} className="btn primary-btn">
//                 Login
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




//************************************ */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../Redux-store/Slices/AuthSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="auth-wraper">
      <div className="auth-wraper-inner">
        <div className="auth-card">
          <div className="auth-top">
            <div className="login-logo">
              <img alt="Logo" src={Logo} />
            </div>
            <h3>Admin Panel</h3>
          </div>
          <div className="auth-main">
            <div className="form-inputs">
              <label className="form-label">
                Email<i>*</i>
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">
                Password<i>*</i>
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="auth-btn">
              <button
                onClick={handleLogin}
                className="btn primary-btn"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


