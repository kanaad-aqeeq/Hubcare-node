import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommissionReport } from "../../../Redux-store/Slices/commissionReport/commissionReportSlice";
// src\Redux-store\Slices\commissionReport\commissionReportSlice.js
import CommanHeader from "../../common/common-header/CommonHeader";
// const CommissionReportData = [
//   {
//     date: "12/04/2025",
//     serviceProvider: "SparkHive Cleaning Services",
//     totalEarning: "500/-",
//     commission: "95/-",
//     payoutAfterCommission: "405/-",
//   },
//   {
//     date: "12/04/2025",
//     serviceProvider: "SparkHive Cleaning Services",
//     totalEarning: "500/-",
//     commission: "95/-",
//     payoutAfterCommission: "405/-",
//   },
//   {
//     date: "12/04/2025",
//     serviceProvider: "SparkHive Cleaning Services",
//     totalEarning: "500/-",
//     commission: "95/-",
//     payoutAfterCommission: "405/-",
//   },
// ];
const CommissionReport = () => {



    const dispatch = useDispatch();
  
  
    const { report: CommissionReportData, loading, error } = useSelector(
      (state) => state.commissionReport
    );
  
    useEffect(() => {
      dispatch(fetchCommissionReport());
    }, [dispatch]);
  



  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Commission Report"} />
        <div className="card">
          <div className="card-body">
            <div className="responsive-table">
              <table className="table table-row-dashed">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="w-10px">#</th>
                    <th className="w-75px">Date</th>
                    <th className="w-175px text-center">Service Provider</th>
                    <th className="w-150px text-center">Total Earning</th>
                    <th className="w-150px  text-center">Commission (19%)</th>
                    <th className="w-175px text-center">
                      Payout After Commission
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {CommissionReportData.map((item, index) => {
                    return (
                      <tr key={index} className="">
                        <td className="">{index + 1}</td>
                        <td className="text-start">
                          <span className="">{item.date}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.serviceProvider}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.totalEarning}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.commission}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.payout}</span>
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

export default CommissionReport;
