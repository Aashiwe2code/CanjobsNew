import React, { useEffect, useState } from "react";
import EmployeeBox from "../company/employeeBox";
import EmployeeFooter from "../common/footer";
import EmployeeHeader from "../common/header";
import SearchForm from "../common/search_form";
import { getJson } from "../../api/api";
import FilterJson from "../json/filterjson";
import CustomButton from "../common/button";
import { Link } from "react-router-dom";
function EmployeeSearch() {
  /*Filter states */
  const [SkillFilterValue, setSkillFilterValue] = useState("");
  const [jobSwapFilterValue, setJobSwapFilterValue] = useState("");
  const [candianFilterValue, setCandianFilterValue] = useState("");
  const [jobExp, setJobExp] = useState("");
  let [Json, setJson] = useState([]);
  /*Function to get thejSon */
  const JsonData = async () => {
    try {
      let Json = await getJson();
      setJson(Json);
    } catch (err) {
      console.log(err);
    }
  };
  /*Render Method */
  useEffect(() => {
    JsonData();
  }, [SkillFilterValue, jobSwapFilterValue, jobExp, candianFilterValue]);
  // eslint-disable-next-line no-use-before-define

  /*Function to Rest the feilds */
  let onReset = () => {
    setSkillFilterValue("");
    setJobSwapFilterValue("");
    setJobExp("");
    setCandianFilterValue("");
  };
  return (
    <div>
      <EmployeeHeader />
      {/* <!-- Main Content Start --> */}
      <div className="bg-black-2 mt-15 mt-lg-18 pt-18 pt-lg-13 pb-13">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* <!-- form --> */}
              <SearchForm />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-default-1 pt-9 pb-13 pb-xl-30 pb-13 position-relative overflow-hidden">
        <div className="container">
          <div className="col-12 col-lg-10 col-xl-12 text-center">
            <form className="mb-8" action="/">
              <div className="search-filter from-group row job_search_filter">
                <div className="col-md-3 col-lg-3 mb-5">
                  <select
                    name="skill"
                    id="skill"
                    value={SkillFilterValue}
                    /*Skill Onchange function to filter the data */
                    onChange={(e) => setSkillFilterValue(e.target.value)}
                    className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                  >
                    <option value="">Select Skill</option>
                    {(Json.Skill || []).map((data) => {
                      return (
                        <option value={data.value} key={data.id}>
                          {data.value}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-3 col-lg-3 mb-5">
                  <select
                    name="job_location"
                    id="job_location"
                    value={jobExp}
                    /*Job Onchange function to filter the data */
                    onChange={(e) => setJobExp(e.target.value)}
                    className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                  >
                    <option value="">Select Experience</option>
                    {(FilterJson.experience || []).map((job) => (
                      <option key={job} value={job}>
                        {job}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3 col-lg-3 mb-5">
                  <select
                    name="job_type"
                    id="job_type"
                    value={jobSwapFilterValue}
                    /*Job Onchange function to filter the data */
                    onChange={(e) => setJobSwapFilterValue(e.target.value)}
                    className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                  >
                    <option value="">Select Interest</option>
                    {(FilterJson.interested || []).map((interest) => (
                      <option key={interest} value={interest}>
                        {interest}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3 col-lg-3 mb-5">
                  <select
                    name="job_type"
                    id="job_type"
                    value={candianFilterValue}
                    /*Job Onchange function to filter the data */
                    onChange={(e) => setCandianFilterValue(e.target.value)}
                    className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                  >
                    <option value="">Select Candian Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">NO</option>
                  </select>
                </div>
                <div className="col-12 text-right">
                  <CustomButton
                    className="font-size-3 rounded-3 btn btn-primary border-0"
                    onClick={() => onReset()}
                    title="Reset"
                    type="button"
                  >
                    Reset
                  </CustomButton>
                </div>
              </div>
            </form>
          </div>
          {/* <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-12">
              <h2 className="font-size-8 mb-6">
                You’re searching "UI Designer"
              </h2>
              <form className="mb-8" action="/">
                <div className="search-filter from-group d-flex align-items-center flex-wrap">
                  <div className="mr-5 mb-5">
                    <select
                      name="country"
                      id="country"
                      className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                    >
                      <option data-display="Job Type">Job Category</option>
                      <option value="">United States of America</option>
                      <option value="">United Arab Emirates</option>
                      <option value="">Bangladesh</option>
                      <option value="">Pakistan</option>
                    </select>
                  </div>
                  <div className="mr-5 mb-5">
                    <select
                      name="country"
                      id="country"
                      className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                    >
                      <option data-display="Salary Range">Job Skills</option>
                      <option value="">United States of America</option>
                      <option value="">United Arab Emirates</option>
                      <option value="">Bangladesh</option>
                      <option value="">Pakistan</option>
                    </select>
                  </div>
                  <div className="mr-5 mb-5">
                    <select
                      name="country"
                      id="country"
                      className="form-control font-size-4 text-black-2 arrow-4-black mr-5 rounded-0"
                    >
                      <option data-display="Experience Level ">
                        Job Location
                      </option>
                      <option value="">United States of America</option>
                      <option value="">United Arab Emirates</option>
                      <option value="">Bangladesh</option>
                      <option value="">Pakistan</option>
                    </select>
                  </div>
                </div>
              </form>
              <div className="d-flex align-items-center justify-content-between mb-6">
                <h5 className="font-size-4 font-weight-normal text-gray">
                  Showing
                  <span className="text-black-2">120</span> matched jobs
                </h5>
              </div>
            </div>
          </div> */}
          <div className="row justify-content-center position-static">
            <div className="col-12 col-xxl-8 col-xl-7 col-lg-10">
              {/* <!-- Left Section --> */}
              <div className="Left">
                <div
                  className="justify-content-center search-nav-tab nav nav-tabs border-bottom-0"
                  id="search-nav-tab"
                  role="tablist"
                >
                  <div className="mb-8 p-0 w-100 active nav-link active">
                    {/* <!-- Single Featured Job --> */}
                    <EmployeeBox
                      Skill={SkillFilterValue}
                      Swap={jobSwapFilterValue}
                      Exp={jobExp}
                      candian={candianFilterValue}
                    />
                    {/* <!-- End Single Featured Job --> */}
                  </div>
                </div>
                <div className="text-center pt-5 pt-lg-13">
                  <Link
                    href="#"
                    className="text-green font-weight-bold text-uppercase font-size-3 d-flex align-items-center justify-content-center"
                  >
                    Load More
                    <i className="fas fa-sort-down ml-3 mt-n2 font-size-4"></i>
                  </Link>
                </div>
              </div>
              {/* <!-- form end --> */}
            </div>
            {/* <!-- Right Section --> */}
            <div className="d-none col-12 col-xxl-4 col-xl-5 col-lg-10 position-static">
              <div className="tab-content" id="serachlist-tab">
                <div
                  className="tab-pane fade show active"
                  id="tab-pane-1"
                  role="tabpanel"
                  aria-labelledby="tab-nav-1"
                >
                  <div className=" bg-white rounded-4 border border-mercury shadow-9 pos-abs-xl h-1413 overflow-y-scroll mt-9 mt-xl-0">
                    {/* <!-- Single Featured Job --> */}
                    <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
                      <div className="row">
                        <div className="col-12">
                          {/* <!-- media start --> */}
                          <div className="media align-items-center company_box col-md-6 p-0">
                            <Link href="#" className="text_box text-left">
                              <img
                                className="company_logo"
                                src="image/logo-main-black.png"
                                alt=""
                              />
                            </Link>
                            <Link href="#" className="text_box text-left w-100">
                              <p className="font-size-3 text-default-color line-height-2 m-0">
                                Apple INC
                              </p>
                              <h3 className="mb-0 font-size-6 heading-dark-color">
                                UI/UX Designer
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
                              777 Brockton Avenue, Abington MA 2351
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="media justify-content-md-start mb-6">
                            <div className="image mr-5">
                              <img src="image/svg/icon-dolor.svg" alt="" />
                            </div>
                            <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                              80-90K PLN PLN
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="media justify-content-md-start mb-md-0 mb-6">
                            <div className="image mr-5">
                              <img src="image/svg/icon-briefcase.svg" alt="" />
                            </div>
                            <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                              Full-time
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
                              B2B &amp; B2C
                            </h6>
                          </div>
                          <div className="tags">
                            <p className="font-size-4 text-gray mb-0">
                              Soft Skill
                            </p>
                            <ul className="list-unstyled mr-n3 mb-0">
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Slack
                              </li>
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Basic English
                              </li>
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Well Organized
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6 mb-lg-0 mb-8">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Career Level
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                              Project Manangement
                            </h6>
                          </div>
                          <div className="tags">
                            <p className="font-size-4 text-gray mb-3">
                              Technical Skill
                            </p>
                            <ul className="list-unstyled d-flex align-items-center flex-wrap">
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Editing
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Wire-framing
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  XD
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  User Persona
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Sketch
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Client's team size
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                              11-50 employees
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Posted Time
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                              16 November 2020
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
                              Gubagoo is a fast growing provider of messaging
                              and commerce solutions for automotive dealers
                              changing the future of how people find, buy and
                              service their vehicles.
                            </p>
                          </div>
                          <div className="">
                            <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                              Your Role:
                            </span>
                            <p className="font-size-4 text-black-2 mb-7">
                              We’re looking for a passionate individual to
                              design beautiful and functional products for our
                              customers at Gubagoo. We move very fast and you
                              will be expected to contribute to a
                              cross-functional product development squad, that
                              includes product managers and developers, to
                              deliver the UX and UI for the team to bring to
                              life.
                            </p>
                            <p className="font-size-4 text-black-2 mb-7">
                              We are serious about remote work. You can work for
                              from anywhere.
                            </p>
                            <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                              What you will be doing:
                            </span>
                            <ul className="list-unstyled">
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-2">
                                <span className="d-inline-block mr-7">•</span>
                                Contribute new controls or design improvements
                                to our
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Take ownership of the successful delivery of
                                features
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Help set and achieve quarterly goals
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Ship a TON of product improvements and features
                              </li>
                            </ul>
                            <Link
                              href="#"
                              className="btn btn-green text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-6"
                            >
                              Connect
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade "
                  id="tab-pane-2"
                  role="tabpanel"
                  aria-labelledby="tab-nav-2"
                >
                  <div className=" bg-white rounded-4 border border-mercury shadow-9 pos-abs-xl ml-xl-8 h-1413 overflow-y-scroll mt-9 mt-xl-0">
                    {/* <!-- Single Featured Job --> */}
                    <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
                      <div className="row">
                        <div className="col-12">
                          {/* <!-- media start --> */}
                          <div className="media align-items-center">
                            {/* <!-- media logo start --> */}
                            <div className="square-72 d-block mr-8">
                              <img
                                src="image/l2/png/featured-job-logo-2.png"
                                alt=""
                              />
                            </div>
                            {/* <!-- media logo end --> */}
                            {/* <!-- media texts start --> */}
                            <div>
                              <h3 className="font-size-6 mb-0">
                                UI/UX Designer
                              </h3>
                              <span className="font-size-3 text-gray line-height-2">
                                Apple INC
                              </span>
                            </div>
                            {/* <!-- media texts end --> */}
                          </div>
                          {/* <!-- media end --> */}
                        </div>
                      </div>
                      <div className="row pt-9">
                        <div className="col-12">
                          {/* <!-- card-btn-group start --> */}
                          <div className="card-btn-group">
                            <Link
                              href="#"
                              className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5"
                            >
                              Connect
                            </Link>
                            <Link
                              href="#"
                              className="btn btn-outline-mercury text-black-2 text-uppercase h-px-48 rounded-3 mb-5 px-5"
                            >
                              <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>
                              Save job
                            </Link>
                          </div>
                          {/* <!-- card-btn-group end --> */}
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
                              237 Princeton Avenue, Nottinghum MA 3714
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="media justify-content-md-start mb-6">
                            <div className="image mr-5">
                              <img src="image/svg/icon-dolor.svg" alt="" />
                            </div>
                            <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                              120-150K PLN PLN
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="media justify-content-md-start mb-md-0 mb-6">
                            <div className="image mr-5">
                              <img src="image/svg/icon-briefcase.svg" alt="" />
                            </div>
                            <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                              Full-time
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-lg-0 mb-10">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Type of corporation
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                              B2B &amp; B2C
                            </h6>
                          </div>
                          <div className="tags">
                            <p className="font-size-4 text-gray mb-0">
                              Soft Skill
                            </p>
                            <ul className="list-unstyled mr-n3 mb-0">
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Creative Design
                              </li>
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Wireframing
                              </li>
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Scrum
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6 mb-lg-0 mb-8">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Career Level
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                              Senior Designer
                            </h6>
                          </div>
                          <div className="tags">
                            <p className="font-size-4 text-gray mb-3">
                              Technical Skill
                            </p>
                            <ul className="list-unstyled d-flex align-items-center flex-wrap">
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Visual Design
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Wire-framing
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  XD
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  User Persona
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Sketch
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Client's team size
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                              11-35 employees
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Posted Time
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                              11 November 2020
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-8 pl-sm-9 pl-6 pb-10 light-mode-texts">
                      <div className="row">
                        <div className="col-xxl-12 col-xl-9 pr-xxl-18 pr-xl-0 pr-11">
                          <div className="">
                            <p className="mb-4 font-size-4 text-gray">
                              Job Description
                            </p>
                            <p className="font-size-4 text-black-2 mb-7">
                              Gubagoo is a fast growing provider of messaging
                              and commerce solutions for automotive dealers
                              changing the future of how people find, buy and
                              service their vehicles.
                            </p>
                          </div>
                          <div className="">
                            <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                              Your Role:
                            </span>
                            <p className="font-size-4 text-black-2 mb-7">
                              We’re looking for a passionate individual to
                              design beautiful and functional products for our
                              customers at Gubagoo. We move very fast and you
                              will be expected to contribute to a
                              cross-functional product development squad, that
                              includes product managers and developers, to
                              deliver the UX and UI for the team to bring to
                              life.
                            </p>
                            <p className="font-size-4 text-black-2 mb-7">
                              We are serious about remote work. You can work for
                              from anywhere.
                            </p>
                            <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                              What you will be doing:
                            </span>
                            <ul className="list-unstyled">
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-2">
                                <span className="d-inline-block mr-7">•</span>
                                Contribute new controls or design improvements
                                to our
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Take ownership of the successful delivery of
                                features
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Help set and achieve quarterly goals
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Ship a TON of product improvements and features
                              </li>
                            </ul>
                            <Link
                              href="#"
                              className="btn btn-green text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-6"
                            >
                              Connect
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade "
                  id="tab-pane-3"
                  role="tabpanel"
                  aria-labelledby="tab-nav-3"
                >
                  <div className=" bg-white rounded-4 border border-mercury shadow-9 pos-abs-xl ml-xl-8 h-1413 overflow-y-scroll mt-9 mt-xl-0">
                    {/* <!-- Single Featured Job --> */}
                    <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
                      <div className="row">
                        <div className="col-12">
                          {/* <!-- media start --> */}
                          <div className="media align-items-center">
                            {/* <!-- media logo start --> */}
                            <div className="square-72 d-block mr-8">
                              <img
                                src="image/l2/png/featured-job-logo-3.png"
                                alt=""
                              />
                            </div>
                            {/* <!-- media logo end --> */}
                            {/* <!-- media texts start --> */}
                            <div>
                              <h3 className="font-size-6 mb-0">
                                iOS Developer
                              </h3>
                              <span className="font-size-3 text-gray line-height-2">
                                Shopify
                              </span>
                            </div>
                            {/* <!-- media texts end --> */}
                          </div>
                          {/* <!-- media end --> */}
                        </div>
                      </div>
                      <div className="row pt-9">
                        <div className="col-12">
                          {/* <!-- card-btn-group start --> */}
                          <div className="card-btn-group">
                            <Link
                              href="#"
                              className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5"
                            >
                              Connect
                            </Link>
                            <Link
                              href="#"
                              className="btn btn-outline-mercury text-black-2 text-uppercase h-px-48 rounded-3 mb-5 px-5"
                            >
                              <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>
                              Save job
                            </Link>
                          </div>
                          {/* <!-- card-btn-group end --> */}
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
                              221B Baker Street, London
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="media justify-content-md-start mb-6">
                            <div className="image mr-5">
                              <img src="image/svg/icon-dolor.svg" alt="" />
                            </div>
                            <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                              100-120K PLN PLN
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="media justify-content-md-start mb-md-0 mb-6">
                            <div className="image mr-5">
                              <img src="image/svg/icon-briefcase.svg" alt="" />
                            </div>
                            <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                              Remote
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-lg-0 mb-10">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Type of corporation
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                              B2B &amp; B2C
                            </h6>
                          </div>
                          <div className="tags">
                            <p className="font-size-4 text-gray mb-0">
                              Soft Skill
                            </p>
                            <ul className="list-unstyled mr-n3 mb-0">
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Zoom
                              </li>
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Basic English
                              </li>
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Punctual
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6 mb-lg-0 mb-8">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Career Level
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                              Project Manangement
                            </h6>
                          </div>
                          <div className="tags">
                            <p className="font-size-4 text-gray mb-3">
                              Technical Skill
                            </p>
                            <ul className="list-unstyled d-flex align-items-center flex-wrap">
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Swift
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Objective C
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  X Code
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  WooCommerce
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Coding
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Client's team size
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                              20-50 employees
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Posted Time
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                              08 October 2020
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-8 pl-sm-9 pl-6 pb-10 light-mode-texts">
                      <div className="row">
                        <div className="col-xxl-12 col-xl-9 pr-xxl-18 pr-xl-0 pr-11">
                          <div className="">
                            <p className="mb-4 font-size-4 text-gray">
                              Job Description
                            </p>
                            <p className="font-size-4 text-black-2 mb-7">
                              Gubagoo is a fast growing provider of messaging
                              and commerce solutions for automotive dealers
                              changing the future of how people find, buy and
                              service their vehicles.
                            </p>
                          </div>
                          <div className="">
                            <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                              Your Role:
                            </span>
                            <p className="font-size-4 text-black-2 mb-7">
                              We’re looking for a passionate individual to
                              design beautiful and functional products for our
                              customers at Gubagoo. We move very fast and you
                              will be expected to contribute to a
                              cross-functional product development squad, that
                              includes product managers and developers, to
                              deliver the UX and UI for the team to bring to
                              life.
                            </p>
                            <p className="font-size-4 text-black-2 mb-7">
                              We are serious about remote work. You can work for
                              from anywhere.
                            </p>
                            <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                              What you will be doing:
                            </span>
                            <ul className="list-unstyled">
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-2">
                                <span className="d-inline-block mr-7">•</span>
                                Contribute new controls or design improvements
                                to our
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Take ownership of the successful delivery of
                                features
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Help set and achieve quarterly goals
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Ship a TON of product improvements and features
                              </li>
                            </ul>
                            <Link
                              href="#"
                              className="btn btn-green text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-6"
                            >
                              Connect
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade "
                  id="tab-pane-4"
                  role="tabpanel"
                  aria-labelledby="tab-nav-4"
                >
                  <div className=" bg-white rounded-4 border border-mercury shadow-9 pos-abs-xl ml-xl-8 h-1413 overflow-y-scroll mt-9 mt-xl-0">
                    {/* <!-- Single Featured Job --> */}
                    <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
                      <div className="row">
                        <div className="col-12">
                          {/* <!-- media start --> */}
                          <div className="media align-items-center">
                            {/* <!-- media logo start --> */}
                            <div className="square-72 d-block mr-8">
                              <img
                                src="image/l2/png/featured-job-logo-4.png"
                                alt=""
                              />
                            </div>
                            {/* <!-- media logo end --> */}
                            {/* <!-- media texts start --> */}
                            <div>
                              <h3 className="font-size-6 mb-0">
                                Creative Director
                              </h3>
                              <span className="font-size-3 text-gray line-height-2">
                                Facebook
                              </span>
                            </div>
                            {/* <!-- media texts end --> */}
                          </div>
                          {/* <!-- media end --> */}
                        </div>
                      </div>
                      <div className="row pt-9">
                        <div className="col-12">
                          {/* <!-- card-btn-group start --> */}
                          <div className="card-btn-group">
                            <Link
                              href="#"
                              className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5"
                            >
                              Connect
                            </Link>
                            <Link
                              href="#"
                              className="btn btn-outline-mercury text-black-2 text-uppercase h-px-48 rounded-3 mb-5 px-5"
                            >
                              <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>
                              Save job
                            </Link>
                          </div>
                          {/* <!-- card-btn-group end --> */}
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
                              132 North Wellington Avenue, Seattle 1204
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="media justify-content-md-start mb-6">
                            <div className="image mr-5">
                              <img src="image/svg/icon-dolor.svg" alt="" />
                            </div>
                            <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                              80-90K PLN PLN
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="media justify-content-md-start mb-md-0 mb-6">
                            <div className="image mr-5">
                              <img src="image/svg/icon-briefcase.svg" alt="" />
                            </div>
                            <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                              Part-time
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-lg-0 mb-10">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Type of corporation
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                              B2B &amp; B2C
                            </h6>
                          </div>
                          <div className="tags">
                            <p className="font-size-4 text-gray mb-0">
                              Soft Skill
                            </p>
                            <ul className="list-unstyled mr-n3 mb-0">
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Slack
                              </li>
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Wireframing
                              </li>
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Prototyping
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6 mb-lg-0 mb-8">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Career Level
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                              Project Manangement
                            </h6>
                          </div>
                          <div className="tags">
                            <p className="font-size-4 text-gray mb-3">
                              Technical Skill
                            </p>
                            <ul className="list-unstyled d-flex align-items-center flex-wrap">
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Agile
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Wire-framing
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Prototyping
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Slack
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Director
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Client's team size
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                              50-80 employees
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Posted Time
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                              31 August 2020
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-8 pl-sm-9 pl-6 pb-10 light-mode-texts">
                      <div className="row">
                        <div className="col-xxl-12 col-xl-9 pr-xxl-18 pr-xl-0 pr-11">
                          <div className="">
                            <p className="mb-4 font-size-4 text-gray">
                              Job Description
                            </p>
                            <p className="font-size-4 text-black-2 mb-7">
                              Gubagoo is a fast growing provider of messaging
                              and commerce solutions for automotive dealers
                              changing the future of how people find, buy and
                              service their vehicles.
                            </p>
                          </div>
                          <div className="">
                            <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                              Your Role:
                            </span>
                            <p className="font-size-4 text-black-2 mb-7">
                              We’re looking for a passionate individual to
                              design beautiful and functional products for our
                              customers at Gubagoo. We move very fast and you
                              will be expected to contribute to a
                              cross-functional product development squad, that
                              includes product managers and developers, to
                              deliver the UX and UI for the team to bring to
                              life.
                            </p>
                            <p className="font-size-4 text-black-2 mb-7">
                              We are serious about remote work. You can work for
                              from anywhere.
                            </p>
                            <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                              What you will be doing:
                            </span>
                            <ul className="list-unstyled">
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-2">
                                <span className="d-inline-block mr-7">•</span>
                                Contribute new controls or design improvements
                                to our
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Take ownership of the successful delivery of
                                features
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Help set and achieve quarterly goals
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Ship a TON of product improvements and features
                              </li>
                            </ul>
                            <Link
                              href="#"
                              className="btn btn-green text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-6"
                            >
                              Connect
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade "
                  id="tab-pane-5"
                  role="tabpanel"
                  aria-labelledby="tab-nav-5"
                >
                  <div className=" bg-white rounded-4 border border-mercury shadow-9 pos-abs-xl ml-xl-8 h-1413 overflow-y-scroll mt-9 mt-xl-0">
                    {/* <!-- Single Featured Job --> */}
                    <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
                      <div className="row">
                        <div className="col-12">
                          {/* <!-- media start --> */}
                          <div className="media align-items-center">
                            {/* <!-- media logo start --> */}
                            <div className="square-72 d-block mr-8">
                              <img
                                src="image/l2/png/featured-job-logo-5.png"
                                alt=""
                              />
                            </div>
                            {/* <!-- media logo end --> */}
                            {/* <!-- media texts start --> */}
                            <div>
                              <h3 className="font-size-6 mb-0">
                                Software Engineer
                              </h3>
                              <span className="font-size-3 text-gray line-height-2">
                                Oculus
                              </span>
                            </div>
                            {/* <!-- media texts end --> */}
                          </div>
                          {/* <!-- media end --> */}
                        </div>
                      </div>
                      <div className="row pt-9">
                        <div className="col-12">
                          {/* <!-- card-btn-group start --> */}
                          <div className="card-btn-group">
                            <Link
                              href="#"
                              className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5"
                            >
                              Connect
                            </Link>
                            <Link
                              href="#"
                              className="btn btn-outline-mercury text-black-2 text-uppercase h-px-48 rounded-3 mb-5 px-5"
                            >
                              <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>
                              Save job
                            </Link>
                          </div>
                          {/* <!-- card-btn-group end --> */}
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
                              Berlyn, Uk
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="media justify-content-md-start mb-6">
                            <div className="image mr-5">
                              <img src="image/svg/icon-dolor.svg" alt="" />
                            </div>
                            <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                              120-150K PLN PLN
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="media justify-content-md-start mb-md-0 mb-6">
                            <div className="image mr-5">
                              <img src="image/svg/icon-briefcase.svg" alt="" />
                            </div>
                            <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                              Full-time
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-lg-0 mb-10">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Type of corporation
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                              B2B &amp; B2C
                            </h6>
                          </div>
                          <div className="tags">
                            <p className="font-size-4 text-gray mb-0">
                              Soft Skill
                            </p>
                            <ul className="list-unstyled mr-n3 mb-0">
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                C++
                              </li>
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Programming
                              </li>
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Developer
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6 mb-lg-0 mb-8">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Career Level
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                              Junior Engineer
                            </h6>
                          </div>
                          <div className="tags">
                            <p className="font-size-4 text-gray mb-3">
                              Technical Skill
                            </p>
                            <ul className="list-unstyled d-flex align-items-center flex-wrap">
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  C++
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Java Scprit
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  React JS
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Vue
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Angular
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Client's team size
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                              11-50 employees
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Posted Time
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                              11 November 2020
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-8 pl-sm-9 pl-6 pb-10 light-mode-texts">
                      <div className="row">
                        <div className="col-xxl-12 col-xl-9 pr-xxl-18 pr-xl-0 pr-11">
                          <div className="">
                            <p className="mb-4 font-size-4 text-gray">
                              Job Description
                            </p>
                            <p className="font-size-4 text-black-2 mb-7">
                              Gubagoo is a fast growing provider of messaging
                              and commerce solutions for automotive dealers
                              changing the future of how people find, buy and
                              service their vehicles.
                            </p>
                          </div>
                          <div className="">
                            <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                              Your Role:
                            </span>
                            <p className="font-size-4 text-black-2 mb-7">
                              We’re looking for a passionate individual to
                              design beautiful and functional products for our
                              customers at Gubagoo. We move very fast and you
                              will be expected to contribute to a
                              cross-functional product development squad, that
                              includes product managers and developers, to
                              deliver the UX and UI for the team to bring to
                              life.
                            </p>
                            <p className="font-size-4 text-black-2 mb-7">
                              We are serious about remote work. You can work for
                              from anywhere.
                            </p>
                            <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                              What you will be doing:
                            </span>
                            <ul className="list-unstyled">
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-2">
                                <span className="d-inline-block mr-7">•</span>
                                Contribute new controls or design improvements
                                to our
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Take ownership of the successful delivery of
                                features
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Help set and achieve quarterly goals
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Ship a TON of product improvements and features
                              </li>
                            </ul>
                            <Link
                              href="#"
                              className="btn btn-green text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-6"
                            >
                              Connect
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade "
                  id="tab-pane-6"
                  role="tabpanel"
                  aria-labelledby="tab-nav-6"
                >
                  <div className=" bg-white rounded-4 border border-mercury shadow-9 pos-abs-xl ml-xl-8 h-1413 overflow-y-scroll mt-9 mt-xl-0">
                    {/* <!-- Single Featured Job --> */}
                    <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
                      <div className="row">
                        <div className="col-12">
                          {/* <!-- media start --> */}
                          <div className="media align-items-center">
                            {/* <!-- media logo start --> */}
                            <div className="square-72 d-block mr-8">
                              <img
                                src="image/l2/png/featured-job-logo-1.png"
                                alt=""
                              />
                            </div>
                            {/* <!-- media logo end --> */}
                            {/* <!-- media texts start --> */}
                            <div>
                              <h3 className="font-size-6 mb-0">
                                Product Designer
                              </h3>
                              <span className="font-size-3 text-gray line-height-2">
                                Apple INC
                              </span>
                            </div>
                            {/* <!-- media texts end --> */}
                          </div>
                          {/* <!-- media end --> */}
                        </div>
                      </div>
                      <div className="row pt-9">
                        <div className="col-12">
                          {/* <!-- card-btn-group start --> */}
                          <div className="card-btn-group">
                            <Link
                              href="#"
                              className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5"
                            >
                              Connect
                            </Link>
                            <Link
                              href="#"
                              className="btn btn-outline-mercury text-black-2 text-uppercase h-px-48 rounded-3 mb-5 px-5"
                            >
                              <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>
                              Save job
                            </Link>
                          </div>
                          {/* <!-- card-btn-group end --> */}
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
                              170B Bashabo Kodomtola, Dhaka
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="media justify-content-md-start mb-6">
                            <div className="image mr-5">
                              <img src="image/svg/icon-dolor.svg" alt="" />
                            </div>
                            <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                              80-100K PLN PLN
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="media justify-content-md-start mb-md-0 mb-6">
                            <div className="image mr-5">
                              <img src="image/svg/icon-briefcase.svg" alt="" />
                            </div>
                            <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                              Full-time
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-lg-0 mb-10">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Type of corporation
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                              B2B &amp; B2C
                            </h6>
                          </div>
                          <div className="tags">
                            <p className="font-size-4 text-gray mb-0">
                              Soft Skill
                            </p>
                            <ul className="list-unstyled mr-n3 mb-0">
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Design
                              </li>
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Communication
                              </li>
                              <li className="d-block font-size-4 text-black-2 mt-2">
                                <span className="d-inline-block mr-2">•</span>
                                Marketing
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6 mb-lg-0 mb-8">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Career Level
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                              Project Manangement
                            </h6>
                          </div>
                          <div className="tags">
                            <p className="font-size-4 text-gray mb-3">
                              Technical Skill
                            </p>
                            <ul className="list-unstyled d-flex align-items-center flex-wrap">
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Agile
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Wire-framing
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Prototyping
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  User Persona
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                >
                                  Sketch
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Client's team size
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                              11-50 employees
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="">
                            <span className="font-size-4 d-block mb-4 text-gray">
                              Posted Time
                            </span>
                            <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                              11 November 2020
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-8 pl-sm-9 pl-6 pb-10 light-mode-texts">
                      <div className="row">
                        <div className="col-xxl-12 col-xl-9 pr-xxl-18 pr-xl-0 pr-11">
                          <div className="">
                            <p className="mb-4 font-size-4 text-gray">
                              Job Description
                            </p>
                            <p className="font-size-4 text-black-2 mb-7">
                              Gubagoo is a fast growing provider of messaging
                              and commerce solutions for automotive dealers
                              changing the future of how people find, buy and
                              service their vehicles.
                            </p>
                          </div>
                          <div className="">
                            <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                              Your Role:
                            </span>
                            <p className="font-size-4 text-black-2 mb-7">
                              We’re looking for a passionate individual to
                              design beautiful and functional products for our
                              customers at Gubagoo. We move very fast and you
                              will be expected to contribute to a
                              cross-functional product development squad, that
                              includes product managers and developers, to
                              deliver the UX and UI for the team to bring to
                              life.
                            </p>
                            <p className="font-size-4 text-black-2 mb-7">
                              We are serious about remote work. You can work for
                              from anywhere.
                            </p>
                            <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                              What you will be doing:
                            </span>
                            <ul className="list-unstyled">
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-2">
                                <span className="d-inline-block mr-7">•</span>
                                Contribute new controls or design improvements
                                to our
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Take ownership of the successful delivery of
                                features
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Help set and achieve quarterly goals
                              </li>
                              <li className="d-block font-size-4 text-black-2 d-flex flex-row mt-1">
                                <span className="d-inline-block mr-7">•</span>
                                Ship a TON of product improvements and features
                              </li>
                            </ul>
                            <Link
                              href="#"
                              className="btn btn-green text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-6"
                            >
                              Connect
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Main Content end --> */}
      <EmployeeFooter />
    </div>
  );
}

export default EmployeeSearch;
