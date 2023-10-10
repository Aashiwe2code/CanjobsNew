import React, { useState, useEffect } from "react";
// import AdminHeader from "./header";
// import AdminSidebar from "./sidebar";
import { Link, useLocation } from "react-router-dom";
// import Addfollowup from "../forms/admin/addfollowup";
import { GetEmployeeByLima } from "../../api/api";
import moment from "moment";
import Pagination from "./pagination";
import FilterJson from "../json/filterjson";
// import AddInterview from "../forms/admin/addInterview.js";
import LmiaStatus from "../forms/admin/lmiastatus";
// import ChangeJob from "../forms/admin/changeJobs";
import Loader from "./loader";
import DocumentModal from "../forms/admin/EmployeeDocumentModal";

export default function LimiaStatusTable(props) {
  /*show modal and data states */
  //   let [showChangeJobModal, setShowChangeJobModal] = useState(false);
  let [apiCall, setApiCall] = useState(props.apiCall);
  //   let [followup, setFollowUp] = useState(false);
  //   let [interview, setInterview] = useState(false);
  let [lmia, setLimia] = useState(false);
  let [documentModal, setDocumentModal] = useState(false);
  let [response, setResponseData] = useState([]);
  let [resData, setResData] = useState("");
  let [searchError, setSearchError] = useState("");
  let [isLoading, setIsLoading] = useState(true);
  /*Filter and search state */
  const [limiaFilterValue, setLimailter] = useState("");
  // const [skillFilterValue, setSkillFilter] = useState("");
  // const [experienceTypeFilterValue, setExperienceTypeFilterValue] =
  //     useState("");
  // let [Json, setJson] = useState([]);
  const [search, setSearch] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("employee_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [jobId, setJobId] = useState(props.responseId);
  const [employeeId, setEmployeeId] = useState();
  const user_type = localStorage.getItem("userType");
  let [changeJob, setChangeJob] = useState(false);
  let location = useLocation();

  /*Function to get the jSon */
  // const JsonData = async () => {
  //     let Json = await GetFilter();
  // if(Json.data.message ==='No data found'){
  //   setJson([])
  // }else{
  //   setJson(Json.data.data);
  // }
  // };
  //   if (apiCall === true && showChangeJobModal === false && changeJob === true && props.setApiCall) {
  //     props.setApiCall(true)
  //   }

  /* Function to get the Response data*/
  const ResponseData = async () => {
    setIsLoading(true);
    try {
      const userData = await GetEmployeeByLima(
        // props.heading === "Manage Follow-ups" || props.heading === "LIMIA status" || user_type === "company"
        //     ? jobId
        //     :
        location.state === null ? jobId : location.state.id,
        search,
        limiaFilterValue,
        props.pageNo,
        recordsPerPage,
        columnName,
        sortOrder,
        props.filter_by_time
      );
      if (userData.data.length === 0) {
        setResData([]);
        setResponseData([]);
        setIsLoading(false);
        setTotalData(0);
      } else {
        setResponseData(userData.data);
        setTotalData(userData.total_rows);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  /*Render function to get the Response*/
  useEffect(() => {
    ResponseData();
    // JsonData();
    if (apiCall === true || changeJob === true) {
      setApiCall(false);
      setChangeJob(false);
    }
  }, [
    search,
    props.pageNo,
    recordsPerPage,
    columnName,
    sortOrder,
    apiCall,
    limiaFilterValue,
    props.filter_by_time,
    props.apiCall,
  ]);

  console.log(props.apiCall);
  /*Search Onchange function to Search REsponse data */
  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    props.setpageNo(1);
    if (inputValue.length > 0) {
      if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
        setSearchError("Category Name cannot start with a number.");
      } else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
        setSearchError("Cannot use special characters.");
      } else {
        setSearchError("");
      }
    } else {
      setSearchError("");
    }
  };
  /*Function to open add follow up modal */
  //   const addFollow = (e) => {
  //     setFollowUp(true);
  //     setResData(e);
  //     setJobId(e.job_id);
  //   };
  //   /*Function to open add Interview up modal */
  //   const addnterview = (e) => {
  //     setInterview(true);
  //     setResData(e);
  //     setJobId(e.job_id);
  //   };
  /*Function to open add Limia up modal */
  const addLimia = (e) => {
    setLimia(true);
    setResData(e);
    setJobId(e.job_id);
  };

  /*Function to open add Document up modal */
  const AddDoucument = (e) => {
    setDocumentModal(true);
    setEmployeeId(e);
  };
  /* Function to show the single data to update job */
  //   const editJob = (e) => {
  //     // e.preventDefault();
  //     setShowChangeJobModal(true);
  //     setResData(e);
  //     setJobId(e.job_id);
  //   };

  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
    props.setpageNo(1);
  };

  return (
    <div
      className={
        // props.heading === "LIMIA status" ||
        //     (props.heading === undefined && user_type === "admin")
        //     ? "site-wrapper overflow-hidden bg-default-2  "
        //     : props.heading === "Dashboard"
        // ?
        "site-wrapper overflow-hidden bg-default-2 bg-white"
        // : "response_main_div"
      }
    >
      {/* {props.heading === "LIMIA status" ||
                (props.heading === undefined && user_type === "admin") ? (
                <>
                    <!-- Header Area -->
                    <AdminHeader heading={"LIMIA status"} />
                    <!-- navbar- -->
                    <AdminSidebar heading={"LIMIA status"} />
                    <ToastContainer />
                </>
            ) : null} */}
      {/* {followup ? (
      <Addfollowup
        show={followup}
        job_id={jobId}
        resData={resData}
        apiCall={apiCall}
        setApiCall={setApiCall}
        close={() => {
          setFollowUp(false);
          setResData("");
        }}
      />
    ) : null} */}
      {/* {interview ? (
      <AddInterview
        show={interview}
        job_id={jobId}
        resData={resData}
        apiCall={apiCall}
        setApiCall={setApiCall}
        close={() => {
          setInterview(false);
          setResData("");
        }}
      />
    ) : null} */}
      {documentModal ? (
        <DocumentModal
          show={documentModal}
          close={() => setDocumentModal(false)}
          employee_id={employeeId}
        />
      ) : null}
      {lmia ? (
        <LmiaStatus
          show={lmia}
          resData={resData}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => {
            setLimia(false);
            setResData("");
          }}
        />
      ) : null}
      {/* {showChangeJobModal ? (
      <ChangeJob
        resData={resData}
        close={() => {
          setShowChangeJobModal(false);
          setResData("");
        }}
        apiCall={apiCall}
        setApiCall={setApiCall}
        job_id={jobId}
        show={showChangeJobModal}
        status={0}
        setChangeJob={setChangeJob}
      />
    ) : null} */}
      <div
        className={
          // props.heading === "LIMIA status" ||
          //     (props.heading === undefined && user_type === "admin")
          //     ? "dashboard-main-container mt-16"
          //     : props.heading === "Dashboard"
          //         ? ""
          //         : "response__container"
          ""
        }
      >
        <div
          className={
            // props.heading === "LIMIA status" ||
            //     (props.heading === undefined && user_type === "admin")
            //     ? "container"
            //     : props.heading === "Dashboard"
            //         ?
            ""
            // : "container"
          }
        >
          {props.heading === "Dashboard" ? (
            ""
          ) : (
            <div
              className={
                props.heading === "Manage Follow-ups"
                  ? "response_filters mb-2 align-items-center"
                  : "align-items-center"
              }
            >
              <div className="page___heading">
                <h3 className="font-size-6 mb-0">Follow Up</h3>
              </div>
              <div
                className={
                  props.heading === "LIMIA status" ||
                  (props.heading === undefined && user_type === "admin")
                    ? "row m-0 align-items-center"
                    : "d-none"
                }
              >
                {props.heading === "" ? null : (
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Search :</p>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={"Search Company / Name"}
                      value={search}
                      name={"category_name"}
                      onChange={(e) => {
                        onSearch(e);
                      }}
                    />
                  </div>
                )}
                {/* <div className="col p-1 form_group mb-3">
                                    <p className="input_label">Filter by Skill:</p>
                                    <div className="select_div">
                                        <select
                                            name="job"
                                            id="job"
                                            value={skillFilterValue}
                                            onChange={(e) => {
                                                setSkillFilter(e.target.value);
                                                props.setpageNo(1)
                                            }}
                                            className=" form-control"
                                        >
                                            <option value="">Select Skil</option>
                                            {(Json.Skill || []).map((skill) => (
                                                <option value={skill.value} key={skill.id}>
                                                    {skill.value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col p-1 form_group mb-3">
                                    <p className="input_label">Filter by Experience:</p>
                                    <div className="select_div">
                                        <select
                                            name="experience"
                                            id="experience"
                                            value={experienceTypeFilterValue}
                                            onChange={(e) => {
                                                setExperienceTypeFilterValue(e.target.value);
                                                props.setpageNo(1)
                                            }}
                                            className=" form-control"
                                        >
                                            <option value="">Select Experience</option>
                                            {(FilterJson.experience || []).map((ex, i) => (
                                                <option value={ex} key={i}>
                                                    {ex}
                                                    {ex === "fresher" || ex === "Other" ? "" : "Year"}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div> */}
                <div className="col p-1 form_group mb-3">
                  <p className="input_label">Filter by LMIA status:</p>
                  <div className="select_div">
                    <select
                      name="lmia"
                      id="lmia"
                      value={limiaFilterValue}
                      onChange={(e) => {
                        setLimailter(e.target.value);
                        props.setpageNo(1);
                      }}
                      className="text-capitalize form-control"
                    >
                      <option value="">Select LIMIA status</option>
                      {(FilterJson.lmia_status || []).map((data, i) => (
                        <option value={data} key={i}>
                          {data}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="float-md-right mt-6"></div>
              </div>
              <small className="text-danger">{searchError}</small>
            </div>
          )}
          <div className="mb-8">
            <div
              className={
                // props.heading === "LIMIA status" ||
                // (props.heading === undefined && user_type === "admin")
                // ? ""
                // : props.heading === "Dashboard"
                // ?
                "bg-white shadow-8 datatable_div pt-7 rounded pb-9 px-5"
                // : ""
              }
            >
              <div className="table-responsive main_table_div">
                {isLoading ? (
                  <Loader />
                ) : (
                  <table className="table table-striped main_data_table">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="pl-0 border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={() => {
                              handleSort("name");
                            }}
                            className="text-gray"
                            title="Sort by Name"
                          >
                            Name
                          </Link>
                        </th>
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <th
                            scope="col"
                            className="pl-0 border-0 font-size-4 font-weight-normal"
                          >
                            <Link
                              to={""}
                              onClick={() => {
                                handleSort("experience");
                              }}
                              className="text-gray"
                              title="Sort by Experience"
                            >
                              Experience
                            </Link>
                          </th>
                        )}
                        {/* <th
                                                    scope="col"
                                                    className="pl-4 border-0 font-size-4 font-weight-normal"
                                                >
                                                    <Link
                                                        to={""}
                                                        onClick={() => {
                                                            handleSort("job_title");
                                                            props.setpageNo(1)
                                                        }}
                                                        className="text-gray"
                                                        title="Sort by Job"
                                                    >
                                                        Job / Company
                                                    </Link>
                                                </th> */}

                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={() => {
                              handleSort("contact_no");
                            }}
                            className="text-gray"
                            title="Sort by Contact"
                          >
                            Contact
                          </Link>
                        </th>

                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <th
                            scope="col"
                            className="pl-4 border-0 font-size-4 font-weight-normal"
                          >
                            <Link
                              to={""}
                              onClick={() => {
                                handleSort("current_location");
                              }}
                              className="text-gray"
                              title="Sort by Address"
                            >
                              Address
                            </Link>
                          </th>
                        )}

                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={() => {
                              handleSort("lmia_status");
                            }}
                            className="text-gray"
                            title="Sort by LIMIA Status"
                          >
                            LMIA
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          Job
                        </th>
                        {props.heading === "Dashboard" ||
                        user_type === "company" ? (
                          ""
                        ) : (
                          <th
                            scope="col"
                            className="pl-4 border-0 font-size-4 font-weight-normal"
                          >
                            Action
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {totalData === 0 || response.length === 0 ? (
                        <tr>
                          <th className="bg-white"></th>

                          {props.heading === "Dashboard" ? (
                            <th className="bg-white">No Data Found</th>
                          ) : (
                            <></>
                          )}
                          {props.heading === "Dashboard" ? (
                            <th className="bg-white"></th>
                          ) : (
                            <>
                              <th className="bg-white"></th>
                              <th className="bg-white text-center">
                                No Data Found
                              </th>
                            </>
                          )}
                          <th className="bg-white"></th>
                          {props.heading === "Dashboard" ? (
                            ""
                          ) : (
                            <>
                              <th className="bg-white"></th>
                              <th className="bg-white"></th>
                            </>
                          )}
                        </tr>
                      ) : (
                        (response || []).map((res, i) => (
                          <tr className="text-capitalize" key={i}>
                            <th className=" py-5">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {res.name || res.gender || res.date_of_birth ? (
                                  <div className="d-flex profile_box gx-2">
                                    <div className="media  align-items-center">
                                      <div className="circle-36 mx-auto overflow-hidden">
                                        {/* {JSON.stringify(res.profile_photo)} */}
                                        {res.profile_photo === null ||
                                        res.profile_photo === undefined ||
                                        res.profile_photo === "undefined" ||
                                        res.profile_photo === "" ||
                                        res.profile_photo === "Null" ? (
                                          <img
                                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                            alt=""
                                            className="w-100"
                                          />
                                        ) : (
                                          <img
                                            src={res.profile_photo}
                                            alt=""
                                            className="w-100"
                                          />
                                        )}
                                      </div>
                                    </div>

                                    <div className=" mb-0">
                                      <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                                        <Link
                                          to={`/${res.employee_id}`}
                                          className="text-dark"
                                        >
                                          {res.name}
                                        </Link>
                                      </p>
                                      <p className="text-gray font-size-2 m-0 text-capitalize">
                                        {res.gender === "female" ? "F" : "M"} (
                                        {res.marital_status + ", "}
                                        {/*Calculation of age from date of birth*/}
                                        {moment().diff(
                                          res.date_of_birth,
                                          "years"
                                        )}
                                        Y)
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                                    NA
                                  </span>
                                )}
                              </h3>
                            </th>
                            {props.heading === "Dashboard" ? (
                              ""
                            ) : (
                              <th className=" py-5">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {res.experience ? (
                                    res.experience
                                  ) : (
                                    <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                                      NA
                                    </span>
                                  )}
                                </h3>
                              </th>
                            )}
                            {/* <th className="py-5 ">
                                                            <p className="m-0 text-black-2 font-weight-semibold text-capitalize">
                                                                {res.job_title}
                                                            </p>
                                                            <p className="font-size-3 font-weight-normal m-0 text-capitalize">
                                                                {res.company_name}
                                                            </p>
                                                        </th> */}

                            <th className=" py-5">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {res.contact_no || res.email ? (
                                  <>
                                    <p className="font-size-3 font-weight-normal m-0">
                                      <Link
                                        className="text-dark"
                                        to={`tel:${res.contact_no}`}
                                      >
                                        {res.contact_no
                                          ? `+${res.contact_no}`
                                          : ""}
                                      </Link>
                                    </p>
                                    <p className="font-size-3 font-weight-normal m-0">
                                      <Link
                                        className="text-dark"
                                        to={`mailto:${res.email}`}
                                      >
                                        {res.email}
                                      </Link>
                                    </p>
                                  </>
                                ) : (
                                  <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                                    NA
                                  </span>
                                )}
                              </h3>
                            </th>

                            {props.heading === "Dashboard" ? (
                              ""
                            ) : (
                              <th className="py-5 ">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {res.current_location ||
                                  res.currently_located_country ? (
                                    <>
                                      <span>{res.current_location}</span>
                                      <span className="px-1">
                                        {res.currently_located_country}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                                      NA
                                    </span>
                                  )}
                                </h3>
                              </th>
                            )}

                            <th className=" py-5">
                              <div className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {res.lmia_status === "candidate placement" ? (
                                  <span className="px-3 py-2 badge badge-pill badge-warning">
                                    Candidate Placement
                                  </span>
                                ) : res.lmia_status === "submission" ? (
                                  <span className="px-3 py-2 badge badge-pill bg-info text-white">
                                    Submission
                                  </span>
                                ) : res.lmia_status === "decision" ? (
                                  <span className="px-3 py-2 badge badge-pill badge-gray">
                                    Decision
                                  </span>
                                ) : (
                                  //
                                  <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                                    NA
                                  </span>
                                )}
                              </div>
                            </th>
                            <th className="py-5 ">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {res.job_title ? (
                                  <>
                                    <Link
                                      to={`/job_detail`}
                                      onClick={() =>
                                        localStorage.setItem(
                                          "job_id",
                                          res.job_id
                                        )
                                      }
                                    >
                                      <p className="m-0 text-black-2 font-weight-semibold text-capitalize">
                                        {res.job_title}
                                      </p>
                                    </Link>
                                    <Link
                                      to={`/job_detail`}
                                      onClick={() =>
                                        localStorage.setItem(
                                          "job_id",
                                          res.job_id
                                        )
                                      }
                                    >
                                      <p className="font-size-3 font-weight-normal m-0 text-capitalize">
                                        {res.company_name}
                                      </p>
                                    </Link>
                                  </>
                                ) : (
                                  <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                                    NA
                                  </span>
                                )}
                              </h3>
                            </th>

                            {/* <th className="  py-5 ">
                            <p className="font-size-3 font-weight-normal mb-0">
                              {res.status === "COMPLETE" ? (
                                <span className="p-1 badge badge-pill bg-primary-opacity-8 text-white text-center w-100 border rounded-pill">Complete</span>
                              ) : (
                                <span className="px-3 py-2 badge badge-pill bg-info text-white">
                                  Scheduled
                                </span>
                              )}
                            </p>
                          </th> */}
                            {props.heading === "Dashboard" ||
                            user_type === "company" ? (
                              ""
                            ) : (
                              <th className="py-5  min-width-px-100">
                                <div
                                  className="btn-group button_group"
                                  role="group"
                                  aria-label="Basic example"
                                >
                                  {/* <button
                                  className="btn btn-outline-info action_btn"
                                  onClick={() => addFollow(res)}
                                  title=" Add Follow Up"
                                >
                                  <i className=" fas fa-plus text-gray px-2"></i>
                                </button> */}
                                  {/* <button
                                  className="btn btn-outline-info action_btn"
                                  onClick={() => addnterview(res)}
                                  title=" Add Interview"
                                  disabled={res.status === "COMPLETE" ? true : false}
                                >
                                  <i className="fa fa-calendar text-gray px-2"></i>
                                </button> */}
                                  <button
                                    className="btn btn-outline-info action_btn text-gray"
                                    onClick={() => addLimia(res)}
                                    title="Add LMIA"
                                  >
                                    LMIA
                                  </button>
                                  <button
                                    className="btn btn-outline-info action_btn"
                                    onClick={() =>
                                      AddDoucument(res.employee_id)
                                    }
                                    title="Documents"
                                  >
                                    <span className="fas fa-file text-gray"></span>
                                  </button>
                                  {/* <button
                                  className="btn btn-outline-info action_btn text-gray"
                                  onClick={() => editJob(res)}
                                  title="Change Job"
                                >
                                  <i className="fas fa-briefcase"></i>
                                </button> */}
                                </div>
                              </th>
                            )}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="pt-2">
                <Pagination
                  nPages={nPages}
                  currentPage={props.pageNo}
                  setCurrentPage={props.setpageNo}
                  total={totalData}
                  count={response.length}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
