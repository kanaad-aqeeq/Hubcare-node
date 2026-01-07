
import { SvgActionViewIcon, SvgDeleteIcon } from "../../../common/sidebar/svg/Svg";
import PopupDelete from "./PopupDelete";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../../../components/helper/Pagination";
import { Link } from "react-router-dom";
import { UserImg } from "../../../../assets/images";
import { fetchAllSubcategories } from "../../../../Redux-store/Slices/serviceReports/subcategorySlice";

const ServicesSubCategory = () => {


  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [showAddPopup, setShowAddPopup] = useState(false);
  // const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showPopupDelete, setPopupDelete] = useState(false);
  // const [showPopupDelete, setShowPopupDelete] = useState(false);
  const { subcategories, loading, totalPages, error } = useSelector((state) => state.subcategories);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);

  console.log("Fetched Data from Redux...............:", subcategories);



  const handleAddSuccess = () => {
    dispatch(fetchAllSubcategories({ page: currentPage, limit: 10, searchText }));
    setShowAddPopup(false); // close popup on success
  };


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // 👈 Only update the state here
  };

  const handleDeleteSuccess = () => {
    dispatch(fetchAllSubcategories({ page: currentPage, limit: 10, searchText }));
  };


  // useEffect(() => {
  //   dispatch(fetchAllSubcategories());
  // }, [dispatch]);


  //   useEffect(() => {
  //   dispatch(fetchAllSubcategories({ page: currentPage, limit: 10 }));
  // }, [dispatch, currentPage ,searchText]);



  // useEffect(() => {
  //   dispatch(fetchAllSubcategories({ page: currentPage, limit: 10 }));
  //   console.log("page and limit in subcategory :", currentPage, subcategories);
  // }, [dispatch, currentPage ,searchText]);





  //02/06/2025

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(fetchAllSubcategories({ page: currentPage, limit: 10, searchText }));
    }, 1000); // 500ms debounce

    return () => clearTimeout(delayDebounce); // Clear timeout on unmount or when input changes
  }, [dispatch, searchText, currentPage]);



  // const ServiceList = [
  //   {
  //     categoryName: "Car Care",
  //     SubCategoryName: "interior & exteriror wash",
  //   },
  //   {
  //     SubCategoryName: "Sofa clean",
  //     categoryName: "House Care",
  //   },
  //   {
  //     SubCategoryName: "Cloth",
  //     categoryName: "Cloth care",
  //   },
  // ];




  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;


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
                  {/* <input type="text" placeholder="Search..." />   */}

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
                  <th className="w-100px">SubCategory</th>
                  <th className="w-200px">Category</th>
                  <th className="w-70px text-end">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {subcategories?.map((item, index) => {
                  return (
                    <tr key={index} className="">
                      <td className="">{index + 1}</td>
                      <td className="text-start">
                        <span className="">{item.subCategoryName}</span>
                      </td>
                      <td className="text-start">
                        <span className="">{item.category.categoryName}</span>
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
                              <span className="view-action"
                                onClick={() => {
                                  setSelectedSubCategoryId(item.id);
                                  handlePopupDelete();
                                }}
                              >
                                {/* onClick={() => handlePopupDelete(item.id)} */}
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
          subCategoryId={selectedSubCategoryId}
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

export default ServicesSubCategory;
