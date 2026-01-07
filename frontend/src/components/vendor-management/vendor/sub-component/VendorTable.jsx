import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllVendors } from "../../../../Redux-store/Slices/vendorall/vendorSlice";
import { Link } from "react-router-dom";
// import { SvgActionViewIcon } from "../../../common/sidebar/svg/Svg";
// import { UserImg } from "../../../assets/images";
import {
  SvgActionViewIcon,
  SvgCheckIcon,
  SvgDeleteIcon,
  SvgMessageIcon,
  SvgPhoneIcon,
  SvgUncheckIcon,
} from "../../../common/sidebar/svg/Svg";
import PopupDelete from "./PopupDelete";
const VendorTable = () => {
  const dispatch = useDispatch();


  // const { id } = useParams();  // Get user id from URL param
  const { vendorList, loading, error } = useSelector(state => state.vendors);


  useEffect(() => {

    dispatch(fetchAllVendors());

  }, [dispatch]);

  // const companyData = [
  //   {
  //     companyName: "John Doe",
  //     companyId: "#1234",
  //     companyPhoneNo: "7777777777",
  //     companyEmail: "abcdwe@gmail.com",
  //   },
  //   {
  //     companyName: "John Doe",
  //     companyId: "#1234",
  //     companyPhoneNo: "7777777777",
  //     companyEmail: "abcdwe@gmail.com",
  //   },
  //   {
  //     companyName: "John Doe",
  //     companyId: "#1234",
  //     companyPhoneNo: "7777777777",
  //     companyEmail: "abcdwe@gmail.com",
  //   },
  // ];
  const [showPopupDelete, setPopupDelete] = useState(false);
  const handlePopupDelete = () => {
    setPopupDelete((p) => !p);
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
                  <th className="w-200px">Vendor Detail</th>
                  <th className="w-175px">Company Detail</th>
                  <th className="w-100px text-start">Contact Detail</th>
                  <th className="w-175px text-start">Address</th>
                  <th className="w-100px text-center">Reg.date</th>
                  <th className="w-100px text-center">Service Type</th>
                  <th className="w-70px  text-center">Status</th>
                  <th className="w-70px  text-end">Action</th>
                </tr>
              </thead>
              <tbody >
                {vendorList.map((item, index) => {
                  return (
                    <tr key={index} className="">
                      <td className="">{index + 1}</td>
                      <td className="text-start">
                        <div className="user-deatil-main">
                          <div className="user-info">
                            <div className="user-info-inner">
                              <p>{item.name}</p>
                            </div>
                            <div className="user-id-inner">
                              <p className="d-block fw-bold titl-view">
                                Vendor id:{item.id}
                              </p>
                              {/* <p className="d-block fw-bold titl-view">
                                Vendor id:{item.companyname}
                              </p> */}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-start">
                        <span className="">Aranya HomeCare Services</span>
                      </td>
                      <td className="text-start">
                        <div class="user-contact-detail">
                          <span className="td-icon">
                            <SvgPhoneIcon />
                          </span>
                          <span className="">{item.phone}</span>
                        </div>
                        <div class="user-contact-detail">
                          <span className="td-icon">
                            <SvgMessageIcon />
                          </span>
                          <span className="">{item.email}</span>
                        </div>
                      </td>
                      <td className="text-start">
                        <span className="">
                          {item.companyaddress}
                          {/* 71, PU4, Behind C21 Mall, Scheme 41, V... */}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.createdAt}</span>
                      </td>
                      <td className="text-center">
                        {/* <span className="">category</span> */}
                        <span className="">{item.category?.categoryName || 'N/A'}</span>
                      </td>

                      <td class="text-center">
                        <div class="ordrstats-acprjct">
                          <span class="ordrstats-icon acept-icon">
                            <SvgCheckIcon />
                          </span>
                          <span class="ordrstats-icon rejct-icon">
                            <SvgUncheckIcon />
                          </span>
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="action-main">
                          <div class="action-inner">
                            <div class="svcrd-togl me-2">
                              <div class="tgl-sld">
                                <label>
                                  <input type="checkbox" />
                                  <span>
                                    <i></i>
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="action-inner">
                            <div class="action-buttons">
                              {/* <Link to="/vendor-detail" class="view-action">
                                <SvgActionViewIcon />
                              </Link> */}
                                <Link to={`/vendor-detail/${item.id}`} className="view-action"> <SvgActionViewIcon /></Link>
                            </div>
                          </div>
                          <div class="action-inner">
                            <div class="action-buttons">
                              <span
                                class="view-action"
                                onClick={handlePopupDelete}
                              >
                                <SvgDeleteIcon />
                              </span>
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

export default VendorTable;
