import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetAllJobs } from "../../api/api";
import moment from "moment";
import Response from "../admin/response";
function JobBoxResponse({
  categoryFilterValue,
  locationFilterValue,
  SkillFilterValue,
  jobSwapFilterValue,
}) {
  let [jobData, setjobData] = useState([]);
  const [JobId, setJobId] = useState([]);
  let [noData, setNoData] = useState("");
  let Skill = [];
  /* Function to get Job data*/
  const JobData = async () => {
    try {
      const userData = await GetAllJobs(
        "",
        locationFilterValue,
        categoryFilterValue,
        SkillFilterValue,
        jobSwapFilterValue
      );
      if (userData.data.data.length === 0) {
        setjobData([]);
      } else {
        setjobData(userData.data.data);
        setNoData(userData.data.total_rows);
      }
    } catch (err) {
      console.log(err)
    }
  };
  /*---- Function to Open response Table on Click ----*/
  const OpenReposnseTable = async (e) => {
    setJobId(e);
  };

  useEffect(() => {
    JobData();
  }, [
    JobId,
    locationFilterValue,
    categoryFilterValue,
    SkillFilterValue,
    jobSwapFilterValue,
  ]);

  return (
    <div
      className="col-xxl-12 col-xl-12 col-lg-12 mb-8 job_box p-0"
      data-aos="fade-right"
      data-aos-duration="800"
      data-aos-once="true"
    >
      {/* <!-- Single Featured Job --> */}
      {noData === 0 || jobData.length === 0 ? (
        <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 text-center">
          <h4>No Data Found</h4>
        </div>
      ) : (
        (jobData || []).map((job) => (
          <Link
            to={`/jobdetailpage`}
            onClick={() => localStorage.setItem("job_id", job.job_id)}
            // to={"/jobdetail"}
            // onClick={() => localStorage.setItem("jobId", job.job_id)}
            className="my-5 pt-9 w-100 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green"
            key={job.job_id}
          >
            <div className="row job_header m-0">
              <div className="media align-items-center company_box col-md-6 p-0">
                <div className="text_box text-left">
                  <img
                    className="company_logo"
                    src={
                      job.logo === null ? "image/logo-main-black.png" : job.logo
                    }
                    alt=""
                  />
                </div>
                <div className="text_box text-left w-100 text-capitalize">
                  <p className="font-size-3 text-default-color line-height-2 m-0">
                    {job.company_name}
                  </p>
                  <h3 className="mb-0 font-size-6 heading-dark-color">
                    {job.job_title}
                  </h3>
                </div>
              </div>
              <div className="col-md-6 p-0 text-capitalize">
                <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
                  <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                    <span className="mr-4">
                      <img src="image/svg/icon-loaction-pin-black.svg" alt="" />
                    </span>
                    <span className="font-weight-semibold">{job.location}</span>
                  </li>
                  <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                    <span className="mr-4">
                      <img src="image/svg/icon-suitecase.svg" alt="" />
                    </span>
                    <span className="font-weight-semibold">{job.job_type}</span>
                  </li>
                  <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                    <span className="mr-4">
                      <img src="image/svg/icon-clock.svg" alt="" />
                    </span>
                    <span className="font-weight-semibold">
                      {moment
                        .duration(moment().diff(moment(job.created_at)))
                        .humanize()}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row pt-4">
              <div className="col-md-12 text-left">
                <p>{job.job_description}</p>
              </div>
              <div className="col-md-8">
                <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                  {job.keyskill
                    ? ((Skill = job.keyskill.split(",")),
                      (Skill || []).map((skill, i) => (
                        <li key={i}>
                          <Link
                            to={""}
                            className="text-capitalize bg-polar mt-2 text-black-2  mr-6 px-7 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                          >
                            {skill}
                          </Link>
                        </li>
                      )))
                    : null}
                </ul>
              </div>

              <div className="media justify-content-md-end col-md-4">
                <Link
                  to={""}
                  className="btn btn-secondary text-uppercase font-size-3"
                  onClick={() => OpenReposnseTable(job.job_id)}
                >
                  View Response
                </Link>
              </div>
            </div>
            {JobId === job.job_id ? <Response responseId={JobId} /> : null}
          </Link>
        ))
      )}
      {/* <!-- End Single Featured Job --> */}
    </div>
  );
}

export default JobBoxResponse;
