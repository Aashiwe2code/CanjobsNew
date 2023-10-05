import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GetEmployeeVisaList,
  GetVisaSubStages,
  DeleteVisa,
} from "../../api/api";
import SAlert from "../common/sweetAlert";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../common/pagination";
import DocumentModal from "../forms/admin/EmployeeDocumentModal";
import Loader from "../common/loader";
import VisaStatus from "../forms/user/visaStatus";
import { LiaCcVisa } from "react-icons/lia";
import { GrDocumentUser } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
export default function VisaTable(props) {
  let user_type = localStorage.getItem("userType");
  /*Show modal states */
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [documentModal, setDocumentModal] = useState(false);
  let [showVisaModal, setVisaModal] = useState(false);
  /*Delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /* data and id states */
  const [employeeData, setemployeeData] = useState([]);
  let [employeeId, setemployeeId] = useState();
  // let [lmiaStatus, setLmiaStatus] = useState();
  /* Pagination states */
  const [totalData, setTotalData] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /* Shorting states */
  const [columnName, setcolumnName] = useState("employee_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  /* Function to get Employee visa data*/
  const EmpData = async () => {
    setIsLoading(true);
    try {
      const userData = await GetEmployeeVisaList(
        props.search,
        props.VisStatusFilterValue,
        props.VisaCountryFilterValue,
        props.IntrestedFilterValue,
        props.pageNo,
        recordsPerPage,
        columnName,
        sortOrder,
        props.employee_id
      );
      // console.log(userData.data)
      if (userData.data.data.length === 0) {
        setemployeeData([]);
        setIsLoading(false);
      } else {
        setemployeeData(userData.data.data);
        setTotalData(userData.data.total_rows);
        if (props.page === "user_profile") {
          props.setVisaStatus(userData.data.data);
          if (userData.data.data.length >= 0) {
            let VisaData = userData.data.data;
            let VisaCommentArray = [];
            for (let i = 0; i < VisaData.length; i++) {
              if (userData.data.data[i].visa_status === "file decision") {
                const data = VisaData[i];
                const subStageRes = await GetVisaSubStages(
                  data.visa_id,
                  "visa"
                );
                VisaCommentArray.push(
                  subStageRes.data.data.data.filter(
                    (item) => item.status === "file decision"
                  )
                );
                if (
                  subStageRes.data.data.data.filter(
                    (item) => item.substage === "rejected"
                  ).length > 0
                ) {
                  VisaData = VisaData.filter(
                    (item) => item.visa_id !== data.visa_id
                  );
                }
              }
            }
            if (props.page === "user_profile") {
              props.setVisaStatusRejectComment(VisaCommentArray);
              props.setVisaStatus(VisaData);
            }
          }
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  /*Render function to get the employee data*/
  useEffect(() => {
    EmpData();
    if (props.apiCall === true || apiCall === true) {
      props.setApiCall(false);
      setApiCall(false);
    }
  }, [
    props.search,
    props.VisStatusFilterValue,
    props.VisaCountryFilterValue,
    props.IntrestedFilterValue,
    props.pageNo,
    recordsPerPage,
    columnName,
    sortOrder,
    props.apiCall,
    apiCall,
  ]);

  /* Function to show the single data to update Employee*/
  const editVisa = (e) => {
    setVisaModal(true);
    setemployeeId(e);
  };

  /*Function to open add Document up modal */
  const AddDoucument = (e) => {
    setDocumentModal(true);
    setemployeeId(e.employee_id);
    // setLmiaStatus(e.lmia_status)
  };

  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
    props.setpageNo(1);
  };

  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.visa_id);
    setDeleteName(e.name);
    setDeleteAlert(true);
  };
  /*To call Api to delete Job */
  async function OnDeleteVisa(e) {
    try {
      const responseData = await DeleteVisa(e);
      console.log(responseData);
      // if (responseData.message === "job has been deleted") {
      //   toast.error("Job deleted Successfully", {
      //     position: toast.POSITION.TOP_RIGHT,
      //     autoClose: 1000,
      //   });
      //   setApiCall(true);
      //   setDeleteAlert(false);
      // }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {showVisaModal ? (
        <VisaStatus
          show={showVisaModal}
          employeeData={employeeId}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setVisaModal(false)}
        />
      ) : null}
      {documentModal ? (
        <DocumentModal
          show={documentModal}
          close={() => setDocumentModal(false)}
          employee_id={employeeId}
          job={"no"}
          // lmia={lmiaStatus}
        />
      ) : null}
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 ">
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
                          handleSort("language");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Languages"
                      >
                        Languages
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
                          handleSort("interested_in");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by interested in"
                      >
                        Interested in
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
                          handleSort("visa_country");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by visa country"
                      >
                        Visa country
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
                  {props.heading === "Dashboard" || user_type === "company" ? (
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
                        <th
                          className={
                            user_type === "company" ? "d-none" : "bg-white"
                          }
                        ></th>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                ) : (
                  (employeeData || []).map((empdata, i) => (
                    <tr className="applicant_row" key={i}>
                      <td className=" py-5">
                        <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                          <Link
                            className="text-dark"
                            to={`/${empdata.employee_id}`}
                          >
                            {empdata.employee_id}
                          </Link>
                        </p>
                      </td>
                      <td className=" py-5">
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

                          <div title="Employee Details">
                            {empdata.name === null ? (
                              <div className="font-size-3 mb-0 text-capitalize">
                                Unavailable
                              </div>
                            ) : (
                              <div className=" mb-0">
                                <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                                  <Link
                                    className="text-dark"
                                    to={`/${empdata.employee_id}`}
                                  >
                                    {empdata.name}
                                  </Link>
                                </p>
                                <p className="text-gray font-size-2 m-0 text-capitalize">
                                  {empdata.gender === "female"
                                    ? "F"
                                    : empdata.gender === "male"
                                    ? "M"
                                    : "O"}
                                  ( {empdata.marital_status + ", "}
                                  {/*Calculation of age from date of birth*/}
                                  {moment().diff(
                                    empdata.date_of_birth,
                                    "years"
                                  )}
                                  Y)
                                  {empdata.is_featured === "1" ? (
                                    <span className="bg-orange text-white featured_tag">
                                      Featured
                                    </span>
                                  ) : null}
                                  {empdata.created_by_admin === "0" ? (
                                    <span className="bg-info text-white web_tag">
                                      Web
                                    </span>
                                  ) : null}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-5 ">
                        {empdata.contact_no === null ? (
                          <p className="font-size-3 mb-0">Unavailable</p>
                        ) : (
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
                              {empdata.language}
                            </p>
                          )}
                        </td>
                      )}
                      {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <td className=" py-5">
                          {empdata.interested_in === null ? (
                            <p className="font-size-3  mb-0">Unavailable</p>
                          ) : (
                            <p className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                              {empdata.interested_in}
                            </p>
                          )}
                        </td>
                      )}
                      {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <td className=" py-5">
                          {empdata.visa_country === null ||
                          empdata.visa_country === "" ? (
                            <p className="font-size-3  mb-0">Unavailable</p>
                          ) : (
                            <p className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                              {empdata.visa_country}
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
                              {empdata.experience === "1-3 " ||
                              empdata.experience === "1-2 " ||
                              empdata.experience === "3-5 " ||
                              empdata.experience === "5-7 " ||
                              empdata.experience === "7+ "
                                ? empdata.experience + "years"
                                : empdata.experience}
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

                      <td className="">
                        <p className="font-size-2 font-weight-normal text-black-2 mb-0">
                          {empdata.visa_status === "onboard" ? (
                            <span className="p-1 bg-coral-opacity-visible text-white text-center w-100 border rounded-pill">
                              On Board
                            </span>
                          ) : empdata.visa_status === "documentation" ? (
                            <span className="p-1 bg-warning text-white text-center w-100 border rounded-pill">
                              Documentation
                            </span>
                          ) : empdata.visa_status === "file preparation" ? (
                            <span className="p-1 bg-info text-white text-center w-100 border rounded-pill">
                              File Preparation
                            </span>
                          ) : empdata.visa_status === "file review" ? (
                            <span className="p-1 bg-primary-opacity-8 text-white text-center w-100 border rounded-pill">
                              File Review
                            </span>
                          ) : empdata.visa_status === "file submission" ? (
                            <span className="p-1 bg-dark text-white text-center w-100 border rounded-pill">
                              File Submission
                            </span>
                          ) : empdata.visa_status === "file decision" ? (
                            <span className="p-1 bg-gray text-white text-center w-100 border rounded-pill">
                              File Decision
                            </span>
                          ) : (
                            <span className="font-size-3 font-weight-normal text-black-2 mb-0">
                              NA
                            </span>
                          )}
                        </p>
                      </td>

                      {/* Calulation to get user is new or retained */}
                      {/* <td className=" py-5">
                        <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {(new Date(empdata.created_at) >= oneMonthAgo && new Date(empdata.created_at) <= currentDate) === true ? "New" : "Retained"}                        
                          </p>
                      </td> */}

                      <td
                        className={
                          user_type === "company"
                            ? "d-none"
                            : " py-5 min-width-px-100"
                        }
                      >
                        <div
                          className={"btn-group button_group"}
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            className={
                              user_type === "company"
                                ? "d-none"
                                : "btn btn-outline-info action_btn"
                            }
                            onClick={() => editVisa(empdata)}
                            title="Update Visa status"
                          >
                            <span className="text-gray px-2">
                              <LiaCcVisa />
                            </span>
                            {/* <span className="fab fa-cc-visa text-gray px-2"></span> */}
                          </button>

                          <button
                            className={
                              user_type === "company" ||
                              props.page === "user_profile"
                                ? "d-none"
                                : "btn btn-outline-info action_btn"
                            }
                            onClick={() => AddDoucument(empdata)}
                            title="Documents"
                          >
                            <span className="text-gray">
                              <GrDocumentUser />
                            </span>
                            {/* <span className="fas fa-file text-gray"></span> */}
                          </button>
                          <button
                            className={"btn btn-outline-info action_btn"}
                            onClick={() => ShowDeleteAlert(empdata)}
                            title="Delete"
                          >
                            <span className=" text-danger px-1">
                              <RiDeleteBin5Line />
                              {/* <i className="fa fa-trash"></i> */}
                            </span>
                          </button>
                        </div>
                      </td>
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
        onConfirm={() => OnDeleteVisa(deleteId)}
        showCancelButton={true}
        onCancel={() => setDeleteAlert(false)}
      />
    </>
  );
}
