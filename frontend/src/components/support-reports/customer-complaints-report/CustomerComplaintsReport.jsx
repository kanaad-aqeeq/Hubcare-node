import React from "react";
import CommanHeader from "../../common/common-header/CommonHeader";
const CustomerComplaintsReportData = [
  {
    complaintID: "Complaint ID: 641614",
    customerName: "Virat Kohli",
    date: "25/03/2025",
    issue:
      "Dust, clutter, stains, odors, pet hair, mold, grime, organization, time, effort.",
    status: "405/-",
  },
  {
    complaintID: "Complaint ID: 641614",
    customerName: "MS Dhoni",
    date: "25/03/2025",
    issue:
      "Dust, clutter, stains, odors, pet hair, mold, grime, organization, time, effort.",
    status: "405/-",
  },
  {
    complaintID: "Complaint ID: 641614",
    customerName: "Rohit",
    date: "25/03/2025",
    issue:
      "Dust, clutter, stains, odors, pet hair, mold, grime, organization, time, effort.",
    status: "405/-",
  },
];
const CustomerComplaintsReport = () => {
  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Customer Complaints Report"} />
        <div className="card">
          <div className="card-body">
            <div className="responsive-table">
              <table className="table table-row-dashed">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="w-10px">#</th>
                    <th className="w-150px">Complaint ID</th>
                    <th className="w-175px text-center">Customer Name</th>
                    <th className="w-150px text-center">Date</th>
                    <th className="w-175px  text-center">Issue</th>
                    <th className="w-100px text-center">
                      Status (Resolved/Pending)
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {CustomerComplaintsReportData.map((item, index) => {
                    return (
                      <tr key={index} className="">
                        <td className="">{index + 1}</td>
                        <td className="text-start">
                          <span className="">{item.complaintID}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.customerName}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.date}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.issue}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.status}</span>
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

export default CustomerComplaintsReport;
