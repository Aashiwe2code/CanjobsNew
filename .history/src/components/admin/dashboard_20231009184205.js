import React, { useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { Link } from "react-router-dom";
// import EmployeeDetails from "../common/employeeDetail";
import { ToastContainer /*,toast */ } from "react-toastify";
import Interview from "../common/interviewTable";
import LimiaStatusTable from "../common/limiaStatusTable";
// import JobResponse from "./response";
import JobTable from "../common/jobTable";
import EmployeeTable from "../common/employeeTable";
import EmployerTable from "../common/employerTable";
// import { getSummaryCount } from "../../api/api";
// import FollowUpDashBoard from "../common/followUpTableDashboard";
import Addfollowup from "../forms/admin/addfollowup";
import { FaWindowMaximize } from "react-icons/fa";
import { BsUsbMiniFill } from "react-icons/bs";
const AdminDashboard = () => {
  // eslint-disable-next-line
  /*States */
  // let [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  const [countData /* setCountData*/] = useState("");
  let [job, setJob] = useState("");
  let [employee, setEmployee] = useState("");
  let [lima, setLima] = useState("");
  let [employer, setEmployer] = useState("");
  let [interview, setInterview] = useState("");
  // let [response, setResponse] = useState("");
  // let [followup, setFollowUP] = useState("");
  let [apiCall, setApiCall] = useState("");
  const [employeepageNo, setEmployeePageNo] = useState(1);
  const [employerpageNo, setEmployerPageNo] = useState(1);
  const [jobPageNo, setJobPageNo] = useState(1);
  const [lmiaPageNo, setLmiaPageNo] = useState(1);
  const [interviewPageNo, setInterviewPageNo] = useState(1);
  const [openTable, setOpenTable] = useState(null);

  /*Function to maximixe and minimize the tables*/
  const toggleTable = (tableNumber) => {
    if (openTable === tableNumber) {
      setOpenTable(null);
    } else {
      setOpenTable(tableNumber);
    }
  };
  /*Function get minimize maximize icons */
  const getIcon = (tableNumber) => {
    return openTable === tableNumber ? <BsUsbMiniFill /> : <FaWindowMaximize />;
  };

  /*Function to get the summary count */
  // let AllCounts = async () => {
  // try{  let Data = await getSummaryCount();
  //   // console.log(Data);
  //   if (Data.length === 0) {
  //     setCountData("");
  //   } else {
  //     setCountData(Data);
  //   }}catch(err){
  //    console.log(err) {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 1000,
  //     });
  //   }
  // };
  // useEffect(() => {
  //   AllCounts();
  // }, [job, employee, employer, interview, response, followup]);
  /*Function to get the percentage in correct form  */
  const appliedRateFormatted = countData.applied_rate;
  // countData && countData.applied_rate
  //   ? countData.applied_rate.toLocaleString("en-US", {
  //       minimumFractionDigits: 2,
  //       maximumFractionDigits: 2,
  //     })
  //   : null;
  // console.log(appliedRateFormatted);

  return (
    <div className="site-wrapper overflow-hidden bg-default-2">
      {/* <!-- Header Area --> */}
      <AdminHeader heading={"Dashboard"} />
      {/* <!-- navbar- --> */}
      <AdminSidebar heading={"Dashboard"} />

      <div
        className={
          // showEmployeeProfile === false
          //   ?
          "dashboard-main-container mt-12 mt-lg-12"
          //   :"dashboard-main-container mt-25 mt-lg-22 d-none"
        }
        id="dashboard-body"
      >
        <ToastContainer />
        <div className="container-fluid mt-5">
          {/* <!-- Summary count --> */}
          <div className="row mb-7 d-none">
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <a
                href="/job"
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-blue bg-blue-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-briefcase"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">
                      {countData.posted_jobs || "N/A"}
                    </span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Posted Jobs
                  </p>
                </div>
              </a>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <a
                href="/employee"
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-user"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">
                      {countData.total_applicants || "N/A"}
                    </span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Total Applicants
                  </p>
                </div>
              </a>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <Link
                to=""
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-eye"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">
                      {countData.jobs_viewed || "N/A"}
                    </span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Jobs View
                  </p>
                </div>
              </Link>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <Link
                to=""
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-egg-blue bg-egg-blue-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-mouse-pointer"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">{appliedRateFormatted || 0}</span>
                    %
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Applied Rate
                  </p>
                </div>
              </Link>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <Link
                to=""
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-users"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">
                      {countData.applied_employee || "N/A"}
                    </span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Total Applied Applicants
                  </p>
                </div>
              </Link>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <a
                href="/job"
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-egg-blue bg-egg-blue-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-check "></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">{countData.placed || "N/A"}</span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Placed Job
                  </p>
                </div>
              </a>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <a
                href="/employee"
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-building"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">
                      {countData.total_company || "N/A"}
                    </span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Total Companies
                  </p>
                </div>
              </a>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <Link
                to=""
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-blue bg-blue-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-lightbulb"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">
                      {countData.active_company || "N/A"}
                    </span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Active Compaines
                  </p>
                </div>
              </Link>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="col-xxl-3 col-xl-4 col-md-5 col-6 col-sm-6">
              {/* <!-- Single Category --> */}
              <a
                href="/employee"
                className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
              >
                <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
                  <i className="fas fa-podcast"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div>
                  <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                    <span className="counter">
                      {countData.total_interviews || "N/A"}
                    </span>
                  </h5>
                  <p className="font-size-4 font-weight-normal text-gray mb-0">
                    Total Interview
                  </p>
                </div>
              </a>
              {/* <!-- End Single Category --> */}
            </div>
          </div>
          <div className="row">
            <div className={openTable === 1 ? "col-md-12" : "col-md-6"}>
              {/* <!-- Recent Jobs- --> */}
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0 ">Recently Added Jobs</h3>
                  <div className="d-flex justify-content-between p-0">
                    <div className="select_div mr-5">
                      <select
                        name="job"
                        value={job}
                        id="job"
                        onChange={(e) => {
                          setJob(e.target.value);
                          setJobPageNo(1);
                        }}
                        className="form-control-sm bg-white dashboard_select rounded-3"
                      >
                        <option value={""}>Select</option>
                        <option value={"today"}>Today </option>
                        <option value={"this_week"}>This Week </option>
                        <option value={"last_week"}>Last Week</option>
                        <option value={"last_month"}>Last Month</option>
                        <option value={"current_month"}>Current Month</option>
                      </select>
                    </div>
                    <div className="">
                      <Link
                        className="text-center  btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                        to={"/job"}
                        title="View All Jobs"
                      >
                        View All
                      </Link>
                    </div>
                    <Link
                      className={`text-dark mx-5 ${
                        openTable === 1 ? "open" : ""
                      }`}
                      to=""
                      onClick={() => toggleTable(1)}
                      title={openTable === 1 ? "Minimize" : "Maximize"}
                    >
                      {getIcon(1)}
                    </Link>
                  </div>
                </div>
                <JobTable
                  heading={openTable === 1 ? "" : "Dashboard"}
                  filter_by_time={job}
                  apiCall={apiCall}
                  setApiCall={setApiCall}
                  lmia="no"
                  setpageNo={setJobPageNo}
                  pageNo={jobPageNo}
                />
              </div>
            </div>
            {/* <!-- Recent Companies- --> */}
            <div className={openTable === 2 ? "col-md-12" : "col-md-6"}>
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0  ">
                    Recently Added Companies
                  </h3>
                  <div className="d-flex justify-content-between p-0">
                    <div className="select_div mr-5">
                      <select
                        name="employer"
                        value={employer}
                        id="employer"
                        onChange={(e) => {
                          setEmployer(e.target.value);
                          setEmployerPageNo(1);
                        }}
                        className="form-control-sm bg-white dashboard_select rounded-3"
                      >
                        <option value={""}>Select</option>
                        <option value={"today"}>Today </option>
                        <option value={"this_week"}>This Week </option>
                        <option value={"last_week"}>Last Week</option>
                        <option value={"last_month"}>Last Month</option>
                        <option value={"current_month"}>Current Month</option>
                      </select>
                    </div>
                    <div className="">
                      <Link
                        className="text-center  btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                        to={"/employer"}
                        title="View All Companies"
                      >
                        View All
                      </Link>
                    </div>
                    <Link
                      className={`text-dark mx-5 ${
                        openTable === 2 ? "open" : ""
                      }`}
                      to=""
                      onClick={() => toggleTable(2)}
                      title={openTable === 2 ? "Minimize" : "Maximize"}
                    >
                      {getIcon(2)}
                    </Link>
                  </div>
                </div>
                <EmployerTable
                  heading={openTable === 2 ? "" : "Dashboard"}
                  filter_by_time={employer}
                  setpageNo={setEmployerPageNo}
                  pageNo={employerpageNo}
                />
              </div>
            </div>
            {/* <!-- Recent Job Response- --> */}
            {/* <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0  ">
                    Recently Job Response
                  </h3>
                  <div className="d-flex justify-content-between p-0">
                    <div className="select_div mr-5">
                      <select
                        name="response"
                        value={response}
                        id="response"
                        onChange={(e) => setResponse(e.target.value)}
                        className="form-control-sm bg-white dashboard_select rounded-3"
                      >
                        <option value={""}>Select</option>
                        <option value={"today"}>Today </option>
                        <option value={"this_week"}>This Week </option>
                        <option value={"last_week"}>Last Week</option>
                        <option value={"last_month"}>Last Month</option>
                        <option value={"current_month"}>Current Month</option>
                      </select>
                    </div>
                    <div className="">
                      <Link
                        className="text-center  btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                        to={"/responses"}
                        title="View All Responses"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
                <JobResponse heading={"Dashboard"} filter_by_time={response} />
              </div> */}
            {/* <!-- Recent Interviews- --> */}
            <div className="bg-white dashboard_card mb-7">
              <div className="d-flex justify-content-between p-5 align-items-center">
                <h3 className="font-size-5 px-3 m-0  ">
                  Recently Added Interview
                </h3>
                <div className="d-flex justify-content-between p-0">
                  <div className="select_div mr-5">
                    <select
                      name="interview"
                      value={interview}
                      id="interview"
                      onChange={(e) => {
                        setInterview(e.target.value);
                        setInterviewPageNo(1);
                      }}
                      className="form-control-sm bg-white dashboard_select rounded-3"
                    >
                      <option value={""}>Select</option>
                      <option value={"today"}>Today </option>
                      <option value={"this_week"}>This Week </option>
                      <option value={"last_week"}>Last Week</option>
                      <option value={"last_month"}>Last Month</option>
                      <option value={"current_month"}>Current Month</option>
                    </select>
                  </div>
                  <div className="">
                    <Link
                      className="text-center  btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                      to={"/interview"}
                      title="View All Interview"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              </div>
              <Interview
                heading={"Dashboard"}
                filter_by_time={interview}
                pageNo={interviewPageNo}
                setpageNo={setInterviewPageNo}
              />
            </div>
            <div className="col-md-6">
              {/* <!-- Recent Employees- --> */}
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0  ">
                    Recently Added Candidates
                  </h3>
                  <div className="d-flex justify-content-between p-0">
                    <div className="select_div mr-5">
                      <select
                        name="employee"
                        value={employee}
                        id="employee"
                        onChange={(e) => {
                          setEmployee(e.target.value);
                          setEmployeePageNo(1);
                        }}
                        className="form-control-sm bg-white dashboard_select rounded-3"
                      >
                        <option value={""}>Select</option>
                        <option value={"today"}>Today </option>
                        <option value={"this_week"}>This Week </option>
                        <option value={"last_week"}>Last Week</option>
                        <option value={"last_month"}>Last Month</option>
                        <option value={"current_month"}>Current Month</option>
                      </select>
                    </div>
                    <div className="">
                      <Link
                        className="text-center btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                        to={"/employee"}
                        title="View all Applicants"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
                <EmployeeTable
                  heading={"Dashboard"}
                  filter_by_time={employee}
                  setpageNo={setEmployeePageNo}
                  pageNo={employeepageNo}
                  self={"yes"}
                />
              </div>
            </div>
            <div className="col-md-6">
              {/* <!-- Recent lima's- --> */}
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0  ">
                    Recently Added Lima
                  </h3>
                  <div className="d-flex justify-content-between p-0">
                    <div className="select_div mr-5">
                      <select
                        name="job"
                        value={lima}
                        id="job"
                        onChange={(e) => {
                          setLima(e.target.value);
                          setLmiaPageNo(1);
                        }}
                        className="form-control-sm bg-white dashboard_select rounded-3"
                      >
                        <option value={""}>Select</option>
                        <option value={"today"}>Today </option>
                        <option value={"this_week"}>This Week </option>
                        <option value={"last_week"}>Last Week</option>
                        <option value={"last_month"}>Last Month</option>
                        <option value={"current_month"}>Current Month</option>
                      </select>
                    </div>
                    <div className="">
                      <Link
                        className="text-center btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                        to={"/lmia"}
                        title="View all Applicants"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
                <LimiaStatusTable
                  heading={"Dashboard"}
                  filter_by_time={lima}
                  apiCall={apiCall}
                  setApiCall={setApiCall}
                  lmia="yes"
                  response={"lima"}
                  pageNo={lmiaPageNo}
                  setpageNo={setLmiaPageNo}
                />
              </div>
              {/* <!-- Recent Follow- --> */}
              <div className="bg-white dashboard_card mb-7">
                <div className="d-flex justify-content-between p-5 align-items-center">
                  <h3 className="font-size-5 px-3 m-0">Employee Alerts</h3>
                  {/* <div className="d-flex justify-content-between p-0">
                    <div className="select_div mr-5">
                      <select
                        name="followup"
                        value={followup}
                        id="followup"
                        onChange={(e) => setFollowUP(e.target.value)}
                        className="form-control-sm bg-white dashboard_select rounded-3"
                      >
                        <option value={""}>Select</option>
                        <option value={"today"}>Today </option>
                        <option value={"this_week"}>This Week </option>
                        <option value={"last_week"}>Last Week</option>
                        <option value={"last_month"}>Last Month</option>
                        <option value={"current_month"}>Current Month</option>
                      </select>
                    </div>
                    <div className="">
                      <Link
                        className="text-center  btn-sm p-2 btn-outline-info border border-info mt-0 rounded-3 dashboard_view_"
                        to={"/followup"}
                        title="View All Followup"
                      >
                        View All
                      </Link>
                    </div>
                  </div> */}
                </div>
                {/* <FollowUpDashBoard
                  heading={"Dashboard"}
                  filter_by_time={followup}
                /> */}
                <Addfollowup employee_id={""} page={"dashboard"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {showEmployeeProfile === true ? (
        <div className="dashboard-main-container mt-16">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12 dark-mode-texts">
                <div className="mb-9">
                  <Link
                    to={""}
                    onClick={() => setShowEmployeeProfile(false)}
                    className="d-flex align-items-center ml-4"
                  >
                    <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                    <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                      Back
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mb-18">
              <EmployeeDetails />
            </div>
          </div>
        </div>
      ) : null} */}
    </div>
  );
};
export default AdminDashboard;
