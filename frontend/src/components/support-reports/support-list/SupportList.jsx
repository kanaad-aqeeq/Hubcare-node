import React from "react";
import CommanHeader from "../../common/common-header/CommonHeader";
const SupportListData = [
  {
    date: "12/04/2025",
    location: "6391 Elgin St. Celina, Delaware 10299",
    transactionID: "43357455474",
    typeOfService: "Sofa",
    serviceProvider: "SparkHive Cleaning Services",
    clientName: "Rahul",
    amount: "405/-",
  },
  {
    date: "12/04/2025",
    location: "6391 Elgin St. Celina, Delaware 10299",
    transactionID: "6434683467979",
    typeOfService: "Sofa",
    serviceProvider: "SparkHive Cleaning Services",
    clientName: "Rahul",
    amount: "405/-",
  },
  {
    date: "12/04/2025",
    location: "6391 Elgin St. Celina, Delaware 10299",
    transactionID: "556654616546",
    typeOfService: "Sofa",
    serviceProvider: "SparkHive Cleaning Services",
    clientName: "Rahul",
    amount: "405/-",
  },
];
const SupportList = () => {
  return (
    <>
       <div className="main-wrapper">
       <CommanHeader title={"Support List"} />
      <div className="card">
        <div className="card-body">
          <div className="responsive-table">
            <table className="table table-row-dashed">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="w-10px">#</th>
                  <th className="w-75px">Date</th>
                  <th className="w-175px text-center">Location</th>
                  <th className="w-150px text-center">Transaction ID</th>
                  <th className="w-100px text-center">Type Of Service</th>
                  <th className="w-100px text-center">Client Name</th>
                  <th className="w-100px text-center">Amount</th>
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
                        <span className="">{item.location}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.transactionID}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.typeOfService}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.clientName}</span>
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

export default SupportList;
