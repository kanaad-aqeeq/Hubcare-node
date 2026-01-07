
import CommanHeader from "../../common/common-header/CommonHeader";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { UserImg } from "../../../../assets/images";
import { useSelector, useDispatch } from "react-redux";
import { fetchPayoutReport } from "../../../Redux-store/Slices/serviceReports/payoutReportSlice";


const Data = [
  {
    date: "25/03/2025",
    serviceProvider: "Kl Rahul",
    amount: "405/-",
    paymentMethod: "Online",
    status: "Complete",
  },
  {
    date: "25/03/2025",
    serviceProvider: "Kl Rahul",
    amount: "405/-",
    paymentMethod: "Online",
    status: "Complete",
  },
  {
    date: "25/03/2025",
    serviceProvider: "Kl Rahul",
    amount: "405/-",
    paymentMethod: "Online",
    status: "Complete",
  },
];
const PayoutReport = () => {

   const [searchText, setSearchText] = useState('');



  const dispatch = useDispatch();
  const { payoutData, loading } = useSelector((state) => state.payoutReport); // adjust based on your slice name
  // const [showPopupDelete, setPopupDelete] = useState(false);




  useEffect(() => {
    dispatch(fetchPayoutReport());
  }, [dispatch]);





  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Payout Report"} />
        <div className="card">
          
           <div className="card-header">
          <div className="card-title">
            <h3></h3>
          </div>
          <div className="card-filtr">
            <div className="fltr-inner">
              <div className="fltrsrch-input">
                <label>
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                        stroke="#797979"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M17.5003 17.4998L14.167 14.1665"
                        stroke="#797979"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                  {/* <input type="text" placeholder="Search..." /> */}

                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      setCurrentPage(1); // Reset page to 1 when searching
                    }}
                  />


                </label>
              </div>
            </div>
          </div>
        </div>

          <div className="card-body">
            <div className="responsive-table">
              <table className="table table-row-dashed">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="w-10px">#</th>
                    <th className="w-75px">Date</th>
                    <th className="w-100px">Service Provider</th>
                    <th className="w-175px text-center">Amount (QAR)</th>
                    <th className="w-150px text-center">Payment Method</th>
                    <th className="w-150px  text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="">
                  {payoutData.map((item, index) => {
                    return (
                      <tr key={index} className="">
                        <td className="">{index + 1}</td>
                        <td className="text-start">
                          <span className="">{item.date}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.providerName}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.amount}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.paymentMethod}</span>
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

export default PayoutReport;
