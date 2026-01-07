import React from "react";
import CommanHeader from "../../common/common-header/CommonHeader";
import { VendorTable } from "./sub-component";
const index = () => {
  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Vendors"} />
        <VendorTable />
      </div>
    </>
  );
};

export default index;
