import React, { useState, useEffect } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import CustomButton from "../common/button";
import Addadmin from "../forms/admin/addadmin";
import { getallAdminData, DeleteAdmin, GetManagerTeam } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import SAlert from "../common/sweetAlert";
import FilterJson from "../json/filterjson";
import Loader from "../common/loader";
import ExecutiveBox from "../common/executiveBox";
import AdminTable from "../common/adminTable";
import Executivelist from "../common/executivelist";
import { BsEnvelope } from "react-icons/bs";
import { BiPhoneCall } from "react-icons/bi";
import { Link } from "react-router-dom";
function ManageAdmin() {
  /*data and id state */
  let [apiCall, setApiCall] = useState(false);
  let [executiveapiCall, setExecutiveApiCall] = useState(false);
  let [showAminDetails /*, setShowAminDetails*/] = useState(false);
  let [showAddAdminModal, setShowAdminModal] = useState(false);
  let [adminData, setAdminData] = useState([]);
  let [executiveData, setexecutiveData] = useState([]);
  let [managerData, setManagerData] = useState({});
  let [managerExecutive, setManagerExecutive] = useState([]);
  let [adminId, setAdminID] = useState();
  let [showManagerDetailBox, setShowManagerDetailBox] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [addTeamListShow, setAddTeamListShow] = useState(false);
  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*Filter and search state */
  const [typeFilterValue, setTypeFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("admin_id");
  const [sortOrder, setSortOrder] = useState("DESC");

  /* Function to get the Amin data*/
  const AdminData = async () => {
    setIsLoading(true);
    try {
      const userData = await getallAdminData(
        typeFilterValue,
        search,
        currentPage,
        recordsPerPage,
        columnName,
        sortOrder
      );
      if (userData.data.length === 0) {
        setAdminData([]);
        setIsLoading(false);
      } else {
        setAdminData(userData.data);
        setTotalData(userData.total_rows);

        //  Condition to get manager and its executive
        if (
          userData.data.filter((item) => item.admin_type === "manager")
            .length !== 0
        ) {
          OnManagerDetailClick(
            userData.data.filter((item) => item.admin_type === "manager")[0]
          );
        }
        if (apiCall === true) {
          let Admin_name = userData.data.filter(
            (data) => data.admin_id === localStorage.getItem("admin_id")
          );
          if (Admin_name[0].admin_id === localStorage.getItem("admin_id")) {
            localStorage.setItem("admin", Admin_name[0].name);
          }
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  /*Render function to get the Admin*/
  useEffect(() => {
    AdminData();
    if (apiCall === true) {
      setApiCall(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    typeFilterValue,
    search,
    currentPage,
    recordsPerPage,
    columnName,
    sortOrder,
    apiCall,
  ]);

  /* Function to show the single data to update Admin*/
  const editAdmin = (e) => {
    // e.preventDefault();
    setShowAdminModal(true);
    setAdminID(e);
  };
  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.admin_id);
    setDeleteName(e.name);
    setDeleteAlert(true);
  };
  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };
  /*To call Api to delete category */
  async function deleteAdmin(e) {
    try {
      const responseData = await DeleteAdmin(e);
      if (responseData.message === "admin has been deleted") {
        toast.error("Admin deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        setDeleteAlert(false);
      }
    } catch (err) {
      console.log(err);
    }
  }
  /*Search Onchange function to filter the data */
  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    setCurrentPage(1);
    if (inputValue.length > 0) {
      if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
        setSearchError("Admin Name cannot start with a number.");
      } else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
        setSearchError("Cannot use special characters.");
      } else {
        setSearchError("");
      }
    } else {
      setSearchError("");
    }
  };
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
    setCurrentPage(1);
  };

  /*Function to open manager detail page */
  const OnManagerDetailClick = async (data) => {
    try {
      let Response = await GetManagerTeam(data.admin_id);
      if (Response.message === "Successfully") {
        setManagerData(data);
        setexecutiveData(Response.data.data);
        setManagerExecutive(
          Response.data.data.filter((item) => item.parent_id !== "0")
        );
        setShowManagerDetailBox(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (executiveapiCall === true) {
      OnManagerDetailClick(managerData);
      setExecutiveApiCall(false);
    }
  }, [executiveapiCall, apiCall]);
  /*Function o add task to the executive */
  // const AddTask = async () => {
  //   setAddTeamListShow(false);
  // };

  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Manage Admin"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Manage Admin"} />
        <ToastContainer />
        {showAddAdminModal ? (
          <Addadmin
            show={showAddAdminModal}
            adminId={adminId}
            apiCall={apiCall}
            setApiCall={setApiCall}
            close={() => setShowAdminModal(false)}
          />
        ) : null}
        <div
          className={
            showAminDetails === false
              ? "dashboard-main-container mt-16"
              : "d-none"
          }
          id="dashboard-body"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-6 mb-18">
                <div className="mb-4 align-items-center">
                  <div className="page___heading">
                    <h3 className="font-size-6 mb-0">Admin</h3>
                  </div>
                  <div className="row m-0 align-items-center">
                    <div className="col p-1 form_group mb-3">
                      <p className="input_label">Search:</p>
                      <input
                        required
                        maxLength={30}
                        type="text"
                        className="form-control "
                        placeholder={"Admin Name"}
                        value={search}
                        name={"Admin_name"}
                        onChange={(e) => {
                          onSearch(e);
                        }}
                      />
                    </div>
                    <div className="col p-1 form_group mb-3">
                      <p className="input_label">Filter by Admin:</p>
                      <div className="select_div">
                        <select
                          name="type"
                          value={typeFilterValue}
                          id="type"
                          onChange={(e) => {
                            setTypeFilterValue(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="text-capitalize form-control"
                        >
                          <option value="">Admin type</option>
                          {(FilterJson.admintype || []).map((type, i) => (
                            <option value={type} key={i}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col px-1 form_group mt-4 text-right">
                      <CustomButton
                        className="font-size-3 rounded-3 btn btn-primary border-0"
                        onClick={() => editAdmin("0")}
                        title="Add Admin"
                      >
                        Add Admin
                      </CustomButton>
                    </div>
                  </div>
                  <small className="text-danger">{searcherror}</small>
                </div>
                {
                  <AdminTable
                    data={adminData}
                    isLoading={isLoading}
                    handleSort={handleSort}
                    editAdmin={editAdmin}
                    ShowDeleteAlert={ShowDeleteAlert}
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalData={totalData}
                    page={"admin page"}
                    OnManagerDetailClick={OnManagerDetailClick}
                    setAddTeamListShow={setAddTeamListShow}
                    setExecutiveApiCall={setExecutiveApiCall}
                  />
                }
              </div>
              {showManagerDetailBox && (
                <div className="card p-3 mt-2 col-6 mb-18">
                  <div className="mb-4 align-items-center">
                    <div className="page___heading">
                      <h3 className="font-size-6 mb-0">Admin</h3>
                    </div>
                    <div className="row m-0 align-items-center">
                      <div className="col p-1 form_group mb-3 ">
                        <div className="d-flex executive_box gx-2">
                          <div className="media  align-items-center">
                            <div className="circle-40 mx-auto overflow-hidden">
                              {managerData.profile_image === null ? (
                                <img
                                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                  alt=""
                                  className="w-100"
                                />
                              ) : (
                                <img
                                  src={managerData.profile_image}
                                  alt=""
                                  className="w-100"
                                />
                              )}
                            </div>
                          </div>

                          <div className=" mb-0">
                            {managerData.name === null ||
                            managerData.name === undefined ||
                            managerData.name === "undefined" ||
                            managerData.name === "" ? (
                              <p className="font-size-3  mb-0">N/A</p>
                            ) : (
                              <h5 className="m-0 text-black-3 font-weight-bold text-capitalize">
                                {managerData.name}
                                <small className="text-gray font-size-3 m-0 ">
                                  ({managerData.admin_type})
                                </small>
                              </h5>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col p-1 mb-3">
                        {!managerData.email ? null : (
                          <div>
                            <Link
                              className="font-size-3 text-break btn btn-outline-secondary btn-rounded "
                              to={`mailto:${managerData.email}`}
                            >
                              <BsEnvelope className="font-size-3 mr-4" />
                              {managerData.email}
                            </Link>
                          </div>
                        )}
                        {!managerData.contact_no ? null : (
                          <div>
                            <Link
                              className="font-size-3 text-break btn btn-outline-secondary btn-rounded "
                              to={`tel:${managerData.contact_no}`}
                            >
                              <BiPhoneCall className="font-size-3 mr-4" />
                              {managerData.contact_no}
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
                    <div className="">
                      {isLoading ? (
                        <Loader />
                      ) : addTeamListShow === true ? (
                        <div className="card-text">
                          <h5>Executive's List</h5>
                          <Executivelist
                            manager_id={managerData.admin_id}
                            executiveData={executiveData}
                            selected={managerExecutive}
                            setExecutiveApiCall={setExecutiveApiCall}
                          />
                        </div>
                      ) : (
                        <div
                          className="accordion accordion-flush"
                          id="accordionFlushExample"
                        >
                          {managerExecutive.length === 0 ? (
                            <div className="text-center">
                              <h5>No Executive found</h5>
                            </div>
                          ) : (
                            (managerExecutive || []).map((item, index) => (
                              <ExecutiveBox
                                data={item}
                                index={index}
                                key={index}
                              />
                            ))
                          )}
                          <div className="col px-1 form_group mt-4 text-right">
                            <CustomButton
                              className={
                                addTeamListShow === true
                                  ? "font-size-3 rounded-3 btn btn-light border-0"
                                  : "font-size-3 rounded-3 btn btn-primary border-0"
                              }
                              onClick={
                                addTeamListShow === true
                                  ? () => {
                                      setAddTeamListShow(false);
                                      setExecutiveApiCall(true);
                                    }
                                  : () => setAddTeamListShow(true)
                              }
                              title={
                                addTeamListShow === true ? "Cancel" : "Add Team"
                              }
                            >
                              {addTeamListShow === true ? "Cancel" : "Add Team"}
                            </CustomButton>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <SAlert
          show={deleteAlert}
          title={deleteName}
          text="Are you Sure you want to delete !"
          onConfirm={() => deleteAdmin(deleteId)}
          showCancelButton={true}
          onCancel={CancelDelete}
        />
      </div>
    </>
  );
}

export default ManageAdmin;
