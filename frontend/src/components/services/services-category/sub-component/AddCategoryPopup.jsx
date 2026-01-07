// import React from "react";

// const AddCategoryPopup = ({handlePopup}) => {
//   return (
//     <div className="main-popup service-popup">
//       <div className="lm-outer">
//         <div className="lm-inner">
//           <div className="popup-inner">
//             <div className="popup-heading">
//               <h3>Add Category</h3>
//             </div>
//             <div className="popup-body">
//               <div className="service-form">
//                 <div className="form-main">
//                   <div className="form-flex">
//                     <div className="form-inner-flx">
//                       <div className="form-inputs">
//                         <label className="form-label">Category</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Enter Category"
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
// export default AddCategoryPopup;





//   import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createCategory, resetCategoryCreateState } from '../../../../Redux-store/Slices/createCategory/createCategorySlice';


// const AddCategoryPopup = ({ handlePopup }) => {
//   const [categoryName, setCategoryName] = useState('');

//   const dispatch = useDispatch();
//   const { loading, success, error } = useSelector((state) => state.categoryCreate);

//   // Close popup and reset after success
//   useEffect(() => {
//     if (success) {
//       handlePopup(); // close the popup
//       dispatch(resetCategoryCreateState()); // reset slice state
//       setCategoryName(''); // clear input
//     }
//   }, [success, handlePopup, dispatch]);

//   const handleAddCategory = () => {
//     if (categoryName.trim() === '') return;

//     const payload = {
//       name: categoryName, // or "categoryName" depending on your API
//     };

//     dispatch(createCategory(payload));
//   };

//   return (
//     <div className="main-popup service-popup">
//       <div className="lm-outer">
//         <div className="lm-inner">
//           <div className="popup-inner">
//             <div className="popup-heading">
//               <h3>Add Category</h3>
//             </div>
//             <div className="popup-body">
//               <div className="service-form">
//                 <div className="form-main">
//                   <div className="form-flex">
//                     <div className="form-inner-flx">
//                       <div className="form-inputs">
//                         <label className="form-label">Category</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Enter Category"
//                           value={categoryName}
//                           onChange={(e) => setCategoryName(e.target.value)}
//                         />
//                         {error && <p className="error-text">{error}</p>}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="form-btn">
//                     <button
//                       type="button"
//                       className="btn secondary-btn"
//                       onClick={() => {
//                         handlePopup();
//                         dispatch(resetCategoryCreateState());
//                         setCategoryName('');
//                       }}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="button"
//                       className="btn primary-btn"
//                       onClick={handleAddCategory}
//                       disabled={loading}
//                     >
//                       {loading ? 'Adding...' : 'Add'}
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

// export default AddCategoryPopup;





import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { createCategory, resetCategoryCreateState } from '../../features/category/categoryCreateSlice';
import { createCategory, resetCategoryCreateState } from '../../../../Redux-store/Slices/createCategory/createCategorySlice';

const AddCategoryPopup = ({ handlePopup , onAddSuccess  }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.categoryCreate);

useEffect(() => {
  // Reset only when popup is mounted
  return () => {
    dispatch(resetCategoryCreateState());
  };
}, [dispatch]);



  useEffect(() => {
    if (success) {
        if (onAddSuccess) onAddSuccess();
      handlePopup();
      dispatch(resetCategoryCreateState());
      setCategoryName('');
      setCategoryImage(null);
    }
  }, [success, handlePopup, dispatch ,onAddSuccess]); 

  const handleAddCategory = () => {
    if (!categoryName || !categoryImage) return;

    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('categoryImage', categoryImage);

    dispatch(createCategory(formData));
  };

  return (
    <div className="main-popup service-popup">
      <div className="lm-outer">
        <div className="lm-inner">
          <div className="popup-inner">
            <div className="popup-heading">
              <h3>Add Category1</h3>
            </div>
            <div className="popup-body">
              <div className="service-form">
                <div className="form-main">
                  <div className="form-flex">
                    <div className="form-inner-flx">
                      <div className="form-inputs">
                        <label className="form-label">Category Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Category"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                      </div>
                      <div className="form-inputs">
                        <label className="form-label">Category Image</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) => setCategoryImage(e.target.files[0])}
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
                        dispatch(resetCategoryCreateState());
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn primary-btn"
                      onClick={handleAddCategory}
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

export default AddCategoryPopup;
