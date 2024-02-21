import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GetAllJobs, ApplyJob } from "../../api/api";
import AddJobModal from "../forms/employer/job";
import EmployeeLoginModal from "../user/login";
import { toast } from "react-toastify";
import {
  LiaIndustrySolid,
  LiaSearchLocationSolid,
  LiaBriefcaseSolid,
  LiaBusinessTimeSolid,
  LiaDollarSignSolid,
} from "react-icons/lia";
import ApplyBeforeform from "../forms/user/applyBeforeform";
function JobBox({
  showAddJobModal,
  categoryFilterValue,
  SkillFilterValue,
  jobSwapFilterValue,
  locationFilterValue,
  jobLocation,
  apiCall,
}) {
  /*States */
  let [ApiCall, setApiCall] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showDataForm, setShowDataForm] = useState(false);
  let [showAddJobsModal, setShowAddJobsModal] = useState(false);
  let [jobData, setjobData] = useState([]);
  const [JobId, setJobId] = useState([]);
  let [noData, setNoData] = useState("");

  /*Data from local storage */
  const token = localStorage.getItem("token");
  const user_type = localStorage.getItem("userType");
  const user_id = localStorage.getItem("employee_id");
  const skill = localStorage.getItem("skill");

  /*Functionality to get the data to search the jobs */
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");
  const country = searchParams.get("country");
  const category = searchParams.get("category");
  const path = location.pathname;
  const name = localStorage.getItem("name");
  /* Function to get Job data*/
  const JobData = async () => {
    try {
      const userData = await GetAllJobs(
        search,
        (path === "/jobs" && !country) ||
          path === "/managejobs" ||
          (path === "/response" && !country) ||
          jobLocation
          ? jobLocation
          : country,
        path === "/jobs" ||
          path === "/managejobs" ||
          (path === "/response" && !category)
          ? categoryFilterValue
          : category,
        skill || SkillFilterValue
          ? token && location.pathname === "/"
            ? skill
            : SkillFilterValue
          : "",
        jobSwapFilterValue,
        1,
        "10"
      );
      if (userData.data.data.length === 0) {
        setjobData([]);
      } else {
        if (
          (!token && location.pathname === "/") ||
          (!skill && !SkillFilterValue && user_type === "user")
        ) {
          setjobData(
            userData.data.data.filter((item) => item.is_featured === "1")
          );
        } else {
          setjobData(userData.data.data);
        }
        setNoData(userData.data.total_rows);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(jobData);

  /*Render Function */
  useEffect(() => {
    JobData();
    //Function to replace the url path after searching Job
    if (search) {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
    if (ApiCall === true) {
      setApiCall(false);
    }
  }, [
    showAddJobsModal,
    showAddJobModal,
    categoryFilterValue,
    SkillFilterValue,
    jobSwapFilterValue,
    locationFilterValue,
    apiCall,
    ApiCall,
    search,
    country,
    category,
    jobLocation,
  ]);

  /*FUnction to apply to the job */
  const OnApplyClick = async (status, job_id) => {
    try {
      let Response = await ApplyJob(job_id, user_id, status);
      if (Response.message === "Job applied successfully") {
        toast.success("Job Applied successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
      }
      if (Response.message === "already applied on this job") {
        toast.success("Already applied on this job", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
      setApiCall(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="col-xxl-12 col-xl-12 col-lg-12 mb-8 pb-5 job_box"
        data-aos="fade-right"
        data-aos-duration="800"
        data-aos-once="true"
      >
        {/* <!-- Maped Job --> */}
        {noData === 0 || noData === "" || jobData.length === 0 ? (
          <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 text-center">
            <h4>
              {skill || SkillFilterValue
                ? "No jobs found for your skills"
                : "No jobs found"}
            </h4>
          </div>
        ) : (
          (jobData || []).map((job, i) => {
            // Convert the skill string to an array
            let skill = [];
            if (job !== "") {
              skill =
                job.keyskill === null ||
                job.keyskill === undefined ||
                job.keyskill === "undefined"
                  ? []
                  : job.keyskill.split(",");
            }
            return (
              <div
                key={i}
                className="pt-9 w-100 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 my-5 hover-border-green main_job_box_"
              >
                <Link
                  className="w-100"
                  to={
                    token && (user_type === "user" || user_type === "company")
                      ? "/job_detail"
                      : ""
                  }
                  onClick={
                    token && (user_type === "user" || user_type === "company")
                      ? // ? job.is_applied === "0"
                        () => {
                          localStorage.setItem("job_id", job.job_id);
                          OnApplyClick(1, job.job_id);
                        }
                      : // : null
                        () => setShowLogin(true)
                  }
                >
                  {job.job_type === "swap" ? (
                    <span className="job_swap_label">SWEP</span>
                  ) : null}
                  {/* {job.is_featured === "1" ? (
                    <span className="bg-orange text-white featured_tag">
                      Featured
                    </span>
                  ) : null} */}
                  <div className="row job_header m-0">
                    <div className="media align-items-center company_box col-6 p-0">
                      {/* <div className="text_box text-left">
                        <img
                          className="company_logo"
                          src={
                            job.logo === null ||
                            job.logo === undefined ||
                            job.logo === "undefined" ||
                            job.logo === "null" ||
                            job.logo === ""
                              ? "image/logo-main-black1.png"
                              : job.logo
                          }
                          alt=""
                        />
                      </div> */}
                      <div className="text_box text-left w-100">
                        {/* <p className="font-size-3 text-default-color line-height-2 m-0 text-capitalize">
                          {job.company_name}
                        </p> */}
                        <h3 className="mb-0 font-size-6 heading-dark-color text-capitalize">
                          {job.job_title}
                        </h3>
                      </div>
                    </div>
                    <div className="col-6 p-0">
                      <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
                        {job.industry_type && (
                          <li
                            className="mt-2 mr-8 font-size-small text-black-2 d-flex"
                            title="Job Category"
                          >
                            <span className="mr-4">
                              <LiaIndustrySolid />
                            </span>
                            <span className="font-weight-semibold text-capitalize">
                              {job.industry_type}
                            </span>
                          </li>
                        )}
                        {job.location && (
                          <li
                            className="mt-2 mr-8 font-size-small text-black-2 d-flex"
                            title="Location"
                          >
                            <span className="mr-4">
                              <LiaSearchLocationSolid />
                            </span>
                            <span className="font-weight-semibold text-capitalize">
                              {job.location}
                            </span>
                          </li>
                        )}
                        {job.employement && (
                          <li
                            className="mt-2 mr-8 font-size-small text-black-2 d-flex"
                            title="Job Type"
                          >
                            <span className="mr-4">
                              <LiaBriefcaseSolid />
                            </span>
                            <span className="font-weight-semibold text-capitalize">
                              {job.employement}
                            </span>
                          </li>
                        )}
                        {job.created_at && (
                          <li
                            className="mt-2 mr-8 font-size-small text-black-2 d-flex"
                            title="Posted Time"
                          >
                            <span className="mr-4">
                              <LiaBusinessTimeSolid />{" "}
                            </span>
                            <span className="font-weight-semibold">
                              {moment(job.created_at).format("DD MMMM, YYYY")}
                            </span>
                          </li>
                        )}
                        {job.salary && (
                          <li
                            className="mt-2 mr-8 font-size-small text-black-2 d-flex"
                            title="Salary"
                          >
                            <span className="mr-4">
                              <LiaDollarSignSolid />
                            </span>
                            <span className="font-weight-semibold">
                              {job.salary}
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </Link>
                <div className="row pt-4">
                  <div className="col-md-12 text-left text-capitalize text-break">
                    {/* <p>{job.job_description}</p> */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: job.job_description,
                      }}
                    />
                  </div>
                  <div className="col-md-8">
                    <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                      {(skill || []).map((item, index) =>
                        item === "" ? null : (
                          <li key={index}>
                            <span
                              to={""}
                              className="text-capitalize bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2"
                            >
                              {item}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="media justify-content-md-end col-md-4">
                    {user_type === "company" ? (
                      <>
                        <button
                          className="btn btn-secondary text-uppercase font-size-3"
                          onClick={() => {
                            setJobId(job.job_id);
                            setShowAddJobsModal(true);
                          }}
                        >
                          Edit
                        </button>
                      </>
                    ) : (
                      <button
                        className={
                          job.is_applied === "0"
                            ? "btn btn-secondary text-uppercase font-size-3"
                            : "btn btn-info text-uppercase font-size-3 "
                        }
                        onClick={
                          // name === null ||
                          // name === "" ||
                          // name === "" ||
                          // name === undefined ||
                          // name === "undefined" ?
                          // () => setShowDataForm(true) :
                          () =>
                            token && user_type === "user"
                              ? name === null ||
                                name === "" ||
                                name === "null" ||
                                name === undefined ||
                                name === "undefined"
                                ? setShowDataForm(true)
                                : OnApplyClick(0, job.job_id)
                              : setShowLogin(true)
                        }
                        disabled={job.is_applied === "0" ? false : true}
                      >
                        {job.is_applied === "0" ? "Apply" : "Applied"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        {/* <!-- End Maped Job --> */}
      </div>
      {showLogin ? (
        <EmployeeLoginModal
          show={showLogin}
          close={() => setShowLogin(false)}
        />
      ) : null}
      {showDataForm ? (
        <ApplyBeforeform
          show={showDataForm}
          close={() => setShowDataForm(false)}
          setApiCall={setApiCall}
        />
      ) : null}
      {showAddJobsModal ? (
        <AddJobModal
          show={showAddJobsModal}
          jobdata={JobId}
          close={() => setShowAddJobsModal(false)}
          setApiCall={setApiCall}
          apiCall={ApiCall}
        />
      ) : null}
    </>
  );
}
export default JobBox;
