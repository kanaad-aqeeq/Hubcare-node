// import React from "react";

// const VendorOverallSummary = () => {
//   return (
//     <>
//       <div className="dashborad-details company-revenue-detail">
//         <ul>
//         <li>
//             <div class="card dashcrd-bdy">
//               <div className="card-body">
//                 <div class="dash-flx">
//                   <div class="dash-content">
//                     <p>Active Service</p>
//                     <h3>10</h3>
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
//                     <p>Completed Service</p>
//                     <h3>48</h3>
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
//                     <p>Today Revenue</p>
//                     <h3>$648</h3>
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
//                     <h3>$18,900.00</h3>
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

// export default VendorOverallSummary






import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorDashboard } from "../../../../Redux-store/Slices/vendordashboard/vendorDashboardSlice";
import { useParams } from "react-router-dom";

const VendorOverallSummary = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data, loading, error } = useSelector((state) => state.vendorDashboard);

  useEffect(() => {
    if (id) {
      dispatch(fetchVendorDashboard(id));
    }
  }, [dispatch, id]);

  if (loading) return <p>Loading vendor summary...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No summary available</p>;

  return (
    <div className="dashborad-details company-revenue-detail">
      <ul>
        <li>
          <div className="card dashcrd-bdy">
            <div className="card-body">
              <div className="dash-flx">
                <div className="dash-content">
                  <p>Active Service</p>
                  <h3>{data.activeServiceCount ?? 0}</h3>
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
                  <p>Completed Service</p>
                  <h3>{data.completedServiceCount ?? 0}</h3>
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
                  <p>Today Revenue</p>
                  <h3>{data.todayRevenue ? `SAR ${data.todayRevenue}` : "SAR 0.00"}</h3>
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
                  <h3>{data.overallRevenue ? `SAR ${data.overallRevenue}` : "SAR 0.00"}</h3>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default VendorOverallSummary;
