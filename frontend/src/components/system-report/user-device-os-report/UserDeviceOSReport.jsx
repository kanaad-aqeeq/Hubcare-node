import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeviceOsReport } from "../../../Redux-store/Slices/deviceOsReport/deviceOsReportSlice"; 
import CommanHeader from "../../common/common-header/CommonHeader";

// const CustomerComplaintsReportData = [
//   {
//     deviceType: "Phone",
//     oS: "Nil",
//     totalUsers: "150",
//     Share: "Lorem",
//   },
//   {
//     deviceType: "Phone",
//     oS: "Nil",
//     totalUsers: "150",
//     Share: "Lorem",
//   },
//   {
//     deviceType: "Phone",
//     oS: "Nil",
//     totalUsers: "150",
//     Share: "Lorem",
//   },
// ];
const UserDeviceOSReport = () => {


  const dispatch = useDispatch();
    
    const { data: CustomerComplaintsReportData, loading, error } = useSelector(
      (state) => state.deviceOsReport
    );
  
    useEffect(() => {
      dispatch(fetchDeviceOsReport());
    }, [dispatch]);






  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"User Device & OS Report"} />
        <div className="card">
          <div className="card-body">
            <div className="responsive-table">
              <table className="table table-row-dashed">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="w-10px">#</th>
                    <th className="w-150px">Device Type</th>
                    <th className="w-175px text-center">OS</th>
                    <th className="w-150px text-center">Total Users</th>
                    <th className="w-175px  text-center">% Share</th>
                  </tr>
                </thead>
                <tbody className="">
                  {CustomerComplaintsReportData.map((item, index) => {
                    return (
                      <tr key={index} className="">
                        <td className="">{index + 1}</td>
                        <td className="text-start">
                          <span className="">{item.deviceType}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.os}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.totalUsers}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.share}</span>
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

export default UserDeviceOSReport;
