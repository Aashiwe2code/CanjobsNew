import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonalDetails from "../forms/user/personal";
import Education from "../forms/user/education";
import Skills from "../forms/user/skills";
import { getallEmployeeData, DeleteJobEmployee, ApplyJob } from "../../api/api";
import moment from "moment";
import SAlert from "../common/sweetAlert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../common/pagination";
import EmployementDetails from "../forms/user/employement";
// import DocumentModal from "../forms/admin/DocumentModal";
import Loader from "../common/loader";
import JobModal from "../admin/Modal/jobModal";
import VisaStatus from "../forms/user/visaStatus";
import ApplicantsStatusModal from "../forms/admin/ApplicantsStatusModal";
import { MdOutlineCastForEducation } from "react-icons/md";
import { LiaUserEditSolid, LiaUserTieSolid } from "react-icons/lia";
import { GoTasklist } from "react-icons/go";
import { GiSkills } from "react-icons/gi";
import { AiOutlineFilePdf } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiBriefcaseLight } from "react-icons/pi";
export default function EmployeeTable(props) {
  /*Show modal states */
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [showEmplyomentDetails, setShowEmplyomentDetails] = useState(false);
  let [showAddEmployeeModal, setShowEmployeeMOdal] = useState(false);
  let [showVisaModal, setVisaModal] = useState(false);
  let [showChangeJobModal, setShowChangeJobModal] = useState(false);
  let [showEducationModal, setShowEducationModal] = useState(false);
  let [showSkillsModal, setShowSkillsModal] = useState(false);
  // let [documentModal, setDocumentModal] = useState(false);
  let [showStatusChangeModal, setShowStatusChange] = useState(false);
  /*data and id states */
  const [employeeData, setemployeeData] = useState([]);
  const [alredyApplied, setAlredyApplied] = useState(false);
  let [employeeId, setemployeeId] = useState();
  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*Pagination states */
  const [status, setStatus] = useState(props.self === "yes" ? -1 : 4);
  const [totalData, setTotalData] = useState("");
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("employee_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  /* Function to get Employee data*/
  const EmpData = async () => {
    // const params = useParams();
    setIsLoading(true);
    try {
      const userData = await getallEmployeeData(
        props.search,
        props.experienceFilterValue,
        props.skillFilterValue,
        props.educationFilterValue,
        props.pageNo,
        recordsPerPage,
        columnName,
        sortOrder,
        props.filter_by_time,
        "",
        status,
        props.job_id
      );
      if (userData.data.length === 0) {
        setemployeeData([]);
        setIsLoading(false);
        setTotalData(0);
      } else {
        setemployeeData(userData.data);
        setTotalData(userData.total_rows);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  /*Render function to get the employer*/
  useEffect(() => {
    EmpData();
    if (props.apiCall === true || apiCall === true) {
      props.setApiCall(false);
      setApiCall(false);
    }
    if (alredyApplied === true) {
      setAlredyApplied(false);
    }
  }, [
    props.experienceFilterValue,
    props.skillFilterValue,
    props.educationFilterValue,
    props.search,
    props.pageNo,
    recordsPerPage,
    columnName,
    sortOrder,
    props.filter_by_time,
    props.apiCall,
    apiCall,
    props.showEmployeeProfile,
    status,
  ]);

  /* Function to show the single data to update Employee*/
  // const employeeDetails = (e) => {
  //   props.employeeDetails(e);
  // };

  /* Function to show the single data to update Employee Education*/
  const editEmployeeEducation = (e) => {
    setShowEducationModal(true);
    setemployeeId(e);
  };

  /* Function to show the single data to update Employee*/
  const editEmployee = (e) => {
    setShowEmployeeMOdal(true);
    setemployeeId(e);
  };

  /* Function to show the single data to update Employee*/
  // const editVisa = (e) => {
  //   setVisaModal(true);
  //   setemployeeId(e);
  // };

  /* Function to show the single data to update Employee Skills*/
  const editEmployeeSkills = (e) => {
    setShowSkillsModal(true);
    setemployeeId(e);
  };

  /* Function to show the single data to update Employee Career*/
  const editEmployeeCareer = (e) => {
    setShowEmplyomentDetails(true);
    setemployeeId(e);
  };

  /* Function to show the single data to Edit job */
  const editJob = (e) => {
    setShowChangeJobModal(true);
    setemployeeId(e);
  };

  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.employee_id);
    setDeleteName(e.name);
    setDeleteAlert(true);
  };

  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };

  /*Function to open add Document up modal */
  // const AddDoucument = (e) => {
  //   setDocumentModal(true);
  //   setemployeeId(e);
  // };
  // /*
  /*To call Api to delete employee */
  async function deleteEmployee(e) {
    try {
      const responseData = await DeleteJobEmployee(e);
      if (responseData.message === "Employee has been deleted") {
        toast.error("Employee deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setDeleteAlert(false);
        setApiCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
  };

  /*Function to generate resume */
  const ResumeClick = (employee_id) => {
    const id = employee_id;
    window.open(`/resume/${id}`, "_blank");
  };

  /*Function to Apply job */
  const onApplyJobClick = async (id) => {
    try {
      const responseData = await ApplyJob(props.job_id, id, 0);
      if (responseData.message === "already applied on this job") {
        toast.error("Already applied on this job", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        props.setApiCall(true);
        props.EmployeeCall(true);
      }
      if (responseData.message === "Job applied successfully") {
        toast.success("Applied successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        props.setApiCall(true);
        setApiCall(true);
        setAlredyApplied(true);
        props.EmployeeCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*function to Open  change applicants status Modal */
  const ChangeApplicantsStatus = (e) => {
    setemployeeId(e);
    setShowStatusChange(true);
  };
  /*Function to get the new user */
  // const currentDate = new Date(); // Get current date
  // const oneMonthAgo = new Date(); // Create a new date object for one month ago
  // oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Subtract one month from the current date
  /*Funcion to get the user time from updated time */
  function isTimeWithin24Hours(createdTime) {
    return Date.now() - new Date(createdTime).getTime() <= 86400000;
  }
  return (
    <>
      {showAddEmployeeModal ? (
        <PersonalDetails
          show={showAddEmployeeModal}
          employeeId={employeeId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowEmployeeMOdal(false)}
        />
      ) : null}
      {showVisaModal ? (
        <VisaStatus
          show={showVisaModal}
          employeeId={employeeId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setVisaModal(false)}
        />
      ) : null}
      {showEducationModal ? (
        <Education
          close={() => setShowEducationModal(false)}
          employeeId={employeeId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          show={showEducationModal}
        />
      ) : null}
      {showSkillsModal ? (
        <Skills
          show={showSkillsModal}
          employeeId={employeeId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowSkillsModal(false)}
        />
      ) : null}
      {showStatusChangeModal ? (
        <ApplicantsStatusModal
          show={showStatusChangeModal}
          close={() => setShowStatusChange(false)}
          data={employeeId}
          setApiCall={setApiCall}
          self={props.self}
        />
      ) : null}
      {showEmplyomentDetails ? (
        <EmployementDetails
          show={showEmplyomentDetails}
          employeeId={employeeId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowEmplyomentDetails(false)}
        />
      ) : null}
      {showChangeJobModal ? (
        <JobModal
          show={showChangeJobModal}
          close={() => {
            setShowChangeJobModal(false);
          }}
          data={employeeId}
          setApiCall={setApiCall}
        />
      ) : null}
      {/* {documentModal ? (
        <DocumentModal
          show={documentModal}
          close={() => setDocumentModal(false)}
          employee_id={employeeId}
        />
      ) : null} */}
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 ">
        {props.heading === "Dashboard" ? null : (
          <div class="btn-group mb-5" role="group" aria-label="Basic example">
            {props.self === "yes" ? (
              <>
                <button
                  type="button"
                  class={
                    status === -1
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                  }
                  onClick={() => setStatus(-1)}
                >
                  New
                </button>
                <button
                  type="button"
                  class={
                    status === 2 ? "btn btn-primary" : "btn btn-outline-primary"
                  }
                  onClick={() => setStatus(2)}
                >
                  Prospect
                </button>
                <button
                  type="button"
                  class={
                    status === 3 ? "btn btn-primary" : "btn btn-outline-primary"
                  }
                  onClick={() => setStatus(3)}
                >
                  Lead
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  class={
                    status === 4 ? "btn btn-primary" : "btn btn-outline-primary"
                  }
                  onClick={() => setStatus(4)}
                >
                  Retained
                </button>
                <button
                  type="button"
                  class={
                    status === 5 ? "btn btn-primary" : "btn btn-outline-primary"
                  }
                  onClick={() => setStatus(5)}
                >
                  Lost
                </button>
                <button
                  type="button"
                  class={
                    status === 6 ? "btn btn-primary" : "btn btn-outline-primary"
                  }
                  onClick={() => setStatus(6)}
                >
                  Dead
                </button>
              </>
            )}
          </div>
        )}
        <div className="table-responsive main_table_div">
          {isLoading ? (
            <Loader />
          ) : (
            <table className="table table-striped main_data_table">
              <thead>
                <tr className="">
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    EID
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
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
                        handleSort("contact_no");
                        props.setpageNo(1);
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
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("created_at");
                          props.setpageNo(1);
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
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("agent_name");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by date added"
                      >
                        Agent
                      </Link>
                    </th>
                  )}
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("education");
                          props.setpageNo(1);
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
                        Skills
                      </Link>
                    </th>
                  )}
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("experience");
                          props.setpageNo(1);
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
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    Profile
                  </th>
                  {props.visa === "yes" ? null : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      Status
                    </th>
                  )}
                  {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Map function to show the data in the list*/}
                {totalData === 0 || employeeData.length === 0 ? (
                  <tr>
                    <th className="bg-white"></th>
                    <th className="bg-white"></th>
                    {props.heading === "Dashboard" ? (
                      <th className="bg-white text-center">No Data Found</th>
                    ) : (
                      <th className="bg-white"></th>
                    )}
                    <th className="bg-white"></th>
                    {props.heading === "Dashboard" ? null : (
                      <th className="bg-white text-center">No Data Found</th>
                    )}
                    <th className="bg-white"></th>
                    {props.heading !== "Dashboard" ? (
                      <>
                        <th className="bg-white"></th>
                        <th className="bg-white"></th>
                        <th className="bg-white"></th>
                        <th className="bg-white"></th>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                ) : (
                  (employeeData || []).map((empdata) => (
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
                                <p className="font-size-3  mb-0">Unavailable</p>
                              ) : (
                                <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                                  {empdata.name}
                                </p>
                              )}
                              {empdata.gender || empdata.marital_status ? (
                                <p className="text-gray font-size-2 m-0 text-capitalize">
                                  {empdata.gender === "female"
                                    ? "F"
                                    : empdata.gender === "male"
                                    ? "M"
                                    : "O"}
                                  {/*Calculation of age from date of birth*/}(
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
                            <p className="font-size-3  mb-0">Unavailable</p>
                          ) : (
                            <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                              {/* {empdata.language} */}
                              {moment(empdata.created_at, "YYYYMMDD").fromNow()}
                            </p>
                          )}
                        </td>
                      )}
                      {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <td className=" py-5">
                          {empdata.education === null ? (
                            <p className="font-size-3  mb-0">Unavailable</p>
                          ) : (
                            <p className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                              {empdata.agent_u_id} {empdata.agent_name}
                            </p>
                          )}
                        </td>
                      )}
                      {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <td className=" py-5">
                          {empdata.education === null ? (
                            <p className="font-size-3  mb-0">Unavailable</p>
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
                            <p className="font-size-3  mb-0">Unavailable</p>
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
                            <p className="font-size-3 mb-0">Unavailable</p>
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
                              Incompelete
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
                      {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <td className=" py-5 min-width-px-100">
                          <div
                            className="btn-group button_group"
                            role="group"
                            aria-label="Basic example"
                          >
                            {props.skill === null ||
                            props.skill === undefined ? (
                              <>
                                {/* <button
                                  className="btn btn-outline-info action_btn"
                                  onClick={() => editVisa(empdata.employee_id)}
                                  title="Update Visa status"
                                >
                                  <span className="fab fa-cc-visa text-gray px-2"></span>
                                </button> */}
                                {/* {props.visa === "yes" ? (
                                  <button
                                    className="btn btn-outline-info action_btn"
                                    onClick={() =>
                                      AddDoucument(empdata.employee_id)
                                    }
                                    title="Documents"
                                  >
                                    
                                    <span className="fas fa-file text-gray"></span>
                                  </button>
                                ) :
                                 ( */}
                                <>
                                  <button
                                    className="btn btn-outline-info action_btn"
                                    onClick={() =>
                                      ChangeApplicantsStatus(empdata)
                                    }
                                    title="Change status"
                                  >
                                    <span className="text-gray px-2">
                                      <GoTasklist />
                                    </span>
                                    {/* <i className="fas fa-stream text-gray"></i> */}
                                  </button>
                                  <Link
                                    style={{
                                      padding: "0 5px",
                                      minWidth: "auto",
                                      height: "auto",
                                    }}
                                    className="btn btn-sm btn-outline-info action_btn text-center"
                                    to={`/${empdata.employee_id}`}
                                    title="Employee Details"
                                  >
                                    Update
                                  </Link>
                                  {/* <button
                                    className="btn btn-outline-info action_btn"
                                    onClick={() =>
                                      editEmployee(empdata.employee_id)
                                    }
                                    title="Edit Employee"
                                  >
                                    <span className="text-gray px-2">
                                      <LiaUserEditSolid />
                                    </span>
                                  </button>
                                  <button
                                    className="btn btn-outline-info action_btn"
                                    onClick={() =>
                                      editEmployeeEducation(empdata.employee_id)
                                    }
                                    title="Education"
                                  >
                                    <span className="text-gray px-2">
                                      <MdOutlineCastForEducation />
                                    </span>
                                  </button>
                                  <button
                                    className="btn btn-outline-info action_btn"
                                    onClick={() =>
                                      editEmployeeSkills(empdata.employee_id)
                                    }
                                    title="Skills"
                                  >
                                    <span className="text-gray px-2">
                                      <GiSkills />
                                    </span>
                                  </button>
                                  <button
                                    className="btn btn-outline-info action_btn"
                                    onClick={() =>
                                      editEmployeeCareer(empdata.employee_id)
                                    }
                                    title="Edit Career"
                                  >
                                    <span className="text-gray px-2">
                                      <LiaUserTieSolid />
                                    </span>
                                  </button> */}
                                  <button
                                    className="btn btn-outline-info action_btn text-center"
                                    onClick={() =>
                                      ResumeClick(empdata.employee_id)
                                    }
                                    title="View Resume"
                                  >
                                    <span className="text-gray px-2">
                                      <AiOutlineFilePdf />
                                    </span>
                                    {/* <span className="fas fa-file text-gray"></span> */}
                                  </button>
                                  <button
                                    className="btn btn-outline-info action_btn text-gray"
                                    onClick={() => editJob(empdata)}
                                    title="All jobs "
                                    // disabled={empdata.skill ? false : true}
                                  >
                                    <span className="text-gray px-2">
                                      <PiBriefcaseLight />
                                    </span>
                                    {/* <i className="fas fa-briefcase"></i> */}
                                  </button>
                                  <button
                                    className="btn btn-outline-info action_btn"
                                    onClick={() => ShowDeleteAlert(empdata)}
                                    title="Delete"
                                  >
                                    <span className="px-2 text-danger">
                                      <RiDeleteBin5Line />
                                      {/* <i className="fa fa-trash "></i> */}
                                    </span>
                                  </button>
                                </>
                                {/* )} */}
                              </>
                            ) : (
                              <button
                                className="btn btn-outline-info action_btn"
                                // disabled={alredyApplied ? false : true}
                                onClick={() =>
                                  onApplyJobClick(empdata.employee_id)
                                }
                                title="Apply For job"
                              >
                                {alredyApplied ? "Already Applied" : "Apply"}
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                      {/* {props.self === "yes" ? (
                        <td>
                          <button
                            className="btn btn-outline-info action_btn"
                            onClick={() => ChangeApplicantsStatus(empdata)}
                            title="Approve Applicant"
                          >
                            <span className="text-gray px-2">
                              <GoTasklist />
                            </span>
                          </button>
                        </td>
                      ) : (
                        ""
                      )} */}
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
            count={employeeData.length}
          />
        </div>
      </div>
      <SAlert
        show={deleteAlert}
        title={deleteName}
        text="Are you Sure you want to delete !"
        onConfirm={() => deleteEmployee(deleteId)}
        showCancelButton={true}
        onCancel={CancelDelete}
      />
    </>
  );
}
