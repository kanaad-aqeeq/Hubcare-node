import React from "react";
const Data = [
  {
    date: "25/03/2025",
    totalBookings: "20",
    peakHours:"150/-",
    totalRevenue:"250/-",
  },
  {
    date: "25/03/2025",
    totalBookings: "20",
    peakHours:"150/-",
    totalRevenue:"250/-",
  },
  {
    date: "25/03/2025",
    totalBookings: "20",
    peakHours:"150/-",
    totalRevenue:"250/-",
  },
];
const BookingReport = () => {
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
                  <th className="w-100px">Total Booking</th>
                  <th className="w-175px text-center">Peak Hours</th>
                  <th className="w-150px text-center">Total Revenue</th>
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
                        <span className="">{item.totalBookings}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.peakHours}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.totalBookings}</span>
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


export default BookingReport