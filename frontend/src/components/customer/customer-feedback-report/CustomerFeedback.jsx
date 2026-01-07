import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerFeedbackReport } from "../../../Redux-store/Slices/customerFeedbackReport/customerFeedbackReportSlice"; 


import CommanHeader from "../../common/common-header/CommonHeader";


// const SupportListData = [
//   {
//     customerName: "Mahila Jayawardhane",
//     serviceProvider: " Lasith Malinga ",
//     rating: "4",
//     review: "SparkHive Cleaning Services",
//     date: "12/04/2025",
//   },
//   {
//     customerName: "Mahila Jayawardhane",
//     serviceProvider: " Lasith Malinga ",
//     rating: "4",
//     review: "SparkHive Cleaning Services",
//     date: "12/04/2025",
//   },
//   {
//     customerName: "Mahila Jayawardhane",
//     serviceProvider: " Lasith Malinga ",
//     rating: "4",
//     review: "SparkHive Cleaning Services",
//     date: "12/04/2025",
//   },
// ];


const CustomerFeedback = () => {

   const dispatch = useDispatch();
    
    const { data: SupportListData, loading, error } = useSelector(
      (state) => state.customerFeedback
    );
  
    useEffect(() => {
      dispatch(fetchCustomerFeedbackReport());
    }, [dispatch]);




  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Customer Feedback Report"} />
        <div className="card">
          <div className="card-body">
            <div className="responsive-table">
              <table className="table table-row-dashed">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="w-10px">#</th>
                    <th className="w-75px">Date</th>
                    <th className="w-175px text-center">Customer Name</th>
                    <th className="w-150px text-center">Service Provider</th>
                    <th className="w-100px text-center">Rating (1-5)</th>
                    <th className="w-100px text-center">Review</th>
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
                          <span className="">{item.customerName}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.serviceProvider}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.rating}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.review}</span>
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

export default CustomerFeedback;
