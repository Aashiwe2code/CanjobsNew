import React, { useEffect, useState } from "react";
import EmployeeHeader from "../common/header";
import EmployeeFooter from "../common/footer";
import EmployementDetails from "../forms/user/employement";
import PersonalDetails from "../forms/user/personal";
import EducationDetails from "../forms/user/education";
import ItSkills from "../forms/user/skills";
import CustomButton from "../common/button";
import { Link } from "react-router-dom";
import { EmployeeDetails, EmployeeAppliedJob } from "../../api/api";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import Loader from "../common/loader";
import DocumentModal from "../forms/admin/EmployeeDocumentModal";
import { PiPencilDuotone } from "react-icons/pi";
const UserProfile = (props) => {
  const [apiCall, setApiCall] = useState(false);
  const [showDoc, setShowDoc] = useState(false);
  const [showEmplyomentDetails, setShowEmplyomentDetails] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showItSkills, setShowItSkills] = useState(false);
  const [showAppliedJobs, setShowAppliedJobs] = useState(false);
  const [userDetail, setuserDetail] = useState([]);
  const [PersonalDetail, setPersonalDetail] = useState([]);
  const [appliedJob, setAppliedJob] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  const user_type = localStorage.getItem("userType");
  let id = localStorage.getItem("employee_id");
  const name = localStorage.getItem("name");
  const employeeId = user_type === "admin" ? props.employeeId : id;
  /*Function to get user Data */
  const UserData = async () => {
    try {
      const userData = await EmployeeDetails(employeeId);
      if (
        userData.data === undefined ||
        userData.data.length === 0 ||
        userData.data.employee.length === 0
      ) {
        setuserDetail([]);
        setPersonalDetail([]);
        setIsLoading(false);
      } else {
        setuserDetail(userData.data);
        setPersonalDetail(userData.data.employee[0]);
        localStorage.setItem(
          "profile_photo",
          userData.data.employee[0].profile_photo
        );
        localStorage.setItem("name", userData.data.employee[0].name);
        localStorage.setItem(
          "skill",
          userData.data.skill.map((obj) => obj.skill).join(", ")
        );
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false);
    }
  };
  // console.log(userDetail)

  /*Function to Geyt applied job data */
  const AppliedJob = async () => {
    try {
      const applied = await EmployeeAppliedJob(employeeId);
      if (applied.data === undefined || applied.data.length === 0) {
        setAppliedJob([]);
      } else {
        setAppliedJob(applied.data);
      }
    } catch (err) {
      console.log(err)
    }
  };

  /*Render function to get user Data */
  useEffect(() => {
    if (appliedJob) {
      AppliedJob();
    }
    UserData();
    if (apiCall === true) {
      setApiCall(false);
      // if (PersonalDetail.name !== (undefined || "undefined" || null || "")
      //   || PersonalDetail.profile_photo !== (undefined || "undefined" || null || "")) {
      //   localStorage.setItem("profile_photo", PersonalDetail.profile_photo)
      //   localStorage.setItem("name", PersonalDetail.name)
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCall]);

  /*Function to See uploaded resume */
  const handleViewResume = (pdfUrl) => {
    window.open(pdfUrl, "_blank");
  };
  /*Function to calculate the time duration of two dates */
  const calculateDuration = (startDate, endDate) => {
    const start = moment(startDate);
    const end = moment(endDate);
    const duration = moment.duration(end.diff(start));
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();

    return `${
      years === 1 ? years + "year ," : years > 1 ? years + "years ," : ""
    } ${
      months === 1 ? months + "month ," : months > 1 ? months + "months ," : ""
    } ${days === 1 ? days + "day" : days !== 1 ? days + "days" : ""}`;
  };
  return (
    /*---- Employee Profile Details Page ----*/
    <div className="site-wrapper overflow-hidden ">
      {user_type === "admin" ? (
        ""
      ) : (
        <>
          
          <EmployeeHeader />
          <ToastContainer />
        </>
      )}

      <div className="bg-default-2 mt-5">
        <div className="container-fluid p-0 pb-10">
          {name === null || name === "" ? "<h4>Complete profile</h4>" : ""}
          {isLoading ? (
            <div className="table-responsive main_table_div">
              <Loader />
            </div>
          ) : (
            <div className="row text-left mt-5 pt-5">
              <div className="col-12 col-xxl-4 col-lg-4 col-md-5 mb-11 mb-lg-0 ">
                <div className="p-0">
                  {/*----Slide Employee profile-----*/}
                  <div className="bg-white shadow-9 rounded-4">
                    <Link
                      to={""}
                      onClick={() => props.setShowEmployeeProfile(false)}
                      className="d-flex align-items-center back_btn_profile"
                    >
                      <i className="icon icon-small-left bg-white circle-30 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                      <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                        Back
                      </span>
                    </Link>
                    <div className="px-5 pt-11 pb-5 text-center border-bottom border-mercury">
                      <Link
                        className="mb-4 position-relative"
                        onClick={
                          user_type === "company" || props.self === "yes"
                            ? null
                            : () => setShowPersonalDetails(true)
                        }
                      >
                        {user_type === "admin" ? (
                          <>
                            
                            <input
                              type="file"
                              id="ImgUploadInput"
                              className="d-none"
                            />
                            <label
                              className="image_upload_btn m-0"
                              htmlFor="ImgUploadInput"
                            >
                              <span className="text-gray">
                                <PiPencilDuotone />
                              </span>
                              {/* <span className="fas fa-pen text-gray"> </span> */}
                            </label>
                          </>
                        ) : (
                          ""
                        )}
                        <img
                          className="rounded-circle"
                          src={
                            PersonalDetail.profile_photo
                              ? PersonalDetail.profile_photo
                              : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`
                          }
                          alt=""
                          width={"100px"}
                          height={"100px"}
                        />
                      </Link>
                      <h4 className="mb-0 text-capitalize">
                        {/* <Link
                        className="text-black-2 font-size-6 font-weight-semibold"
                        onClick={() => setShowRegistration(true)}
                      > */}
                        {PersonalDetail.name ? PersonalDetail.name : ""}
                        <br />
                        <span className="age_gender font-size-3 text-smoke">
                          {PersonalDetail.gender ||
                          PersonalDetail.marital_status ||
                          PersonalDetail.marital_status ||
                          PersonalDetail.date_of_birth
                            ? `(${
                                PersonalDetail.gender === "female"
                                  ? "F"
                                  : PersonalDetail.gender === "male"
                                  ? "M"
                                  : "O"
                              },
                        ${PersonalDetail.marital_status},
                        ${moment().diff(PersonalDetail.date_of_birth, "years")}
                        Y)`
                            : ""}
                        </span>
                        {/* </Link>
                      <Registration
                        show={showRegistration}
                        close={() => setShowRegistration(false)}
                      /> */}
                      </h4>
                      {/* <p className="mb-8 text-gray font-size-4">
                    {PersonalDetail.gender}
                    </p> */}
                    </div>
                    <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-10  border-bottom border-mercury">
                      <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                        <span>Personal Info</span>

                        {user_type === "company" ||
                        props.self === "yes" ? null : (
                          <CustomButton
                            className="font-size-3 rounded-3 btn-primary border-0"
                            onClick={() => setShowPersonalDetails(true)}
                          >
                            <PiPencilDuotone />
                          </CustomButton>
                        )}

                        {showDoc ? (
                          <DocumentModal
                            show={showDoc}
                            close={() => setShowDoc(false)}
                            employee_id={employeeId}
                          />
                        ) : null}
                        {showPersonalDetails ? (
                          <PersonalDetails
                            show={showPersonalDetails}
                            employeeId={employeeId}
                            apiCall={apiCall}
                            setApiCall={setApiCall}
                            close={() => setShowPersonalDetails(false)}
                          />
                        ) : null}
                      </h4>
                      {PersonalDetail.email === "" ||
                      PersonalDetail.length === 0 ? (
                        <div>
                          <p className="text-center">No Data Found</p>
                        </div>
                      ) : (
                        <div className="personal_info_box d-flex align-items-center justify-content-left flex-wrap">
                          <div className="info_box text-left">
                            <span className="font-size-3 text-smoke  mr-7">
                              <img
                                className="mr-1"
                                height={"16px"}
                                src="image/icons/envelope.svg"
                                alt="Email"
                              />
                              {PersonalDetail.email ? (
                                <Link
                                  className="text-dark"
                                  to={`mailto:${PersonalDetail.email}`}
                                >
                                  {PersonalDetail.email}
                                </Link>
                              ) : (
                                ""
                              )}
                            </span>
                          </div>

                          <div className="info_box text-left">
                            {PersonalDetail.contact_no ? (
                              <span className="font-size-3 text-smoke  mr-7">
                                <img
                                  className="mr-1"
                                  height={"16px"}
                                  src="image/icons/mobile-button.svg"
                                  alt="Mobile Number"
                                />
                                <Link
                                  className="text-dark"
                                  to={`tel:${PersonalDetail.contact_no}`}
                                >
                                  {PersonalDetail.contact_no}
                                </Link>
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="info_box text-left text-capitalize">
                            {PersonalDetail.current_location ? (
                              <span className="font-size-3 text-smoke  mr-7">
                                <img
                                  className="mr-1"
                                  height={"16px"}
                                  src="image/icons/marker.svg"
                                  alt="Location"
                                />
                                {PersonalDetail.current_location}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="info_box text-left text-capitalize">
                            {PersonalDetail.language ? (
                              <span className="font-size-3 text-smoke  mr-7">
                                <img
                                  className="mr-1"
                                  height={"16px"}
                                  src="image/icons/language.svg"
                                  alt="language"
                                />
                                {PersonalDetail.language}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="info_box text-left text-capitalize">
                            {PersonalDetail.currently_located_country ? (
                              <span className="font-size-3 text-smoke  mr-7">
                                <img
                                  className="mr-1"
                                  height={"16px"}
                                  src="image/icons/address-book.svg"
                                  alt="Address"
                                />
                                {PersonalDetail.currently_located_country}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="info_box text-left text-capitalize">
                            {PersonalDetail.experience ? (
                              <span className="font-size-3 text-smoke  mr-7">
                                <img
                                  className="mr-1"
                                  height={"16px"}
                                  src="image/icons/envelope.svg"
                                  alt="Email"
                                />
                                {PersonalDetail.experience} Years
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          {/* <div className="info_box text-left">
                          <span className="font-size-3 text-smoke  mr-7">
                            Religion: <b>{PersonalDetail.religion}</b>
                          </span>
                        </div> */}
                          {PersonalDetail.nationality ? (
                            <div className="info_box text-left">
                              <span className="font-size-3 text-smoke  mr-7 text-capitalize">
                                Nationality:
                                <b> {PersonalDetail.nationality}</b>
                              </span>
                            </div>
                          ) : null}
                          {PersonalDetail.work_permit_canada ? (
                            <div className="info_box text-left">
                              <span className="font-size-3 text-smoke  mr-7 text-capitalize">
                                Work Permit of Canada:
                                <b> {PersonalDetail.work_permit_canada}</b>
                              </span>
                            </div>
                          ) : null}
                          {PersonalDetail.work_permit_other_country ? (
                            <div className="info_box text-left">
                              <span className="font-size-3 text-smoke  mr-7 text-capitalize">
                                Work Permit of Other Country:
                                <b>
                                  
                                  {PersonalDetail.work_permit_other_country}
                                </b>
                              </span>
                            </div>
                          ) : null}
                          <div className="info_box text-left">
                            {PersonalDetail.resume ? (
                              <span className="font-size-3 text-smoke  mr-7">
                                Resume:
                                <Link
                                  to={""}
                                  onClick={() =>
                                    handleViewResume(PersonalDetail.resume)
                                  }
                                >
                                  View Resume
                                </Link>
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-10">
                      <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                        <span>Skill</span>
                        {user_type === "company" ||
                        props.self === "yes" ? null : (
                          <CustomButton
                            className="font-size-3 rounded-3 btn-primary border-0"
                            onClick={() => setShowItSkills(true)}
                          >
                            <PiPencilDuotone />
                          </CustomButton>
                        )}
                      </h4>
                      <div className="icon-link d-flex align-items-center justify-content-center flex-wrap ">
                        {/*----Employee's Skills----*/}

                        {showItSkills ? (
                          <ItSkills
                            show={showItSkills}
                            employeeId={employeeId}
                            apiCall={apiCall}
                            setApiCall={setApiCall}
                            close={() => setShowItSkills(false)}
                          />
                        ) : null}

                        <ul className="list-unstyled d-flex align-items-start flex-wrap">
                          {userDetail.skill === undefined ? (
                            <li>No Data Found</li>
                          ) : (
                            (userDetail.skill || []).map((employeeSkills) => (
                              <li key={employeeSkills.skill_id}>
                                <span className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                  {employeeSkills.skill}
                                </span>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-xxl-8 col-lg-8 col-md-7 order-2 order-xl-1">
                <div className="bg-white rounded-4 shadow-9">
                  {/*----Profile Header----*/}
                  <ul
                    className="nav border-bottom border-mercury pl-12 py-3 "
                    id="myTab"
                    role="tablist"
                  >
                    <li className="tab-menu-items nav-item pr-12">
                      <Link
                        className={
                          showAppliedJobs === true
                            ? "text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                            : " active text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                        }
                        id="home-tab"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                        onClick={() => setShowAppliedJobs(false)}
                      >
                        Overview
                      </Link>
                    </li>
                    <li className="tab-menu-items nav-item pr-12">
                      <Link
                        className={
                          showAppliedJobs === false
                            ? "text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                            : " active text-uppercase font-size-3 font-weight-bold text-default-color py-3"
                        }
                        id="appliedJobs"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="appliedJobs"
                        aria-selected="true"
                        onClick={() => setShowAppliedJobs(true)}
                      >
                        Applied Jobs
                      </Link>
                    </li>
                    <li className="tab-menu-items nav-item pr-12">
                      {user_type === "user" || user_type === "company" ? (
                        <CustomButton
                          className=" font-size-4 rounded-3 btn-primary border-0 mt-2"
                          onClick={() => setShowDoc(true)}
                        >
                          {user_type === "user" ? "Add Document" : "Documents"}
                        </CustomButton>
                      ) : null}
                    </li>
                  </ul>
                  {/*---Profile Details----*/}
                  <div
                    className={
                      showAppliedJobs === false ? "tab-content" : "d-none"
                    }
                    id="myTabContent"
                  >
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      {/*----About Employee----*/}
                      <div className="pr-xl-0 pr-xxl-14 p-5 px-xs-12 pt-7 pb-5 px-9">
                        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold d-flex align-items-center justify-content-space-between">
                          <span>About</span>
                        </h4>
                        <p className="font-size-4 mb-8 text-break">
                          {PersonalDetail.description}
                        </p>
                      </div>
                      {/*----Employee's Career Profile----*/}
                      <div
                        id="Career_Profile"
                        className="border-top px-9 pt-lg-5 pt-9 pt-xl-9 pb-10"
                      >
                        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left d-flex align-items-center justify-content-space-between">
                          <span>Career Profile</span>
                          {user_type === "company" ||
                          props.self === "yes" ? null : (
                            <CustomButton
                              className="font-size-3 rounded-3 btn-primary border-0"
                              onClick={() => setShowEmplyomentDetails(true)}
                            >
                              <PiPencilDuotone />
                            </CustomButton>
                          )}
                          {showEmplyomentDetails ? (
                            <EmployementDetails
                              show={showEmplyomentDetails}
                              employeeId={employeeId}
                              apiCall={apiCall}
                              setApiCall={setApiCall}
                              close={() => setShowEmplyomentDetails(false)}
                            />
                          ) : null}
                        </h4>
                        {/* {moment(PersonalDetail.start_date)}
                              {moment([PersonalDetail.start_date]).diff(moment([PersonalDetail.end_date]), 'years', true)} */}

                        {userDetail.career === undefined ||
                        userDetail.career.length === 0 ? (
                          <div>
                            <p className="text-center">No Data Found</p>
                          </div>
                        ) : (
                          (userDetail.career || []).map((CareerDetails) => (
                            <div
                              className="w-100"
                              key={CareerDetails.career_id}
                            >
                              <div className="d-flex align-items-center mb-5 flex-wrap flex-sm-nowrap justify-content-md-between border-top">
                                <div className="media align-items-center company_box col-md-6 p-0">
                                  <div className="text_box text-left w-100 mt-n2 text-capitalize">
                                    <h3 className="mb-0">
                                      <span className="font-size-6 text-black-2 font-weight-semibold">
                                        {CareerDetails.designation} -
                                        <span className="font-size-4">
                                          {CareerDetails.functional_area}
                                        </span>
                                      </span>
                                    </h3>
                                    <span className="font-size-4 text-default-color line-height-2">
                                      {CareerDetails.company} (
                                      {CareerDetails.industry})
                                    </span>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-right flex-wrap text-right text-capitalize">
                                  <span className="font-size-4 text-gray w-100">
                                    {/* {moment(CareerDetails.start_date).format(
                                    "DD-MM-YYYY"
                                  )}
                                  -
                                  {moment(CareerDetails.end_date).format(
                                    "DD-MM-YYYY"
                                  )} */}
                                    {calculateDuration(
                                      CareerDetails.start_date,
                                      CareerDetails.end_date
                                    )}
                                  </span>
                                  <span className="font-size-3 text-gray w-100">
                                    <span
                                      className="mr-4"
                                      style={{ marginTop: "-2px" }}
                                    >
                                      <img
                                        src="image/svg/icon-loaction-pin-black.svg"
                                        alt=""
                                      />
                                    </span>
                                    {CareerDetails.company_location}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      {/*----Employee's Education Profile----*/}
                      <div
                        id="Career_Profile"
                        className="border-top 
                      px-9 pt-lg-5 pt-9 pt-xl-9 pb-10"
                      >
                        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left d-flex align-items-center justify-content-space-between">
                          <span>Education</span>
                          {user_type === "company" ||
                          props.self === "yes" ? null : (
                            <CustomButton
                              className="font-size-3 rounded-3 btn-primary border-0"
                              onClick={() => setShowEducation(true)}
                            >
                              <PiPencilDuotone />
                            </CustomButton>
                          )}
                          {showEducation ? (
                            <EducationDetails
                              show={showEducation}
                              employeeId={employeeId}
                              apiCall={apiCall}
                              setApiCall={setApiCall}
                              close={() => setShowEducation(false)}
                            />
                          ) : null}
                        </h4>
                        {userDetail.education === undefined ||
                        userDetail.education.length === 0 ? (
                          <div>
                            <p className="text-center">No Data Found</p>
                          </div>
                        ) : (
                          (userDetail.education || []).map(
                            (EducationDetails, index) => (
                              <div
                                className="w-100"
                                key={EducationDetails.education_id}
                              >
                                <div className="d-flex align-items-center mb-5 flex-wrap flex-sm-nowrap justify-content-md-between border-top">
                                  <div className="media align-items-center company_box p-0">
                                    <div className="text_box text-left w-100 mt-n2 text-capitalize">
                                      <h3 className="mb-0">
                                        <span className="font-size-6 text-black-2 font-weight-semibold">
                                          {EducationDetails.qualification}
                                          <span className="font-size-4">
                                            (
                                            {
                                              EducationDetails.university_institute
                                            }
                                            )
                                          </span>
                                        </span>
                                      </h3>
                                      <span className="font-size-4 text-default-color line-height-2">
                                        {EducationDetails.course},
                                        {EducationDetails.specialization}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-right flex-wrap text-right text-capitalize">
                                    <span className="font-size-4 text-gray w-100">
                                      {EducationDetails.passing_year}
                                    </span>
                                    <span className="font-size-3 text-gray w-100">
                                      <span
                                        className="mr-4"
                                        style={{ marginTop: "-2px" }}
                                      >
                                        <img
                                          src="image/svg/icon-loaction-pin-black.svg"
                                          alt=""
                                        />
                                      </span>
                                      {EducationDetails.institute_location}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        )}
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <div className="pr-xl-11 p-5 pl-xs-12 pt-9 pb-11">
                        <form>
                          <div className="row">
                            <div className="col-12 mb-7">
                              <label
                                htmlFor="name3"
                                className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                              >
                                Your Name
                              </label>
                              <input
                                id="name3"
                                type="text"
                                className="form-control"
                                placeholder="Jhon Doe"
                              />
                            </div>
                            <div className="col-lg-6 mb-7">
                              <label
                                htmlFor="email3"
                                className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                              >
                                E-mail
                              </label>
                              <input
                                id="email3"
                                type="email"
                                className="form-control"
                                placeholder="example@gmail.com"
                              />
                            </div>
                            <div className="col-lg-6 mb-7">
                              <label
                                htmlFor="subject3"
                                className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                              >
                                Subject
                              </label>
                              <input
                                id="subject3"
                                type="text"
                                className="form-control"
                                placeholder="Special contract"
                              />
                            </div>
                            <div className="col-lg-12 mb-7">
                              <label
                                htmlFor="message3"
                                className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                              >
                                Message
                              </label>
                              <textarea
                                name="message"
                                id="message3"
                                placeholder="Type your message"
                                className="form-control h-px-144"
                              ></textarea>
                            </div>
                            <div className="col-lg-12 pt-4">
                              <button className="btn btn-primary text-uppercase w-100 h-px-48">
                                Send Now
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Sidebar End --> */}
                <div
                  className={
                    showAppliedJobs === true
                      ? "justify-content-center"
                      : "d-none"
                  }
                  id="appliedJobs"
                  role="tabpanel"
                  aria-labelledby="appliedJobs"
                >
                  {/* <!-- Top Start --> */}
                  <div className="mb-5">
                    <h4 className="font-size-7 mb-9 mt-5">Applied Jobs</h4>
                    <div className="row justify-content-center">
                      {appliedJob === undefined || appliedJob.length === 0 ? (
                        <div className="text-center text-dark">
                          No Data Found
                        </div>
                      ) : (
                        (appliedJob || []).map((data, i) => {
                          return (
                            <Link
                              to={
                                user_type === "admin"
                                  ? "/job"
                                  : user_type === "user"
                                  ? "/jobs"
                                  : "/managejobs"
                              }
                              className="col-lg-6 col-sm-11 mb-9"
                              key={i}
                            >
                              {/* <!-- Single Featured Job --> */}
                              <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3">
                                <div className="media align-items-center">
                                  <div className="square-52 mr-8 rounded">
                                    <img
                                      src={
                                        data.logo
                                          ? data.logo
                                          : "image/l3/png/fimize.png"
                                      }
                                      alt=""
                                      width={100}
                                    />
                                  </div>
                                  <div className=" mx-5 text-capitalize">
                                    <span
                                      to=""
                                      className="font-size-3 text-default-color line-height-2"
                                    >
                                      {data.company_name}
                                    </span>
                                    <h3 className="font-size-5 mb-0">
                                      <span
                                        className="heading-default-color font-weight-semibold"
                                        to=""
                                      >
                                        {data.job_title}
                                      </span>
                                    </h3>
                                  </div>
                                </div>
                                <div className="pt-5">
                                  <span className="font-size-3 text-gray  mr-7">
                                    Resume:<b>{data.employee_lmia_status}</b>
                                  </span>
                                </div>

                                <div className="d-flex pt-10">
                                  <ul className="list-unstyled mb-1 d-flex flex-wrap text-capitalize">
                                    <li>
                                      <span
                                        to=""
                                        className="bg-regent-opacity-15 text-denim font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                                      >
                                        <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>
                                        {data.location}
                                      </span>
                                    </li>
                                    <li>
                                      <span
                                        to=""
                                        className="bg-regent-opacity-15 text-orange font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                                      >
                                        <i className="fa fa-briefcase mr-2 font-weight-bold"></i>
                                        {data.job_type}
                                      </span>
                                    </li>
                                    <li>
                                      <span
                                        to=""
                                        className="bg-regent-opacity-15 text-eastern font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                                      >
                                        <i className="text-eastern fa fa-briefcase mr-2 font-weight-bold"></i>
                                        {data.experience_required}
                                      </span>
                                    </li>
                                    <li>
                                      <span
                                        to=""
                                        className="bg-regent-opacity-15 text-gray font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                                      >
                                        <i className="text-gray fa fa-clock mr-2 font-weight-bold"></i>
                                        {moment(data.created_at).format(
                                          "DD-MM-YYYY"
                                        )}
                                      </span>
                                    </li>

                                    <li>
                                      <span
                                        to=""
                                        className="bg-regent-opacity-15 text-red font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                                      >
                                        <i className="fas fa-rupee-sign mr-2 font-weight-bold"></i>
                                        {data.salary}
                                      </span>
                                    </li>
                                  </ul>
                                  {/* <Link
                            to=""
                            className="bookmark-button toggle-item font-size-6 ml-auto line-height-reset px-0 mt-6 text-default-color clicked  "
                          ></Link> */}
                                </div>
                              </div>
                              {/* <!-- End Single Featured Job --> */}
                            </Link>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {user_type === "admin" ? "" : <EmployeeFooter />}
    </div>
  );
};

export default UserProfile;
