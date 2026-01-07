import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteSubCategory, clearSubCategoryDeleteState } from "../../../../Redux-store/Slices/subcategorydelete/subCategoryDeleteSlice";
import { toast } from "react-toastify";
import { SvgDeleteIcon } from "../../../common/sidebar/svg/Svg";


const PopupDelete = ({ handlePopup, subCategoryId, onDeleteSuccess }) => {

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.subCategoryDelete);

  console.log("PopupDelete categoryId:", subCategoryId);

  const handleDelete = () => {
    if (subCategoryId) {
      dispatch(deleteSubCategory(subCategoryId));
      console.log("Deleting subCategoryId with ID:", subCategoryId);

    }
  };

  useEffect(() => {
  if (success) {
    toast.success("Category deleted successfully");
    dispatch(clearSubCategoryDeleteState());
    if (onDeleteSuccess) onDeleteSuccess();
    handlePopup();
  }
  if (error) {
    toast.error(error);
    dispatch(clearSubCategoryDeleteState());
  }
}, [success, error, dispatch, handlePopup, onDeleteSuccess]);



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
                    <p>Are you sure you want to delete this Sub category?</p>
                    <div className="popup-btn generate-btn">
                      <button
                        type="button"
                        className="btn secondary-btn"
                        onClick={handlePopup}
                      >
                        Cancel
                      </button>
                      {/* <button
                        type="button"
                        className="btn primary-btn"
                        onClick={handlePopup}
                      >
                        Confirm Delete
                      </button> */}

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
        </div>
        <div className="overlay" onClick={handlePopup}></div>
      </div>
    </>
  );
};

export default PopupDelete;
