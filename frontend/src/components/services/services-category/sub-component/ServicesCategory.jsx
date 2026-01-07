import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserImg } from "../../../../assets/images";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../../../components/helper/Pagination";
import { fetchAllCategories } from "../../../../Redux-store/Slices/serviceReports/categorySlice";
import { toggleCategoryStatus } from "../../../../Redux-store/Slices/categoryToggle/categoryToggleSlice";
import { toast } from "react-toastify";
import PopupDelete from "./PopupDelete";


import {
  SvgActionViewIcon,
  SvgDeleteIcon,
} from "../../../common/sidebar/svg/Svg";


const ServicesCategory = () => {


  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { categories, totalPages, loading } = useSelector((state) => state.categories);

  const handleAddSuccess = () => {
    dispatch(fetchAllCategories({ page: currentPage, limit: 10, searchText }));
    setShowAddPopup(false); // close popup on success
  };


  const handlePageChange = (newPage) => {
    dispatch(fetchAllCategories({ page: newPage, limit: 10, searchText }));
  };


  const handleDeleteSuccess = () => {
    dispatch(fetchAllCategories({ page: currentPage, limit: 10, searchText }));
  };


  //29/05/2025

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(fetchAllCategories({ page: currentPage, limit: 10, searchText }));
    }, 1000); // 500ms debounce

    return () => clearTimeout(delayDebounce); // Clear timeout on unmount or when input changes
  }, [dispatch, searchText, currentPage]);






  const handleToggle = async (categoryId) => {
    try {
      await dispatch(toggleCategoryStatus(categoryId)).unwrap();
      toast.success("Category status updated!");
      dispatch(fetchAllCategories({ page: currentPage, limit: 10 })); // Refresh the list
    } catch (error) {
      toast.error(error || "Failed to update status.");
    }
  };




  const [showPopupDelete, setPopupDelete] = useState(false);
  const handlePopupDelete = () => {
    setPopupDelete((p) => !p);
  };

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;



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
                  <th className="w-200px">Category</th>
                  <th className="w-70px text-end">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {categories.map((item, index) => {
                  return (
                    <tr key={index} className="">
                      <td className="">{index + 1}</td>
                      <td className="text-start">
                        <span className="">{item.categoryName}</span>
                      </td>
                      <td className="text-end">
                        <div className="action-main">
                          <div className="action-inner">
                            <div className="svcrd-togl me-2">
                              <div className="tgl-sld">
                                <label>
                                  <input type="checkbox"
                                    checked={item.isActive}
                                    onChange={() => handleToggle(item.id)}
                                  />
                                  <span>
                                    <i></i>
                                  </span>
                                </label>
                              </div>
                            </div>
                            {/* 
                            {totalPages > 1 &&
                              <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                              />
                            } */}



                          </div>
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
                                onClick={() => {
                                  setSelectedCategoryId(item.id);
                                  handlePopupDelete();
                                }}
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

            {totalPages > 1 && (
              <div className="pagination-wrapper mt-3 text-center">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange} // 👈 Now it works properly
                />
              </div>
            )}

          </div>
        </div>
      </div>


      {showPopupDelete && (
        <PopupDelete
          handlePopup={handlePopupDelete}
          categoryId={selectedCategoryId}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}


      {showAddPopup && (
        <AddCategoryPopup
          handlePopup={() => setShowAddPopup(false)}
          onAddSuccess={handleAddSuccess}
        />
      )}


    </>
  );
};

export default ServicesCategory;



