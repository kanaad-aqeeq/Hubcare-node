import React from "react";
import CommanHeader from "../../common/common-header/CommonHeader";
import { UserDetail, UserBookingHistory} from "./sub-component";

const index = () => {
  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"User Detail"} />
        <UserDetail />
        <UserBookingHistory/>
      </div>
    </>
  );
};

export default index;
