// import { Link } from "react-router-dom";
// import { SvgActionViewIcon } from "../../../common/sidebar/svg/Svg";
// const UserHistoryListData = [
//   {
//     VendorName: "Amit",
//     ServiceName: "Sofa Cleaning",
//     ServiceCategory: "Home Care",
//     BookingId: "#12353",
//     status: "Pending",
//   },
//   {
//     VendorName: "Rahul Awadhiya",
//     ServiceName: "Sofa Cleaning",
//     ServiceCategory: "Home Care",
//     BookingId: "#12355",
//     status: "Accepted",
//   },
//   {
//     VendorName: "Neeraj Gupta",
//     ServiceName: "Sofa Cleaning",
//     ServiceCategory: "Home Care",
//     BookingId: "#12358",
//     status: "Assigned",
//   },
//   {
//     VendorName: "Anish Singh",
//     ServiceName: "Sofa Cleaning",
//     ServiceCategory: "Home Care",
//     BookingId: "#12356",
//     status: "Completed",
//   },
//   {
//     VendorName: "Rohit Roy",
//     ServiceName: "Sofa Cleaning",
//     ServiceCategory: "Home Care",
//     BookingId: "#12359",
//     status: "Canceled",
//   },
// ];
// const UserBookingHistory = () => {
//   const statusBadgeClass = {
//     Pending: "badge-warning",
//     Accepted: "badge-primary",
//     Assigned: "badge-secondary",
//     Canceled: "badge-danger",
//     Completed: "badge-success",
//   };
//   return (
//     <>
//       <div className="card">
//         <div className="card-header">
//           <div className="card-title">
//             <h3>Overall Booking History</h3>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="responsive-table stkytable-action">
//             <table className="table table-row-dashed">
//               <thead>
//                 <tr className="fw-bolder text-muted">
//                   <th className="w-10px">#</th>
//                   <th className="w-200px text-start">Service Details</th>
//                   <th className="w-200px  text-start">Vendor Detail</th>
//                   <th className="w-100px text-center">Booking Date</th>
//                   <th className="w-100px text-center">Servicing Date</th>
//                   <th className="w-70px text-center">Total Hours</th>
//                   <th className="w-100px text-center">Charges (Per Hour)</th>
//                   <th className="w-70px text-center">Overall Charges</th>
//                   <th className="w-100px text-center">Status</th>
//                   <th className="w-100px text-end">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="">
//                 {UserHistoryListData.map((item, index) => {
//                   return (
//                     <tr key={index} className="">
//                       <td className="">{index + 1}</td>
//                       <td className="text-start">
//                         <div className="user-info">
//                           <div className="user-info-inner">
//                             <p>{item.ServiceName}</p>
//                           </div>
//                           <div className="user-id-inner">
//                             <p className="d-block fw-bold titl-view">
//                               Category:{item.ServiceCategory}
//                             </p>
//                             <p className="d-block fw-bold titl-view">
//                               Bkng id:{item.BookingId}
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="text-start">
//                         <span className="">{item.VendorName}</span>
//                       </td>
//                       <td className="text-center">
//                         <span className="">12-03-2025</span>
//                       </td>
//                       <td className="text-center">
//                         <span className="">14-03-2025</span>
//                       </td>
//                       <td className="text-center">
//                         <span className="">3 Hours</span>
//                       </td>
//                       <td className="text-center">
//                         <span className="">40 SAR/Hour</span>
//                       </td>
//                       <td className="text-center">
//                         <span className="">120 SAR</span>
//                       </td>
//                       <td className="text-center">
//                         <span
//                           className={`badge ${
//                             statusBadgeClass[item.status] || "badge-secondary"
//                           }`}
//                         >
//                           {item.status}
//                         </span>
//                       </td>
//                       <td className="text-end">
//                         <div className="action-main">
//                           <div className="action-inner">
//                             <div className="action-buttons">
//                               <Link to="/booking-detail" className="view-action">
//                                 <SvgActionViewIcon />
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserBookingHistory;







import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserBookingDetails } from "../../../../Redux-store/Slices/userbooking/userBookingSlice";
import { Link } from "react-router-dom";
import { SvgActionViewIcon } from "../../../common/sidebar/svg/Svg";

const statusBadgeClass = {
  CANCELLED: "badge-danger",
  ACTIVE: "badge-primary",
  COMPLETED: "badge-success",
};

const UserBookingHistory = () => {
  const dispatch = useDispatch();
 
  const { id } = useParams();  // Get user id from URL param
  const { bookingDetails, loading, error } = useSelector(state => state.userBooking);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserBookingDetails(id));
    }
  }, [id, dispatch]);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <h3>Overall Booking History</h3>
        </div>
      </div>
      <div className="card-body">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : !bookingDetails?.length ? (
          <p>No bookings found.</p>
        ) : (
          <div className="responsive-table stkytable-action">
            <table className="table table-row-dashed">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th>#</th>
                  <th className="text-start">Service Details</th>
                  <th className="text-start">Vendor Detail</th>
                  <th className="text-center">Booking Date</th>
                  <th className="text-center">Servicing Date</th>
                  <th className="text-center">Total Hours</th>
                  <th className="text-center">Charges (Per Hour)</th>
                  <th className="text-center">Overall Charges</th>
                  <th className="text-center">Status</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookingDetails.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td className="text-start">
                      <div className="user-info">
                        <div className="user-info-inner">
                          <p>{item.service?.serviceName || 'N/A'}</p>
                        </div>
                        <div className="user-id-inner">
                          <p className="fw-bold titl-view">
                            Category: {item.service?.category || 'N/A'}
                          </p>
                          <p className="fw-bold titl-view">
                            Bkng id: #{item.id?.slice(0, 6)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-start">
                      {/* No vendor data in your API, so keep placeholder or update if available */}
                      <span>N/A</span>
                    </td>
                    <td className="text-center">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      {new Date(item.serviceDate).toLocaleDateString()}
                    </td>
                    <td className="text-center">{item.workHours} Hour(s)</td>
                    <td className="text-center">{item.service?.servicePrice} SAR/Hour</td>
                    <td className="text-center">{item.finalAmount} SAR</td>
                    <td className="text-center">
                      <span className={`badge ${statusBadgeClass[item.bookingStatus] || 'badge-secondary'}`}>
                        {item.bookingStatus}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="action-main">
                        <div className="action-inner">
                          <div className="action-buttons">
                            <Link to={`/booking-detail/${item.id}`} className="view-action">
                              <SvgActionViewIcon />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookingHistory;

