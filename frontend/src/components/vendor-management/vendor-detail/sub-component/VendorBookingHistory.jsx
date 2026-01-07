import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProviderBookings } from "../../../../Redux-store/Slices/vendordashboard/provideBooking";
import { SvgActionViewIcon } from "../../../common/sidebar/svg/Svg";
// const UserHistoryListData = [
//   {
//     UserName: "Amit Singh",
//     ServiceName: "Sofa Cleaning",
//     ServiceCategory: "Home Care",
//     BookingId: "#12353",
//     status: "Pending",
//   },
//   {
//     UserName: "Rahul Awadhiya",
//     ServiceName: "Sofa Cleaning",
//     ServiceCategory: "Home Care",
//     BookingId: "#12355",
//     status: "Accepted",
//   },
//   {
//     UserName: "Neeraj Gupta",
//     ServiceName: "Sofa Cleaning",
//     ServiceCategory: "Home Care",
//     BookingId: "#12358",
//     status: "Assigned",
//   },
//   {
//     UserName: "Anish Singh",
//     ServiceName: "Sofa Cleaning",
//     ServiceCategory: "Home Care",
//     BookingId: "#12356",
//     status: "Completed",
//   },
//   {
//     UserName: "Rohit Roy",
//     ServiceName: "Sofa Cleaning",
//     ServiceCategory: "Home Care",
//     BookingId: "#12359",
//     status: "Canceled",
//   },
// ];
const VendorBookingHistory = () => {


  const dispatch = useDispatch();
  const { id } = useParams();

  const { bookings, loadings, errors } = useSelector(state => state.providerBooking);



  useEffect(() => {
    if (id) {
     console.log("Fetching bookings for provider ID:", id); 
      dispatch(fetchProviderBookings(id))
    }
  }, [dispatch, id]);

  const statusBadgeClass = {
    Pending: "badge-warning",
    Accepted: "badge-primary",
    Assigned: "badge-secondary",
    Canceled: "badge-danger",
    Completed: "badge-success",
  };
  return (
    <>

      <div className="responsive-table stkytable-action">
        <table className="table table-row-dashed">
          <thead>
            <tr className="fw-bolder text-muted">
              <th className="w-10px">#</th>
              <th className="w-200px text-start">Service Details</th>
              <th className="w-200px  text-start">User Detail</th>
              <th className="w-100px text-center">Booking Date</th>
              <th className="w-100px text-center">Servicing Date</th>
              <th className="w-70px text-center">Total Hours</th>
              <th className="w-100px text-center">Charges (Per Hour)</th>
              <th className="w-70px text-center">Overall Charges</th>
              <th className="w-100px text-center">Status</th>
              <th className="w-100px text-end">Action</th>
            </tr>
          </thead>
          {/* <tbody className="">
                {UserHistoryListData.map((item, index) => {
                  return (
                    <tr key={index} className="">
                      <td className="">{index + 1}</td>
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
                        <span className="">{item.UserName}</span>
                      </td>
                      <td className="text-center">
                        <span className="">12-03-2025</span>
                      </td>
                      <td className="text-center">
                        <span className="">14-03-2025</span>
                      </td>
                      <td className="text-center">
                        <span className="">3 Hours</span>
                      </td>
                      <td className="text-center">
                        <span className="">40 SAR/Hour</span>
                      </td>
                      <td className="text-center">
                        <span className="">120 SAR</span>
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
              </tbody> */}


          <tbody className="">
            {bookings?.data?.length > 0 ? (
              bookings.data.map((item, index) => {
                // const service = item.service || {};
                // const user = item.user || {};

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="text-start">
                      <div className="user-info">
                        <div className="user-info-inner">
                            <p>{item.services}</p>
                          {/* <p>{service.serviceName || "N/A"}</p> */}
                        </div>
                        <div className="user-id-inner">
                          <p className="d-block fw-bold titl-view">
                            {/* Description: {service.serviceDescription || "N/A"} */}
                          </p>
                          <p className="d-block fw-bold titl-view">
                            {/* Bkng id: #{item.id.slice(0, 6)} */}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-start">
                      <span>{item.user.name || "N/A"}</span>

                    </td>
                    <td className="text-center">
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="text-center">
                      <span>{new Date(item.serviceDate).toLocaleDateString()}</span>
                    </td>
                    <td className="text-center">
                      <span>{item.workHours} Hours</span>
                    </td>
                    <td className="text-center">
                      <span>{item.amount} SAR/Hour</span>
                    </td>
                    <td className="text-center">
                      <span>{item.finalAmount} SAR</span>
                    </td>
                    <td className="text-center">
                      <span
                        className={`badge ${statusBadgeClass[item.bookingStatus] || "badge-secondary"
                          }`}
                      >
                        {item.bookingStatus}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="action-main">
                        <div className="action-inner">
                          <div className="action-buttons">
                            <Link to={`/booking-detail/${item.id}`} className="view-action">
                              <SvgActionViewIcon />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </>
  );
};



export default VendorBookingHistory