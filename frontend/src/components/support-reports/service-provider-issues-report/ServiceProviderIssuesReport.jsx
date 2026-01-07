import React from "react";
import CommanHeader from "../../common/common-header/CommonHeader";
const ServiceProviderIssuesReportData = [
  {
    complaintID: "Complaint ID: 641614",
    serviceProvider: "SparkHive Cleaning Services",
    date: "25/03/2025",
    issue:
      "Dust, clutter, stains, odors, pet hair, mold, grime, organization, time, effort.",
    resolutionStatus:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    complaintID: "Complaint ID: 84218",
    serviceProvider: "SparkHive Cleaning Services",
    date: "25/03/2025",
    issue:
      "Dust, clutter, stains, odors, pet hair, mold, grime, organization, time, effort.",
    resolutionStatus:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    complaintID: "Complaint ID: 4747984",
    serviceProvider: "SparkHive Cleaning Services",
    date: "25/03/2025",
    issue:
      "Dust, clutter, stains, odors, pet hair, mold, grime, organization, time, effort.",
    resolutionStatus:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
const ServiceProviderIssuesReport = () => {
  return (
    <>
      <div className="main-wrapper">
      <CommanHeader title={"Service Provider Issues Report"} />
      <div className="card">
        <div className="card-body">
          <div className="responsive-table">
            <table className="table table-row-dashed">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="w-10px">#</th>
                  <th className="w-150px">Complaint ID</th>
                  <th className="w-150px text-center">Service Provider</th>
                  <th className="w-100px text-center">Date</th>
                  <th className="w-175px  text-center">Issue</th>
                  <th className="w-175px text-center">Resolution Status</th>
                </tr>
              </thead>
              <tbody className="">
                {ServiceProviderIssuesReportData.map((item, index) => {
                  return (
                    <tr key={index} className="">
                      <td className="">{index + 1}</td>
                      <td className="text-start">
                        <span className="">{item.complaintID}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.serviceProvider}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.date}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.issue}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.resolutionStatus}</span>
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

export default ServiceProviderIssuesReport;
