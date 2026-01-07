import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommanHeader from "../../common/common-header/CommonHeader";
import { fetchPromoCampaignReport } from "../../../Redux-store/Slices/promoCampaignReport/promoCampaignReportSlice";


// const Data = [
//   {
//     campaingName: "UniqueLab",
//     discountType: "19%",
//     totalredemptions: "12",
//     revenueImpact: "Lorem",
//     duration: "2days",
//   },
//   {
//     campaingName: "UniqueLab",
//     discountType: "19%",
//     totalredemptions: "12",
//     revenueImpact: "Lorem",
//     duration: "2days",
//   },
//   {
//     campaingName: "UniqueLab",
//     discountType: "19%",
//     totalredemptions: "12",
//     revenueImpact: "Lorem",
//     duration: "2days",
//   },
// ];


const PromoCampaignReport = () => {

  const dispatch = useDispatch();

  const { data: Data, loading, error } = useSelector(
    (state) => state.promoCampaignReport
  );

  useEffect(() => {
    dispatch(fetchPromoCampaignReport());
  }, [dispatch]);


  return (
    <>
      {loading && <p>Loading...</p>}
      <div className="main-wrapper">
        <CommanHeader title={"Promo Campaign Report"} />
        <div className="card">
          <div className="card-body">
            <div className="responsive-table">
              <table className="table table-row-dashed">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="w-10px">#</th>
                    <th className="w-75px">Campaign Name</th>
                    <th className="w-175px text-center">Discount Type</th>
                    <th className="w-150px text-center">Total Redemptions</th>
                    <th className="w-100px text-center">
                      Revenue Impact (QAR)
                    </th>
                    <th className="w-100px text-center">Duration</th>
                  </tr>
                </thead>
                <tbody className="">
                  {Data.map((item, index) => {
                    return (
                      <tr key={index} className="">
                        <td className="">{index + 1}</td>
                        <td className="text-start">
                          <span className="">{item.campaignName}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.discountType}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.totalRedemptions}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.revenueImpact}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.duration}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromoCampaignReport;
