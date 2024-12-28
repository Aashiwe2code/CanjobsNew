import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import Loader from "./loader";
import { Link } from "react-router-dom";
import ManagerListModal from "../admin/Modal/managerListModal";
import { GetAllJobs } from "../../api/api";
import moment from "moment";
export default function AssignedJobTable(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [apiCall, setApiCall] = useState(false);
  const [openMangerListodal, setOpenMangerListodal] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [jobId, setJobId] = useState([]);
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("job_id");
  const [sortOrder, setSortOrder] = useState("");
  /*Function to get job data */
  const GetJobData = async () => {
    try {
      let Responses = await GetAllJobs(
        "",
        "",
        "",
        "",
        "",
        currentPage,
        recordsPerPage,
        columnName,
        sortOrder,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        props.manager_id
      );
      if (Responses.data.message === "successful") {
        setIsLoading(false);
        if (
          Responses.data.data.length === 0 ||
          Responses.data.length === 0 ||
          Responses.data.data === undefined
        ) {
          setJobData([]);
          setTotalData([]);
          setIsLoading(false);
        } else {
          setJobData(Responses.data.data);
          setTotalData(Responses.data.total_rows);
          // props.setTotalJobs(Responses.data.total_rows);
          props.count = Responses.data.total_rows;
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetJobData();
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [
    props.manager_id,
    apiCall,
    currentPage,
    recordsPerPage,
    columnName,
    sortOrder,
  ]);
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
    setCurrentPage(1);
    setApiCall(true);
  };
  /* Function to open resign job to manager modal*/
  const OnResignClick = (e) => {
    setOpenMangerListodal(true);
    setJobId(e.job_id);
  };
  return (
    <>
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-11">
        <div className="table-responsive main_table_div">
          {isLoading ? (
            <Loader />
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
                      title="Sort by Industry"
                      className="text-gray"
                    >
                      Job title
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={() => {
                        handleSort("company_name");
                      }}
                      title="Sort by Job"
                      className="text-gray"
                    >
                      Company
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={() => {
                        handleSort("created_at");
                      }}
                      className="text-gray"
                      title="Sort by Language"
                    >
                      Created at
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={() => {
                        handleSort("total_applicants");
                      }}
                      className="text-gray"
                      title="Sort by Salary"
                    >
                      Responses
                    </Link>
                  </th>
                  {props.heading === "Dashboard" ? null : (
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
                    <th colSpan={5} className="bg-white text-center">
                      No Data Found
                    </th>
                  </tr>
                ) : (
                  (jobData || []).map((job, i) => {
                    return (
                      <React.Fragment key={i}>
                        <tr className={"col-12 text-capitalize job_row"}>
                          <th scope="row" className="py-5 ">
                            <div className="">
                              <Link
                                title="Job Details"
                                //   to={`/job_detail`}
                                //   onClick={
                                //     () =>
                                //       localStorage.setItem("job_id", job.job_id)
                                //     // JobDetail(job.job_id)
                                //   }
                                className="font-size-3 mb-0 font-weight-semibold text-black-2"
                              >
                                <>
                                  <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                                    {job.job_title}
                                  </p>
                                </>
                              </Link>
                            </div>
                          </th>
                          <th className=" py-5">
                            <Link
                              to={`/company_detail`}
                              title="Company Details"
                              onClick={() =>
                                localStorage.setItem(
                                  "company_id",
                                  job.company_id
                                )
                              }
                            >
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {job.company_name}
                              </h3>
                            </Link>
                          </th>
                          <th className="py-5 ">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {moment(job.created_at).format("DD MMMM, YYYY")}
                            </h3>
                          </th>
                          <th className="">
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                              {job.total_applicants}
                            </h3>
                          </th>
                          <th className="py-5 min-width-px-100">
                            <div
                              className="btn-group button_group"
                              role="group"
                            >
                              <button
                                className="btn btn-outline-info action_btn"
                                onClick={() => {
                                  OnResignClick(job);
                                }}
                                title="Reassign"
                              >
                                Reassign Manager
                              </button>
                            </div>
                          </th>
                        </tr>
                        {/* {props.heading === "Dashboard" ||
                      props.detail === "job_detail" ? null : (
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
                                      job.lmia_status === "candidate placement" ||
                                      job.lmia_status === "submission" ||
                                      job.lmia_status === "decision"
                                        ? "approved"
                                        : job.lmia_status === "onboarding"
                                        ? "pending"
                                        : ""
                                    }`}
                                  >
                                    <span>onboarding</span>
                                  </div>
                                  <div
                                    key={i + 2}
                                    className={`step text-capitalize ${
                                      job.lmia_status === "documentation" ||
                                      job.lmia_status === "candidate placement" ||
                                      job.lmia_status === "submission" ||
                                      job.lmia_status === "decision"
                                        ? "approved"
                                        : job.lmia_status === "advertisements"
                                        ? "pending"
                                        : ""
                                    }`}
                                  >
                                    <span>advertisements</span>
                                  </div>
                                  <div
                                    key={i + 3}
                                    className={`step text-capitalize ${
                                      job.lmia_status === "candidate placement" ||
                                      job.lmia_status === "submission" ||
                                      job.lmia_status === "decision"
                                        ? "approved"
                                        : job.lmia_status === "documentation"
                                        ? "pending"
                                        : ""
                                    }`}
                                  >
                                    <span>documentation</span>
                                  </div>
                                  <div
                                    key={i + 4}
                                    className={`step text-capitalize ${
                                      job.lmia_status === "submission" ||
                                      job.lmia_status === "decision"
                                        ? "approved"
                                        : job.lmia_status === "candidate placement"
                                        ? "pending"
                                        : ""
                                    }`}
                                  >
                                    <span>candidate placement</span>
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
                                    <span>submission</span>
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
                                            job.lmia_status === "decision" &&
                                            item.lmia_substage === "approved"
                                              ? "approved"
                                              : item.lmia_substage === "rejected"
                                              ? "reject"
                                              : "pending"
                                          }`}
                                        >
                                          <span>
                                            {item.lmia_substage === "approved"
                                              ? "Approved"
                                              : item.lmia_substage === "rejected"
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
                                      job.lmia_status === "decision" ? "pending" : ""
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
                      )}  */}
                        {/* {job.job_id === responseId &&
                      job.total_applicants > 0 ? (
                        <tr>
                          <td colSpan={11}>
                            {
                              <>
                                <!-- Job Responses -->
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
                          ) : null}  */}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
        <div className="pt-2">
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={totalData}
            count={jobData.length}
          />
        </div>
      </div>
      {openMangerListodal && (
        <ManagerListModal
          data={props.data}
          show={openMangerListodal}
          close={() => setOpenMangerListodal(false)}
          isLoading={props.isLoading}
          handleSort={props.handleSort}
          nPages={props.nPages}
          currentPage={props.currentPage}
          setCurrentPage={props.setCurrentPage}
          totalData={props.totalData}
          jobId={jobId}
          manager_id={props.manager_id}
          setApiCall={props.setApiCall}
        />
      )}
      {/* <SAlert
      show={deleteAlert}
      title={deleteName}
      text="Are you Sure you want to delete !"
      onConfirm={() => deleteEmployer(deleteId)}
      showCancelButton={true}
      onCancel={CancelDelete}
    /> */}
    </>
  );
}
