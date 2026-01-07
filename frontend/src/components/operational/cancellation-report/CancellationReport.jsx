import React from "react";
const Data = [
  {
    date: "25/03/2025",
    bookingID: "bookingID:6546",
    customerName: "Kl Rahul",
    serviceProvider:"9999999999",
    reasonCancellation:"Issues",
  },
  {
    date: "25/03/2025",
    bookingID: "bookingID:65464",
    customerName: "Kl Rahul",
    serviceProvider:"9999999999",
    reasonCancellation:"Issues",
  },
  {
    date: "25/03/2025",
    bookingID: "bookingID:654654",
    customerName: "Kl Rahul",
    serviceProvider:"9999999999",
    reasonCancellation:"Issues",
  },
];
const CancellationReport = () => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="responsive-table">
            <table className="table table-row-dashed">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="w-10px">#</th>
                  <th className="w-75px">Date</th>
                  <th className="w-100px">Booking ID</th>
                  <th className="w-175px text-center">Customer Name</th>
                  <th className="w-150px text-center">Service Provider</th>
                  <th className="w-150px  text-center">Reason for Cancellation</th>
                </tr>
              </thead>
              <tbody className="">
                {Data.map((item, index) => {
                  return (
                    <tr key={index} className="">
                      <td className="">{index + 1}</td>
                      <td className="text-start">
                        <span className="">{item.date}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.bookingID}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.customerName}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.serviceProvider}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.reasonCancellation}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};


export default CancellationReport