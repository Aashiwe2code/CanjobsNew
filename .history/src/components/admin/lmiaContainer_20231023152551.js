import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobDetailsBox from "../common/jobdetail";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import AddJobModal from "../forms/employer/job";
import { GetFilter } from "../../api/api";
import { ToastContainer } from "react-toastify";
import FilterJson from "../json/filterjson";
import JobTable from "../common/jobTable";
import EmployeeHeader from "../common/header";
import EmployeeFooter from "../common/footer";
function LimaContainer(props) {
  /*show Modal and props state */
  let [apiCall, setApiCall] = useState(false);
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  let [showJobDetails, setShowJobDetails] = useState(false);
  const [JobId, setJobId] = useState([]);
  const [pageNo, setpageNo] = useState(1);
  /*Filter and search state */
  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const [SkillFilterValue, setSkillFilterValue] = useState(
    props ? props.skill : ""
  );
  const [locationFilterValue, setLocationFilterValue] = useState("");
  const [jobSwapFilterValue, setJobSwapFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  const [company, setCompany] = useState("");
  let [Json, setJson] = useState([]);
  let userType = localStorage.getItem("userType");
  /*Function to get the jSon */
  const JsonData = async () => {
    try {
      let Json = await GetFilter();
      if (Json.data.message === "No data found") {
        setJson([]);
      } else {
        setJson(Json.data.data);
      }
      setJson(Json.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  /*Render function to get the job */
  useEffect(() => {
    JsonData();
    if ((search === "") === true) {
      setSearchError("");
    }
  }, [
    categoryFilterValue,
    SkillFilterValue,
    locationFilterValue,
    jobSwapFilterValue,
    apiCall,
    search,
    company,
  ]);

  /* Function to show the Job detail data */
  const JobDetail = (e) => {
    setShowJobDetails(true);
    setJobId(e);
  };

  /* Function to show the single data to update job */
  // const editJob = (e) => {
  //   // e.preventDefault();
  //   setShowAddJobsModal(true);
  //   setJobId(e);
  // };
  /*Function to search the Job */
  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    setpageNo(1);
    if (inputValue.length > 0) {
      if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
        setSearchError("Job cannot start with a number.");
      } else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
        setSearchError("Cannot use special characters.");
      } else {
        setSearchError("");
      }
    } else {
      setSearchError("");
    }
  };
  /*Skill Json for not having same data */
  const Skill =
    Json && Json.Skill
      ? Json.Skill.filter(
          (thing, index, self) =>
            index === self.findIndex((t) => t.value === thing.value)
        )
      : [];
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
            <AdminHeader heading={"LIMIA status"} />
            {/* <!-- navbar- --> */}
            <AdminSidebar heading={"LIMIA status"} />
          </>
        )}

        <ToastContainer />
        <div
          className={
            showJobDetails === false
              ? userType === "company"
                ? "mt-16"
                : "dashboard-main-container mt-16"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container-fluid">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className={userType === "company" ? "" : "page___heading"}>
                  <h3 className="font-size-6 mb-0 mt-5">LMIA of Jobs </h3>
                </div>
                {/*<-- Job Search and Filter -->*/}
                {userType === "company" ? null : (
                  <div className="row m-0 align-items-center">
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
                        onChange={(e) => {
                          setCompany(e.target.value);
                          setpageNo(1);
                        }}
                      />
                    </div>
                    <div className="col p-1 form_group mb-3">
                      <p className="input_label">Filter by Job Category:</p>
                      <div className="select_div">
                        <select
                          name="country"
                          id="country"
                          value={categoryFilterValue}
                          onChange={(e) => {
                            setCategoryFilterValue(e.target.value);
                            setpageNo(1);
                          }}
                          className="text-capitalize form-control"
                        >
                          <option value="">Job Category</option>
                          {Json &&
                            (Json.Category || []).map((data) => {
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
                            setpageNo(1);
                          }}
                          className="text-capitalize form-control"
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
                          value={SkillFilterValue}
                          onChange={(e) => {
                            setSkillFilterValue(e.target.value);
                            setpageNo(1);
                          }}
                          className="text-capitalize form-control"
                        >
                          <option value="">Job Skill</option>
                          {(Skill || []).map((data) => {
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
                          onChange={(e) => {
                            setLocationFilterValue(e.target.value);
                            setpageNo(1);
                          }}
                          className="text-capitalize form-control"
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
                  </div>
                )}
              </div>
              {/*<-- Job List Table -->*/}
              <JobTable
                search={search}
                jobSwapFilterValue={jobSwapFilterValue}
                locationFilterValue={locationFilterValue}
                SkillFilterValue={SkillFilterValue}
                categoryFilterValue={categoryFilterValue}
                company={company}
                JobDetail={JobDetail}
                apiCall={apiCall}
                setApiCall={setApiCall}
                // skill={props.skill}
                // employee_id={props.employee_id}
                selfJob={"no"}
                response="lmia"
                pageNo={pageNo}
                setpageNo={setpageNo}
              />
            </div>
          </div>
        </div>
        {/*<-- Job Detail -->*/}
        {showJobDetails === true ? (
          <div
            className={
              userType === "company"
                ? "mt-16"
                : "dashboard-main-container mt-16"
            }
          >
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
        ) : null}
      </div>
      {showAddJobsModal ? (
        <AddJobModal
          show={showAddJobsModal}
          jobdata={JobId}
          admin={"admin"}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowAddJobsModal(false)}
        />
      ) : null}
      {userType === "company" ? <EmployeeFooter /> : null}
    </>
  );
}

export default LimaContainer;
