import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import CustomButton from "../common/button";
// import JobDetailsBox from "../common/jobdetail";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import AddJobModal from "../forms/employer/job";
import { GetFilter } from "../../api/api";
import { ToastContainer } from "react-toastify";
import FilterJson from "../json/filterjson";
import JobTable from "../common/jobTable";

function Job(props) {
  /*show Modal and props state */
  let [apiCall, setApiCall] = useState(false);
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  let [showJobDetails, setShowJobDetails] = useState(false);
  const [JobId, setJobId] = useState([]);
  /*Filter and search state */
  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const [SkillFilterValue, setSkillFilterValue] = useState(
    /*props ? props.skill : */ ""
  );
  const [locationFilterValue, setLocationFilterValue] = useState("");
  const [jobSwapFilterValue, setJobSwapFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  // const [company, setCompany] = useState("");
  const [pageNo, setpageNo] = useState(1);
  let [Json, setJson] = useState([]);
  // let location = useLocation();
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
    // if (location.state) {
    //   setCompany(location.state.company_name);
    // }
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
  const editJob = (e) => {
    // e.preventDefault();
    setShowAddJobsModal(true);
    setJobId(e);
  };
  /*Function to search the Job */
  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    setpageNo(1);
    if (inputValue.length > 0) {
      if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
        setSearchError("Job cannot start with a number.");
      }
      // else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
      //   setSearchError("Cannot use special characters.");
      // }
      else {
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
          props.skill === null || props.skill === undefined
            ? "site-wrapper overflow-hidden bg-default-2"
            : "site-wrapper overflow-hidden "
        }
      >
        {props.skill === null ||
        props.skill === undefined ||
        Object.keys(props.skill).length === 0 ? (
          <>
            {/* <!-- Header Area --> */}
            <AdminHeader heading={"Manage Jobs"} />
            {/* <!-- navbar- --> */}
            <AdminSidebar heading={"Manage Jobs"} />
          </>
        ) : null}
        <ToastContainer />
        <div
          className={
            showJobDetails === false
              ? props.skill === null ||
                props.skill === undefined ||
                Object.keys(props.skill).length === 0
                ? "dashboard-main-container mt-16"
                : ""
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container-fluid">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Posted Jobs </h3>
                </div>
                {/*<-- Job Search and Filter -->*/}
                <div className="row m-0 align-items-center">
                  <div
                    className={
                      props.skill === null || props.skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "col p-1 form_group"
                    }
                  >
                    <p className="input_label">Search:</p>
                    <input
                      required
                      type="text"
                      className="form-control w-100"
                      placeholder={"Search Job / company"}
                      value={search}
                      name={"name"}
                      onChange={(e) => onSearch(e)}
                    />
                  </div>
                  {/* <div
                    className={
                      props.skill === null || props.skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "col p-1 form_group"
                    }
                  >
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
                  </div> */}
                  <div
                    className={
                      props.skill === null || props.skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "col p-1 form_group"
                    }
                  >
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
                  <div
                    className={
                      props.skill === null || props.skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "col p-1 form_group"
                    }
                  >
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
                  <div
                    className={
                      props.skill === null || props.skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "col p-1 form_group"
                    }
                  >
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
                  <div
                    className={
                      props.skill === null || props.skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "col p-1 form_group"
                    }
                  >
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
                  {props.skill === null ||
                  props.skill === undefined ||
                  Object.keys(props.skill).length === 0 ? (
                    <div className="text-end col-xl-12">
                      <div className="float-md-right">
                        <CustomButton
                          className="font-size-3 rounded-3 btn btn-primary border-0"
                          onClick={() => editJob("0")}
                          title="Add Jobs"
                        >
                          Add Job
                        </CustomButton>
                        {/*<-- Add Job Modal -->*/}
                      </div>
                      <small className="text-danger">{searcherror}</small>
                    </div>
                  ) : null}
                </div>
              </div>
              {/*<-- Job List Table -->*/}
              <JobTable
                search={search}
                jobSwapFilterValue={jobSwapFilterValue}
                locationFilterValue={locationFilterValue}
                SkillFilterValue={SkillFilterValue}
                categoryFilterValue={categoryFilterValue}
                // company={company}
                JobDetail={JobDetail}
                apiCall={apiCall}
                setApiCall={setApiCall}
                skill={props.skill}
                employee_id={props.employee_id}
                selfJob={"no"}
                response={"response"}
                pageNo={pageNo}
                setpageNo={setpageNo}
                jobCall={props.jobCall}
              />
            </div>
          </div>
        </div>
        {/*<-- Job Detail -->*/}
        {/* {showJobDetails === true ? (
          <div
            className={
              props.skill === null ||
              props.skill === undefined ||
              Object.keys(props.skill).length === 0
                ? "dashboard-main-container mt-16 "
                : ""
            }
          >
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 dark-mode-texts">
                  <div className="mb-9">
                    <                      to={""}
                      onClick={() => setShowJobDetails(false)}
                      className="d-flex align-items-center ml-4"
                    >
                      <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                      <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                        Back
                      </span>
                    </
                  </div>
                </div>
              </div>
              <div className="mb-18">
                <JobDetailsBox jobdata={JobId} />
              </div>
            </div>
          </div>
        ) : null} */}
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
    </>
  );
}

export default Job;
