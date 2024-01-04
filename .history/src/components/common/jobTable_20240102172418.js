import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AddJobModal from "../forms/employer/job";
import EmployerDocumentModal from "../forms/admin/EmployerDocumetModal";
import {
  GetAllJobs,
  DeleteJob,
  ApplyJob,
  GetEmployeeFilterJob,
  GetJobLimaSubStages,
} from "../../api/api";
import { toast } from "react-toastify";
import SAlert from "../common/sweetAlert";
import Pagination from "../common/pagination";
import Loader from "../common/loader";
import EmployeeModal from "../admin/Modal/employeeModal";
import JobResponse from "../admin/response";
import LmiaStatus from "../forms/admin/lmiastatus";
import { LiaUserEditSolid, LiaUserTieSolid } from "react-icons/lia";
import { BsArrow90DegRight } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { GrDocumentUpload } from "react-icons/gr";
import moment from "moment";
export default function JobTable(props) {
  /*show Modal and props state */
  let [isLoading, setIsLoading] = useState(true);
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  let [showAddCompanyDocModal, setShowAddCompanyDocModal] = useState(false);
  let [openLimia, setOpenLimia] = useState(false);
  let [showCandidateModal, setShowCandidateModal] = useState(false);
  let [apiCall, setApiCall] = useState(false);
  const [jobData, setjobData] = useState([]);
  const [lmiaStatus, setLmiaStatus] = useState([]);
  const [lmiaStatusRejectComment, setLmiaStatusRejectComment] = useState([]);
  const [JobId, setJobId] = useState();
  const [CompanyId, setCompanyId] = useState();
  const [candidateSkill, setCandidateSkill] = useState();
  /*Delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  // const [currentPage, setCurrentPage] = useState(props.pageNo);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("job_id");
  const [sortOrder, setSortOrder] = useState("");
  /*Response states */
  const [responseId, setresponseId] = useState();
  const [responseDropDown, setresponseDropDown] = useState(false);
  let location = useLocation();
  let user_type = localStorage.getItem("userType");
  let job_id = location.state
    ? location.state.id
    : location.pathname === "/job_detail"
    ? localStorage.getItem("job_id")
    : "";
  /* Function to get Job data*/
  const JobData = async () => {
    setIsLoading(true);
    try {
      let userData;
      if (props.employee_id) {
        userData = await GetEmployeeFilterJob(
          props.employee_id,
          // props.SkillFilterValue
          props.search,
          props.locationFilterValue,
          props.categoryFilterValue,
          props.SkillFilterValue,
          props.jobSwapFilterValue,
          props.pageNo,
          recordsPerPage,
          columnName,
          sortOrder,
          props.company
        );
      } else {
        userData = await GetAllJobs(
          location.state ? location.state.company_name : props.search,
          props.locationFilterValue,
          props.categoryFilterValue,
          props.SkillFilterValue,
          props.jobSwapFilterValue,
          props.pageNo,
          recordsPerPage,
          columnName,
          sortOrder,
          props.company,
          props.filter_by_time,
          job_id,
          props.response === "self" ? "1" : "0",
          props.response === "lmia" ? "1" : "0",
          props.response === "lmia" ? "1" : "0",
          props.company_id
        );
      }
      if (
        userData.data.data.length === 0 ||
        userData.data.length === 0 ||
        userData.data.data === undefined
      ) {
        setjobData([]);
        setresponseId();
        setIsLoading(false);
      } else {
        if (
          props.heading ||
          location.pathname === "/employee" ||
          props.lima === "no" ||
          user_type === "user" ||
          props.skill
        ) {
          setresponseId();
        } else {
          //condition to get the response from job id
          const filteredItems = userData.data.data.filter(
            (item) =>
              (props.selfJob === "yes"
                ? item.applied_by_self
                : item.applied_by_admin) > 0
          );
          if (filteredItems.length === 0) {
            setresponseId();
          } else {
            // Step 4: Get the First Item
            setresponseId(filteredItems[0].job_id);
          }
        }
        setjobData(userData.data.data);
        /*Logic for finding reject substage of decision lima status */
        if (userData.data.data.length >= 0) {
          let LmiaData = userData.data.data;
          let LmiaCommentArray = [];
          for (let i = 0; i < userData.data.data.length; i++) {
            if (userData.data.data[i].lmia_status === "decision") {
              const data = userData.data.data[i];
              const subStageRes = await GetJobLimaSubStages(
                data.job_id,
                data.lmia_status
              );
              let index = subStageRes.data.data.length - 1;
              LmiaCommentArray.push(subStageRes.data.data[index]);
              if (
                subStageRes.data.data.filter(
                  (item) => item.lmia_substage === "rejected"
                ).length > 0
              ) {
                LmiaData = LmiaData.filter(
                  (item) => item.job_id !== data.job_id
                );
              }
            }
          }
          if (
            // props.detail === "company_detail" ||
            props.detail === "job_detail"
          ) {
            props.setLmiaStatusRejectComment(LmiaCommentArray);
            props.setLmia(LmiaData);
          }
          setLmiaStatus(LmiaData);
          setLmiaStatusRejectComment(LmiaCommentArray);
        }
      }
      setTotalData(userData.data.total_rows);
      setIsLoading(false);
      //condition for limia and visa page
      // if (props.response === "lmia" || props.response === "visa") {
      //   setjobData(userData.data.data.filter((item) => item.applied_by_self !== "0" || item.applied_by_admin !== "0"));
      //   setIsLoading(false);
      // }
      // //condition for Self job applied page
      // else if (props.response === "self") {
      //   setjobData(userData.data.data.filter((item) => item.applied_by_self !== "0"));
      //   setresponseId(userData.data.data.filter((item) => item.applied_by_self !== "0")[0].job_id)
      //   setIsLoading(false);
      // } else
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  /*Render function to get the job */
  useEffect(() => {
    JobData();
    if (apiCall === true || props.apiCall === true) {
      props.setApiCall(false);
      setApiCall(false);
    }
  }, [
    props.categoryFilterValue,
    props.SkillFilterValue,
    props.locationFilterValue,
    props.jobSwapFilterValue,
    props.search,
    props.pageNo,
    sortOrder,
    // props.company,
    props.filter_by_time,
    apiCall,
    props.apiCall,
    props.heading,
  ]);
  /* Function to show the Job detail data */
  // const JobDetail = (e) => {
  //   props.JobDetail(e);
  // };

  /* Function to show the Table of the employee of perticular skill */
  const matchingCandidates = (e) => {
    setShowCandidateModal(true);
    setCandidateSkill(e);
  };

  /* Function to show the single data to update job */
  const editJob = (e) => {
    setShowAddJobsModal(true);
    setJobId(e);
  };

  /**function to open document modal */
  const OpenAddDocModal = (e) => {
    setShowAddCompanyDocModal(true);
    setCompanyId(e);
  };
  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.job_id);
    setDeleteName(e.job_title);
    setDeleteAlert(true);
  };
  // const GetLimaSubStageReject = (id) => {
  //   return
  // };
  /*To call Api to delete Job */
  async function deleteJob(e) {
    try {
      const responseData = await DeleteJob(e);
      if (responseData.message === "job has been deleted") {
        toast.error("Job deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        setDeleteAlert(false);
      }
    } catch (err) {
      console.log(err);
    }
  }
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
    props.setpageNo(1);
    setApiCall(true);
  };

  /*Function to Apply employee for job */
  const onApplyJobClick = async (id) => {
    try {
      const responseData = await ApplyJob(id, props.employee_id, 0);
      if (responseData.message === "already applied on this job") {
        toast.error("Already applied on this job", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
      }
      if (responseData.message === "Job applied successfully") {
        toast.success("Applied successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        props.jobCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*Function to open update LIMA */
  const updateLima = (job) => {
    setJobId(job);
    setOpenLimia(true);
  };
  return (
    <>
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
        <div className="table-responsive main_table_div">
          {isLoading ? (
            <Loader load={"yes"} />
          ) : (
            <table className="table table-striped main_data_table">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      onClick={() => {
                        handleSort("job_title");
                      }}
                      title="Sort by Job Title"
                      className="text-gray"
                    >
                      Job title
                    </Link>
                  </th>
                  {props.heading === "Dashboard" ? null : (
                    <th
                      scope="col"
                      className=" border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to=""
                        onClick={() => handleSort("job_type")}
                        title="Sort by Job"
                        className="text-gray"
                      >
                        Job Type
                      </Link>
                    </th>
                  )}
                  {props.heading === "Dashboard" ? null : (
                    <th
                      scope="col"
                      className=" border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to=""
                        onClick={() => {
                          handleSort("location");
                        }}
                        className="text-gray"
                        title="Sort by Address"
                      >
                        Address
                      </Link>
                    </th>
                  )}
                  {props.heading === "Dashboard" ? null : (
                    <th
                      scope="col"
                      className=" border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to=""
                        onClick={() => handleSort("education")}
                        className="text-gray"
                        title="Sort by Education"
                      >
                        Education
                      </Link>
                    </th>
                  )}
                  {props.heading === "Dashboard" ? null : (
                    <th
                      scope="col"
                      className=" border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to=""
                        onClick={() => handleSort("keyskill")}
                        className="text-gray"
                        title="Sort by Skill"
                      >
                        Skills
                      </Link>
                    </th>
                  )}
                  {props.heading === "Dashboard" ? null : (
                    <th
                      scope="col"
                      className=" border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to=""
                        onClick={() => handleSort("created_at")}
                        className="text-gray"
                        title="Sort by posting date"
                      >
                        Posting Date
                      </Link>
                    </th>
                  )}
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={() => handleSort("salary")}
                      className="text-gray"
                      title="Sort by Salary"
                    >
                      Salary
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={() => handleSort("experience_required")}
                      className="text-gray"
                      title="Sort by Experience"
                    >
                      Experience
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className={
                      user_type === "user"
                        ? "d-none"
                        : " border-0 font-size-4 font-weight-normal"
                    }
                  >
                    Vacancies / Responses
                  </th>
                  <th
                    scope="col"
                    className={
                      user_type === "user"
                        ? "d-none"
                        : " border-0 font-size-4 font-weight-normal"
                    }
                  >
                    LMIA status
                  </th>
                  {props.heading === "Dashboard" ||
                  user_type === "user" ||
                  user_type === "company" ? null : (
                    <th
                      scope="col"
                      className=" border-0 font-size-4 font-weight-normal"
                    >
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Map function to show the data in the list*/}
                {totalData === 0 || jobData.length === 0 ? (
                  <tr>
                    <th colSpan={11} className="bg-white text-center">
                      No Data Found
                    </th>
                  </tr>
                ) : (
                  (jobData || []).map((job, i) => {
                    let LmiaStatusData = lmiaStatus.filter(
                      (item) => item.job_id === job.job_id
                    );
                    return (
                      <React.Fragment key={job.job_id}>
                        <tr
                          className={
                            /*job.is_applied === "1" ? "d-none" : */ "col-12 text-capitalize job_row"
                          }
                        >
                          <th scope="row" className="py-5 ">
                            <div className="">
                              <Link
                                to={`/job_detail`}
                                onClick={
                                  () =>
                                    localStorage.setItem("job_id", job.job_id)
                                  // JobDetail(job.job_id)
                                }
                                className="font-size-3 mb-0 font-weight-semibold text-black-2 text-truncate"
                                title={job.job_title + ` (${job.employement})`}
                              >
                                <>
                                  <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                                    {job.job_title}{" "}
                                    {job.employement
                                      ? `(${job.employement})`
                                      : ""}
                                  </p>
                                  <p className="text-gray font-size-2 m-0 text-capitalize">
                                    {job.company_name}
                                    {/* - {job.industry_type} */}
                                    <br />
                                    {job.is_featured === "1" ? (
                                      <span className="bg-orange text-white featured_tag">
                                        Featured
                                      </span>
                                    ) : null}
                                  </p>
                                </>
                              </Link>
                            </div>
                          </th>
                          {props.heading === "Dashboard" ? null : (
                            <th className=" py-5">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {/* {job.employement} -  */}
                                {job.job_type}
                                <br />
                                {/* {job.industry_type} */}
                              </h3>
                            </th>
                          )}
                          {props.heading === "Dashboard" ? null : (
                            <th className=" py-5">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {job.industry_type
                                  ? `${job.industry_type},`
                                  : ""}
                                {job.location}
                              </h3>
                            </th>
                          )}
                          {props.heading === "Dashboard" ? null : (
                            <th className="py-5 ">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {job.education ? job.education : "N/A"}
                              </h3>
                            </th>
                          )}
                          {props.heading === "Dashboard" ? null : (
                            <th className="py-5 ">
                              <h3
                                className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate"
                                title={job.keyskill}
                              >
                                {job.keyskill ? job.keyskill : "N/A"}
                              </h3>
                            </th>
                          )}
                          {props.heading === "Dashboard" ? null : (
                            <th className="py-5 ">
                              <h3
                                className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate"
                                title={moment(job.created_at).format(
                                  "DD MMMM, YYYY"
                                )}
                              >
                                {/* {job.created_at ? job.created_at : "N/A"} */}
                                {moment(job.created_at).format("DD MMMM, YYYY")}
                              </h3>
                            </th>
                          )}
                          <th className="py-5 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {job.salary ? "$" + job.salary : "N/A"}
                            </h3>
                          </th>
                          <th className="py-5 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {job.experience_required}
                              {job.experience_required === "1-3 " ||
                              job.experience_required === "1-2 " ||
                              job.experience_required === "3-5 " ||
                              job.experience_required === "5-7 " ||
                              job.experience_required === "7+ "
                                ? "years"
                                : ""}
                            </h3>
                          </th>
                          <th
                            className={
                              user_type === "user" ? "d-none" : "py-5 "
                            }
                          >
                            <h3 className="font-size-3 font-weight-bold text-black-2 mb-0">
                              {props.heading === "Dashboard" ? (
                                <span>
                                  {job.role_category} /
                                  {props.selfJob === "yes"
                                    ? job.applied_by_self
                                    : job.applied_by_admin}
                                </span>
                              ) : (
                                <Link
                                  onClick={() => {
                                    setresponseId(job.job_id);
                                    setresponseDropDown(
                                      responseDropDown === false ? true : false
                                    );
                                  }}
                                  className="text-dark"
                                >
                                  {job.role_category} /
                                  {props.selfJob === "yes"
                                    ? job.applied_by_self
                                    : job.applied_by_admin}
                                </Link>
                              )}
                            </h3>
                          </th>
                          <th
                            className={
                              user_type === "user" ? "d-none" : " py-5"
                            }
                          >
                            <div className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {
                                job.lmia_status === "onboarding" ? (
                                  <span className="px-3 py-2 badge badge-pill badge-shamrock">
                                    Onboarding
                                  </span>
                                ) : job.lmia_status === "advertisements" ? (
                                  <span className="px-3 py-2 badge badge-pill bg-info text-white">
                                    Advertisements
                                  </span>
                                ) : job.lmia_status === "documentation" ? (
                                  <span className="px-3 py-2 badge badge-pill badge-gray">
                                    Documentation
                                  </span>
                                ) : job.lmia_status ===
                                  "candidate placement" ? (
                                  <span className="px-3 py-2 badge badge-pill bg-primary-opacity-9 text-white">
                                    Candidate Placement
                                  </span>
                                ) : job.lmia_status === "submission" ? (
                                  <span className="px-3 py-2 badge badge-pill badge-warning">
                                    Submission
                                  </span>
                                ) : job.lmia_status === "decision" ? (
                                  <span className="px-3 py-2 badge badge-pill badge-dark">
                                    Decision
                                  </span>
                                ) : (
                                  <span>NA</span>
                                )
                                // ) : (job.lmia_status === "application submitted" ? (
                                //   <span className="px-3 py-2 badge badge-pill badge-info">
                                //     Application submitted
                                //   </span>
                                // )
                              }
                            </div>
                          </th>
                          {props.heading === "Dashboard" ||
                          user_type === "user" ||
                          user_type === "company" ? null : (
                            <th className="py-5 min-width-px-100">
                              <div
                                className="btn-group button_group"
                                role="group"
                              >
                                {
                                  // props.response === "lmia" ?
                                  // <>
                                  //   <button
                                  //     className="btn btn-outline-info action_btn"
                                  //     onClick={() => {
                                  //       setresponseId(job.job_id);
                                  //       setresponseDropDown(
                                  //         responseDropDown === false
                                  //           ? true
                                  //           : false
                                  //       );
                                  //     }}
                                  //     disabled={
                                  //       props.selfJob === "yes"
                                  //         ? job.applied_by_self > 0 ? false : true
                                  //         : job.applied_by_admin > 0 ? false : true
                                  //     }
                                  //     title="Job LMIA"
                                  //   >
                                  //     LMIA Responses
                                  //   </button>
                                  //   <button
                                  //             className="btn btn-outline-info action_btn"
                                  //             onClick={() => updateLima(job)}
                                  //             title="Update LMIA for jobs"
                                  //           >
                                  //             LMIA
                                  //           </button>
                                  //           </>:
                                  //   props.response === "visa" ?
                                  //     <button
                                  //       className="btn btn-outline-info action_btn"
                                  //       onClick={() => {
                                  //         setresponseId(job.job_id);
                                  //         setresponseDropDown(
                                  //           responseDropDown === false
                                  //             ? true
                                  //             : false
                                  //         );
                                  //       }}
                                  //       disabled={
                                  //         props.selfJob === "yes"
                                  //           ? job.applied_by_self > 0 ? false : true
                                  //           : job.applied_by_admin > 0 ? false : true
                                  //       }
                                  //       title="Job visa"
                                  //     >
                                  //       Visa Responses
                                  //     </button> :
                                  props.skill === null ||
                                  props.skill === undefined ||
                                  Object.keys(props.skill).length === 0 ? (
                                    <>
                                      <div
                                        className="btn-group button_group"
                                        // role="group"
                                      >
                                        <button
                                          className="btn btn-outline-info action_btn"
                                          onClick={() => {
                                            setresponseId(job.job_id);
                                          }}
                                          disabled={
                                            props.selfJob === "yes"
                                              ? job.applied_by_self > 0
                                                ? false
                                                : true
                                              : job.applied_by_admin > 0
                                              ? false
                                              : true
                                          }
                                          title="Job Response"
                                        >
                                          <span className="text-gray px-2">
                                            <MdFormatListBulletedAdd />
                                          </span>
                                          {/* <i className="fa fa-list"></i> */}
                                        </button>
                                      </div>
                                      {props.selfJob === "yes" ? null : (
                                        <>
                                          <button
                                            className={
                                              user_type === "admin" &&
                                              props.response === "lmia"
                                                ? "btn btn-outline-info action_btn "
                                                : "d-none"
                                            }
                                            onClick={() => updateLima(job)}
                                            title="Update LIMA"
                                          >
                                            <span className="text-gray px-2">
                                              LMIA
                                            </span>
                                          </button>
                                          <button
                                            className={
                                              props.response === "lmia" ||
                                              props.response === "visa"
                                                ? "d-none"
                                                : "btn btn-outline-info action_btn"
                                            }
                                            onClick={() =>
                                              matchingCandidates(job)
                                            }
                                            title="All candidates"
                                            // disabled={
                                            //   Number(job.applied_by_admin) >= Number(job.role_category)
                                            //     ? true
                                            //     : false
                                            // }
                                          >
                                            <span className="text-gray px-2">
                                              <LiaUserTieSolid />
                                            </span>
                                            {/* <span className="fas fa-user-tie text-gray"></span> */}
                                          </button>
                                          <button
                                            className={
                                              (props.response === "lmia" &&
                                                user_type === "admin") ||
                                              props.response === "visa"
                                                ? "d-none"
                                                : "btn btn-outline-info action_btn"
                                            }
                                            onClick={() => editJob(job.job_id)}
                                            title="Edit Job"
                                          >
                                            <span className="text-gray px-1">
                                              <LiaUserEditSolid />
                                            </span>
                                            {/* <span className=" fas fa-edit text-gray"></span> */}
                                          </button>

                                          <button
                                            className={
                                              (props.response === "response" &&
                                                location.pathname === "/job") ||
                                              (user_type === "admin" &&
                                                location.pathname ===
                                                  "/job_detail")
                                                ? "btn btn-outline-info action_btn"
                                                : "d-none"
                                            }
                                            title="Job LMIA"
                                          >
                                            <Link
                                              to="/lmia"
                                              className="text-dark"
                                              state={{ id: job.job_id }}
                                            >
                                              <span className="text-gray px-2">
                                                <BsArrow90DegRight />
                                              </span>
                                              {/* <span className="fas fa-arrow-left text-gray px-2"></span> */}
                                            </Link>
                                          </button>
                                          <button
                                            className={`${
                                              props.detail === "company_detail"
                                                ? "d-none"
                                                : "btn btn-outline-info action_btn"
                                            }`}
                                            title="Client's document"
                                            onClick={() =>
                                              OpenAddDocModal(job.company_id)
                                            }
                                          >
                                            <span className="text-gray px-2">
                                              <GrDocumentUpload />
                                            </span>
                                          </button>
                                          <button
                                            className={
                                              props.response === "lmia" ||
                                              props.response === "visa"
                                                ? "d-none"
                                                : "btn btn-outline-info action_btn"
                                            }
                                            onClick={() => ShowDeleteAlert(job)}
                                            title="Delete"
                                          >
                                            <span className=" text-danger px-1">
                                              <RiDeleteBin5Line />
                                              {/* <i className="fa fa-trash"></i> */}
                                            </span>
                                          </button>
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <button
                                      className="btn btn-outline-info action_btn"
                                      disabled={
                                        job.is_applied === "1"
                                          ? true
                                          : false ||
                                            Number(job.applied_by_admin) >=
                                              Number(job.role_category)
                                          ? true
                                          : false
                                      }
                                      onClick={() =>
                                        onApplyJobClick(job.job_id)
                                      }
                                      title="Apply For job"
                                    >
                                      {job.is_applied === "1"
                                        ? "Already Applied"
                                        : "Apply"}
                                    </button>
                                  )
                                }
                              </div>
                            </th>
                          )}
                        </tr>
                        {props.heading === "Dashboard" ||
                        props.detail === "job_detail" ||
                        user_type === "user" ? null : (
                          <tr
                            className={
                              props.heading === "Dashboard" ||
                              props.skill === null ||
                              props.skill === undefined ||
                              Object.keys(props.skill).length === 0
                                ? "col-12 "
                                : "d-none"
                            }
                          >
                            <td
                              colSpan="11"
                              className={
                                job.lmia_status ? "bg-white" : "d-none"
                              }
                            >
                              <div className="arrow-wrapper custome_arrow_wrapper w-100 d-flex flex-wrap mb-0">
                                <div className="arrow-steps" key={i}>
                                  <div className="job_name text-dark">
                                    <span className="m-0 font-size-2 d-block mb-1">
                                      {LmiaStatusData.job_title}
                                    </span>
                                  </div>
                                  <div>
                                    <div
                                      key={i + 1}
                                      className={`step text-capitalize ${
                                        job.lmia_status === "advertisements" ||
                                        job.lmia_status === "documentation" ||
                                        job.lmia_status ===
                                          "candidate placement" ||
                                        job.lmia_status === "submission" ||
                                        job.lmia_status === "decision"
                                          ? "approved"
                                          : job.lmia_status === "onboarding"
                                          ? "pending"
                                          : ""
                                      }`}
                                    >
                                      <span>onboarding </span>
                                    </div>
                                    <div
                                      key={i + 2}
                                      className={`step text-capitalize ${
                                        job.lmia_status === "documentation" ||
                                        job.lmia_status ===
                                          "candidate placement" ||
                                        job.lmia_status === "submission" ||
                                        job.lmia_status === "decision"
                                          ? "approved"
                                          : job.lmia_status === "advertisements"
                                          ? "pending"
                                          : ""
                                      }`}
                                    >
                                      <span>advertisements </span>
                                    </div>
                                    <div
                                      key={i + 3}
                                      className={`step text-capitalize ${
                                        job.lmia_status ===
                                          "candidate placement" ||
                                        job.lmia_status === "submission" ||
                                        job.lmia_status === "decision"
                                          ? "approved"
                                          : job.lmia_status === "documentation"
                                          ? "pending"
                                          : ""
                                      }`}
                                    >
                                      <span>documentation </span>
                                    </div>
                                    <div
                                      key={i + 4}
                                      className={`step text-capitalize ${
                                        job.lmia_status === "submission" ||
                                        job.lmia_status === "decision"
                                          ? "approved"
                                          : job.lmia_status ===
                                            "candidate placement"
                                          ? "pending"
                                          : ""
                                      }`}
                                    >
                                      <span>candidate placement </span>
                                    </div>
                                    <div
                                      key={i + 5}
                                      className={`step text-capitalize ${
                                        job.lmia_status === "decision"
                                          ? "approved"
                                          : job.lmia_status === "submission"
                                          ? "pending"
                                          : ""
                                      }`}
                                    >
                                      <span>submission </span>
                                    </div>
                                    {job.lmia_status === "decision" &&
                                    lmiaStatusRejectComment ? (
                                      lmiaStatusRejectComment[0] !==
                                        undefined &&
                                      (lmiaStatusRejectComment || []).map(
                                        (item, i) => {
                                          return (
                                            item === undefined ||
                                            item === "undefined" ||
                                            item === null ||
                                            item === ""
                                              ? null
                                              : item.job_id === job.job_id
                                          ) ? (
                                            <div
                                              key={i + 6}
                                              className={`step text-capitalize ${
                                                job.lmia_status ===
                                                  "decision" &&
                                                item.lmia_substage ===
                                                  "approved"
                                                  ? "approved"
                                                  : item.lmia_substage ===
                                                    "rejected"
                                                  ? "reject"
                                                  : "pending"
                                              }`}
                                            >
                                              <span>
                                                {item.lmia_substage ===
                                                "approved"
                                                  ? "Approved"
                                                  : item.lmia_substage ===
                                                    "rejected"
                                                  ? "Rejected"
                                                  : "Awaiting Decision"}
                                              </span>
                                            </div>
                                          ) : // <small className="mx-10" key={i}>
                                          // {item.lmia_substage === "approved"
                                          //   ? "Congratulation your Limia is Approved"
                                          //   : item.lmia_substage === "awaiting decision"
                                          //   ? "Your Limia status is in progress"
                                          //   : item.lmia_substage === "reject"
                                          //   ? "Sorry to inform you your Limia got rejected."
                                          //   : ""}
                                          // </small>
                                          null;
                                        }
                                      )
                                    ) : (
                                      <div
                                        className={`step text-capitalize${
                                          job.lmia_status === "decision"
                                            ? "pending"
                                            : ""
                                        } `}
                                      >
                                        {job.lmia_status === "decision"
                                          ? " Awaiting Decision"
                                          : "Decision"}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                        {job.job_id === responseId &&
                        job.total_applicants > 0 ? (
                          <tr>
                            <td colSpan={11}>
                              {
                                <>
                                  {/* <!-- Job Responses --> */}
                                  <JobResponse
                                    responseId={responseId}
                                    apiCall={apiCall}
                                    setApiCall={setApiCall}
                                    heading={"Manage Jobs"}
                                    self={props.selfJob}
                                    total_applicants={job.total_applicants}
                                    role_category={job.role_category}
                                    status={
                                      props.response === "response" ||
                                      props.response === "visa" ||
                                      props.response === "lmia" ||
                                      props.response === "companyprofile"
                                        ? "1"
                                        : "0"
                                    }
                                    response={props.response}
                                    employee_id={
                                      location.state
                                        ? location.state.employee_id
                                          ? location.state.employee_id
                                          : ""
                                        : ""
                                    }
                                  />
                                </>
                              }
                            </td>
                          </tr>
                        ) : null}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
        {totalData === 0 || totalData === "0" ? null : (
          <div className="pt-2">
            <Pagination
              nPages={nPages}
              currentPage={props.pageNo}
              setCurrentPage={props.setpageNo}
              total={totalData}
              count={jobData.length}
            />
          </div>
        )}
      </div>

      {showAddCompanyDocModal ? (
        <EmployerDocumentModal
          employer_id={CompanyId}
          show={showAddCompanyDocModal}
          close={() => setShowAddCompanyDocModal(false)}
        />
      ) : null}
      {showAddJobsModal ? (
        <AddJobModal
          show={showAddJobsModal}
          jobdata={JobId}
          admin={"admin"}
          setApiCall={setApiCall}
          apiCall={apiCall}
          setDetailApiCall={props.setApiCall}
          job_page="job_detail"
          close={() => setShowAddJobsModal(false)}
        />
      ) : null}
      {showCandidateModal ? (
        <EmployeeModal
          show={showCandidateModal}
          close={() => setShowCandidateModal(false)}
          data={candidateSkill}
          setApiCall={setApiCall}
          job_id={candidateSkill.job_id}
        />
      ) : null}
      {openLimia ? (
        <LmiaStatus
          resData={JobId}
          show={openLimia}
          close={() => setOpenLimia(false)}
          job={"yes"}
          setApiCall={setApiCall}
        />
      ) : null}
      <SAlert
        show={deleteAlert}
        title={deleteName}
        text="Are you Sure you want to delete !"
        onConfirm={() => deleteJob(deleteId)}
        showCancelButton={true}
        onCancel={() => setDeleteAlert(false)}
      />
    </>
  );
}
