import React from "react";
import Select from "react-select";
const AddSubCategoryPopup = ({ handlePopup }) => {
  const SubCategory = [
    { value: "Status", label: "Status" },
    { value: "Complete", label: "Complete" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Pending", label: "Pending" },
    { value: "Unpaid", label: "Unpaid" },
  ];
  return (
    <div className="main-popup service-popup">
      <div className="lm-outer">
        <div className="lm-inner">
          <div className="popup-inner">
            <div className="popup-heading">
              <h3>Add Sub Category</h3>
            </div>
            <div className="popup-body">
              <div className="service-form">
                <div className="form-main">
                  <div className="form-flex">
                    <div className="form-inner-flx">
                      <div className="form-inputs">
                        <label className="form-label">Category</label>
                        <Select options={SubCategory} placeholder="Select" />
                      </div>
                    </div>
                    <div className="form-inner-flx">
                      <div className="form-inputs">
                        <label className="form-label">Sub Category</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Sub Category"
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
export default AddSubCategoryPopup;
