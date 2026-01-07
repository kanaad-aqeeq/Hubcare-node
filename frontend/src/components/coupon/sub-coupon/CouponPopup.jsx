// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {addPromoOffer} from '../../../Redux-store/Slices/addOffer/addOfferSlice';


// const CouponPopup = ({handlePopup}) => {


//   const dispatch = useDispatch();
//     const { loading, success, error } = useSelector((state) => state.addOffer);

//   useEffect(() => {
//     // Reset only when popup is mounted
//     return () => {
//       dispatch(addPromoOffer());
//     };
//   }, [dispatch]);



//     useEffect(() => {
//       if (success) {
//         handlePopup();
//         dispatch(resetCategoryCreateState());
//         setCategoryName('');
//         setCategoryImage(null);
//       }
//     }, [success, handlePopup, dispatch]);

//     // const handleAddCategory = () => {
//     //   if (!categoryName || !categoryImage) return;

//     //   const formData = new FormData();
//     //   formData.append('categoryName', categoryName);
//     //   formData.append('categoryImage', categoryImage);

//     //   dispatch(createCategory(formData));
//     // };



//   return (
//     <div className="main-popup service-popup">
//       <div className="lm-outer">
//         <div className="lm-inner">
//           <div className="popup-inner">
//             <div className="popup-heading">
//               <h3>Add Coupon</h3>
//             </div>
//             <div className="popup-body">
//               <div className="service-form">
//                 <div className="form-main">
//                   <div className="form-flex">
//                     <div className="form-inner-flx">
//                       <div className="form-inputs">
//                         <label className="form-label">Coupon</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Enter Coupon"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="form-btn">
//                     <button
//                       type="button"
//                       className="btn secondary-btn"
//                       onClick={handlePopup}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="Add Category"
//                       className="btn primary-btn"
//                       onClick={handlePopup}
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="overlay" onClick={handlePopup}></div>

//     </div>
//   );
// };

// export default CouponPopup




import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import {
  addPromoOffer,
  resetPromoOfferState
} from '../../../Redux-store/Slices/addOffer/addOfferSlice';

const CouponPopup = ({ handlePopup }) => {

   const SubCategory = [
    { value: "Status", label: "FLAT" },
    { value: "Complete", label: "PERCENTAGE" },    
  ];

  const [offerCode, setOfferCode] = useState('');
  const [discountType, setDiscountType] = useState('');
  const [discountValue, setDiscountValue] = useState('');

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.addOffer);

  useEffect(() => {
    return () => {
      // dispatch(resetPromoOfferState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      handlePopup();
      dispatch(resetPromoOfferState());
      setOfferCode('');
      setDiscountType('');
      setDiscountValue('');
    }
  }, [success, handlePopup, dispatch]);

  const handleAddCoupon = () => {
    if (!offerCode || !discountType || !discountValue) return;

    const payload = {
      offerCode,
      discountType,
      discountValue,
    };

    dispatch(addPromoOffer(payload));
  };

  return (
    <div className="main-popup service-popup">
      <div className="lm-outer">
        <div className="lm-inner">
          <div className="popup-inner">
            <div className="popup-heading">
              <h3>Add Coupon</h3>
            </div>
            <div className="popup-body">
              <div className="service-form">
                <div className="form-main">
                  <div className="form-flex">
                    <div className="form-inner-flx">
                      <div className="form-inputs">
                        <label className="form-label">Coupon Code</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Coupon"
                          value={offerCode}
                          onChange={(e) => setOfferCode(e.target.value)}
                        />
                      </div>
                      {/* <div className="form-inputs">
                        <label className="form-label">Discount Type</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. PERCENTAGE or FLAT"
                          value={discountType}
                          onChange={(e) => setDiscountType(e.target.value)}
                        />
                      </div> */}


                      <div className="form-inner-flx">
                      <div className="form-inputs">
                        <label className="form-label">Discount Type</label>
                        {/* <Select options={SubCategory} placeholder="Select" /> */}
                        <select
                          className="form-control"
                          value={discountType}
                          onChange={(e) => setDiscountType(e.target.value)}
                        >
                          <option value="">Select Discount Type</option>
                          <option value="PERCENTAGE">PERCENTAGE</option>
                          <option value="FLAT">FLAT</option>
                        </select>
                      </div>
                      </div>


                      




                      <div className="form-inputs">
                        <label className="form-label">Discount Value</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Value"
                          value={discountValue}
                          onChange={(e) => setDiscountValue(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {error && <p className="error-text">{error}</p>}

                  <div className="form-btn">
                    <button
                      type="button"
                      className="btn secondary-btn"
                      onClick={() => {
                        handlePopup();
                        // dispatch(resetOfferCreateState());
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn primary-btn"
                      onClick={handleAddCoupon}
                      disabled={loading}
                    >
                      {loading ? 'Adding...' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay" onClick={handlePopup}></div>
    </div>
  );
};

export default CouponPopup;
