import React from "react";
import CommanHeader from "../common/common-header/CommonHeader";
import { OverallHistory } from "./sub-component";

const index = () => {
  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Dashboard"} />
        <OverallHistory />
      </div>
    </>
  );
};

export default index;
