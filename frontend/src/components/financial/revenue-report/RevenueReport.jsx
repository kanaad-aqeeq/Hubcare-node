import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRevenueReport } from "../../../Redux-store/Slices/revenueReport/revenueReportSlice";
import CommanHeader from "../../common/common-header/CommonHeader";
// const RevenueReportData = [
//   {
//     date: "12/2/2025",
//     totalEarnings: "500/-",
//     commissions: "95/-",
//     serviceProviderPayout: "205/-",
//     netRevenue: "200/-",
//   },
//   {
//     date: "22/05/2025",
//     totalEarnings: "500/-",
//     commissions: "95/-",
//     serviceProviderPayout: "205/-",
//     netRevenue: "200/-",
//   },
//   {
//     date: "12/2/2025",
//     totalEarnings: "500/-",
//     commissions: "95/-",
//     serviceProviderPayout: "205/-",
//     netRevenue: "200/-",
//   },
// ];
const RevenueReport = () => {

  const dispatch = useDispatch();


  const { report: RevenueReportData, loading, error } = useSelector(
    (state) => state.revenueReport
  );

  useEffect(() => {
    dispatch(fetchRevenueReport());

  }, [dispatch]);


  return (
    <>
      {loading && <p>Loading...</p>}
      <div className="main-wrapper">
        <CommanHeader title={"Revenue Report"} />
        <div className="card">
          <div className="card-body">
            <div className="responsive-table">
              <table className="table table-row-dashed">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="w-10px">#</th>
                    <th className="w-75px">Date</th>
                    <th className="w-150px text-center">
                      Total Earnings (QAR)
                    </th>
                    <th className="w-150px  text-center">Commissions (19%)</th>
                    <th className="w-175px text-center">
                      Service Provider Payout
                    </th>
                    <th className="w-175px text-center">Net Revenue</th>
                  </tr>
                </thead>
                <tbody className="">
                  {RevenueReportData.map((item, index) => {
                    return (
                      <tr key={index} className="">
                        <td className="">{index + 1}</td>
                        <td className="text-start">
                          <span className="">{item.date}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.totalEarnings}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.commission}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.serviceProviderPayout}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.netRevenue}</span>
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

export default RevenueReport;
