// import React from "react";
// import { ProfileSqrImage} from "../../../../assets/images";
// const UserDetail = () => {
//   return (
//     <>
//       <div className="card">
//       <div className="card-header">
//             <div className="card-title">
//               <h3>User Information</h3>
//             </div>
//           </div>
//         <div className="card-body">
//           <div className="ordr-infrmtion">
//             <div className="usrprfl-srcen">
//               <div className="userprfl-frame">
//                 <span style={{ backgroundImage: `url(${ProfileSqrImage})` }}></span>
//               </div>
//             </div>
//             <div className="userdtl-card">
//               <div className="userdtl-inner">
//               <div className="brnd-vndrnmbr">
//                 <p>User Name</p>
//                 <h4>Johan</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Date Of Registration</p>
//                 <h4>12-06-2024</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Phone No.</p>
//                 <h4>9999999999</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Wallet Amount</p>
//                 <h4>890 SAR</h4>
//               </div>
//               </div>
//               <div className="userdtl-inner">
//               <div className="brnd-vndrnmbr">
//                 <p>Email</p>
//                 <h4>abcd@gmail.com</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Address</p>
//                 <h4>71, PU4, Behind C21 Mall, Scheme 41, V...</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Gender</p>
//                 <h4>Male</h4>
//               </div>
//               <div className="brnd-vndrnmbr">
//                 <p>Reward Points</p>
//                 <h4>120</h4>
//               </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default UserDetail;





import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleUser } from "../../../../Redux-store/Slices/userdetail/userdetailSlice";

import { ProfileSqrImage } from "../../../../assets/images";

const UserDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();  // Get user id from URL param
  
  const { selectedUser, loading, error } = useSelector((state) => state.selectedUser);

  

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUser(id));
    }
  }, [dispatch, id]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedUser) return <p>No user details found</p>;

  // Format the registration date nicely, e.g., DD-MM-YYYY
  const formattedDate = new Date(selectedUser.createdAt).toLocaleDateString('en-GB');

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <h3>User Information</h3>
        </div>
      </div>
      <div className="card-body">
        <div className="ordr-infrmtion">
          <div className="usrprfl-srcen">
            <div className="userprfl-frame">
              <span
                style={{
                  backgroundImage: `url(${selectedUser.profile_image || ProfileSqrImage})`,
                }}
              ></span>
            </div>
          </div>
          <div className="userdtl-card">
            <div className="userdtl-inner">
              <div className="brnd-vndrnmbr">
                <p>User Name</p>
                <h4>{selectedUser.name || "N/A"}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Date Of Registration</p>
                <h4>{formattedDate}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Phone No.</p>
                <h4>{selectedUser.phone || "N/A"}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Wallet Amount</p>
                <h4>{selectedUser.walletAmount ? `${selectedUser.walletAmount} SAR` : "N/A"}</h4>
              </div>
            </div>
            <div className="userdtl-inner">
              <div className="brnd-vndrnmbr">
                <p>Email</p>
                <h4>{selectedUser.email || "N/A"}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Address</p>
                <h4>{selectedUser.companyaddress || "N/A"}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Gender</p>
                <h4>{selectedUser.gender || "N/A"}</h4>
              </div>
              <div className="brnd-vndrnmbr">
                <p>Reward Points</p>
                <h4>{selectedUser.rewardPoints || "N/A"}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
