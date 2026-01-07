// import React from "react";

// const OverallHistory = () => {
//   return (
//     <>
//       <div className="dashborad-details">
//         <ul>
//           <li>
//             <div class="card dashcrd-bdy">
//               <div className="card-body">
//                 <div class="dash-flx">
//                   <div class="dash-content">
//                     <p>Overall User</p>
//                     <h3>648</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </li>
//           <li>
//             <div class="card dashcrd-bdy">
//               <div className="card-body">
//                 <div class="dash-flx">
//                   <div class="dash-content">
//                     <p>Overall Vendor</p>
//                     <h3>158</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </li>
//           <li>
//             <div class="card dashcrd-bdy">
//               <div className="card-body">
//                 <div class="dash-flx">
//                   <div class="dash-content">
//                     <p>Overall Bookings</p>
//                     <h3>158</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </li>
//           <li>
//             <div class="card dashcrd-bdy">
//               <div className="card-body">
//                 <div class="dash-flx">
//                   <div class="dash-content">
//                     <p>Overall Revenue</p>
//                     <h3>18,900.00 SAR</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default OverallHistory;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import API from "../../../utils/Api"; // Adjust the path based on your file structure


// const OverallHistory = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

  

// useEffect(() => {
//   const fetchDashboardData = async () => {
//     const role = localStorage.getItem("userRole");

//     // if (role !== "Admin") {
//     //   setError("Access denied: Admins only.");
//     //   setLoading(false);
//     //   return;
//     // }

//     try {
//       const response = await API.get("/api/admin/dashboard");

//       if (response.data.status) {
//         setDashboardData(response.data.data);
//       } else {
//         setError("Failed to fetch dashboard data");
//       }
//     } catch (err) {
//       setError("Error fetching data");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchDashboardData();
// }, []);



  

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div className="dashborad-details">
//       <ul>
//         <li>
//           <div className="card dashcrd-bdy">
//             <div className="card-body">
//               <div className="dash-flx">
//                 <div className="dash-content">
//                   <p>Overall User</p>
//                   <h3>{dashboardData.totalUsers}</h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </li>
//         <li>
//           <div className="card dashcrd-bdy">
//             <div className="card-body">
//               <div className="dash-flx">
//                 <div className="dash-content">
//                   <p>Overall Vendor</p>
//                   <h3>{dashboardData.totalVendors}</h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </li>
//         <li>
//           <div className="card dashcrd-bdy">
//             <div className="card-body">
//               <div className="dash-flx">
//                 <div className="dash-content">
//                   <p>Overall Bookings</p>
//                   <h3>{dashboardData.totalBookings}</h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </li>
//         <li>
//           <div className="card dashcrd-bdy">
//             <div className="card-body">
//               <div className="dash-flx">
//                 <div className="dash-content">
//                   <p>Overall Revenue</p>
//                   <h3>{dashboardData.totalRevenue} SAR</h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default OverallHistory;




//************************************* */



import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../../../Redux-store/Slices/admindashboard/dashboardSlice"; // Adjust path as needed

const OverallHistory = () => {
  const dispatch = useDispatch();

  // Redux state access
  const { data: dashboardData, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!dashboardData) return null;

  return (
    <div className="dashborad-details">
      <ul>
        <li>
          <div className="card dashcrd-bdy">
            <div className="card-body">
              <div className="dash-flx">
                <div className="dash-content">
                  <p>Overall User</p>
                  <h3>{dashboardData.totalUsers}</h3>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="card dashcrd-bdy">
            <div className="card-body">
              <div className="dash-flx">
                <div className="dash-content">
                  <p>Overall Vendor</p>
                  <h3>{dashboardData.totalVendors}</h3>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="card dashcrd-bdy">
            <div className="card-body">
              <div className="dash-flx">
                <div className="dash-content">
                  <p>Overall Bookings</p>
                  <h3>{dashboardData.totalBookings}</h3>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="card dashcrd-bdy">
            <div className="card-body">
              <div className="dash-flx">
                <div className="dash-content">
                  <p>Overall Revenue</p>
                  <h3>{dashboardData.totalRevenue} SAR</h3>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OverallHistory;
