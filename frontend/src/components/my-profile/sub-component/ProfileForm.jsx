
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { fetchUserProfile } from "../../../Redux-store/Slices/userProfile/userProfileSlice";
import { updateUserProfile } from "../../../Redux-store/Slices/updateUserProfile/updateUserProfileSlice";

const ProfileForm = () => {


  const [isVisible, setIsVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });



  const dispatch = useDispatch();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };





  const { user, loading, error } = useSelector(
    (state) => state.userProfile
  );


  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);


  const handleUpdate = () => {
    dispatch(updateUserProfile(formData));
  };







  const handleButtonClick = () => {
    if (!clicked) {
      setIsVisible(true);
      setClicked(true);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);


  return (
    <>
      <div className="form-flex">
        <div className="form-inner-flx">
          <div className="card">
            <div class="card-header">
              <h3>Profile Detail</h3>
            </div>
            <div className="card-body">
              <div className="form-main">
                <div className="form-flex">
                  <div className="form-inner-flx">
                    <div className="form-inputs">
                      <label className="form-label">
                        Full Name<i>*</i>
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter full name here"
                        // value={user?.name || ""}
                        value={formData.name}
                        onChange={handleChange}

                      />
                    </div>
                  </div>
                  <div className="form-inner-flx">
                    <div className="form-inputs">
                      <label className="form-label">
                        Phone No.<i>*</i>
                      </label>
                      <input
                        type="num"
                        name="phone"
                        className="form-control"
                        placeholder="Enter phone no. here"
                        // value={user?.phone || ""}
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-inner-flx">
                    <div className="form-inputs">
                      <label className="form-label">
                        Email<i>*</i>
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email name here"
                        // value={user?.email || ""}
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-btn">
                  <button type="button" className="btn secondary-btn">
                    Cancel
                  </button>
                  <button type="button" className="btn primary-btn" onClick={handleUpdate}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-inner-flx">
          <div className="card">
            <div class="card-header">
              <h3>Change Password</h3>
            </div>
            <div className="card-body">
              {isVisible && (
                <div className="form-flex">
                  <div className="form-inner-flx-100">
                    <div className="form-inputs">
                      <label className="form-label">
                        Current Password<i>*</i>
                      </label>
                      <input
                        type="password"
                        name="newpassword"
                        className="form-control"
                        placeholder="**********"
                      />
                    </div>
                  </div>
                  <div className="form-inner-flx-100">
                    <div className="form-inputs">
                      <label className="form-label">
                        New Password<i>*</i>
                      </label>
                      <input
                        type="password"
                        name="newpassword"
                        className="form-control"
                        placeholder="**********"
                      />
                    </div>
                  </div>
                  <div className="form-inner-flx-100">
                    <div className="form-inputs">
                      <label className="form-label">
                        Confirm Password<i>*</i>
                      </label>
                      <input
                        type="password"
                        name="confirmpassword"
                        className="form-control"
                        placeholder="**********"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="frm-btn-main">
                <div className="changepassword-link">
                  <button
                    type="button"
                    className="btn primary-btn"
                    onClick={handleButtonClick}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
