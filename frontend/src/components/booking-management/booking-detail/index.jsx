import React from "react";
import CommanHeader from "../../common/common-header/CommonHeader";
import {BookingDetail } from "./sub-component";

const index = () => {
  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Booking History Detail"} />
        <BookingDetail />
      </div>
    </>
  );
};

export default index;
