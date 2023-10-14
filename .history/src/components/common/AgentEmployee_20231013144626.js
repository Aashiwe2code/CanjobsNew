import React, { useState, useEffect } from "react";
// import AdminHeader from "./header";
// import AdminSidebar from "./sidebar";
import { Link } from "react-router-dom";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import Addfollowup from "../forms/admin/addfollowup";
import {
  //   AddLimia,
  //   ReservedEmployeeForJob,
  getallEmployeeData,
  //   GetFilter,
  //   AddUpdateVisa,
  //   RemoveReservedEmployeeForJob,
  //   DeletRespone,
} from "../../api/api";
import moment from "moment";
import Pagination from "../common/pagination";
// import FilterJson from "../json/filterjson";
// import AddInterview from "../forms/admin/addInterview.js";
// import LmiaStatus from "../forms/admin/lmiastatus";
// import { toast, ToastContainer } from "react-toastify";
// import ChangeJob from "../forms/admin/changeJobs";
import Loader from "../common/loader";
// import VisaStatus from "../forms/user/visaStatus";
// import DocumentModal from "../forms/admin/EmployeeDocumentModal";
// import { BsArrow90DegRight } from "react-icons/bs";
// import { RiChatFollowUpLine } from "react-icons/ri";
// import { LiaCcVisa } from "react-icons/lia";
// import { PiBriefcaseLight } from "react-icons/pi";
// import { ImCalendar } from "react-icons/im";
// import { GrDocumentUser } from "react-icons/gr";
function AgentsEmployee(props) {
  /*show modal and data states */
  //   let [documentModal, setDocumentModal] = useState(false);
  //   let [showVisaModal, setVisaModal] = useState(false);
  //   let [showChangeJobModal, setShowChangeJobModal] = useState(false);
  let [apiCall, setApiCall] = useState(props.apiCall);
  // let [followup, setFollowUp] = useState(false);
  //   let [interview, setInterview] = useState(false);
  //   let [lmia, setLimia] = useState(false);
  let [agentByEmployeeData, setAgentByEmployeeData] = useState([]);
  //   let [resData, setResData] = useState("");
  //   let [searchError, setSearchError] = useState("");
  let [isLoading, setIsLoading] = useState(true);
  //   let [employeeId, setemployeeId] = useState();
  //   let [lmiaStatus, setLmiaStatus] = useState();

  /*Filter and search state */
  //   const [skillFilterValue, setSkillFilter] = useState("");
  //   const [limiaFilterValue, setLmiaFilter] = useState("");
  //   const [experienceTypeFilterValue, setExperienceTypeFilterValue] =
  //     useState("");
  //   let [Json, setJson] = useState([]);
  //   const [search, setSearch] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("employee_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  //   const user_type = localStorage.getItem("userType");
  //   let [changeJob, setChangeJob] = useState(false);

  /*Function to get the jSon */
  //   const JsonData = async () => {
  //     try {
  //       let Json = await GetFilter();
  //       if (Json.data.message === "No data found") {
  //         setJson([]);
  //       } else {
  //         setJson(Json.data.data);
  //       }
  //       setJson(Json.data.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  if (
    apiCall === true &&
    // showChangeJobModal === false &&
    // changeJob === true &&
    props.setApiCall
  ) {
    props.setApiCall(true);
  }

  /* Function to get the EMployee by agent data*/
  const AgentByEmployeeData = async () => {
    setIsLoading(true);
    try {
      const userData = await getallEmployeeData(
        // props.heading === "Manage Jobs" || user_type === "company"
        //   ? jobId
        //   :
        null,
        "", //skillFilterValue",
        "", //experienceTypeFilterValue,
        "", //search,
        currentPage,
        recordsPerPage,
        columnName,
        sortOrder,
        "", //props.filter_by_time,
        "", //limiaFilterValue,
        "", //props.status,
        "", // props.employee_id,
        "", // props.response === "lmia" ? "1" : ""
        "",
        "",
        props.Agentid
      );
      if (userData.data.length === 0) {
        // setResData([]);
        setAgentByEmployeeData([]);
        setIsLoading(false);
      } else {
        setAgentByEmployeeData(userData.data);
        setTotalData(userData.total_rows);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  /*Render function to get the Response*/
  useEffect(() => {
    AgentByEmployeeData();
    // JsonData();
    if (apiCall === true) {
      setApiCall(false);
      //   setChangeJob(false);
    }
  }, [
    // skillFilterValue,
    // experienceTypeFilterValue,
    // search,
    currentPage,
    recordsPerPage,
    columnName,
    sortOrder,
    // props.filter_by_time,
    apiCall,
  ]);

  /*Search Onchange function to Search EMployee by agent data */
  //   const onSearch = (e) => {
  //     const inputValue = e.target.value;
  //     setSearch(inputValue);
  //     if (inputValue.length > 0) {
  //       if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
  //         setSearchError("Category Name cannot start with a number.");
  //       } else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
  //         setSearchError("Cannot use special characters.");
  //       } else {
  //         setSearchError("");
  //       }
  //     } else {
  //       setSearchError("");
  //     }
  //   };

  /*Function to Reserved Employee */
  //   const ReservedEmployee = async (e) => {
  //     console.log(e.employee_id, e.job_id);
  //     // Api call to set employee reserved
  //     try {
  //       let response = await ReservedEmployeeForJob(
  //         e.apply_id,
  //         e.employee_id,
  //         "1"
  //       );
  //       if (response.message === "Successfully") {
  //         // Api call to set employee Visa
  //         let state = { status: "onboard", country: e.location };
  //         try {
  //           const lmia = {
  //             lmia_status: "candidate placement",
  //             apply_id: e.apply_id,
  //           };
  //           let LimiaResponse = await AddLimia(lmia);
  //           console.log(LimiaResponse, "Add Lmia");
  //           if (LimiaResponse.message === "Data added successfully") {
  //             toast.success("Employee Reserved successfully", {
  //               position: toast.POSITION.TOP_RIGHT,
  //               autoClose: 1000,
  //             });
  //             setApiCall(true);

  //             // props.setApiCall(true);
  //           }
  //           let VisaResponse = await AddUpdateVisa(e.employee_id, state);
  //           if (VisaResponse.data.message === "visa inserted successfully") {
  //             // Api call to set employee Limia

  //             try {
  //             } catch (err) {
  //               console.log(err);
  //             }
  //           }
  //         } catch (err) {
  //           console.log(err);
  //         }
  //         ResponseData();
  //       }
  //       if (response.message === "already reserved") {
  //         toast.error("Employee already reserved for another job", {
  //           position: toast.POSITION.TOP_RIGHT,
  //           autoClose: 1000,
  //         });
  //         ResponseData();
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  /*Function to removed reserved employee */
  //   const OnRemoveReservedClick = async (e) => {
  //     try {
  //       let Response = await RemoveReservedEmployeeForJob(
  //         e.apply_id,
  //         e.employee_id
  //       );
  //       if (Response.message === "successfully") {
  //         toast.success("Employee Removed successfully", {
  //           position: toast.POSITION.TOP_RIGHT,
  //           autoClose: 1000,
  //         });
  //         setApiCall(true);
  //         // props.setApiCall(true);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  /*Function to remove Response */
  //   const onResponseDelte = async (e) => {
  //     try {
  //       let response = await DeletRespone(e.apply_id, e.employee_id);
  //       if (response.message === "successfully deleted") {
  //         toast.success("Response Deleted successfully", {
  //           position: toast.POSITION.TOP_RIGHT,
  //           autoClose: 1000,
  //         });
  //         setApiCall(true);
  //         props.setApiCall(true);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  /*Function to open add follow up modal */
  // const addFollow = (e) => {
  //   setFollowUp(true);
  //   setResData(e);
  //   setJobId(e.job_id);
  // };

  /*Function to open add Interview up modal */
  //   const addnterview = (e) => {
  //     setInterview(true);
  //     setResData(e);
  //     setJobId(e.job_id);
  //   };

  /*Function to open add Limia up modal */
  //   const addLimia = (e) => {
  //     setLimia(true);
  //     setResData(e);
  //     setJobId(e.job_id);
  //   };

  /* Function to show the single data to update job */
  //   const OpenChangeJob = (e) => {
  //     // e.preventDefault();
  //     setShowChangeJobModal(true);
  //     setResData(e);
  //     setJobId(e.job_id);
  //   };
  /* Function to show the single data to update visa*/
  //   const editVisa = (e) => {
  //     setVisaModal(true);
  //     setemployeeId(e);
  //   };
  /*Function to open add Document up modal */
  //   const AddDoucument = (e) => {
  //     setDocumentModal(true);
  //     setemployeeId(e.employee_id);
  //     setLmiaStatus(e.lmia_status);
  //   };
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
    setCurrentPage;
  };

  /*Funcion to get the user time from updated time */
  function isTimeWithin24Hours(createdTime) {
    return Date.now() - new Date(createdTime).getTime() <= 86400000;
  }
  return (
    <div
      className={
        // props.heading === "Response" ||
        // (props.heading === undefined && user_type === "admin")
        //   ? "site-wrapper overflow-hidden bg-default-2  "
        //   : props.heading === "Dashboard"
        //   ? "site-wrapper overflow-hidden bg-default-2 bg-white"
        //   :
        "response_main_div"
      }
    >
      {/* {props.heading === "Response" ||
      (props.heading === undefined && user_type === "admin") ? (
        <>
          <!-- Header Area -->
          <AdminHeader heading={"Response"} />
          <!-- navbar- -->
          <AdminSidebar heading={"Response"} />
          <ToastContainer />
        </>
      ) : null} */}

      <div
        className={
          //   props.heading === "Response" ||
          //   (props.heading === undefined && user_type === "admin")
          //     ? "dashboard-main-container mt-16"
          //     : props.heading === "Dashboard"
          //     ? ""
          //     :
          "response__container"
        }
      >
        <div
          className={
            // props.heading === "Response" ||
            // (props.heading === undefined && user_type === "admin")
            //   ? "container"
            //   : props.heading === "Dashboard"
            //   ? ""
            //   :
            "container"
          }
        >
          {/* <div
            //   className={
            //     props.heading === "Manage Agent"
            //       ? "response_filters mb-2 align-items-center"
            //       : "align-items-center"
            //   }
            // >
            //   <div className="page___heading">
            //     <h3 className="font-size-6 mb-0">Follow Up</h3>
            //   </div>
            //   <div
            //     className={
            //       props.heading === "Response" ||
            //       (props.heading === undefined && user_type === "admin")
            //         ? "row m-0 align-items-center"
            //         : "d-none"
            //     }
            //   >
            //     {props.heading === "" ? null : (
            //       <div className="col p-1 form_group mb-3">
            //         <p className="input_label">Search :</p>
            //         <input
            //           required
            //           type="text"
            //           className="form-control"
            //           placeholder={"Search Company / Name"}
            //           value={search}
            //           name={"category_name"}
            //           onChange={(e) => {
            //             onSearch(e);
            //             setCurrentPage(1);
            //           }}
            //         />
            //       </div>
            //     )}
            //     <div className="col p-1 form_group mb-3">
            //       <p className="input_label">Filter by Skill:</p>
            //       <div className="select_div">
            //         <select
            //           name="job"
            //           id="job"
            //           value={skillFilterValue}
            //           onChange={(e) => {
            //             setSkillFilter(e.target.value);
            //             setCurrentPage(1);
            //           }}
            //           className="text-capitalize form-control"
            //         >
            //           <option value="">Select Skil</option>
            //           {(Json.Skill || []).map((skill) => (
            //             <option value={skill.value} key={skill.id}>
            //               {skill.value}
            //             </option>
            //           ))}
            //         </select>
            //       </div>
            //     </div>
            //     <div className="col p-1 form_group mb-3">
            //       <p className="input_label">Filter by Skill:</p>
            //       <div className="select_div">
            //         <select
            //           name="job"
            //           id="job"
            //           value={limiaFilterValue}
            //           onChange={(e) => {
            //             setLmiaFilter(e.target.value);
            //             setCurrentPage(1);
            //           }}
            //           className="text-capitalize form-control"
            //         >
            //           <option value="">Select LMIA</option>
            //           {(Json.lmia || []).map((lmia) => (
            //             <option value={lmia.value} key={lmia.id}>
            //               {lmia.value}
            //             </option>
            //           ))}
            //         </select>
            //       </div>
            //     </div>
            //     <div className="col p-1 form_group mb-3">
            //       <p className="input_label">Filter by Experience:</p>
            //       <div className="select_div">
            //         <select
            //           name="experience"
            //           id="experience"
            //           value={experienceTypeFilterValue}
            //           onChange={(e) => {
            //             setExperienceTypeFilterValue(e.target.value);
            //             setCurrentPage(1);
            //           }}
            //           className="text-capitalize form-control"
            //         >
            //           <option value="">Select Experience</option>
            //           {(FilterJson.experience || []).map((ex, i) => (
            //             <option value={ex} key={i}>
            //               {ex}
            //               {ex === "fresher" || ex === "Other" ? "" : "Year"}
            //             </option>
            //           ))}
            //         </select>
            //       </div>
            //     </div>
            //     <div className="float-md-right mt-6"></div>
            //   </div>
            //   <small className="text-danger">{searchError}</small>
            // </div>
        */}
          <div className="mb-8">
            <div
              className={
                // props.heading === "Response" ||
                // (props.heading === undefined && user_type === "admin")
                //   ? ""
                //   : props.heading === "Dashboard"
                //   ? "bg-white shadow-8 datatable_div pt-7 rounded pb-9 px-5"
                //   :
                ""
              }
            >
              <div className="table-responsive main_table_div">
                {isLoading ? (
                  <Loader />
                ) : (
                  <table className="table table-striped main_data_table_inn">
                    <thead>
                      <tr className="">
                        <th
                          scope="col"
                          className=" pl-0 border-0 font-size-4 font-weight-normal"
                        >
                          EID
                        </th>
                        <th
                          scope="col"
                          className=" pl-0 border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={() => {
                              handleSort("name");
                            }}
                            className="text-gray"
                            title="Sort by Name"
                          >
                            Name
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className="pl-0 border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={() => {
                              handleSort("contact_no");
                            }}
                            className="text-gray"
                            title="Sort by Contact"
                          >
                            Contact
                          </Link>
                        </th>
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <th
                            scope="col"
                            className="pl-0 border-0 font-size-4 font-weight-normal"
                          >
                            <Link
                              to={""}
                              onClick={() => {
                                handleSort("created_at");
                              }}
                              className="text-gray"
                              title="Sort by date added"
                            >
                              Date added
                            </Link>
                          </th>
                        )}
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <th
                            scope="col"
                            className="pl-0 border-0 font-size-4 font-weight-normal"
                          >
                            <Link
                              to={""}
                              onClick={() => {
                                handleSort("education");
                              }}
                              className="text-gray"
                              title="Sort by Education"
                            >
                              Education
                            </Link>
                          </th>
                        )}
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <th
                            scope="col"
                            className="pl-0 border-0 font-size-4 font-weight-normal"
                          >
                            <Link
                              to={""}
                              onClick={() => {
                                handleSort("skill");
                              }}
                              className="text-gray"
                              title="Sort by Skill"
                            >
                              Skills
                            </Link>
                          </th>
                        )}
                        {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <th
                            scope="col"
                            className="pl-0 border-0 font-size-4 font-weight-normal"
                          >
                            <Link
                              to={""}
                              onClick={() => {
                                handleSort("experience");
                              }}
                              className="text-gray"
                              title="Sort by Experience"
                            >
                              Experience
                            </Link>
                          </th>
                        )}
                        <th
                          scope="col"
                          className="pl-0 border-0 font-size-4 font-weight-normal"
                        >
                          Profile
                        </th>
                        {props.visa === "yes" ? null : (
                          <th
                            scope="col"
                            className="pl-0 border-0 font-size-4 font-weight-normal"
                          >
                            Status
                          </th>
                        )}
                        {/* {props.heading === "Dashboard" ? (
                          ""
                        ) : (
                          <th
                            scope="col"
                            className="pl-0 border-0 font-size-4 font-weight-normal"
                          >
                            Action
                          </th>
                        )} */}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Map function to show the data in the list*/}
                      {totalData === 0 || agentByEmployeeData.length === 0 ? (
                        <tr>
                          <th colSpan={9} className="bg-white text-center"></th>
                        </tr>
                      ) : (
                        (agentByEmployeeData || []).map((empdata) => (
                          <tr
                            className="text-capitalize applicant_row"
                            key={empdata.employee_id}
                          >
                            <td className=" py-5">
                              <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {empdata.employee_id}
                              </p>
                            </td>
                            <td className=" py-5">
                              <Link
                                to={`/${empdata.employee_id}`}
                                // onClick={
                                //   empdata.name !== null
                                //     ? () => employeeDetails(empdata.employee_id)
                                //     : null
                                // }
                                title="Employee Details"
                              >
                                <div className="d-flex profile_box gx-2">
                                  <div className="media  align-items-center">
                                    <div className="circle-36 mx-auto overflow-hidden">
                                      {empdata.profile_photo === null ? (
                                        <img
                                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                          alt=""
                                          className="w-100"
                                        />
                                      ) : (
                                        <img
                                          src={empdata.profile_photo}
                                          alt=""
                                          className="w-100"
                                        />
                                      )}
                                    </div>
                                  </div>

                                  <div className=" mb-0">
                                    {empdata.name === null ||
                                    empdata.name === undefined ||
                                    empdata.name === "undefined" ||
                                    empdata.name === "" ? (
                                      <p className="font-size-3  mb-0">N/A</p>
                                    ) : (
                                      <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                                        {empdata.name}
                                      </p>
                                    )}
                                    {empdata.gender ||
                                    empdata.marital_status ? (
                                      <p className="text-gray font-size-2 m-0 text-capitalize">
                                        {empdata.gender === "female"
                                          ? "F"
                                          : empdata.gender === "male"
                                          ? "M"
                                          : "O"}
                                        {/*Calculation of age from date of birth*/}
                                        (
                                        {empdata.marital_status ||
                                        empdata.date_of_birth
                                          ? `${
                                              empdata.marital_status
                                            },${moment().diff(
                                              empdata.date_of_birth,
                                              "years"
                                            )} Y`
                                          : null}
                                        )
                                      </p>
                                    ) : null}
                                    {empdata.is_featured === "1" ||
                                    empdata.is_featured === 1 ? (
                                      <span className="bg-orange text-white featured_tag">
                                        Featured
                                      </span>
                                    ) : null}
                                    {empdata.created_by_admin === "0" ||
                                    empdata.created_by_admin === 0 ? (
                                      <span className="bg-info text-white web_tag">
                                        Web
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </Link>
                            </td>
                            <td className="py-5 ">
                              {empdata.contact_no === null ? null : (
                                <p className="m-0">
                                  +
                                  <Link
                                    className="text-dark"
                                    to={`tel:${empdata.contact_no}`}
                                  >
                                    {empdata.contact_no}
                                  </Link>
                                </p>
                              )}
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                <p className="text-gray font-size-2 m-0">
                                  <Link
                                    className="text-dark"
                                    to={`mailto:${empdata.email}`}
                                  >
                                    {empdata.email}
                                  </Link>
                                </p>
                              </h3>
                            </td>

                            {props.heading === "Dashboard" ? (
                              ""
                            ) : (
                              <td className=" py-5">
                                {empdata.language === null ? (
                                  <p className="font-size-3  mb-0">N/A</p>
                                ) : (
                                  <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                                    {/* {empdata.language} */}
                                    {moment(
                                      empdata.created_at,
                                      "YYYY-MM-DD HH:mm:ss"
                                    ).fromNow()}
                                  </p>
                                )}
                              </td>
                            )}
                            {props.heading === "Dashboard" ? (
                              ""
                            ) : (
                              <td className=" py-5">
                                {empdata.education === null ? (
                                  <p className="font-size-3  mb-0">N/A</p>
                                ) : (
                                  <p className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                                    {empdata.education}
                                  </p>
                                )}
                              </td>
                            )}
                            {props.heading === "Dashboard" ? (
                              ""
                            ) : (
                              <td className=" py-5">
                                {empdata.skill === null ? (
                                  <p className="font-size-3  mb-0">N/A</p>
                                ) : (
                                  <p className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                                    {empdata.skill}
                                  </p>
                                )}
                              </td>
                            )}
                            {props.heading === "Dashboard" ? (
                              ""
                            ) : (
                              <td className=" py-5">
                                {empdata.experience === null ? (
                                  <p className="font-size-3 mb-0">N/A</p>
                                ) : (
                                  <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                                    {empdata.experience} Years
                                  </p>
                                )}
                              </td>
                            )}
                            <td className=" py-5">
                              <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                                {empdata.profile_complete === "100.00" ? (
                                  <span className="p-1 bg-primary-opacity-8 text-white text-center w-100 border rounded-pill">
                                    Complete
                                  </span>
                                ) : (
                                  <span className="p-1 bg-warning text-white text-center w-100 border rounded-pill">
                                    Incomplete
                                  </span>
                                )}
                              </p>
                            </td>
                            {props.visa === "yes" ? null : (
                              <td className="">
                                <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                                  {empdata.status === "1" ? (
                                    <span
                                      className={
                                        !isTimeWithin24Hours(empdata.created_at)
                                          ? "p-1 bg-danger text-white text-center w-100 border rounded-pill"
                                          : "p-1 bg-info text-white text-center w-100 border rounded-pill"
                                      }
                                    >
                                      New
                                    </span>
                                  ) : empdata.status === "2" ? (
                                    <span className="p-1 bg-warning text-white text-center w-100 border rounded-pill">
                                      Prospect
                                    </span>
                                  ) : empdata.status === "3" ? (
                                    <span className="p-1 bg-coral-opacity-visible text-white text-center w-100 border rounded-pill">
                                      Lead
                                    </span>
                                  ) : empdata.status === "4" ? (
                                    <span className="p-1 bg-secondary text-white text-center w-100 border rounded-pill">
                                      Reatined
                                    </span>
                                  ) : empdata.status === "5" ? (
                                    <span className="p-1 bg-spray text-white text-center w-100 border rounded-pill">
                                      Lost
                                    </span>
                                  ) : empdata.status === "6" ? (
                                    <span className="p-1 bg-dark text-white text-center w-100 border rounded-pill">
                                      Dead
                                    </span>
                                  ) : empdata.status === "7" ? (
                                    <span className="p-1 bg-primary-opacity-8 text-white text-center w-100 border rounded-pill">
                                      Reserved
                                    </span>
                                  ) : empdata.status === "0" ? (
                                    <span className="p-1 bg-info text-white text-center w-100 border rounded-pill">
                                      New
                                    </span>
                                  ) : null}
                                </p>
                              </td>
                            )}
                            {/* Calulation to get user is new or retained */}
                            {/* <td className=" py-5">
                              <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {(new Date(empdata.created_at) >= oneMonthAgo && new Date(empdata.created_at) <= currentDate) === true ? "New" : "Retained"}                        
                                </p>
                            </td> */}
                            {/* <td className=" py-5 min-width-px-100">
                              <div
                                className="btn-group button_group"
                                role="group"
                                aria-label="Basic example"
                              ></div>
                            </td> */}
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
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  total={totalData}
                  count={agentByEmployeeData.length}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentsEmployee;
