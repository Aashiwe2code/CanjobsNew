import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetJobDetail } from "../../api/api";
import moment from "moment";
function JobDetail({ ids }) {
  const [jobData, setJobData] = useState("");
  let userType = localStorage.getItem("userType");

  useEffect(() => {
    const GetJobData = async () => {
      try {
        let Response = await GetJobDetail(ids);
        if (Response.data.data.length === 0) {
          setJobData("");
        } else {
          setJobData(Response.data.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    GetJobData();
  }, [ids]);
  return (
    <div className="col-12 col-xxl-4 col-xl-5 col-lg-10 position-static">
      <div className="tab-content" id="serachlist-tab">
        <div
          className="tab-pane fade show active"
          id="tab-pane-1"
          role="tabpanel"
          aria-labelledby="tab-nav-1"
        >
          <div className=" bg-white rounded-4 border border-mercury shadow-9 pos-abs-xl h-1413 overflow-y-scroll mt-9 mt-xl-0">
            {/* <!-- Single Featured Job --> */}
            <div className="pt-9 pl-sm-9 pl-5 pb-8 pr-sm-9 pr-5 border-bottom border-width-1 border-default-color light-mode-texts">
              <div className="row">
                <div className="col-12">
                  {/* <!-- media start --> */}
                  <div className="media align-items-center company_box col-md-6 p-0">
                    <Link to={""} className="text_box text-left">
                      <img
                        className="company_logo"
                        src={
                          jobData.logo === null ||
                          jobData.logo === undefined ||
                          jobData.logo === "" ||
                          jobData.logo === "undefined"
                            ? "image/logo-main-black.png"
                            : jobData.logo
                        }
                        alt=""
                      />
                    </Link>
                    <Link
                      to={`/jobdetail`}
                      onClick={() =>
                        localStorage.setItem("job_id", jobData.job_id)
                      }
                      className="text_box text-left w-100"
                    >
                      <p className="font-size-3 text-default-color line-height-2 m-0">
                        {jobData.company_name}
                      </p>
                      <h3 className="mb-0 font-size-6 heading-dark-color">
                        {jobData.job_title}
                      </h3>
                    </Link>
                  </div>
                  {/* <!-- media end --> */}
                </div>
              </div>
            </div>
            {/* <!-- End Single Featured Job --> */}
            <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 border-bottom border-width-1 border-default-color light-mode-texts">
              <div className="row mb-5">
                <div className="col-md-12">
                  <div className="media justify-content-md-start mb-6">
                    <div className="image mr-5">
                      <img src="image/svg/icon-location.svg" alt="" />
                    </div>
                    <p className="font-size-5 text-gray mb-0">
                      {jobData.address}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media justify-content-md-start mb-6">
                    <div className="image mr-5">
                      <img src="image/svg/icon-dolor.svg" alt="" />
                    </div>
                    <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                      $ {jobData.salary} PLN PLN
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media justify-content-md-start mb-md-0 mb-6">
                    <div className="image mr-5">
                      <img src="image/svg/icon-briefcase.svg" alt="" />
                    </div>
                    <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                      {jobData.job_type}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row text-left">
                <div className="col-md-6">
                  <div className="mb-lg-0 mb-10">
                    <span className="font-size-4 d-block mb-4 text-gray">
                      Type of corporation
                    </span>
                    <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                      {jobData.corporation}
                    </h6>
                  </div>
                  <div className="tags">
                    <p className="font-size-4 text-gray mb-0">Soft Skill</p>
                    <ul className="list-unstyled mr-n3 mb-0">
                      <li className="d-block font-size-4 text-black-2 mt-2">
                        {jobData.keyskill}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6 mb-lg-0 mb-8"></div>
                <div className="col-md-6">
                  <div className="">
                    <span className="font-size-4 d-block mb-4 text-gray">
                      Company size
                    </span>
                    <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                      {jobData.company_size} employees
                    </h6>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="">
                    <span className="font-size-4 d-block mb-4 text-gray">
                      Posted Time
                    </span>
                    <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                      {moment(jobData.created_at).format("DD MMMM, YYYY")}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-8 pl-sm-9 pl-6 pb-10 light-mode-texts">
              <div className="row text-left">
                <div className="col-xxl-12 col-xl-9 pr-xxl-18 pr-xl-0 pr-11">
                  <div className="">
                    <p className="mb-4 font-size-4 text-gray">
                      Job Description
                    </p>
                    <p className="font-size-4 text-black-2 mb-7">
                      {jobData.job_description}
                    </p>
                  </div>
                  <div className="">
                    <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                      Your Role:
                    </span>
                    <p className="font-size-4 text-black-2 mb-7">
                      {jobData.your_duties}
                    </p>

                    <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                      Requirement
                    </span>
                    <span className="d-block font-size-4 text-black-2 d-flex flex-row mt-2">
                      {jobData.requirement}
                    </span>
                    {userType !== "company" ? (
                      <Link
                        to={""}
                        className="btn btn-green text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-6"
                      >
                        Apply to this job
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
