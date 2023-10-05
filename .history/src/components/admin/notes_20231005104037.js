import React /*, { useState, useEffect }*/ from "react";
import { Link } from "react-router-dom";
// import CustomButton from "../common/button";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
// import {
//   GetFilter,
// } from "../../api/api";
import { ToastContainer /*, toast*/ } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import SAlert from "../common/sweetAlert";
// import Pagination from "../common/pagination";
// import Loader from "../common/loader";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { LiaEdit } from "react-icons/lia";
function Notes() {
  /*Modal and Data states */
  //   let [isLoading, setIsLoading] = useState(true);
  //   let [isLoading2, setIsLoading2] = useState(true);
  //   let [apiCall, setApiCall] = useState(false);
  //   let [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  //   let [showAddCategoryTypeModal, setShowAddCategoryTypeModal] = useState(false);
  //   const [categoryData, setCategoryData] = useState([]);
  //   const [categoryTypeData, setCategoryTypeData] = useState([]);
  //   const [CategoryId, setCategoryId] = useState([]);
  //   const [CateType, setCateType] = useState([]);
  /*Delete Category states */
  //   const [deleteAlert, setDeleteAlert] = useState(false);
  //   const [deleteId, setDeleteID] = useState();
  //   const [deleteName, setDeleteName] = useState("");
  /*Filter and search state */
  //   const [categoryTypeFilterValue, setCategoryTypeFilterValue] = useState("");
  //   const [search, setSearch] = useState("");
  //   const [searcherror, setSearchError] = useState("");
  /*Pagination states */
  //   const [totalData, setTotalData] = useState("");
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [recordsPerPage] = useState(10);
  //   const [TypetotalData, setTypeTotalData] = useState("");
  //   const [TypecurrentPage, setTypeCurrentPage] = useState(1);
  //   const [TyperecordsPerPage] = useState(10);
  /*Shorting states */
  //   const [columnName, setcolumnName] = useState("id");
  //   const [sortOrder, setSortOrder] = useState("DESC");

  /*Function to get thejSon */
  //   const JsonData = async () => {
  //     try {
  //       let Json = await GetFilter();
  //       if (Json.data.message === "No data found") {
  //         setCateType([]);
  //       } else {
  //         setCateType(Json.data.data.Category_type);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  /* Function to get the job category data*/
  //   const CategoryData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const userData = await getAllJobsCategory(
  //         1,
  //         categoryTypeFilterValue,
  //         search,
  //         currentPage,
  //         recordsPerPage,
  //         columnName,
  //         sortOrder
  //       );
  //       if (userData.data.length === 0) {
  //         setCategoryData([]);
  //         setIsLoading(false);
  //       } else {
  //         setCategoryData(userData.data);
  //         const filteredData = userData.data.filter(
  //           (data) => data.parent_id !== "0"
  //         );
  //         if (filteredData.length === 0) {
  //           setTotalData();
  //         } else {
  //           setTotalData(userData.total_rows);
  //         }
  //         setIsLoading(false);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       setIsLoading(false);
  //     }
  //   };
  /* Function to get the job category Type data*/
  //   const CategoryTypeData = async () => {
  //     try {
  //       const userData = await getAllJobsCategory(
  //         0,
  //         "",
  //         "",
  //         TypecurrentPage,
  //         TyperecordsPerPage,
  //         "job_category_id",
  //         "DESC"
  //       );
  //       if (userData.data.length === 0) {
  //         setCategoryTypeData([]);
  //         setIsLoading2(false);
  //       } else {
  //         setCategoryTypeData(userData.data);
  //         const FilterByType = userData.data
  //           ? userData.data.filter(
  //               (thing, index, self) =>
  //                 index === self.findIndex((t) => t.value === thing.value)
  //             )
  //           : [];
  //         setTypeTotalData(FilterByType.length);
  //         setIsLoading2(false);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  /*Render function to get the job category*/
  //   useEffect(() => {
  //     JsonData();
  //     CategoryData();
  //     if (apiCall === true) {
  //       setApiCall(false);
  //     }
  //     if ((search === "") === true) {
  //       setSearchError("");
  //     }
  //   }, [
  //     categoryTypeFilterValue,
  //     search,
  //     currentPage,
  //     apiCall,
  //     columnName,
  //     sortOrder,
  //   ]);
  /*Render function to get the job category Type*/
  //   useEffect(() => {
  //     CategoryTypeData();
  //     if (apiCall === true) {
  //       setApiCall(false);
  //     }
  //     if ((search === "") === true) {
  //       setSearchError("");
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [currentPage, apiCall, columnName, sortOrder]);

  /* Function to show the single data to update job category*/
  //   const editJobCategory = (e) => {
  //     setShowAddCategoryModal(true);
  //     setCategoryId(e);
  //   };

  /* Function to show the single data to update job category*/
  //   const addJobCategoryType = (e) => {
  //     setShowAddCategoryTypeModal(true);
  //     setCategoryId(e);
  //   };

  /* Function to show the single data to update job category Type*/
  //   const editJobCategoryType = (e) => {
  //     setShowAddCategoryTypeModal(true);
  //     setCategoryId(e);
  //   };
  /*To Show the delete alert box */
  //   const ShowDeleteAlert = (e) => {
  //     setDeleteID(e.job_category_id);
  //     setDeleteName(e.category_name);
  //     setDeleteAlert(true);
  //     setSearch("");
  //   };
  /*To cancel the delete alert box */
  //   const CancelDelete = () => {
  //     setDeleteAlert(false);
  //   };
  /*To call Api to delete category */
  //   async function deleteCategory(e) {
  //     try {
  //       const responseData = await DeleteJobCategory(e);
  //       if (responseData.message === "job category has been deleted") {
  //         toast.error("Category deleted Successfully", {
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
  /*Search Onchange function to Search Category data */
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
  /*Pagination Calculation */
  //   const nPages = Math.ceil(totalData / recordsPerPage);
  //   const TypenPages = Math.ceil(TypetotalData / TyperecordsPerPage);
  /*Sorting Function */
  //   const handleSort = (columnName) => {
  //     setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
  //     setcolumnName(columnName);
  //   };

  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Manage Notes"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Manage Notes"} />
        <div>
          <ToastContainer />
          {/* <!-- Modal- --> */}
          {/* {showAddCategoryModal ? (
            <AddCategory
              show={showAddCategoryModal}
              jobCategoryData={CategoryId}
              apiCall={apiCall}
              setApiCall={setApiCall}
              close={() => setShowAddCategoryModal(false)}
            />
          ) : null} */}
          {/* {showAddCategoryTypeModal ? (
            <AddCategoryType
              show={showAddCategoryTypeModal}
              jobCategoryData={CategoryId}
              apiCall={apiCall}
              setApiCall={setApiCall}
              close={() => setShowAddCategoryTypeModal(false)}
            />
          ) : null} */}
        </div>
        <div className="dashboard-main-container mt-16" id="dashboard-body">
          <div className="container ">
            {/* <div className="row align-items-center m-0">
              <div className="col p-1 form_group mb-3">
                <p className="input_label">Search by name:</p>
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder={"Search Category"}
                  value={search}
                  name={"category_name"}
                  onChange={(e) => {
                    onSearch(e);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="col p-1 form_group mb-3">
                <p className="input_label">Filter by  Type:</p>
                <div className="select_div">
                  <select
                    name="category"
                    value={categoryTypeFilterValue}
                    id="category"
                    onChange={(e) => {
                      setCategoryTypeFilterValue(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-capitalize form-control nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 text-black-2"
                  >
                    <option value={""}>Select category type</option>
                    {(CateType || []).map((data, i) => {
                      return (
                        <option value={data.value} key={data.id}>
                          {data.value}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col px-1 form_group mt-4 text-right">
                <div className="float-md-right">
                  <CustomButton
                    className="font-size-3 rounded-3 btn btn-primary border-0 mr-3"
                    onClick={() => editJobCategory("0")}
                    title="Add Category"
                  >
                    Add Category
                  </CustomButton>
                  <CustomButton
                    className="font-size-3 rounded-3 btn btn-primary border-0"
                    onClick={() => addJobCategoryType("0")}
                    title="Add Category"
                  >
                    Add Category Type
                  </CustomButton>
                </div>
              </div>
            </div>
            <small className="text-danger">{searcherror}</small> */}
            <div className="row">
              <div className="col-6 mb-18">
                <h3 className="font-size-5 mb-0">Candidate's Notes</h3>
                <div>
                  <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5 ">
                    <div className="table-responsive main_table_div">
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <table className="table table-striped main_data_table text-capitalize ">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="border-0 font-size-4 font-weight-normal"
                              >
                                <Link
                                  to={""}
                                  onClick={() => {
                                    handleSort("category_name");
                                    setCurrentPage(1);
                                  }}
                                  className="text-gray"
                                  title="Sort by Name"
                                >
                                  Name
                                </Link>
                              </th>
                              <th
                                scope="col"
                                className=" border-0 font-size-4 font-weight-normal"
                              >
                                <Link
                                  to={""}
                                  onClick={() => {
                                    handleSort("category_type");
                                    setCurrentPage(1);
                                  }}
                                  className="text-gray"
                                  title="Sort by Type"
                                >
                                  Category Type
                                </Link>
                              </th>
                              <th
                                scope="col"
                                className=" border-0 font-size-4 font-weight-normal"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Map function to show the data in the list*/}
                            {totalData === 0 || categoryData.length === 0 ? (
                              <tr>
                                <th className="bg-white"></th>
                                <th className="bg-white text-center">
                                  No Data Found
                                </th>
                                <th className="bg-white"></th>
                              </tr>
                            ) : (
                              (categoryData || []).map((catdata) => (
                                <tr
                                  className="text-capitalize"
                                  key={catdata.job_category_id}
                                >
                                  <th scope="row" className="py-5 ">
                                    <div className="font-size-3 mb-0 font-weight-semibold text-black-2">
                                      {catdata.category_name}
                                    </div>
                                  </th>
                                  <th className=" py-5">
                                    <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                      {catdata.parent_type}
                                    </h3>
                                  </th>
                                  <th className="py-5 min-width-px-100">
                                    <div
                                      className="btn-group button_group"
                                      role="group"
                                    >
                                      <button
                                        className="btn btn-outline-info action_btn"
                                        onClick={() => editJobCategory(catdata)}
                                        title="Edit Category"
                                      >
                                        <span className="text-gray">
                                          <LiaEdit />
                                        </span>
                                        {/* <span className=" fas fa-edit text-gray"></span> */}
                                      </button>
                                      <button
                                        className="btn btn-outline-info action_btn"
                                        onClick={() => ShowDeleteAlert(catdata)}
                                        title="Delete"
                                      >
                                        <span className=" text-danger">
                                          <RiDeleteBin5Line />
                                          {/* <i className="fa fa-trash"></i> */}
                                        </span>
                                      </button>
                                    </div>
                                  </th>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                  {/* <!-- Pagination- --> */}
                  <div className="pt-2">
                    <Pagination
                      nPages={nPages}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      total={totalData}
                      count={categoryData.length}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 mb-18">
                <h3 className="font-size-5 mb-0">Company Notes</h3>
                <div>
                  <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5 d-flex  justify-content-between ">
                    <div className="table-responsive main_table_div">
                      {isLoading2 ? (
                        <Loader />
                      ) : (
                        <table className="table table-striped main_data_table text-capitalize">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className=" border-0 font-size-4 font-weight-normal text-gray"
                              >
                                Category Type
                              </th>
                              <th
                                scope="col"
                                className=" border-0 font-size-4 font-weight-normal"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Map function to show the data in the list*/}
                            {TypetotalData === 0 ||
                            categoryTypeData.length === 0 ? (
                              <tr>
                                <th className="bg-white text-center">
                                  No Data Found
                                </th>
                                <th className="bg-white"></th>
                              </tr>
                            ) : (
                              (categoryTypeData || []).map((catdata) => (
                                <tr className="" key={catdata.job_category_id}>
                                  <th className=" py-5">
                                    <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 ">
                                      {catdata.category_type}
                                    </h3>
                                  </th>
                                  <th className="py-5 min-width-px-100">
                                    <div
                                      className="btn-group button_group"
                                      role="group"
                                    >
                                      <button
                                        className="btn btn-outline-info action_btn"
                                        onClick={() =>
                                          editJobCategoryType(catdata)
                                        }
                                        title="Edit Category"
                                      >
                                        <span className="text-gray">
                                          <LiaEdit />
                                        </span>
                                        {/* <span className=" fas fa-edit text-gray"></span> */}
                                      </button>
                                    </div>
                                  </th>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                  {/* <!-- Pagination- --> */}
                  <div className="pt-2">
                    <Pagination
                      nPages={TypenPages}
                      currentPage={TypecurrentPage}
                      setCurrentPage={setTypeCurrentPage}
                      total={TypetotalData}
                      count={categoryTypeData.length}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Delete Sweet Alert- --> */}
          {/* <SAlert
            show={deleteAlert}
            title={deleteName}
            text="Are you Sure you want to delete !"
            onConfirm={() => deleteCategory(deleteId)}
            showCancelButton={true}
            onCancel={CancelDelete}
          /> */}
        </div>
      </div>
      ;
    </>
  );
}

export default Notes;
