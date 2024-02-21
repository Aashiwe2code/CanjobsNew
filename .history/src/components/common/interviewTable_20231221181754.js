import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getInterview } from "../../api/api";
import moment from "moment";
import Pagination from "./pagination";
import AddInterview from "../forms/admin/addInterview";
import Loader from "../common/loader";
import { ToastContainer } from "react-toastify";
import { ImCalendar } from "react-icons/im";
function Interview(props) {
  let search = props.search;
  let [isLoading, setIsLoading] = useState(true);
  let [showAddInterviewModal, setShowAddInterviewModal] = useState(false);
  const [interviewData, setInterviewData] = useState([]);
  const [jobId, setJobId] = useState();
  let [resData, setResData] = useState("");
  let [apiCall, setApiCall] = useState(props.apiCall);

  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  //   /* Function to get the intervew data*/
  const InterviewData = async () => {
    try {
      const userData = await getInterview(
        "",
        "",
        search,
        props.pageNo,
        columnName,
        recordsPerPage,
        sortOrder,
        props.filter_by_time,
        props.statusFilterValue,
        props.company_id
      );
      if (userData.data.length === 0) {
        setInterviewData([]);
        setIsLoading(false);
      } else {
        setInterviewData(userData.data);
        setTotalData(userData.total_rows);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  /*Render function to get the interview*/
  useEffect(() => {
    InterviewData();
  }, [
    search,
    props.pageNo,
    columnName,
    recordsPerPage,
    sortOrder,
    showAddInterviewModal,
    props.filter_by_time,
    props.statusFilterValue,
    props.openTable,
    props.apiCall,
  ]);

  /* Function to show the single data to update interview*/
  const editInterview = (e) => {
    setShowAddInterviewModal(true);
    setJobId(e.job_id);
    setResData(e);
  };

  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
  };
  return (
    <>
      <ToastContainer />
      {showAddInterviewModal ? (
        <AddInterview
          resData={resData}
          close={() => {
            setShowAddInterviewModal(false);
          }}
          apiCall={apiCall}
          setApiCall={setApiCall}
          job_id={jobId}
          show={showAddInterviewModal}
          Interview={"interview"}
        />
      ) : null}
      <div className="mb-18">
        <div className="mb-4 align-items-center">
          <div className="page___heading">
            <h3 className="font-size-6 mb-0">Interview </h3>
          </div>
        </div>
        <div
          className={
            props.heading === "Dashboard"
              ? ""
              : "bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5"
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
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      EID
                    </th>
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("name");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Name"
                      >
                        Name
                      </Link>
                    </th>
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("job_title");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Job"
                      >
                        Applied Job
                      </Link>
                    </th>
                    {props.heading === "userprofile" ? null : (
                      <th
                        scope="col"
                        className="border-0 font-size-4 font-weight-normal"
                      >
                        <Link
                          to={""}
                          onClick={() => {
                            handleSort("company_name");
                            props.setpageNo(1);
                          }}
                          className="text-gray"
                          title="Sort by Company"
                        >
                          Company Name
                        </Link>
                      </th>
                    )}
                    {props.heading === "Dashboard" ? null : (
                      <th
                        scope="col"
                        className="border-0 font-size-4 font-weight-normal"
                      >
                        <Link
                          to={""}
                          onClick={() => {
                            handleSort("skill");
                            props.setpageNo(1);
                          }}
                          className="text-gray"
                          title="Sort by Skill"
                        >
                          Skill
                        </Link>
                      </th>
                    )}
                    <th
                      scope="col"
                      className=" border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("interview_date");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Date"
                      >
                        Interview date
                      </Link>
                    </th>
                    <th
                      scope="col"
                      className=" border-0 font-size-4 font-weight-normal"
                    >
                      Interview
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
                  {totalData === 0 || interviewData.length === 0 ? (
                    <tr>
                      <th colSpan={8} className="bg-white text-center">
                        No Data Found
                      </th>
                    </tr>
                  ) : (
                    (interviewData || []).map((data) => (
                      <tr className="text-capitalize" key={data.id}>
                        <th className="py-5 ">
                          <div className="font-size-3 mb-0 font-weight-normal text-black-2">
                            {data.employee_id}
                          </div>
                        </th>
                        <th scope="row" className="py-5 ">
                          {data.name === null ||
                          data.name === undefined ||
                          data.name === "undefined" ||
                          data.name === "" ? (
                            <p className="font-size-3  mb-0">N/A</p>
                          ) : (
                            <div className="font-size-3 mb-0 font-weight-semibold text-black-2">
                              <Link
                                className="text-dark"
                                to={`/${data.employee_id}`}
                              >
                                {data.name}
                              </Link>
                            </div>
                          )}
                        </th>
                        <th scope="row" className="py-5 ">
                          {data.job_title === null ||
                          data.job_title === undefined ||
                          data.job_title === "undefined" ||
                          data.job_title === "" ? (
                            <p className="font-size-3  mb-0">N/A</p>
                          ) : (
                            <Link
                              to={`/job_detail`}
                              onClick={() =>
                                localStorage.setItem("job_id", data.job_id)
                              }
                            >
                              <div className="font-size-3 mb-0 font-weight-semibold text-black-2">
                                {data.job_title}
                              </div>
                            </Link>
                          )}
                        </th>
                        {props.heading === "userprofile" ? null : (
                          <th scope="row" className="py-5 ">
                            {data.company_name === null ||
                            data.company_name === undefined ||
                            data.company_name === "undefined" ||
                            data.company_name === "" ? (
                              <p className="font-size-3  mb-0">N/A</p>
                            ) : (
                              <Link
                                to={`/job_detail`}
                                onClick={() =>
                                  localStorage.setItem("job_id", data.job_id)
                                }
                              >
                                <div className="font-size-3 mb-0 font-weight-semibold text-black-2">
                                  {data.company_name}
                                </div>
                              </Link>
                            )}
                          </th>
                        )}
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <th scope="row" className="py-5 ">
                            {data.skill === null ||
                            data.skill === undefined ||
                            data.skill === "undefined" ||
                            data.skill === "" ? (
                              <p className="font-size-3  mb-0">N/A</p>
                            ) : (
                              <div className="font-size-3 mb-0 font-weight-semibold text-black-2">
                                {data.skill}
                              </div>
                            )}
                          </th>
                        )}
                        <th className=" py-5">
                          {data.interview_date === null ||
                          data.interview_date === undefined ||
                          data.interview_date === "undefined" ||
                          data.interview_date === "" ? (
                            <p className="font-size-3  mb-0">N/A</p>
                          ) : (
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {moment(data.interview_date).format(
                                "DD MMMM, YYYY"
                              )}
                            </h3>
                          )}
                        </th>
                        <th className="py-5 ">
                          {data.status === null ||
                          data.status === undefined ||
                          data.status === "undefined" ||
                          data.status === "" ? (
                            <p className="font-size-3  mb-0">N/A</p>
                          ) : (
                            <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                              {data.status === "complete" ? (
                                <span className="p-1 bg-primary-opacity-8 text-white text-center w-100 border rounded-pill">
                                  Complete
                                </span>
                              ) : (
                                <span className="p-1 bg-info text-white text-center w-100 border rounded-pill">
                                  Schedule
                                </span>
                              )}
                            </p>
                          )}
                        </th>
                        <th
                          className={
                            props.heading === "Dashboard" ? "d-none" : "py-5 "
                          }
                        >
                          <div className="btn-group button_group" role="group">
                            <button
                              className="btn btn-outline-info action_btn "
                              style={{ fontSize: "10px" }}
                              onClick={() => editInterview(data)}
                              title=" Reschedule Interview"
                              disabled={
                                data.status === "complete" ? true : false
                              }
                            >
                              <ImCalendar />
                              {/* <i className="fa fa-calendar"></i> */}
                            </button>
                          </div>
                        </th>
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
              count={interviewData.length}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Interview;
