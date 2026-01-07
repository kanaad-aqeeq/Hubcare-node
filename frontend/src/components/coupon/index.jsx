import React from "react";
import CouponList from "./sub-coupon/CouponList";
import CommanHeader from "../common/common-header/CommonHeader";

const index = () => {
  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Coupon List"} type={3} />
        <CouponList />
      </div>
    </>
  );
};

export default index;
