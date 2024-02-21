import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetJobDetail, ApplyJob } from "../../api/api";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../common/loader";

function JobDetailPage(props) {
  let [jobDetatilsData, setJobDetailsData] = useState("");
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let skill = [];
  const user_type = localStorage.getItem("userType");
  const jobId = localStorage.getItem("jobId");
  const user_id = localStorage.getItem("employee_id");
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  /*Function to get job details data*/
  const JobData = async () => {
    try {
      let userData = await GetJobDetail(
        user_type === "admin" ? props.jobdata : jobId
      );
      if (
        jobId === undefined ||
        jobId === "0" ||
        userData.data.data.length === 0
      ) {
        setIsLoading(false);
      } else {
        setJobDetailsData(userData.data.data[0]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*Render method to get job detail data */
  useEffect(() => {
    JobData();
  }, [props.jobdata, apiCall]);

  /*Set skill variable to array frm string */
  if (jobDetatilsData !== "") {
    skill =
      jobDetatilsData.keyskill === null ||
      jobDetatilsData.keyskill === undefined ||
      jobDetatilsData.keyskill === "undefined"
        ? []
        : jobDetatilsData.keyskill.split(",");
  }
  /*FUnction to apply to the job */
  const OnApplyClick = async (status) => {
    try {
      let Response = await ApplyJob(jobId, user_id, status);
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
        setApiCall(true);
      }
      if (Response.message === "Job saved successfully") {
        toast.success("Job saved successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="table-responsive main_table_div">
        {isLoading ? (
          <Loader />
        ) : (
          <div className=" bg-white rounded-4 border border-mercury shadow-9  overflow-y-scroll mt-9 mt-xl-0">
            <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
              <ToastContainer />
              <div className="row">
                <div className="col-12">
                  {/* <!-- media start --> */}
                  <div className="media align-items-center company_box col-md-6 p-0">
                    <Link className="text_box text-left" to="">
                      <img
                        className="company_logo"
                        src={
                          jobDetatilsData.logo
                            ? jobDetatilsData.logo
                            : "image/logo-main-black.png"
                        }
                        alt=""
                      />
                    </Link>
                    <Link
                      className="text_box text-left w-100"
                      to={`/job_detail`}
                      onClick={() =>
                        localStorage.setItem("job_id", jobDetatilsData.job_id)
                      }
                    >
                      <p
                        href=""
                        className="font-size-3 text-default-color line-height-2 m-0 text-capitalize"
                      >
                        {jobDetatilsData.job_title}
                      </p>
                      <h3 className="mb-0 font-size-6 heading-dark-color text-capitalize">
                        {jobDetatilsData.department}
                      </h3>
                    </Link>
                  </div>
                  {/* <!-- media end --> */}
                </div>
              </div>
              {user_type === "admin" || user_type === "company" ? null : (
                <div className="row pt-9">
                  <div className="col-12">
                    <div className="card-btn-group">
                      <button
                        to={""}
                        onClick={
                          token && (name === null || name === "")
                            ? () => navigate("/profile")
                            : () => OnApplyClick(0)
                        }
                        disabled={
                          jobDetatilsData.is_applied === "0" ? false : true
                        }
                        className={
                          jobDetatilsData.is_applied === "0"
                            ? "btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5"
                            : "btn btn-info text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5"
                        }
                      >
                        {jobDetatilsData.is_applied === "0"
                          ? "Apply to this job"
                          : "Already Applied"}
                      </button>
                      {/* <button
                  to={""}
                  onClick={() => OnApplyClick(3)}
                  className="btn btn-outline-mercury text-black-2 text-uppercase h-px-48 rounded-3 mb-5 px-5"
                >
                  <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>
                  Save job
                </button> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 border-bottom border-width-1 border-default-color light-mode-texts">
              <div className="row mb-5">
                <div className="col-md-6">
                  <div className="media justify-content-md-start mb-6">
                    <div className="image mr-5">
                      <img src="image/svg/icon-location.svg" alt="" />
                    </div>
                    <p className="font-size-5 text-gray mb-0 text-capitalize">
                      {jobDetatilsData.location}
                    </p>
                  </div>
                </div>
                {jobDetatilsData.salary !== "0" ? (
                  <div className="col-md-6">
                    <div className="media justify-content-md-start mb-6">
                      <>
                        <div className="image mr-5">
                          <img src="image/svg/icon-dolor.svg" alt="" />
                        </div>
                        <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                          $ {jobDetatilsData.salary}
                        </p>
                      </>
                    </div>
                  </div>
                ) : null}
                <div className="col-md-6">
                  <div className="media justify-content-md-start mb-md-0 mb-6">
                    <div className="image mr-5">
                      <img src="image/svg/icon-briefcase.svg" alt="" />
                    </div>
                    <p className="font-weight-semibold font-size-5 text-black-2 mb-0 text-capitalize">
                      {jobDetatilsData.job_type}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row text-left">
                {jobDetatilsData.corporation ? (
                  <div className="col-md-6">
                    <div className="mb-lg-0 mb-10">
                      <span className="font-size-4 d-block mb-4 text-gray">
                        Type of corporation
                      </span>
                      <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9 text-capitalize">
                        {jobDetatilsData.corporation}
                      </h6>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {/* <div className="col-md-6 mb-lg-0 mb-8">
            <div className="">
              <span className="font-size-4 d-block mb-4 text-gray">
                Career Level
              </span>
              <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                Project Manangement
              </h6>
            </div>
          </div> */}
                {jobDetatilsData.company_size ? (
                  <div className="col-md-6">
                    <div className="">
                      <span className="font-size-4 d-block mb-4 text-gray">
                        Company size
                      </span>
                      <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0 text-capitalize">
                        {jobDetatilsData.company_size}
                      </h6>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {jobDetatilsData.created_at ? (
                  <div className="col-md-6">
                    <div className="">
                      <span className="font-size-4 d-block mb-4 text-gray">
                        Posted Time
                      </span>
                      <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                        {moment(jobDetatilsData.created_at).format(
                          "DD MMMM, YYYY"
                        )}
                      </h6>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="pt-8 pl-sm-9 pl-6 pb-10 light-mode-texts">
              <div className="row text-left">
                <div className="col-xxl-12 col-xl-9 pr-xxl-18 pr-xl-0 pr-11">
                  {jobDetatilsData.job_description ? (
                    <div className="">
                      <p className="mb-4 font-size-4 text-gray">
                        Job Description
                      </p>
                      <p className="font-size-4 text-black-2 mb-7">
                        {jobDetatilsData.job_description}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="">
                    {jobDetatilsData.your_duties ? (
                      <>
                        <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                          Your Role:
                        </span>
                        <p className="font-size-4 text-black-2 mb-7">
                          {jobDetatilsData.your_duties}
                        </p>{" "}
                      </>
                    ) : (
                      ""
                    )}
                    {jobDetatilsData.requirement ? (
                      <>
                        <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                          What you will be doing:
                        </span>
                        <p className="font-size-4 text-black-2 mb-7">
                          {jobDetatilsData.requirement}
                        </p>{" "}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-5 pl-sm-9 pl-6 pb-10 light-mode-texts border-top border-width-1 border-default-color">
              <div className="tags">
                <p className="font-size-4 text-gray mb-0"> Skill</p>
                <ul className="list-unstyled d-flex align-items-center flex-wrap row px-2">
                  {(skill || []).map((skill) =>
                    skill === "" ? null : (
                      <li key={skill}>
                        <span className="text-capitalize bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2 m-1">
                          {skill}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default JobDetailPage;
