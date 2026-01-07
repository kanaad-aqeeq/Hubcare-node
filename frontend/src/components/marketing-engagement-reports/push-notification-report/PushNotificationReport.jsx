import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommanHeader from "../../common/common-header/CommonHeader";
import { fetchPushNotificationReport } from "../../../Redux-store/Slices/pushNotification/pushNotificationSlice";

// const Data = [
//   {
//     notificationTitle: "Running Parcal",
//     sentDate: "12/02/2025",
//     openRate: "2%",
//     clickThroughRate: "10%",
//     conversionRate: "5%",
//   },
//   {
//     notificationTitle: "Running Parcal",
//     sentDate: "12/02/2025",
//     openRate: "2%",
//     clickThroughRate: "10%",
//     conversionRate: "5%",
//   },
//   {
//     notificationTitle: "Running Parcal",
//     sentDate: "12/02/2025",
//     openRate: "2%",
//     clickThroughRate: "10%",
//     conversionRate: "5%",
//   },
// ];


const PushNotificationReport = () => {


  const dispatch = useDispatch();

  const { data: Data, loading, error } = useSelector(
    (state) => state.pushNotificationReport
  );
  console.log("Fetched Data from Redux:", Data);


  useEffect(() => {
    dispatch(fetchPushNotificationReport());
  }, [dispatch]);







  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Push Notification Report"} />
        <div className="card">
          <div className="card-body">
            <div className="responsive-table">
              <table className="table table-row-dashed">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="w-10px">#</th>
                    <th className="w-75px">Notification Title</th>
                    <th className="w-175px text-center">Sent Date</th>
                    <th className="w-150px text-center">Open Rate (%)</th>
                    <th className="w-100px text-center">
                      Click Through Rate (%)
                    </th>
                    <th className="w-100px text-center">Conversion Rate (%)</th>
                  </tr>
                </thead>
                <tbody className="">
                  {Data.map((item, index) => {
                    return (
                      <tr key={index} className="">
                        <td className="">{index + 1}</td>
                        <td className="text-start">
                          <span className="">{item.title}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.sentDate}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.openRate}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.clickThroughRate}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.conversionRate}</span>
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

export default PushNotificationReport;
