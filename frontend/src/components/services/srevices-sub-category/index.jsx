import React from "react";
import CommanHeader from "../../common/common-header/CommonHeader";
import ServicesSubCategory from "./sub-component/ServicesSubCategory";
const index = () => {
  return (
    <>
      <div className="main-wrapper">
          <CommanHeader title={"Service Sub Category"}  type={2}/>
          
        <ServicesSubCategory />
      </div>
    </>
  );
};

export default index;
