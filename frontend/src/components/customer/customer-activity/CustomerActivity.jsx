import React from "react";
import CommanHeader from "../../common/common-header/CommonHeader";
const SupportListData = [
  {
    date: "12/04/2025",
    newRegistrations: "Pending",
    activeUsers: "Online",
    repeatCustomers: "SparkHive Cleaning Services",
    totalCustomers: "10",
  },
  {
    date: "12/04/2025",
    newRegistrations: "Pending",
    activeUsers: "Online",
    repeatCustomers: "SparkHive Cleaning Services",
    totalCustomers: "10",
  },
  {
    date: "12/04/2025",
    newRegistrations: "Pending",
    activeUsers: "Online",
    repeatCustomers: "SparkHive Cleaning Services",
    totalCustomers: "10",
  },
];
const CustomerActivity = () => {
  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Customer Activity"} />
        <div className="card">
          <div className="card-body">
            <div className="responsive-table">
              <table className="table table-row-dashed">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="w-10px">#</th>
                    <th className="w-75px">Date</th>
                    <th className="w-175px text-center">New Registrations</th>
                    <th className="w-150px text-center">Active Users</th>
                    <th className="w-100px text-center">Repeat Customers</th>
                    <th className="w-100px text-center">Total Customers</th>
                  </tr>
                </thead>
                <tbody className="">
                  {SupportListData.map((item, index) => {
                    return (
                      <tr key={index} className="">
                        <td className="">{index + 1}</td>
                        <td className="text-start">
                          <span className="">{item.date}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.newRegistrations}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.activeUsers}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.repeatCustomers}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.totalCustomers}</span>
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

export default CustomerActivity;
