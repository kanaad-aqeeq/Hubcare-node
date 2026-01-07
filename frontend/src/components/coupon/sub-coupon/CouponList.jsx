import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromoOffers } from "../../../Redux-store/Slices/promoOffer/promoOfferSlice";

import CommanHeader from "../../common/common-header/CommonHeader";
import PopupDelete from "./PopupDelete";
import { SvgDeleteIcon } from "../../common/sidebar/svg/Svg";



const CouponList = () => {
  const [showPopupDelete, setPopupDelete] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(null);



  const handlePopupDelete = (offerId) => {
    setSelectedOfferId(offerId);
    setPopupDelete(true);
  };


  // const handlePopupDelete = () => {
  //   setPopupDelete((p) => !p);
  // };


  const dispatch = useDispatch();

  const { data: CouponList, loading, error } = useSelector(
    (state) => state.promoOffer
  );
  const reduxCouponList = useSelector((state) => state.promoOffer.data);
  const [couponList, setCouponList] = useState([]);

  useEffect(() => {
  setCouponList(reduxCouponList);
}, [reduxCouponList]);





  // useEffect(() => {
  //   dispatch(fetchPromoOffers());
  // }, [dispatch]);

  const { success } = useSelector((state) => state.addOffer);

  useEffect(() => {
    dispatch(fetchPromoOffers());
  }, [dispatch, success]); // re-fetch on add success




  return (
    <>

      {loading && <p>Loading...</p>}
      <div className="card">
        <div className="card-body">
          <div className="responsive-table">
            <table className="table table-row-dashed">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="w-10px">#</th>
                  <th className="w-175px text-start">Coupon Title</th>
                  <th className="w-70px text-end">Action</th>

                </tr>
              </thead>
              <tbody className="">
                {couponList.map((item, index) => {
                  return (
                    <tr key={index} className="">
                      <td className="">{index + 1}</td>
                      <td className="text-start">
                        <span className="">{item.offerCode}</span>
                      </td>
                      <td className="text-end">
                        <div className="action-main">
                          <div class="action-inner">
                            <div class="action-buttons">
                              {/* <span
                                class="view-action"
                                onClick={handlePopupDelete}
                              >
                                <SvgDeleteIcon />
                              </span> */}

                              <span
                                className="view-action"
                                onClick={() => handlePopupDelete(item.id)} // Pass the offer ID here
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
      {/* {showPopupDelete && <PopupDelete handlePopup={handlePopupDelete} />} */}

      {showPopupDelete && (
        <PopupDelete
          handlePopup={() => setPopupDelete(false)}
          offerId={selectedOfferId}
          onDeleteSuccess={(deletedId) => {
            setCouponList(prev => prev.filter(item => item.id !== deletedId));
          }}

        />
      )}


    </>
  );
};

export default CouponList;
