import React from "react";

const RewardForm = () => {
  return (
    <div className="main-flex">
      <div className="inner-flex-50">
        <div className="card">
          <div class="card-header">
            <h3>Reward Point</h3>
          </div>
          <div className="card-body">
            <div className="form-main">
              <div className="form-flex">
                <div className="form-inner-flex-35">
                  <div className="form-inputs">
                    <label className="form-label">Reward</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Reward Point"
                    />
                  </div>
                </div>
              </div>
              <div className="form-btn reward-btn">
                <button type="button" className="btn primary-btn">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardForm;
