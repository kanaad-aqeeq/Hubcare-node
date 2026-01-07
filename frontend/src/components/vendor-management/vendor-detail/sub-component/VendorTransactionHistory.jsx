import React from 'react'
const driverData = [
  {
    transactionId: "#12345",
    description: "Amount Withdrawal",
    date: "9:00AM,03/Jan/1992",
    amount: "-100",
  },
  {
      transactionId: "#12345",
      description: "Amount Withdrawal",
      date: "9:00AM,03/Jan/1992",
      amount: "-100",
    },{
      transactionId: "#12345",
      description: "Amount Withdrawal",
      date: "9:00AM,03/Jan/1992",
      amount: "-100",
    },
];
const VendorTransactionHistory = () => {


  return (
    <>
          <div className="responsive-table">
            <table className="table table-row-dashed">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="w-10px">#</th>
                  <th className="w-100px">Transaction ID</th>
                  <th className="w-200px text-center">Description</th>
                  <th className="w-200px  text-center">Date</th>
                  <th className="w-175px text-center">Amount</th>
                </tr>
              </thead>
              <tbody className="">
                {driverData.map((item, index) => {
                  return (
                    <tr key={index} className="">
                      <td className="">{index + 1}</td>
                      <td className="text-start">
                        <span className="">{item.transactionId}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.description}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.date}</span>
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
    </>
  );
};



export default VendorTransactionHistory