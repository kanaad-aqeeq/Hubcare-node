import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVendorDetails } from "../../../../Redux-store/Slices/vendordetails/vendordetailSlice";
// import { fetchProviderBookings } from "../../../../Redux-store/Slices/vendordashboard/provideBooking";
import { Link } from "react-router-dom";
import { BlankDocument, ProfileSqrImage } from "../../../../assets/images";
import { SvgCheckIcon, SvgUncheckIcon } from "../../../common/sidebar/svg/Svg";

const VendorDetail = () => {

  const dispatch = useDispatch();
  const { id } = useParams();


  const { vendor, loading, error } = useSelector(state => state.vendorDetails);

  // const { provider, loadings, errors } = useSelector(state => state.providerBooking);





  useEffect(() => {
    if (id) {
      dispatch(fetchVendorDetails(id));
      // dispatch(fetchProviderBookings(id))
    }
  }, [dispatch, id]);



  if (loading) return <p>Loading vendor details...</p>;
  if (error) return <p>Error loading vendor details: {error}</p>;


  return (
    <>
      <div className="card">
        <div className="card-header card-hdr-flex">
          <div className="card-title">
            <h3>Vendor Information</h3>
          </div>
          <div class="ordrstats-acprjct">
            <span class="ordrstats-icon acept-icon">
              <SvgCheckIcon />
            </span>
            <span class="ordrstats-icon rejct-icon">
              <SvgUncheckIcon />
            </span>
          </div>
        </div>
        <div className="card-body">
          <div className="ordr-infrmtion">
            <div className="usrprfl-srcen">
              <div className="userprfl-frame">
                <span
                  style={{ backgroundImage: `url(${ProfileSqrImage})` }}
                ></span>
              </div>
            </div>
            <div className="userdtl-card">
              <div className="userdtl-inner">
                <div className="brnd-vndrnmbr">
                  <p>Company Name</p>
                  {/* <h4>Rapido Bike Services</h4> */}
                  <h4>{vendor?.companyname || 'Loading...'}</h4>
                </div>
                <div className="brnd-vndrnmbr">
                  <p>Company Owner Name</p>
                  {/* <h4>Rahul Saxena</h4> */}
                  <h4>{vendor?.name || 'Loading...'}</h4>
                </div>
                <div className="brnd-vndrnmbr">
                  <p>Date Of Registration</p>
                  {/* <h4>12-06-2024</h4> */}
                  <h4>{vendor?.createdAt || 'Loading...'}</h4>
                </div>
              </div>
              <div className="userdtl-inner">
                <div className="brnd-vndrnmbr">
                  <p>Phone No.</p>
                  {/* <h4>9999999999</h4> */}
                  <h4>{vendor?.phone || 'Loading...'}</h4>
                </div>
                <div className="brnd-vndrnmbr">
                  <p>Email</p>
                  <h4>{vendor?.email}</h4>
                </div>
                <div className="brnd-vndrnmbr">
                  <p>Company Status</p>
                  <h4>
                    <span className="badge badge-primary">Available</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <h3>Vendor Documents</h3>
          </div>
        </div>
        <div className="card-body">
          <div className="documents-lists">
            {/* <ul>
              <li>
                <div className="document-title">
                  <h3>Government Id/License Number</h3>
                </div>
                <div className="document-bg">
                  <span
                    style={{ backgroundImage: `url(${BlankDocument})` }}
                  ></span>
                </div>
              </li>

              <li>
                <div className="document-title">
                  <h3>Supporting Document</h3>
                </div>
                <div className="document-bg">
                  <span
                    style={{ backgroundImage: `url(${BlankDocument})` }}
                  ></span>
                </div>
              </li>
              <li>
                <div className="document-title">
                  <h3>National Id</h3>
                </div>
                <div className="document-bg">
                  <span
                    style={{ backgroundImage: `url(${BlankDocument})` }}
                  ></span>
                </div>
              </li>
            </ul> */}

            <ul>
              <li>
                <div className="document-title">
                  <h3>Government Id/License Number</h3>
                </div>
                <div className="document-bg">
                  <span
                    style={{
                      backgroundImage: `url(${import.meta.env.VITE_BASE_URL}${vendor?.govtId})`,

                    }}
                  ></span>
                </div>
              </li>
              <li>
                <div className="document-title">
                  <h3>Supporting Document</h3>
                </div>
                <div className="document-bg">
                  <span
                    style={{
                      backgroundImage: `url(${import.meta.env.VITE_BASE_URL}${vendor?.supportingDocument})`,
                    }}
                  ></span>
                </div>
              </li>
              <li>
                <div className="document-title">
                  <h3>National Id</h3>
                </div>
                <div className="document-bg">
                  <span
                    style={{
                      backgroundImage: `url(${import.meta.env.VITE_BASE_URL}${vendor?.nationalId})`,
                    }}
                  ></span>
                </div>
              </li>
            </ul>


          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDetail;
