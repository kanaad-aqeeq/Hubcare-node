

// import { SvgActionViewIcon, SvgDeleteIcon } from "../../../common/sidebar/svg/Svg";
// import PopupDelete from "./PopupDelete";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { UserImg } from "../../../../assets/images";
import { useSelector, useDispatch } from "react-redux";
import { fetchProviderPerformanceReport } from "../../../Redux-store/Slices/serviceReports/providerperformanceSlice";
import CommanHeader from "../../common/common-header/CommonHeader";

const Data = [
  {
    serviceProvider: "Kl Rahul",
    totalBookings: "5",
    completed: "25/03/2025",
    canceled:
      "Dust, clutter, stains, odors, pet hair, mold, grime, organization, time, effort.",
    earnings: "405/-",
  },
  {
    serviceProvider: "Kl Rahul",
    totalBookings: "8",
    completed: "25/03/2025",
    canceled:
      "Dust, clutter, stains, odors, pet hair, mold, grime, organization, time, effort.",
    earnings: "405/-",
  },
  {
    serviceProvider: "Kl Rahul",
    totalBookings: "2",
    completed: "25/03/2025",
    canceled:
      "Dust, clutter, stains, odors, pet hair, mold, grime, organization, time, effort.",
    earnings: "405/-",
  },
];
const ServiceProviderPerformance = () => {

    const [searchText, setSearchText] = useState('');




  const dispatch = useDispatch();
  const {data: reportData =[], loading } = useSelector((state) => state.providerPerformance); // adjust based on your slice name
  // const [showPopupDelete, setPopupDelete] = useState(false);
  console.log("service provider performance report data",typeof reportData, reportData);




  useEffect(() => {
    dispatch(fetchProviderPerformanceReport());
  }, [dispatch]);


  return (
    <>
      <div className="main-wrapper">
        <CommanHeader title={"Service Provider Performance"} />
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
                    <th className="w-75px">Service Provider</th>
                    <th className="w-175px text-center">Total Bookings</th>
                    <th className="w-150px text-center">Completed</th>
                    <th className="w-150px  text-center">Cancelled</th>
                    <th className="w-175px text-center">Earnings (QAR)</th>
                  </tr>
                </thead>
                <tbody className="">
                  {reportData.map((item, index) => {
                    return (
                      <tr key={index} className="">
                        <td className="">{index + 1}</td>
                        <td className="text-start">
                          <span className="">{item.serviceProvider}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.totalBookings}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.completed}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.cancelled}</span>
                        </td>
                        <td className="text-center">
                          <span className="">{item.earnings}</span>
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

export default ServiceProviderPerformance;
