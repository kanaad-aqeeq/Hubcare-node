// import { SvgDeleteIcon } from "../../../common/sidebar/svg/Svg";

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
//                     <p>Are you sure you want to delete this category?</p>
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



  import { useDispatch, useSelector } from "react-redux";
  import { useEffect } from "react";
  import { deleteCategory, resetCategoryDeleteState } from "../../../../Redux-store/Slices/categorydelete/categoryDeleteSlice";
  import { toast } from "react-toastify";
  import { SvgDeleteIcon } from "../../../common/sidebar/svg/Svg";

  const PopupDelete = ({ handlePopup, categoryId, onDeleteSuccess  }) => {
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.categoryDelete);

    console.log("PopupDelete categoryId:", categoryId);

    const handleDelete = () => {  
      if (categoryId) {
        console.log("Deleting category with ID:", categoryId);
        dispatch(deleteCategory(categoryId));

      }
    };

    useEffect(() => {
      if (success) {
        toast.success("Category deleted successfully");
        dispatch(resetCategoryDeleteState());
        handlePopup(); // close popup
          if (onDeleteSuccess) onDeleteSuccess(); // ✅ Notify parent
      }
      if (error) {
        toast.error(error);
        dispatch(resetCategoryDeleteState());
      }
    }, [success, error, dispatch, handlePopup , onDeleteSuccess]);

    return (
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
                    <p>Are you sure you want to delete this category?1</p>
                    <div className="popup-btn generate-btn">
                      <button
                        type="button"
                        className="btn secondary-btn"
                        onClick={handlePopup}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn primary-btn"
                        onClick={handleDelete}
                        disabled={loading}
                      >
                        {loading ? "Deleting..." : "Confirm Delete"}

                      </button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overlay" onClick={handlePopup}></div>
        </div>
      </div>
    );
  };

  export default PopupDelete;
