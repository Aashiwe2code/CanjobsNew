import React, { useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
// import CustomButton from "../common/button";
// import { Link } from "react-router-dom";
// import PersonalDetails from "../forms/user/personal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import UserProfile from "../user/profile";
// import { GetFilter } from "../../api/api"
// import EmployeeTable from "../common/employeeTable";
import FilterJson from "../json/filterjson";
// import JobTable from "../common/jobTable";
// import JobDetailsBox from "../common/jobdetail"
import EmployeeHeader from "../common/header";
import EmployeeFooter from "../common/footer";
import VisaTable from "../common/visaTable";
import { useLocation } from "react-router-dom";
export default function Visa() {
  let location = useLocation();
  /*Show modal states */
  let [apiCall, setApiCall] = useState(false);
  //   let [showAddEmployeeModal, setShowEmployeeMOdal] = useState(false);
  // let [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  /*data and id states */
  // let [employeeId, setemployeeId] = useState();
  // let [showJobDetails, setShowJobDetails] = useState(false);
  const [EmpId, setEmpId] = useState(location.state ? location.state.id : "");
  /*Filter and search state */
  // let [SkillList, setSkillList] = useState([])
  // let [EducationList, setEducationList] = useState([])
  const [VisaCountryFilter, setVisaCountryFilter] = useState("");
  const [VisStatusFilterValue, setVisStatusFilterValue] = useState("");
  const [IntrestedFilterValue, setIntrestedFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  const [pageNo, setpageNo] = useState(1);
  //  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  //  const [locationFilterValue, setLocationFilterValue] = useState("");
  //  const [jobSwapFilterValue, setJobSwapFilterValue] = useState("");
  //  const [company, setCompany] = useState("");
  // let [Json, setJson] = useStatuserTypee([]);
  let userType = localStorage.getItem("userType");
  /*Render function to get the job */
  // useEffect(() => {
  //   JsonData();
  //   if ((search === "") === true) {
  //     setSearchError("");
  //   }
  // }, [
  // VisStatusFilterValue,
  // VisaCountryFilter,
  // IntrestedFilterValue,
  //   //  categoryFilterValue,
  //   //  locationFilterValue,
  //   //  jobSwapFilterValue,
  //   apiCall,
  //   search,
  //   //  company,
  // ]);

  /* Function to show the Job detail data */
  //  const JobDetail = (e) => {
  //    setShowJobDetails(true);
  //    setJobId(e);
  //  };
  /*Function to get thejSon */
  // const JsonData = async () => {
  //   let Json = await GetFilter()
  //   setJson(Json.data.data)
  // }
  /*Render method to get the json*/
  // useEffect(() => {
  //   JsonData()
  //   if ((search === "") === true) {
  //     setSearchError("")
  //   }
  // }, [VisStatusFilterValue])
  /* Function to show the single data to update Employee*/
  // const employeeDetails = (e) => {
  //   setShowEmployeeProfile(true);
  //   setemployeeId(e);
  // };

  /*Function to search the employee */
  const onSearch = (e) => {
    setEmpId("");
    const inputValue = e.target.value;
    setSearch(inputValue);
    setpageNo(1);
    if (inputValue.length > 0) {
      if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
        setSearchError("Company Name cannot start with a number.");
      } else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
        setSearchError("Cannot use special characters.");
      } else {
        setSearchError("");
      }
    } else {
      setSearchError("");
    }
  };
  return (
    <>
      <div
        className={
          userType === "company"
            ? "bg-default-1 pt-9 pb-10 pb-xl-30 pb-13 position-relative overflow-hidden"
            : "site-wrapper overflow-hidden bg-default-2"
        }
      >
        {userType === "company" ? (
          <EmployeeHeader />
        ) : (
          <>
            {/* <!-- Header Area --> */}
            <AdminHeader heading={"Visa status"} />
            {/* <!-- navbar- --> */}
            <AdminSidebar heading={"Visa status"} />
          </>
        )}

        <ToastContainer />
        <div
          className={
            // showJobDetails === false?
            userType === "company" ? "mt-16" : "dashboard-main-container mt-16"
            // : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container-fluid">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className={userType === "company" ? "" : "page___heading"}>
                  <h3 className="font-size-6 mb-0">Visa of job</h3>
                </div>
                {/* <!-- Employee Search and Filter- --> */}
                <div
                  className={
                    userType === "company"
                      ? "d-none"
                      : "row m-0 align-items-center"
                  }
                >
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Search Employee:</p>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={"Search Employee"}
                      value={search}
                      name={"Employee_name"}
                      onChange={(e) => onSearch(e)}
                    />
                  </div>
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Filter by Visa Country:</p>
                    <div className="select_div">
                      <select
                        name="experience"
                        value={VisaCountryFilter}
                        id="experience"
                        onChange={(e) => {
                          setVisaCountryFilter(e.target.value);
                          setEmpId("");
                          setpageNo(1);
                        }}
                        className="text-capitalize form-control"
                      >
                        <option value={""}>Select Country</option>
                        {(FilterJson.location || []).map((item, i) => (
                          <option value={item} key={i}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Filter by Visa Status:</p>
                    <div className="select_div">
                      <select
                        name="status"
                        value={VisStatusFilterValue}
                        id="status"
                        onChange={(e) => {
                          setVisStatusFilterValue(e.target.value);
                          setEmpId("");
                          setpageNo(1);
                        }}
                        className="text-capitalize form-control"
                      >
                        <option value={""}>Select visa status </option>
                        <option value={"pending"}>Pending</option>
                        <option value={"approved"}>Approved</option>
                        <option value={"reject"}>Rejected</option>
                        <option value={"experied"}>experied</option>
                        <option value={"cancel"}>Cancel</option>
                      </select>
                    </div>
                  </div>
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Filter by Interested In:</p>
                    <div className="select_div">
                      <select
                        name="intrested_in"
                        value={IntrestedFilterValue}
                        id="intrested_in"
                        onChange={(e) => {
                          setIntrestedFilterValue(e.target.value);
                          setEmpId("");
                          setpageNo(1);
                        }}
                        className="text-capitalize form-control"
                      >
                        <option value="" data-display="Product Designer">
                          Select Interested in
                        </option>
                        {(FilterJson.interested || []).map((data, i) => {
                          return (
                            <option value={data} key={i}>
                              {data}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                {/*<-- Job Search and Filter -->*/}
                {/* <div className={userType === "company" ? "d-none"
                :"row m-0 align-items-center"}>
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Search:</p>
                    <input
                      required
                      type="text"
                      className="form-control w-100"
                      placeholder={"Search Job"}
                      value={search}
                      name={"name"}
                      onChange={(e) => onSearch(e)}
                    />
                    <small className="text-danger">{searcherror}</small>
                  </div>
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Company Name:</p>
                    <input
                      required
                      type="text"
                      className="form-control w-100"
                      placeholder={"Company name"}
                      value={company}
                      name={"compnay_name"}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Filter by Job Category:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={categoryFilterValue}
                        onChange={(e) => setCategoryFilterValue(e.target.value)}
                        className=" form-control"
                      >
                        <option value="">Job Category</option>
                        {(Json.Category || []).map((data) => {
                          return (
                            <option value={data.id} key={data.id}>
                              {data.value}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Filter by Job Type:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={jobSwapFilterValue}
                        onChange={(e) => {
                          setJobSwapFilterValue(e.target.value);
                        }}
                        className=" form-control"
                      >
                        <option value="">Job Type</option>
                        {(FilterJson.job_type || []).map((job, i) => (
                          <option key={i} value={job}>
                            {job}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Filter by Job Skill:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={skillFilterValue}
                        onChange={(e) => setSkillFilterValue(e.target.value)}
                        className=" form-control"
                      >
                        <option value="">Job Skill</option>
                        {(json.skill || []).map((data) => {
                          return (
                            <option value={data.value} key={data.id}>
                              {data.value}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Filter by Job Location:</p>
                    <div className="select_div">
                      <select
                        name="country"
                        id="country"
                        value={locationFilterValue}
                        onChange={(e) => setLocationFilterValue(e.target.value)}
                        className=" form-control"
                      >
                        <option value="">Job Location</option>
                        {(FilterJson.location || []).map((data) => {
                          return (
                            <option value={data} key={data}>
                              {data}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div> */}
                <small className="text-danger">{searcherror}</small>
              </div>
              {/* <!-- Employee List Table- --> */}
              {/* <EmployeeTable
              showEmployeeProfile={showEmployeeProfile}
              employeeDetails={employeeDetails}
              search={search}
              experienceFilterValue={experienceFilterValue}
              educationFilterValue={educationFilterValue}
              skillFilterValue={skillFilterValue}
              apiCall={apiCall}
              setApiCall={setApiCall}
            //   skill={props.skill}
            //   job_id={props.job_id}
              visa={"yes"}
            /> */}
              {/* <JobTable
            search={search}
            jobSwapFilterValue={jobSwapFilterValue}
            locationFilterValue={locationFilterValue}
            SkillFilterValue={skillFilterValue}
            categoryFilterValue={categoryFilterValue}
            company={company}
            JobDetail={JobDetail}
            apiCall={apiCall}
            setApiCall={setApiCall}
            selfJob={"no"}
            response="visa"/> */}
              <VisaTable
                search={search}
                VisaCountryFilterValue={VisaCountryFilter}
                IntrestedFilterValue={IntrestedFilterValue}
                VisStatusFilterValue={VisStatusFilterValue}
                apiCall={apiCall}
                setApiCall={setApiCall}
                employee_id={EmpId}
                setpageNo={setpageNo}
                pageNo={pageNo}
              />
            </div>
          </div>
        </div>
        {/* <!-- Employee Details- --> */}
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
                    <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8 mt-10"></i>
                    <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                      Back
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mb-18">
              <UserProfile employeeId={employeeId} />
            </div>
          </div>
        </div>
      ) : null} */}
      </div>
      {/*<-- Job Detail -->*/}
      {/* {showJobDetails === true ? (
          <div className={userType === "company" ?"mt-16":"dashboard-main-container mt-16"}>
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 dark-mode-texts">
                  <div className="mb-9">
                    <Link
                      to={""}
                      onClick={() => setShowJobDetails(false)}
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
                <JobDetailsBox jobdata={JobId} />
              </div>
            </div>
          </div>
        ) : null} */}
      {userType === "company" ? <EmployeeFooter /> : null}
    </>
  );
}
