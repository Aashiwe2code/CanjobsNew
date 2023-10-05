import React, { useState, useEffect } from "react";
import AddJobModal from "../forms/employer/job";
import EmployeeHeader from "../common/header";
import CustomButton from "../common/button";
import { GetJobDetail } from "../../api/api";
import { ToastContainer } from "react-toastify";
import Loader from "../common/loader";
import { Link, useNavigate } from "react-router-dom";
import { PiPencilDuotone } from "react-icons/pi";
import AdminHeader from "../admin/header";
import AdminSidebar from "../admin/sidebar";
import JobTable from "../common/jobTable";
import { BsEnvelope } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";
import { BiPhoneCall } from "react-icons/bi";
import LimaArrowProfile from "../common/LimaArrowProfile";
function JobDetailpageAdmim(props) {
  const user_type = localStorage.getItem("userType");
  let jid = localStorage.getItem("job_id");
  let skill = [];
  let navigate = useNavigate();
  /*Show modal and data state */
  const [lima, setLmia] = useState([]);
  const [lmiaStatusRejectComment, setLmiaStatusRejectComment] = useState([]);
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [showJobEditModal, setShowJobEditModal] = useState(false);
  const [TabActive, setTabActive] = useState("detail");
  const [jobData, setJobData] = useState("");
  const [pageNo, setpageNo] = useState(1);
  // const [employerKycData, setEmployrKycData] = useState("");

  /*Function to get employer data */
  const JobData = async () => {
    try {
      let resJobData = await GetJobDetail(jid);
      if (
        resJobData.data.data === null ||
        resJobData.data.data === undefined ||
        resJobData.data.data === "undefined" ||
        resJobData.data.data.length === 0
      ) {
        setJobData([]);
        setIsLoading(false);
      } else {
        setJobData(resJobData.data.data[0]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*Render method to get employer data */
  useEffect(() => {
    JobData();
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [apiCall]);

  /*Set skill variable to array frm string */
  if (jobData !== "") {
    skill =
      jobData.keyskill === null ||
      jobData.keyskill === undefined ||
      jobData.keyskill === "undefined"
        ? []
        : jobData.keyskill.split(",");
  }
  return (
    <div>
      {user_type === "admin" && (
        <>
          <AdminHeader
            heading={
              <Link
                className="d-flex align-items-center "
                onClick={() => navigate(-1)}
              >
                <i className="icon icon-small-left bg-white circle-30 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                  <h3 className="font-size-6 mb-0 text-capitalize">
                    Job Details
                  </h3>
                </span>
              </Link>
            }
          />
          <AdminSidebar />
        </>
      )}
      <ToastContainer />
      {user_type !== "admin" ? <EmployeeHeader /> : null}
      <div
        className={
          user_type === "admin"
            ? "dashboard-main-container bg-light mt-12 mt-lg-12"
            : "bg-default-2 pt-30 pt-lg-22 pb-lg-27"
        }
      >
        <div className="container-fluid">
          <div className="row text-left mt-5 pt-0">
            <div className="col-12 mb-1 d-none">
              <div className="bg-white shadow-9 d-flex">
                <div className="col-md-3 col-sm-6 media align-items-center company_box media border-right">
                  <div className="text_box text-left">
                    <img
                      className="company_logo"
                      src={
                        jobData.logo === null
                          ? "image/logo-main-black.png"
                          : jobData.logo
                      }
                      alt=""
                    />
                  </div>
                  <div className="text_box text-left w-100 text-capitalize">
                    <h3 className="mb-0 font-size-6 heading-dark-color d-flex align-items-center">
                      {jobData.job_title}
                      <CustomButton
                        className={
                          user_type === "user" || jobData.length === 0
                            ? "d-none"
                            : "font-size-3 rounded-3 btn-primary border-0  absolute_top_right"
                        }
                        onClick={() => setShowJobEditModal(true)}
                      >
                        <PiPencilDuotone />
                      </CustomButton>
                    </h3>
                    {/* <p className="font-size-3 text-default-color line-height-2 m-0">
                      {jobData.department}
                    </p> */}
                  </div>
                </div>
                {jobData.email ? (
                  <div className="col-md-3 col-sm-6 px-5 pt-5 pb-5 border-right">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        className="text-dark font-size-5 w-100 text-break"
                        to={`mailto:${jobData.email}`}
                      >
                        <BsEnvelope className="text-primary font-size-5 " />
                        {jobData.email}
                      </Link>
                      {user_type === "admin" || props.self === "no" ? (
                        <CustomButton
                          title={"Send Custom Email"}
                          className="font-size-4 rounded-3 btn-primary py-0 d-none"
                          /*Functionalities have to be done. */
                        >
                          {/*Take off "d-none" when you Send Custom Email API or when you're told to remove it*/}
                          <RiMailSendLine />
                        </CustomButton>
                      ) : null}
                    </div>
                    {jobData.contact_no_other && (
                      <Link
                        className="text-dark font-size-5 w-100"
                        to={`tel:${jobData.contact_no_other}`}
                      >
                        <BiPhoneCall className="text-primary font-size-5" />
                        {jobData.contact_no_other}
                      </Link>
                    )}
                  </div>
                ) : (
                  ""
                )}
                <div className="col px-5 pt-5 pb-5  border-right position-relative">
                  <div className="personal_info_box d-flex align-items-center justify-content-left flex-wrap">
                    {!jobData.location &&
                    !jobData.language &&
                    !jobData.address ? (
                      <div className="info_box text-left text-capitalize">
                        <span className="font-size-3 text-smoke  mr-7">
                          No Data FOund
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="info_box text-left text-capitalize">
                          {jobData.location ? (
                            <span
                              className="font-size-3 text-smoke  mr-7"
                              title="Current Location"
                            >
                              <img
                                className="mr-1"
                                height={"16px"}
                                src="image/icons/marker.svg"
                                alt="Location"
                              />
                              {jobData.department} ,{jobData.location}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="info_box text-left text-capitalize">
                          {jobData.language ? (
                            <span
                              className="font-size-3 text-smoke  mr-7"
                              title="User Language"
                            >
                              <img
                                className="mr-1"
                                height={"16px"}
                                src="image/icons/language.svg"
                                alt="language"
                              />
                              {jobData.language}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="info_box text-left text-capitalize">
                          {jobData.address ? (
                            <span
                              className="font-size-3 text-smoke  mr-7"
                              title="Currently Located Country"
                            >
                              <img
                                className="mr-1"
                                height={"16px"}
                                src="image/icons/address-book.svg"
                                alt="Address"
                              />
                              {jobData.address}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* LMIA */}
            <div className="col-12">
              {lima && user_type !== "user" ? (
                <LimaArrowProfile
                  lmia={lima}
                  lmiaStatusRejectComment={lmiaStatusRejectComment}
                />
              ) : null}
            </div>
            <div className="col-12 order-2 order-xl-1">
              <div className="bg-white">
                {/*----Profile Header----*/}
                <ul
                  className="nav border-top border-bottom border-mercury user_profile_tab"
                  id="myTab"
                  role="tablist"
                >
                  <li className="tab-menu-items nav-item">
                    <Link
                      className={
                        TabActive === "detail"
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                      }
                      id="home-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                      onClick={() => setTabActive("detail")}
                    >
                      Details
                    </Link>
                  </li>
                  <li className="tab-menu-items nav-item">
                    <Link
                      className={
                        TabActive === "jobs"
                          ? "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10 active"
                          : "text-uppercase font-size-3 font-weight-bold text-default-color py-4 mb-0 px-10"
                      }
                      id="appliedJobs"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="appliedJobs"
                      aria-selected="true"
                      onClick={() => setTabActive("jobs")}
                    >
                      Job Responses
                    </Link>
                  </li>
                </ul>
                {/*---Profile Details----*/}
                <div
                  className={TabActive === "detail" ? "tab-content" : "d-none"}
                  id="myTabContent"
                >
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    {/*----About Job----*/}
                    {isLoading ? (
                      <div className="table-responsive main_table_div">
                        <Loader />
                      </div>
                    ) : (
                      <div
                        className={
                          user_type === "admin" ? "row m-0" : "row m-0"
                        }
                      >
                        {/* <!-- Company Profile --> */}

                        <div className="text-capitalize company_detail_box w-100 row m-0">
                          <div className="col-12 mb-1">
                            <div className="bg-white  d-flex">
                              <div className="col-md-3 col-sm-6 media align-items-center company_box media border-right">
                                <div className="text_box text-left">
                                  <img
                                    className="company_logo"
                                    src={
                                      jobData.logo === null
                                        ? "https://macsnh.org/wp-content/uploads/2019/08/demo-logo-black.png"
                                        : jobData.logo
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="text_box text-left w-100 text-capitalize">
                                  <h3 className="mb-0 font-size-6 heading-dark-color d-flex align-items-center text-break">
                                    {jobData.job_title}
                                    <CustomButton
                                      className={
                                        user_type === "user" ||
                                        jobData.length === 0
                                          ? "d-none"
                                          : "font-size-3 rounded-3 btn-primary border-0  absolute_top_right"
                                      }
                                      onClick={() => setShowJobEditModal(true)}
                                    >
                                      <PiPencilDuotone />
                                    </CustomButton>
                                  </h3>
                                  {/* <p className="font-size-3 text-default-color line-height-2 m-0 text-break">
                                    {jobData.department}
                                  </p> */}
                                </div>
                              </div>
                              {jobData.email ? (
                                <div className="col-md-3 col-sm-6 px-5 pt-5 pb-5 border-right">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <Link
                                      className="text-dark font-size-5 w-100 text-break"
                                      to={`mailto:${jobData.email}`}
                                    >
                                      <BsEnvelope className="text-primary font-size-5 " />
                                      {jobData.email}
                                    </Link>
                                    {user_type === "admin" ||
                                    props.self === "no" ? (
                                      <CustomButton
                                        title={"Send Custom Email"}
                                        className="font-size-4 rounded-3 btn-primary py-0 d-none"
                                        /*Functionalities have to be done. */
                                      >
                                        {/*Take off "d-none" when you Send Custom Email API or when you're told to remove it*/}
                                        <RiMailSendLine />
                                      </CustomButton>
                                    ) : null}
                                  </div>
                                  {jobData.contact_no_other && (
                                    <Link
                                      className="text-dark font-size-5 w-100"
                                      to={`tel:${jobData.contact_no_other}`}
                                    >
                                      <BiPhoneCall className="text-primary font-size-5" />
                                      {jobData.contact_no_other}
                                    </Link>
                                  )}
                                </div>
                              ) : (
                                ""
                              )}
                              <div className="col px-5 pt-5 pb-5  border-right position-relative">
                                <div className="personal_info_box d-flex align-items-center justify-content-left flex-wrap">
                                  {!jobData.location &&
                                  !jobData.language &&
                                  !jobData.address ? (
                                    <div className="info_box text-left text-capitalize">
                                      <span className="font-size-3 text-smoke  mr-7">
                                        No Data FOund
                                      </span>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="info_box text-left text-capitalize">
                                        {jobData.location ? (
                                          <span
                                            className="font-size-3 text-smoke  mr-7"
                                            title="Current Location"
                                          >
                                            <img
                                              className="mr-1"
                                              height={"16px"}
                                              src="image/icons/marker.svg"
                                              alt="Location"
                                            />
                                            {jobData.department} ,{" "}
                                            {jobData.location}
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <div className="info_box text-left text-capitalize">
                                        {jobData.language ? (
                                          <span
                                            className="font-size-3 text-smoke  mr-7"
                                            title="User Language"
                                          >
                                            <img
                                              className="mr-1"
                                              height={"16px"}
                                              src="image/icons/language.svg"
                                              alt="language"
                                            />
                                            {jobData.language}
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <div className="info_box text-left text-capitalize">
                                        {jobData.address ? (
                                          <span
                                            className="font-size-3 text-smoke  mr-7"
                                            title="Currently Located Country"
                                          >
                                            <img
                                              className="mr-1"
                                              height={"16px"}
                                              src="image/icons/address-book.svg"
                                              alt="Address"
                                            />
                                            {jobData.address}
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6 p-10 border-right">
                            <div>
                              <h4 className="text-black-2 mb-0 font-size-5 d-flex align-items-center justify-content-space-between">
                                <span>About {jobData.job_title}</span>
                                {/* <CustomButton
                                  className="font-size-3 rounded-3 btn-primary border-0  absolute_top_right"
                                  onClick={() => setShowJobEditModal(true)}
                                >
                                  <PiPencilDuotone />
                                </CustomButton> */}
                              </h4>
                              <div className="pt-5 text-left">
                                {jobData.about ? (
                                  <p className="font-size-4 mb-8">
                                    {jobData.about}
                                  </p>
                                ) : (
                                  <p className="font-size-4 mb-8 text-center">
                                    No data Found
                                  </p>
                                )}
                              </div>
                              <div className="pt-5 pl-sm-9 pl-6 pb-10 light-mode-texts border-top border-width-1 border-default-color">
                                <div className="tags">
                                  <p className="font-size-4 text-gray mb-0">
                                    {" "}
                                    Skill
                                  </p>
                                  {skill.length > 0 ? (
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
                                  ) : (
                                    <div className="text-center">
                                      <b>No Skill's found</b>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6 p-10">
                            <div>
                              <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                                <span>{/*Kyc Details*/}</span>
                                {/* <CustomButton
                                  className="font-size-3 rounded-3 btn-primary border-0  absolute_top_right"
                                  onClick={() => setShowJobEditModal(true)}
                                >
                                  <PiPencilDuotone />
                                </CustomButton> */}
                              </h4>
                            </div>
                            {!jobData.industry &&
                            !jobData.corporation &&
                            !jobData.company_size &&
                            !jobData.job_type &&
                            !jobData.education &&
                            !jobData.role_category &&
                            !jobData.experience_required &&
                            !jobData.industry_type ? (
                              <div className="pt-5 text-left row m-0">
                                <div className="font-size-3 mb-4 mr-10">
                                  No Data Found
                                </div>
                              </div>
                            ) : (
                              <div className="pt-5 text-left row m-0">
                                {jobData.industry ? (
                                  <div
                                    className="font-size-3 mb-4 mr-10"
                                    title="Industry"
                                  >
                                    <i className="far fa-building mr-2"></i>
                                    {jobData.industry}
                                  </div>
                                ) : null}

                                {jobData.corporation ? (
                                  <div
                                    className="font-size-3 mb-4 mr-10"
                                    title="Business Type"
                                  >
                                    <i className="fas fa-briefcase mr-2"></i>
                                    {jobData.corporation}
                                  </div>
                                ) : null}
                                {jobData.company_size ? (
                                  <div
                                    className="font-size-3 mb-4 mr-10"
                                    title="Company size"
                                  >
                                    <i className="fas fa-user-friends mr-2"></i>
                                    {jobData.company_size}
                                  </div>
                                ) : null}
                                {jobData.job_type ? (
                                  <div
                                    className="info_box text-left"
                                    title="Job Type"
                                  >
                                    <span className="font-size-3 text-smoke  mr-7 text-capitalize">
                                      <b>Job Type </b> {jobData.job_type}
                                    </span>
                                  </div>
                                ) : null}
                                {jobData.education ? (
                                  <div
                                    className="font-size-3 mb-4 mr-10"
                                    title="Edication"
                                  >
                                    <i className="fas fa-graduation-cap mr-2"></i>
                                    <Link className="text-dark" to={""}>
                                      {jobData.education}
                                    </Link>
                                  </div>
                                ) : null}
                                {jobData.role_category ? (
                                  <div
                                    className="font-size-3 mb-4 mr-10"
                                    title="Hiring for"
                                  >
                                    <i className="fas fa-bullhorn mr-2"></i>
                                    {jobData.role_category}
                                  </div>
                                ) : null}
                                <div className="info_box text-left text-capitalize">
                                  {jobData.experience_required ? (
                                    <span
                                      className="font-size-3 text-smoke  mr-7"
                                      title="Total Experience"
                                    >
                                      <img
                                        className="mr-1"
                                        height={"16px"}
                                        src="image/icons/envelope.svg"
                                        alt="Email"
                                      />
                                      {jobData.experience_required} Years
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                {jobData.industry_type ? (
                                  <div className="info_box text-left">
                                    <span
                                      className="font-size-3 text-smoke  mr-7 text-capitalize"
                                      title="Industry Type"
                                    >
                                      <b> Industry Type </b>
                                      {jobData.industry_type}
                                    </span>
                                  </div>
                                ) : null}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* <!-- Sidebar End --> */}
                <div
                  className={
                    TabActive === "jobs"
                      ? "row m-0  justify-content-center"
                      : "d-none"
                  }
                  id="appliedJobs"
                  role="tabpanel"
                  aria-labelledby="appliedJobs"
                >
                  <div className="response_main_div w-100">
                    <JobTable
                      job_id={jid}
                      heading={"jobdetail"}
                      response={"response"}
                      detail={"job_detail"}
                      setLmia={setLmia}
                      apiCall={apiCall}
                      setApiCall={setApiCall}
                      setLmiaStatusRejectComment={setLmiaStatusRejectComment}
                      pageNo={pageNo}
                      setpageNo={setpageNo}
                    />
                  </div>
                  {/* <!-- Top Start --> */}
                </div>
                <div
                  className={
                    TabActive === "notes" ? "justify-content-center " : "d-none"
                  }
                >
                  {/* {TabActive === "notes" ? (
                    <AddCompanyfollowup
                      company_id={cid}
                      setApiCall={setApiCall}
                    />
                  ) 
                   : //  <div className="p-10 notes_container">
                  //         <div className="single_note mb-5">
                  //           <small>Created on: 2023-08-03 17:10:53</small>
                  //           <div className="card p-5">
                  //             This is some text within a card body.
                  //           </div>
                  //         </div>
                  //         <div className="single_note mb-5">
                  //           <small>Created on: 2023-08-03 17:10:53</small>
                  //           <div className="card p-5">
                  //             This is some text within a card body.
                  //           </div>
                  //         </div>
                  //         <div className="single_note mb-5">
                  //           <small>Created on: 2023-08-03 17:10:53</small>
                  //           <div className="card p-5">
                  //             This is some text within a card body.
                  //           </div>
                  //         </div>
                  //       </div>
                  null*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {user_type !== "admin" ? <EmployeeFooter /> : null} */}
      {showJobEditModal ? (
        <AddJobModal
          show={showJobEditModal}
          jobdata={jid}
          admin={"admin"}
          setApiCall={setApiCall}
          apiCall={apiCall}
          close={() => setShowJobEditModal(false)}
        />
      ) : null}
      {/* {showCompanyInfoModal ? (
        <CompanyDetails
          employerId={user_type === "company" ? company_id : cid}
          show={showCompanyInfoModal}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowCompanyInfoModal(false)}
        />
      ) : null}
      {showKycComplainDetailsModal ? (
        <KycComplianceDetails
          employerId={user_type === "company" ? company_id : cid}
          show={showKycComplainDetailsModal}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowKycComplainDetailsModal(false)}
        />
      ) : null}
      {showDoc ? (
        <EmployerDocumentModal
          show={showDoc}
          close={() => setShowDoc(false)}
          employer_id={user_type === "company" ? company_id : cid}
        />
      ) : null} */}
    </div>
  );
}

export default JobDetailpageAdmim;
