import React from "react";
import CommanHeader from "../../common/common-header/CommonHeader";
import ServicesCategory from "./sub-component/ServicesCategory";
const index = () => {
  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Service Category"} type={1}/>
        <ServicesCategory />
      </div>
    </>
  );
};

export default index;
