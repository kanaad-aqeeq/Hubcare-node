  import React, { useEffect } from "react";
  import { Link } from "react-router-dom";
  import { UserImg } from "../../../../assets/images";
  import { useSelector, useDispatch } from "react-redux";
  import { fetchAllUsers } from "../../../../Redux-store/Slices/userAdminSlice/userSlice";
  import {
    SvgActionViewIcon,
    SvgMessageIcon,
    SvgPhoneIcon,
  } from "../../../common/sidebar/svg/Svg";
  const UserTable = () => {

  const dispatch = useDispatch();

  //  const { users, loading, error } = useSelector((state) => state.users);

  // const { users = [], loading, error } = useSelector((state) => state.users || {});
  const { data: users = [], loading, error } = useSelector((state) => state.users || {});



    useEffect(() => {
      dispatch(fetchAllUsers());
    }, [dispatch]);

    

    const orderData = [
      {
        userName: "John Doe",
        userOrder: "#1234",
        userPhoneNo: "9999999999",
        userEmail: "abcd@gmail.com",
      },
      {
        userName: "John Doe",
        userOrder: "#1234",
        userPhoneNo: "9999999999",
        userEmail: "abcd@gmail.com",
      },
      {
        userName: "John Doe",
        userOrder: "#1234",
        userPhoneNo: "9999999999",
        userEmail: "abcd@gmail.com",
      },
    ];
    return (
      <>
        <div className="card">
          <div className="card-body">
            <div className="responsive-table">
              <table className="table table-row-dashed">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="w-10px">#</th>
                    <th className="w-200px">User Detail</th>
                    <th className="w-100px text-start">Contact Detail</th>
                    <th className="w-70px text-center">Reg.date</th>
                    <th className="w-70px text-end">Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {users.map((item, index) => {
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
                                <p>{item.name}</p>
                              </div>
                              <div className="user-id-inner">
                                <p className="d-block fw-bold titl-view">
                                  {/* User id:{item.userOrder} */}
                                  User id: {item.id || "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
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
                        <td className="text-center">
                          <span className="">12-6-2024</span>
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
                                {/* <Link to="/user-detail" class="view-action"> */}
                                <Link to={`/user-detail/${item.id}`} className="view-action">
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
      </>
    );
  };

  export default UserTable;
