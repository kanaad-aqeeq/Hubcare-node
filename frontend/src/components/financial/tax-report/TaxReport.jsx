import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaxReport } from "../../../Redux-store/Slices/taxReport/taxReportSlice";
import CommanHeader from "../../common/common-header/CommonHeader";



const TaxReportData = [
  {
    date: "12/04/2025",
    transactionID: "564464649644",
    customerName: "Jhon",
    serviceProvider: "SparkHive Cleaning Services",
    serviceAmount: "650/-",
  },
  {
    date: "12/04/2025",
    transactionID: "564464649644",
    customerName: "Jhon",
    serviceProvider: "SparkHive Cleaning Services",
    serviceAmount: "650/-",
  },
  {
    date: "12/04/2025",
    transactionID: "564464649644",
    customerName: "Jhon",
    serviceProvider: "SparkHive Cleaning Services",
    serviceAmount: "650/-",
  },
];
const TaxReport = () => {



 const  dispatch = useDispatch();

    const { report: TaxReportData, loading, error } = useSelector(
      (state) => state.taxReport
    );
  

  useEffect(() => { dispatch(fetchTaxReport()) }, [dispatch]);




  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Tax Report"} />
        <div className="card">
          <div className="card-body">
            <div className="responsive-table">
              <table className="table table-row-dashed">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="w-10px">#</th>
                    <th className="w-75px">Date</th>
                    <th className="w-175px text-center">Transaction ID</th>
                    <th className="w-150px text-center">Customer Name</th>
                    <th className="w-200px  text-center">Service Provider</th>
                    <th className="w-175px text-center">Servie Amount</th>
                  </tr>
                </thead>
                <tbody className="">
                  {TaxReportData.map((item, index) => {
                    return (
                      <tr key={index} className="">
                        <td className="">{index + 1}</td>
                        <td className="text-start">
                          <span className="">{item.date}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.transactionId}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.customerName}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.serviceProvider}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.serviceAmount}</span>
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

export default TaxReport;
