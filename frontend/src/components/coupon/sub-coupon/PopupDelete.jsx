import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deletePromoOffer, resetDeletePromoOfferState } from "../../../Redux-store/Slices/deletePromoOffer/deletePromoOfferSlice";
import { toast } from "react-toastify";
import { SvgDeleteIcon } from "../../common/sidebar/svg/Svg";

const PopupDelete = ({ handlePopup, offerId, onDeleteSuccess }) => {


  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.deletePromoOffer);

  console.log("PopupDelete offerId.....:", offerId);

  const handleDelete = () => {
    if (offerId) {
      console.log("Deleting category with ID....:", offerId);
      dispatch(deletePromoOffer(offerId));

    }
  };

  useEffect(() => {
    if (success) {
      toast.success("Category deleted successfully");
      dispatch(resetDeletePromoOfferState());
      onDeleteSuccess(offerId);
      handlePopup(); // close popup
    }
    if (error) {
      toast.error(error);
      dispatch(resetDeletePromoOfferState());
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
                    <p>Are you sure you want to delete this Coupon ?</p>
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
