import React from "react";
import CommanHeader from "../common/common-header/CommonHeader";
import BannerList from "./sub-component/BannerList";

const index = () => {
  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Banner List"} type={4} />
        <BannerList />
      </div>
    </>
  );
};

export default index;
