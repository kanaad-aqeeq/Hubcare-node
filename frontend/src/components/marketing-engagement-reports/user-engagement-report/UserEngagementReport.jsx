import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommanHeader from "../../common/common-header/CommonHeader";
import { fetchUserEngagementReport } from "../../../Redux-store/Slices/userEngagementReport/userEngagementReportSlice";

                                                  

// const Data = [
//   {
//     date: "12/04/2025",
//     activeUser: "10",
//     newUser: "5",
//     sessionDuration: "4days",
//     dropOffRate: "4.3",
//   },
//   {
//     date: "12/04/2025",
//     activeUser: "10",
//     newUser: "5",
//     sessionDuration: "4days",
//     dropOffRate: "4.3",
//   },
//   {
//     date: "12/04/2025",
//     activeUser: "10",
//     newUser: "5",
//     sessionDuration: "4days",
//     dropOffRate: "4.3",
//   },
// ];


const UserEngagementReport = () => {

   const dispatch = useDispatch();
  
    const { data: Data, loading, error } = useSelector(
      (state) => state.userEngagementReport
    );
    console.log("Fetched Data from Redux:", Data);

  
    useEffect(() => {
      dispatch(fetchUserEngagementReport());
    }, [dispatch]);
  




  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"User Engagement Report"} />
        <div className="card">
          <div className="card-body">
            <div className="responsive-table">
              <table className="table table-row-dashed">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="w-10px">#</th>
                    <th className="w-75px">Date</th>
                    <th className="w-175px text-center">Active Users</th>
                    <th className="w-150px text-center">New Users</th>
                    <th className="w-100px text-center">
                      Session Duration (Avg.)
                    </th>
                    <th className="w-100px text-center">Drop-off Rate (%)</th>
                  </tr>
                </thead>
                <tbody className="">
                  {Data?.map((item, index) => {
                    return (
                      <tr key={index} className="">
                        <td className="">{index + 1}</td>
                        <td className="text-start">
                          <span className="">{item.date}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.activeUsers}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.newUsers}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.averageSessionDuration}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.dropOffRate}</span>
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

export default UserEngagementReport;
