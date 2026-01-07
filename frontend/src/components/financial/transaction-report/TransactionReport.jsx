import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionReport } from "../../../Redux-store/Slices/transactionReport/transactionReportSlice";

import CommanHeader from "../../common/common-header/CommonHeader";

// const TransactionReportData = [
//   {
//     transactionID: "126513461320",
//     date: "12/04/2025",
//     customerName: "Jhon",
//     serviceProvider: "SparkHive Cleaning Services",
//     amount: "600/-",
//   },
//   {
//     transactionID: "126513461320",
//     date: "12/04/2025",
//     customerName: "Jhon",
//     serviceProvider: "SparkHive Cleaning Services",
//     amount: "600/-",
//   },
//   {
//     transactionID: "126513461320",
//     date: "12/04/2025",
//     customerName: "Jhon",
//     serviceProvider: "SparkHive Cleaning Services",
//     amount: "600/-",
//   },
// ];


const TransactionReport = () => {


  const dispatch = useDispatch();


  const { report: TransactionReportData, loading, error } = useSelector(
    (state) => state.transactionReport
  );

  useEffect(() => {
    dispatch(fetchTransactionReport());
  }, [dispatch]);

  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Transaction Report"} />
        <div className="card">
          <div className="card-body">
            <div className="responsive-table">
              <table className="table table-row-dashed">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="w-10px">#</th>
                    <th className="w-75px">Transaction ID</th>
                    <th className="w-150px text-center">Date</th>
                    <th className="w-150px  text-center">Customer Name</th>
                    <th className="w-175px text-center">Service Provider</th>
                    <th className="w-175px text-center">Amount (QAR)</th>
                  </tr>
                </thead>
                <tbody className="">
                  {TransactionReportData.map((item, index) => {
                    return (
                      <tr key={index} className="">
                        <td className="">{index + 1}</td>
                        <td className="text-start">
                          <span className="">{item.transactionId}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.date}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.customerName}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.serviceProvider}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.amount}</span>
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



export default TransactionReport