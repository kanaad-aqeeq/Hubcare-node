
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerformanceReport } from "../../../Redux-store/Slices/peformanceReport/performanceReportSlice";
import CommanHeader from "../../common/common-header/CommonHeader";
import DatePickerInput from "../../../components/helper/DatePickerInput";
// import Pagination from "../../../../components/helper/Pagination";


// const CustomerComplaintsReportData = [
//   {
//     date: "25/03/2025",
//     totalrequest: "Virat Kohli",
//     successRate: "60%",
//     errorsLogged: "Lorem",
//     AverageLoadTime: "10min",
//   },
//   {
//     date: "25/03/2025",
//     totalrequest: "Virat Kohli",
//     successRate: "60%",
//     errorsLogged: "Lorem",
//     AverageLoadTime: "10min",
//   },
//   {
//     date: "25/03/2025",
//     totalrequest: "Virat Kohli",
//     successRate: "60%",
//     errorsLogged: "Lorem",
//     AverageLoadTime: "10min",
//   },
// ];

const AppPerformanceReport = () => {

  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  // const { data: CustomerComplaintsReportData, loading, error } = useSelector(
  //   (state) => state.performanceReport
  // );



  const { data, loading, error } = useSelector(
    (state) => state.performanceReport
  );

  // const reportData = data?.report || [];

  const reportData = Array.isArray(data) ? data : data?.report || [];


  useEffect(() => {
    dispatch(fetchPerformanceReport());
  }, [dispatch]);





  return (



    <>



      {/* {loading ? (
  <p>Loading...</p>
) : error ? (
  <p className="text-danger">{error}</p>
) : reportData.length > 0 ? (
  <table>...render rows...</table>
) : (
  <p>No data found.</p>
)} */}

      <div className="main-wrapper">
        <CommanHeader title={"App Performance Report"} />
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
              <div className="fltr-inner">
                <DatePickerInput
                // onChange={handleDateChange}
                />
              </div>
            </div>
          </div>



          <div className="card-body">
            <div className="responsive-table">
              <table className="table table-row-dashed">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="w-10px">#</th>
                    <th className="w-150px">Date</th>
                    <th className="w-175px text-center">Total Requests</th>
                    <th className="w-150px text-center">Success Rate (%)</th>
                    <th className="w-175px  text-center">Errors Logged</th>
                    <th className="w-100px text-center">Average Load Time (s)</th>
                  </tr>
                </thead>
                {/* <tbody className="">
                {reportData.map((item, index) => {
                  
                 return (
                    <tr key={index} className="">
                      <td className="">{index + 1}</td>
                      <td className="text-start">
                        <span className="">{item.totalRequests}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.successRate}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.errorsLogged}</span>
                      </td>
                      <td className="text-center">
                        <span className="">{item.AverageLoadTime}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody> */}



                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center">Loading...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="6" className="text-danger text-center">{error}</td>
                    </tr>
                  ) : reportData.length > 0 ? (
                    reportData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.date || '-'}</td>
                        <td className="text-center">{item.totalRequests}</td>
                        <td className="text-center">{item.successRate}</td>
                        <td className="text-center">{item.errorsLogged}</td>
                        <td className="text-center">{item.averageLoadTime}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">No data found.</td>
                    </tr>
                  )}
                </tbody>

              </table>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppPerformanceReport;



// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPerformanceReport } from "../../../Redux-store/Slices/peformanceReport/performanceReportSlice"; 
// import CommanHeader from "../../common/common-header/CommonHeader";
// // import { format } from "date-fns";

// const AppPerformanceReport = () => {
//   const dispatch = useDispatch();

//   const { data, loading, error } = useSelector(
//     (state) => state.performanceReport
//   );

//   const reportData = data?.report || [];

//   useEffect(() => {
//     dispatch(fetchPerformanceReport());
//   }, [dispatch]);

//   return (
//     <div className="main-wrapper">
//       <CommanHeader title={"App Performance Report"} />
//       <div className="card">
//         <div className="card-body">
//           {loading ? (
//             <p>Loading...</p>
//           ) : error ? (
//             <p className="text-danger">{error}</p>
//           ) : (
//             <div className="responsive-table">
//               <table className="table table-row-dashed">
//                 <thead>
//                   <tr className="fw-bolder text-muted">
//                     <th className="w-10px">#</th>
//                     <th className="w-150px">Date</th>
//                     <th className="w-175px text-center">Total Requests</th>
//                     <th className="w-150px text-center">Success Rate (%)</th>
//                     <th className="w-175px  text-center">Errors Logged</th>
//                     <th className="w-100px text-center">Avg Load Time (s)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {reportData.length > 0 ? (
//                     reportData.map((item, index) => (
//                       <tr key={index}>
//                         <td>{index + 1}</td>
//                         <td className="text-start">{format(new Date(item.date), "MMM-dd-yyyy")}</td>
//                         <td className="text-center">{item.totalRequests}</td>
//                         <td className="text-center">{item.successRate}%</td>
//                         <td className="text-center">{item.errorsLogged}</td>
//                         <td className="text-center">{item.averageLoadTime}</td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="6" className="text-center">No performance data available.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppPerformanceReport;

