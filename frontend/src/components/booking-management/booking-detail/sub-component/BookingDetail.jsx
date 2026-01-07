import React from "react";
import { ProfileSqrImage } from "../../../../assets/images";
const BookingDetail = () => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <h3>User Booking History</h3>
          </div>
        </div>
        <div className="card-body">
          <div className="ordr-infrmtion">
            <div className="usrprfl-srcen">
              <div className="userprfl-frame">
                <span
                  style={{ backgroundImage: `url(${ProfileSqrImage})` }}
                ></span>
              </div>
            </div>
            <div className="userdtl-card">
              <div className="userdtl-inner">
                <div className="brnd-vndrnmbr">
                  <p>User Name</p>
                  <h4>Johan</h4>
                </div>
                <div className="brnd-vndrnmbr">
                  <p>User Id:</p>
                  <h4>#12345</h4>
                </div>
                <div className="brnd-vndrnmbr">
                  <p>Category</p>
                  <h4>Home Care</h4>
                </div>
                <div className="brnd-vndrnmbr">
                  <p>Sub category</p>
                  <h4>Sofa Cleaning</h4>
                </div>
                <div className="brnd-vndrnmbr">
                  <p>Booking Id:</p>
                  <h4>#12541</h4>
                </div>
                <div className="brnd-vndrnmbr">
                  <p>Booking Date</p>
                  <h4>28/02/2025</h4>
                </div>
              </div>
              <div className="userdtl-inner">
                <div className="brnd-vndrnmbr">
                  <p>Vendor Detail</p>
                  <h4>Amit Singh</h4>
                </div>
                <div className="brnd-vndrnmbr">
                  <p>Total Hours</p>
                  <h4>3 Hours</h4>
                </div>
                <div className="brnd-vndrnmbr">
                  <p>Charges (Per Hour) </p>
                  <h4>40 SAR/Hour</h4>
                </div>
                <div className="brnd-vndrnmbr">
                  <p>Overall Charges</p>
                  <h4>120 SAR</h4>
                </div>
                <div className="brnd-vndrnmbr">
                  <p>Status</p>
                  <h4>Pending</h4>
                </div>
                <div className="brnd-vndrnmbr">
                <p>Servicing Date</p>
                <h4>4-03-2025</h4>
              </div>
              </div>
           
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetail;






//************************************************ */




// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { ProfileSqrImage } from "../../../../assets/images";
// import { fetchUserBookingDetails } from "../../../../Redux-store/Slices/userdetail/userdetailSlice";
// const BookingDetail = () => {


//   const dispatch = useDispatch();
//     const { id } = useParams();  // Get user id from URL param
//     const { userBooking, loading, error } = useSelector((state) => state.userBooking);



//    useEffect(() => {
//       if (id) {
//         dispatch(fetchUserBookingDetails(id));
//       }
//     }, [dispatch, id]);
//   return (
//     <>
//       <div className="card">
//         <div className="card-header">
//           <div className="card-title">
//             <h3>User Booking History</h3>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="ordr-infrmtion">
//             <div className="usrprfl-srcen">
//               <div className="userprfl-frame">
//                 <span
//                   style={{ backgroundImage: `url(${ProfileSqrImage})` }}
//                 ></span>
//               </div>
//             </div>
//             <div className="userdtl-card">
//               <div className="userdtl-inner">
//                 <div className="brnd-vndrnmbr">
//                   <p>User Name</p>
//                   <h4>Johan</h4>
//                 </div>
//                 <div className="brnd-vndrnmbr">
//                   <p>User Id:</p>
//                   <h4>#12345</h4>
//                 </div>
//                 <div className="brnd-vndrnmbr">
//                   <p>Category</p>
//                   <h4>Home Care</h4>
//                 </div>
//                 <div className="brnd-vndrnmbr">
//                   <p>Sub category</p>
//                   <h4>Sofa Cleaning</h4>
//                 </div>
//                 <div className="brnd-vndrnmbr">
//                   <p>Booking Id:</p>
//                   <h4>#12541</h4>
//                 </div>
//                 <div className="brnd-vndrnmbr">
//                   <p>Booking Date</p>
//                   <h4>28/02/2025</h4>
//                 </div>
//               </div>
//               <div className="userdtl-inner">
//                 <div className="brnd-vndrnmbr">
//                   <p>Vendor Detail</p>
//                   <h4>Amit Singh</h4>
//                 </div>
//                 <div className="brnd-vndrnmbr">
//                   <p>Total Hours</p>
//                   <h4>3 Hours</h4>
//                 </div>
//                 <div className="brnd-vndrnmbr">
//                   <p>Charges (Per Hour) </p>
//                   <h4>40 SAR/Hour</h4>
//                 </div>
//                 <div className="brnd-vndrnmbr">
//                   <p>Overall Charges</p>
//                   <h4>120 SAR</h4>
//                 </div>
//                 <div className="brnd-vndrnmbr">
//                   <p>Status</p>
//                   <h4>Pending</h4>
//                 </div>
//                 <div className="brnd-vndrnmbr">
//                 <p>Servicing Date</p>
//                 <h4>4-03-2025</h4>
//               </div>
//               </div>
           
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BookingDetail;


//***************************************************** */




// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { ProfileSqrImage } from "../../../../assets/images";
// import { fetchUserBookingDetails } from "../../../../Redux-store/Slices/userbooking/userBookingSlice";

// const BookingDetail = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();  // Get user ID from URL
//   const { bookingDetails, loading, error } = useSelector((state) => state.userBooking);

//   useEffect(() => {
//     if (id) dispatch(fetchUserBookingDetails(id));
//   }, [dispatch, id]);

//   if (loading) return <p>Loading booking details...</p>;
//   if (error) return <p className="text-danger">Error: {error}</p>;

//   return (
//     <div className="card">
//       <div className="card-header">
//         <div className="card-title">
//           <h3>User Booking History</h3>
//         </div>
//       </div>
//       <div className="card-body">
//         <div className="ordr-infrmtion">
//           <div className="usrprfl-srcen">
//             <div className="userprfl-frame">
//               <span style={{ backgroundImage: `url(${ProfileSqrImage})` }}></span>
//             </div>
//           </div>

//           <div className="userdtl-card">
//             <div className="userdtl-inner">
//               <div className="brnd-vndrnmbr">
//                 <p>User Name</p>
//                 <h4>{bookingDetails?.user_name || '-'}</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>User Id:</p>
//                 <h4>#{bookingDetails?.user_id || '-'}</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Category</p>
//                 <h4>{bookingDetails?.category || '-'}</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Sub category</p>
//                 <h4>{bookingDetails?.sub_category || '-'}</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Booking Id:</p>
//                 <h4>#{bookingDetails?.booking_id || '-'}</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Booking Date</p>
//                 <h4>{bookingDetails?.booking_date || '-'}</h4>
//               </div>
//             </div>

//             <div className="userdtl-inner">
//               <div className="brnd-vndrnmbr">
//                 <p>Vendor Detail</p>
//                 <h4>{bookingDetails?.vendor_name || '-'}</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Total Hours</p>
//                 <h4>{bookingDetails?.total_hours || '-'} Hours</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Charges (Per Hour)</p>
//                 <h4>{bookingDetails?.hourly_charge || '-'} SAR/Hour</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Overall Charges</p>
//                 <h4>{bookingDetails?.total_charge || '-'} SAR</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Status</p>
//                 <h4>{bookingDetails?.status || '-'}</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Servicing Date</p>
//                 <h4>{bookingDetails?.servicing_date || '-'}</h4>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingDetail;
