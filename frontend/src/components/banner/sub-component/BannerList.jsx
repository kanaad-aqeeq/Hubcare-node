import React, { useEffect, useState } from "react";
import PopupDelete from "./PopupDelete";
import { useDispatch, useSelector } from "react-redux";
import { getAllBanners } from "../../../Redux-store/Slices/bannerList/bannerSlice";
import { toast } from "react-toastify";

import { SvgDeleteIcon } from "../../common/sidebar/svg/Svg";
import { Banner1, Banner2, Banner3 } from "../../../assets/images";

const BannerImageData = [
  {
    BannerImage: Banner1,
    BannerTitle: "Banner1",
  },
  {
    BannerTitle: "Banner2",
    BannerImage: Banner2,
  },
  {
    BannerTitle: "Banner3",
    BannerImage: Banner3,
  },
];
const BannerList = () => {

  const dispatch = useDispatch();


  const { bannerList, isLoading, error } = useSelector(
    (state) => state.banner
  );


  const [showPopupDelete, setPopupDelete] = useState(false);
  const handlePopupDelete = () => {
    setPopupDelete((p) => !p);
  };



  useEffect(() => { dispatch(getAllBanners()) }, [dispatch]);

  useEffect(() => {
  if (error) {
    toast.error(error);  // Show error toast
  }
}, [error]);


  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="responsive-table">
            <table className="table table-row-dashed">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="w-10px">#</th>
                  <th className="w-100px text-start">Banner Title</th>
                  <th className="w-250px text-start">Banner Image</th>
                  <th className="w-70px text-end">Action</th>
                </tr>
              </thead>
              <tbody className="">



                {bannerList.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="text-start">{item.BannerTitle}</td>
                    <td className="text-start">
                      <div className="banner-image">
                        <img src={item.BannerImage} alt={item.BannerTitle} />
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="action-main">
                        <div className="action-inner">
                          <div className="action-buttons">
                            <span className="view-action" onClick={handlePopupDelete}>
                              <SvgDeleteIcon />
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}

                {/*  {bannerList.map((item, index) => {
                  return (
                    <tr key={index} className="">
                      <td className="">{index + 1}</td>
                      <td className="text-start">
                        <span className="">{item.BannerTitle}</span>
                      </td>
                      <td className="text-start">
                        <div className="banner-image">
                          <img
                            src={item.BannerImage}
                            alt={item.BannerTitle}
                          />
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="action-main">
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

                */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showPopupDelete && <PopupDelete handlePopup={handlePopupDelete} />}
    </>
  );
};

export default BannerList;
