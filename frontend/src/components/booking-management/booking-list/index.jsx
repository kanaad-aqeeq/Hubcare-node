import React from "react";
import CommanHeader from "../../common/common-header/CommonHeader";
import { BookingTable } from "./sub-component";

const index = () => {
  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Booking List"} />
        <BookingTable />
      </div>
    </>
  );
};

export default index;
