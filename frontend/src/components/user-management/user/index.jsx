import React from "react";
import CommanHeader from "../../common/common-header/CommonHeader";
import { UserTable } from "./sub-component";

const index = () => {
  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"User"} />
        <UserTable />
      </div>
    </>
  );
};

export default index;
