import { SvgDeleteIcon } from "../../common/sidebar/svg/Svg";

// const PopupDelete = ({ handlePopup }) => {
//   return (
//     <>
//       <div className="main-popup delete-type-modal">
//         <div className="lm-outer">   
//           <div className="lm-inner">
//             <div className="popup-inner">
//               <div className="popup-body">
//                 <div className="popup-detail-main">
//                   <div className="popup-delete-image">
//                     <span>
//                       <SvgDeleteIcon />
//                     </span>
//                   </div>
//                   <div className="delete-description">
//                     <p>Are you sure you want to delete this Banner ?</p>
//                     <div className="popup-btn generate-btn">
//                       <button
//                         type="button"
//                         className="btn secondary-btn"
//                         onClick={handlePopup}
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="button"
//                         className="btn primary-btn"
//                         onClick={handlePopup}
//                       >
//                         Confirm Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="overlay" onClick={handlePopup}></div>
//       </div>
//     </>
//   );
// };

// export default PopupDelete;


const PopupDelete = ({ handlePopup, deleteApiCall,isLoading  }) => {
  return (
    <>
      <div className="main-popup delete-type-modal">
        <div className="lm-outer">
          <div className="lm-inner">
            <div className="popup-inner">
              <div className="popup-body">
                <div className="popup-detail-main">
                  <div className="popup-delete-image">
                    <span>
                      <SvgDeleteIcon />
                    </span>
                  </div>
                  <div className="delete-description">
                    <p>Are you sure you want to delete this Banner ?</p>
                    <div className="popup-btn generate-btn">
                      <button
                        type="button"
                        className="btn secondary-btn"
                        onClick={handlePopup}
                      >
                        Cancellll
                      </button>
                      {/* <button
                        type="button"
                        className="btn primary-btn"
                        onClick={deleteApiCall} // ✅ Fix here
                      >
                        Confirm Delete
                      </button> */}

                      <button
                        type="button"
                        className="btn primary-btn"
                        onClick={deleteApiCall}
                        disabled={isLoading}
                      >
                        {isLoading ? "Deleting..." : "Confirm Delete"}
                      </button>




                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay" onClick={handlePopup}></div>
      </div>
    </>
  );
};

export default PopupDelete;
