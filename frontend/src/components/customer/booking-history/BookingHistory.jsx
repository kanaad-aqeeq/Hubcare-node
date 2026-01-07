// import React from "react";
// import CommanHeader from "../../common/common-header/CommonHeader";
// const SupportListData = [
//   {
//     date: "23/05/2025",
//     bookingID: "Pending",
//     customernName: "Online",
//     serviceProvider: "Tom Cruise",
//     serviceType: "10",
//   },
//   {
//     date: "12/04/2025",
//     bookingID: "Pending",
//     customernName: "Online",
//     serviceProvider: "Tom Cruise",
//     serviceType: "10",
//   },
//   {
//     date: "12/04/2025",
//     bookingID: "Pending",
//     customernName: "Online",
//     serviceProvider: "Tom Cruise",
//     serviceType: "10",
//   },
// ];
// const BookingHistory = () => {
//   return (
//     <>
//       <div className="main-wrapper">
//         <CommanHeader title={"Booking History"} />
//         <div className="card">
//           <div className="card-body">
//             <div className="responsive-table">
//               <table className="table table-row-dashed">
//                 <thead>
//                   <tr className="fw-bolder text-muted">
//                     <th className="w-10px">#</th>
//                     <th className="w-75px">Date</th>
//                     <th className="w-175px text-center">Booking ID</th>
//                     <th className="w-150px text-center">Customer Name</th>
//                     <th className="w-100px text-center">Service Provider</th>
//                     <th className="w-100px text-center">Service Type</th>
//                   </tr>
//                 </thead>
//                 <tbody className="">
//                   {SupportListData.map((item, index) => {
//                     return (
//                       <tr key={index} className="">
//                         <td className="">{index + 1}</td>
//                         <td className="text-start">
//                           <span className="">{item.date}</span>
//                         </td>
//                         <td className="text-center">
//                           <span className="">{item.bookingID}</span>
//                         </td>
//                         <td className="text-center">
//                           <span className="">{item.customernName}</span>
//                         </td>
//                         <td className="text-center">
//                           <span className="">{item.serviceProvider}</span>
//                         </td>
//                         <td className="text-center">
//                           <span className="">{item.serviceType}</span>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BookingHistory;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingHistory } from "../../../Redux-store/Slices/customerbookinghsitory/customerBookingHistorySlice";                                              
import CommanHeader from "../../common/common-header/CommonHeader";

const BookingHistory = () => {
  const dispatch = useDispatch();
  
  const { data: bookingData, loading, error } = useSelector(
    (state) => state.bookingHistory
  );

  useEffect(() => {
    dispatch(fetchBookingHistory());
  }, [dispatch]);

  return (
    <div className="main-wrapper">
      <CommanHeader title={"Booking History"} />
      <div className="card">
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <div className="responsive-table">
              <table className="table table-row-dashed">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="w-10px">#</th>
                    <th className="w-75px">Date</th>
                    <th className="w-175px text-center">Booking ID</th>
                    <th className="w-150px text-center">Customer Name</th>
                    <th className="w-100px text-center">Service Provider</th>
                    <th className="w-100px text-center">Service Type</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingData && bookingData.length > 0 ? (
                    bookingData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="text-start">{item.date}</td>
                        <td className="text-center">{item.bookingId}</td>
                        <td className="text-center">{item.customerName}</td>
                        <td className="text-center">{item.serviceProvider}</td>
                        <td className="text-center">{item.serviceType}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No booking history found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
