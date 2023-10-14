import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllJobs, getAllJobsCategory } from "../../api/api";
import JobResponse from "./response";
import Loader from "../common/loader";

function FollowupTable() {
  /*show Modal and props state */
  const [jobData, setjobData] = useState([]);
  const [JobId, setJobId] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  /*Filter and search state */
  const [Categorylist, setCategoryList] = useState([]);
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("job_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [responseId, setresponseId] = useState();

  /* Function to get Job data*/
  const JobData = async () => {
    setIsLoading(true);
    try {
      const userData = await GetAllJobs(
        props.search,
        props.locationFilterValue,
        props.categoryFilterValue,
        props.SkillFilterValue,
        props.jobSwapFilterValue,
        currentPage,
        recordsPerPage,
        columnName,
        sortOrder
      );
      if (userData.data.length === 0) {
        setjobData([]);
        setresponseId();
        setIsLoading(false);
      } else {
        setjobData(userData.data.data);
        setTotalData(userData.data.total_rows);
        setresponseId(userData.data.data[0].job_id);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  /*Render function to get the job */
  useEffect(() => {
    JobData();
    CategoryData();
  }, [
    props.categoryFilterValue,
    props.SkillFilterValue,
    props.locationFilterValue,
    props.jobSwapFilterValue,
    props.search,
    props.categoryFilterValue ||
    props.SkillFilterValue ||
    props.locationFilterValue ||
    props.jobSwapFilterValue ||
    props.search
      ? 1
      : currentPage,
    columnName,
    sortOrder,
  ]);

  /* Function to show the Job detail data */
  const JobDetail = (e) => {
    setJobId(e);
  };

  /* Function to get the job category data*/
  const CategoryData = async () => {
    try {
      const userData = await getAllJobsCategory();
      if (userData.data.length === 0) {
        setCategoryList([]);
      } else {
        setCategoryList(userData.data);
      }
    } catch (err) {
      console.log(err);
    }
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
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
        <div className="table-responsive main_table_div">
          tyhrtyutfhxt
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
                        setCurrentPage(1);
                      }}
                      title="Sort by Industry"
                      className="text-gray"
                    >
                      Job title / Industry
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      title="Sort by Job"
                      onClick={() => {
                        handleSort("job_type");
                        setCurrentPage(1);
                      }}
                      className="text-gray"
                    >
                      Job Type
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={() => {
                        handleSort("location");
                        setCurrentPage(1);
                      }}
                      className="text-gray"
                      title="Sort by Address"
                    >
                      Address
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={() => {
                        handleSort("education");
                        setCurrentPage(1);
                      }}
                      className="text-gray"
                      title="Sort by Education"
                    >
                      Education
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={() => {
                        handleSort("keyskill");
                        setCurrentPage(1);
                      }}
                      title="Sort by Skills"
                      className="text-gray"
                    >
                      Skills
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={() => {
                        handleSort("language");
                        setCurrentPage(1);
                      }}
                      className="text-gray"
                      title="Sort by Language"
                    >
                      Language
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      onClick={() => {
                        handleSort("salary");
                        setCurrentPage(1);
                      }}
                      title="Sort by Salary"
                      className="text-gray"
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
                      onClick={() => {
                        handleSort("experience_required");
                        setCurrentPage(1);
                      }}
                      className="text-gray"
                      title="Sort by Experience"
                    >
                      Experience
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to=""
                      className="text-gray"
                      title="Sort by Experience"
                    >
                      Total Applicants
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Map function to show the data in the list*/}
                {totalData === 0 || jobData.length === 0 ? (
                  <tr>
                    <th className="bg-white"></th>
                    <th className="bg-white"></th>
                    {props.heading === "Dashboard" ? (
                      <th className="bg-white">No Data Found</th>
                    ) : (
                      <th className="bg-white"></th>
                    )}
                    <th className="bg-white"></th>
                    {props.heading !== "Dashboard" ? (
                      <th className="bg-white">No Data Found</th>
                    ) : (
                      <th className="bg-white"></th>
                    )}
                    <th className="bg-white"></th>
                    <th className="bg-white"></th>
                    <th className="bg-white"></th>
                    <th className="bg-white"></th>
                    <th className="bg-white"></th>
                  </tr>
                ) : (
                  (jobData || []).map((job) => (
                    <>
                      <tr
                        className="aos-init aos-animate"
                        data-aos="fade-right"
                        data-aos-duration="800"
                        data-aos-once="true"
                        key={job.job_id}
                      >
                        <td scope="row" className="py-5 ">
                          <div className="">
                            <Link
                              to={""}
                              title="Job Detail"
                              onClick={() => JobDetail(job.job_id)}
                              className="font-size-3 mb-0 font-weight-semibold text-black-2"
                            >
                              <Link
                                to={`s`}
                                onClick={() =>
                                  localStorage.setItem("job_id", job.job_id)
                                }
                              >
                                <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                                  {job.job_title}
                                </p>
                              </Link>
                              <p className="text-gray font-size-2 m-0 text-capitalize">
                                {job.company_name} - {job.industry_type}
                              </p>
                            </Link>
                          </div>
                        </td>
                        <td className=" py-5">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {job.employement} - {job.job_type}
                          </h3>
                        </td>
                        <td className=" py-5">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {job.location}
                          </h3>
                        </td>
                        <td className="py-5 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {job.education}
                          </h3>
                        </td>
                        <td className="py-5 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {job.keyskill}
                          </h3>
                        </td>
                        <td className="py-5 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {job.language}
                          </h3>
                        </td>
                        <td className="py-5 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            $ {job.salary}
                          </h3>
                        </td>
                        <td className="py-5 ">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            {job.experience_required}
                          </h3>
                        </td>
                        <td className="py-5 ">
                          <h3 className="font-size-3 font-weight-bold text-black-2 mb-0">
                            {job.total_applicants}
                          </h3>
                        </td>
                        <td className="py-5 min-width-px-100">
                          {job.total_applicants > 0 ? (
                            <div
                              className="btn-group button_group"
                              role="group"
                            >
                              <button
                                className="btn btn-outline-info action_btn"
                                onClick={() => setresponseId(job.job_id)}
                                title="Job Responses"
                              >
                                Responses
                              </button>
                            </div>
                          ) : null}
                        </td>
                      </tr>
                      {JobId ||
                      (job.job_id === responseId &&
                        job.total_applicants > 0) ? (
                        <tr>
                          <td colSpan={10}>
                            <JobResponse responseId={responseId} />
                          </td>
                        </tr>
                      ) : null}
                    </>
                  ))
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
    </>
  );
}

export default FollowupTable;
