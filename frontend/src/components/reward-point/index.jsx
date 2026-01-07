import React from "react";
import CommanHeader from "../common/common-header/CommonHeader";
import RewardForm from "./sub-component/RewardForm";
const index = () => {
  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Reward"} />
        <RewardForm />
      </div>
    </>
  );
};

export default index;
