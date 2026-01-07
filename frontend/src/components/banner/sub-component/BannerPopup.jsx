import React from "react";
import ImageUploader from "./ImageUploader";
import Uploader from "../../image-uploder/Uploader";

const BannerPopup = ({ handlePopup }) => {
  return (
    <div className="main-popup service-popup">
      <div className="lm-outer">
        <div className="lm-inner">
          <div className="popup-inner">
            <div className="popup-heading">
              <h3>Add Banner</h3>
            </div>
            <div className="popup-body">
              <div className="service-form">
                <div className="form-main">
                  <div className="form-flex">
                    <div className="form-inner-flx">
                      <div className="form-inputs">
                        <label className="form-label">Banner Image</label>
                       <Uploader/>
                      </div>
                    </div>
                    <div className="form-inner-flx">
                      <div className="form-inputs">
                        <label className="form-label">Banner Title</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Coupon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-btn">
                    <button
                      type="button"
                      className="btn secondary-btn"
                      onClick={handlePopup}
                    >
                      Cancel
                    </button>
                    <button
                      type="Add Category"
                      className="btn primary-btn"
                      onClick={handlePopup}
                    >
                      Add
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
  );
};

export default BannerPopup;
