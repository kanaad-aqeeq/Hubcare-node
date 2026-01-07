import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SvgActionViewIcon, SvgCheckIcon, SvgDeleteIcon, SvgUncheckIcon } from "../../../common/sidebar/svg/Svg";
import { UserImg } from "../../../../assets/images";
import PopupDelete from "./PopupDelete";
const  BookingTable = () => {
  const [showPopupDelete, setPopupDelete] = useState(false);
  const handlePopupDelete = () => {
    setPopupDelete((p) => !p);
  };
  const UserHistoryListData = [
    {
      VendorName: "Amit Singh",
      ServiceName: "Sofa Cleaning",
      ServiceCategory: "Home Care",
      BookingId: "#12353",
      status: "Pending",
      userName: "John Doe",
      userId: "#1234",
    },
    {
      VendorName: "Rahul Awadhiya",
      ServiceName: "Sofa Cleaning",
      ServiceCategory: "Home Care",
      BookingId: "#12355",
      status: "Accepted",
      userName: "John Doe",
      userId: "#1234",
    },
    {
      VendorName: "Neeraj Gupta",
      ServiceName: "Sofa Cleaning",
      ServiceCategory: "Home Care",
      BookingId: "#12358",
      status: "Assigned",
      userName: "John Doe",
      userId: "#1234",
    },
    {
      VendorName: "Anish Singh",
      ServiceName: "Sofa Cleaning",
      ServiceCategory: "Home Care",
      BookingId: "#12356",
      status: "Completed",
      userName: "John Doe",
      userId: "#1234",
    },
    {
      VendorName: "Rohit Roy",
      ServiceName: "Sofa Cleaning",
      ServiceCategory: "Home Care",
      BookingId: "#12359",
      status: "Canceled",
      userName: "John Doe",
      userId: "#1234",
    },
  ];
  const statusBadgeClass = {
    Pending: "badge-warning",
    Accepted: "badge-primary",
    Assigned: "badge-secondary",
    Canceled: "badge-danger",
    Completed: "badge-success",
  };
  return (
    <>
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
                  <input type="text" placeholder="Search..." />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="responsive-table stkytable-action">
            <table className="table table-row-dashed">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="w-10px">#</th>
                  <th className="w-200px text-start">User Detail</th>
                  <th className="w-200px text-start">Service Details</th>
                  <th className="w-200px  text-start">Vendor Detail</th>
                  <th className="w-100px text-center">Booking Date</th>
                  <th className="w-100px text-center">Servicing Date</th>
                  <th className="w-100px text-center">Status</th>
                  <th className="w-100px text-end">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {UserHistoryListData.map((item, index) => {
                  return (
                    <tr key={index} className="">
                      <td className="">{index + 1}</td>
                      <td className="text-start">
                        <div className="user-deatil-main">
                          <span
                            style={{ backgroundImage: `url(${UserImg})` }}
                          ></span>
                          <div className="user-info">
                            <div className="user-info-inner">
                              <p>{item.userName}</p>
                            </div>
                            <div className="user-id-inner">
                              <p className="d-block fw-bold titl-view">
                                User id:{item.userId}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-start">
                        <div className="user-info">
                          <div className="user-info-inner">
                            <p>{item.ServiceName}</p>
                          </div>
                          <div className="user-id-inner">
                            <p className="d-block fw-bold titl-view">
                              Category:{item.ServiceCategory}
                            </p>
                            <p className="d-block fw-bold titl-view">
                              Bkng id:{item.BookingId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-start">
                        <span className="">{item.VendorName}</span>
                      </td>
                      <td className="text-center">
                        <span className="">12-03-2025</span>
                      </td>
                      <td className="text-center">
                        <span className="">14-03-2025</span>
                      </td>
                    
                      <td className="text-center">
                        <span
                          className={`badge ${
                            statusBadgeClass[item.status] || "badge-secondary"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="action-main">
                          <div className="action-inner">
                            <div className="action-buttons">
                              <Link to="/booking-detail" className="view-action">
                                <SvgActionViewIcon />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showPopupDelete && <PopupDelete handlePopup={handlePopupDelete} />}
    </>
  );
};


  
export default BookingTable;
