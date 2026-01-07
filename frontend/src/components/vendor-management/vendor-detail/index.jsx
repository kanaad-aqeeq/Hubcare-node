import React, { useState } from "react";
import CommanHeader from "../../common/common-header/CommonHeader";
import {  VendorBookingHistory, VendorDetail, VendorOverallSummary, VendorTransactionHistory } from "./sub-component";

const index = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      title: "Booking History",
      content: <VendorBookingHistory />,
    },
    {
      title: "Transaction Summary",
      content: <VendorTransactionHistory />,
    },
  ];
  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Vendor Detail"} />
        <VendorOverallSummary />
        <VendorDetail />
        <div className="card">
      <div className="card-header card-tab-hdr">
      <div className="company-tabing">
        <ul>
          {tabs.map((tab, index) => (
            <li key={index} onClick={() => setActiveTab(index)}>
              <div
                className={`tab-title ${index == activeTab ? "active" : ""}`}
              >
                <span>{tab.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-filtr">
        <div className="fltr-inner">
            <div className="fltrsrch-input">
                <label>
                    <span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#797979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M17.5003 17.4998L14.167 14.1665" stroke="#797979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </span>
                    <input type="text" placeholder="Search..." />
                </label>
            </div>
        </div>
    </div>
      </div>
        <div className="card-body">
        <div className="user-table-detail">
          <div className="tab-content">{tabs[activeTab].content}</div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default index;
