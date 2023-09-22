import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import SAlert from "../common/sweetAlert";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Pagination from "../common/pagination";
import Loader from "../common/loader";
import { LiaUserEditSolid } from "react-icons/lia";
// import { RiDeleteBin5Line } from "react-icons/ri";
import { GetAgent } from "../../api/api";
export default function AgentTable(props) {
  /*Show modal states */
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  //   const [showEmplyomentDetails, setShowEmplyomentDetails] = useState(false);
  //   let [showAddEmployeeModal, setShowEmployeeMOdal] = useState(false);
  //   let [showVisaModal, setVisaModal] = useState(false);
  //   let [showChangeJobModal, setShowChangeJobModal] = useState(false);
  //   let [showEducationModal, setShowEducationModal] = useState(false);
  //   let [showSkillsModal, setShowSkillsModal] = useState(false);
  //   // let [documentModal, setDocumentModal] = useState(false);
  //   let [showStatusChangeModal, setShowStatusChange] = useState(false);
  /*data and id states */
  const [agenteData, setAgentData] = useState([]);
  //   const [alredyApplied, setAlredyApplied] = useState(false);
  //   let [employeeId, setemployeeId] = useState();
  /*delete state */
  //   const [deleteAlert, setDeleteAlert] = useState(false);
  //   const [deleteId, setDeleteID] = useState();
  //   const [deleteName, setDeleteName] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("id");
  const [sortOrder, setSortOrder] = useState("");
  /* Function to get Employee data*/
  const AgentData = async () => {
    // const params = useParams();
    setIsLoading(true);
    try {
      const userData = await GetAgent(
        "",
        props.search,
        props.pageNo,
        recordsPerPage,
        columnName,
        sortOrder
      );
      if (userData.data.data.length === 0) {
        setAgentData([]);
        setIsLoading(false);
        setTotalData(0);
      } else {
        // setAgentData(userData.data.data);
        setTotalData(userData.data.total_rows);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  /*Render function to get the employer*/
  useEffect(() => {
    AgentData();
    if (props.apiCall === true || apiCall === true) {
      props.setApiCall(false);
      setApiCall(false);
    }
    // if (alredyApplied === true) {
    //   setAlredyApplied(false);
    // }
  }, [
    props.search,
    props.pageNo,
    recordsPerPage,
    columnName,
    sortOrder,
    props.apiCall,
    apiCall,
  ]);

  /* Function to show the single data to update Employee*/
  // const employeeDetails = (e) => {
  //   props.employeeDetails(e);
  // };

  /*To Show the delete alert box */
  //   const ShowDeleteAlert = (e) => {
  //     setDeleteID(e.employee_id);
  //     setDeleteName(e.name);
  //     setDeleteAlert(true);
  //   };

  //   /*To cancel the delete alert box */
  //   const CancelDelete = () => {
  //     setDeleteAlert(false);
  //   };

  /*Function to open add Document up modal */
  // const AddDoucument = (e) => {
  //   setDocumentModal(true);
  //   setemployeeId(e);
  // };
  // /*
  /*To call Api to delete employee */
  //   async function deleteEmployee(e) {
  //     try {
  //       const responseData = await DeleteJobEmployee(e);
  //       if (responseData.message === "Employee has been deleted") {
  //         toast.error("Employee deleted Successfully", {
  //           position: toast.POSITION.TOP_RIGHT,
  //           autoClose: 1000,
  //         });
  //         setDeleteAlert(false);
  //         setApiCall(true);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
  };

  return (
    <>
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
                    Display name
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
                  {/* {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("type");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Type"
                      >
                        Type
                      </Link>
                    </th>
                  )} */}
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
                          handleSort("address");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Address"
                      >
                        Address
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
                          handleSort("country");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Country"
                      >
                        Country
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
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Map function to show the data in the list*/}
                {totalData === 0 || agenteData.length === 0 ? (
                  <tr>
                    <th className="bg-white"></th>
                    <th className="bg-white"></th>
                    {props.heading === "Dashboard" ? (
                      <th className="bg-white text-center">No Data Found</th>
                    ) : (
                      <th className="bg-white"></th>
                    )}
                    {props.heading === "Dashboard" ? null : (
                      <th className="bg-white text-center">No Data Found</th>
                    )}
                    <th className="bg-white"></th>
                    {props.heading !== "Dashboard" ? (
                      <>
                        <th className="bg-white"></th>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                ) : (
                  (agenteData || []).map((data) => (
                    <tr className="text-capitalize applicant_row" key={data.id}>
                      <td className=" py-5">
                        <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {data.id}
                        </p>
                      </td>
                      <td className=" py-5">
                        {/* <Link
                        //   to={`/${data.employee_id}`}
                          // onClick={
                          //   data.name !== null
                          //     ? () => employeeDetails(data.employee_id)
                          //     : null
                          // }
                          title="Employee Details"
                        > */}
                        <div className="d-flex profile_box gx-2">
                          <div className="media  align-items-center">
                            <div className="circle-36 mx-auto overflow-hidden">
                              {/* {data.profile_photo === null ? */}
                              (
                              <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                alt=""
                                className="w-100"
                              />
                              )
                              {/* : (
                               <img
                                 src={data.profile_photo}
                                 alt=""
                                 className="w-100"
                               />
                             )} */}
                            </div>
                          </div>

                          <div className=" mb-0">
                            {data.name === null ||
                            data.name === undefined ||
                            data.name === "undefined" ||
                            data.name === "" ? (
                              <p className="font-size-3  mb-0">Unavailable</p>
                            ) : (
                              <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                                {data.name}
                              </p>
                            )}
                            {/* {data.gender || data.marital_status ? (
                                <p className="text-gray font-size-2 m-0 text-capitalize">
                                  {data.gender === "female"
                                    ? "F"
                                    : data.gender === "male"
                                    ? "M"
                                    : "O"}
                                  //Calculation of age from date of birth
                                  (
                                  {data.marital_status ||
                                  data.date_of_birth
                                    ? `${
                                        data.marital_status
                                      },${moment().diff(
                                        data.date_of_birth,
                                        "years"
                                      )} Y`
                                    : null}
                                  )
                                </p>
                              ) : null} */}
                          </div>
                        </div>
                        {/* </Link> */}
                      </td>
                      <td className="py-5 ">
                        {data.contact_no === null ? null : (
                          <p className="m-0">
                            <Link
                              className="text-dark"
                              to={`tel:${data.contact_no}`}
                            >
                              +{data.contact_no}
                            </Link>
                            <p className="text-gray font-size-2 m-0">
                              <Link
                                className="text-dark"
                                to={`mailto:${data.email}`}
                              >
                                {data.email}
                              </Link>
                            </p>
                          </p>
                        )}
                      </td>

                      {/* {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <td className=" py-5">
                          {data.type === null ? (
                            <p className="font-size-3  mb-0">Unavailable</p>
                          ) : (
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              <p className="text-gray font-size-2 m-0">
                                {data.type}
                              </p>
                            </h3>
                          )}
                        </td>
                      )} */}
                      {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <td className=" py-5">
                          {data.address === null ? (
                            <p className="font-size-3  mb-0">Unavailable</p>
                          ) : (
                            <p className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                              {data.address}
                            </p>
                          )}
                        </td>
                      )}
                      {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <td className=" py-5">
                          {data.skill === null ? (
                            <p className="font-size-3  mb-0">Unavailable</p>
                          ) : (
                            <p className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate">
                              {` ${data.city},${data.state},${data.country}`}
                            </p>
                          )}
                        </td>
                      )}
                      <td className=" py-5 min-width-px-100">
                        <div
                          className="btn-group button_group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            className="btn btn-outline-info action_btn"
                            onClick={() => props.EditAgent(data.id)}
                            title="Edit Agent"
                          >
                            <span className="text-gray px-2">
                              <LiaUserEditSolid />
                            </span>
                          </button>
                          {/* <button
                            className="btn btn-outline-info action_btn"
                            // onClick={() => ShowDeleteAlert(data)}
                            title="Delete Agent"
                          >
                            <span className="px-2 text-danger">
                              <RiDeleteBin5Line />
                            </span>
                          </button> */}
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
            count={agenteData.length}
          />
        </div>
      </div>
      {/* <SAlert
        show={deleteAlert}
        title={deleteName}
        text="Are you Sure you want to delete !"
        onConfirm={() => deleteEmployee(deleteId)}
        showCancelButton={true}
        onCancel={CancelDelete}
      /> */}
    </>
  );
}
