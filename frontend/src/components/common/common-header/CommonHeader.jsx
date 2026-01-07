import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddCategoryPopup from "../../services/services-category/sub-component/AddCategoryPopup";
import AddSubCategoryPopup from "../../services/srevices-sub-category/sub-component/AddSubCategoryPopup";
import CouponPopup from "../../coupon/sub-coupon/CouponPopup";
import BannerPopup from "../../banner/sub-component/BannerPopup";
const CommonHeader = ({ title, type, onClickBtn }) => {
  const navigate = useNavigate();

  const [showAddCategoryPopup, setAddCategoryPopup] = useState(false);
  const handleAddCategoryPopup = () => {
    setAddCategoryPopup((p) => !p);
  };
  const [showAddSubCategoryPopup, setAddSubCategoryPopup] = useState(false);
  const handleAddSubCategoryPopup = () => {
    setAddSubCategoryPopup((p) => !p);
  };
  const [showCouponPopup, setCouponPopup] = useState(false);
  const handleCouponPopup = () => {
    setCouponPopup((p) => !p);
  };
  const [showBannerPopup, setBannerPopup] = useState(false);
  const handleBannerPopup = () => {
    setBannerPopup((p) => !p);
  };
  return (
    <>
      <div className="breadcrumb-main">
        <div className="breadcrumb-inner">
          <div className="page-title">
            <h3>{title}</h3>
          </div>
          <div className="btns-evnts">
            {type == "1" ? (
              <div className="btns-evnts-inner">
                <Link to="#" className="btn primary-btn" onClick={handleAddCategoryPopup}>
                  Add Category
                   {/* <SvgArrowRightIcon /> */}
                </Link>
              </div>
            ) : type == "2" ? (
              <div className="btns-evnts-inner">
                <Link to="#" className="btn primary-btn" onClick={handleAddSubCategoryPopup}>
                  Add SubCatogray
                   {/* <SvgArrowRightIcon /> */}
                </Link>
              </div>
            ) : type == "3" ? (
              <div className="btns-evnts-inner">
                <Link to="#" className="btn primary-btn" onClick={handleCouponPopup}>
                  Add Coupon
                   {/* <SvgArrowRightIcon /> */}
                </Link>
              </div>
            ) : type == "4" ? (
              <div className="btns-evnts-inner">
                <Link to="#" className="btn primary-btn" onClick={handleBannerPopup}>
                  Add Banner
                   {/* <SvgArrowRightIcon /> */}
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {showAddCategoryPopup && <AddCategoryPopup handlePopup={handleAddCategoryPopup} />}
      {showAddSubCategoryPopup && <AddSubCategoryPopup handlePopup={handleAddSubCategoryPopup} />}
      {showCouponPopup && <CouponPopup handlePopup={handleCouponPopup} />}
      {showBannerPopup && <BannerPopup handlePopup={handleBannerPopup} />}
       
    </>
  );
};

export default CommonHeader;
