import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { DeleteFilter, GetFilter } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SAlert from "../common/sweetAlert";
import AddFilter from "../forms/admin/FilterForm";
function FilterList() {
  /*States */
  let [apiCall, setApiCall] = useState(false);
  const [filterData, setFilterData] = useState([]);
  /*delete states */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteChildId, setDeleteChildID] = useState();
  const [deleteName, setDeleteName] = useState("");

  /* Function to get the filter data*/
  const FilterData = async () => {
    try {
      let Data = await GetFilter();
      if (
        Data.data.message === "No data found" ||
        Data.data.data.length === 0
      ) {
        setFilterData([]);
      } else {
        setFilterData(Data.data.data);
        setApiCall(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*Render function to get the filter data*/
  useEffect(() => {
    FilterData();
  }, [apiCall]);

  /*To Show the delete alert box */
  const ShowDeleteAlert = (e, f) => {
    setDeleteID(f);
    setDeleteChildID(e.id);
    setDeleteName(e.value);
    setDeleteAlert(true);
  };

  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };
  /*To call Api to delete category */
  async function deleteFilter(e, f) {
    /*Function to delete the filter */
    try {
      const responseData = await DeleteFilter(e, f);
      if (responseData.message === "List item has been deleted") {
        toast.error("Filter deleted Successfully", {
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
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Filter List"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Filter List"} />
        <div>
          <ToastContainer />
        </div>
        <div className="dashboard-main-container mt-16" id="dashboard-body">
          <div className="container-fluid">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Filter</h3>
                </div>
              </div>
              <div className="shadow-8 pt-7 rounded pb-9 px-5 ">
                <div className="row">
                  {/* <!-- Skill Filter List --> */}
                  <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Skill
                        </h4>
                        <AddFilter
                          apiCall={apiCall}
                          setApiCall={setApiCall}
                          id={1}
                        />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Skill || []).map((data, i) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 1)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Industry Filter List --> */}
                  <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Industry
                        </h4>
                        <AddFilter setApiCall={() => setApiCall(true)} id={4} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Industry || []).map((data, i) => (
                              <React.Fragment key={data.id}>
                                <li className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 4)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Education Filter List --> */}
                  <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Education
                        </h4>
                        <AddFilter setApiCall={() => setApiCall(true)} id={5} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Education || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 5)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Corporation Filter List --> */}
                  <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Corporation
                        </h4>
                        <AddFilter setApiCall={() => setApiCall(true)} id={6} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Corporation || []).map((data, i) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 6)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Language Filter List --> */}
                  <div className="col-xl-12 p-0 col-lg-12 col-md-12 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Language
                        </h4>
                        <AddFilter setApiCall={() => setApiCall(true)} id={7} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData.Language || []).map((data) => (
                              <React.Fragment key={data.id}>
                                <li
                                  className="text-capitalize bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                  key={data.id}
                                >
                                  {data.value}
                                  <Link
                                    onClick={() => ShowDeleteAlert(data, 7)}
                                    title="Delete"
                                  >
                                    <i
                                      className="px-3 fa fa-times-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </li>
                              </React.Fragment>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Delete filter sweet alert- --> */}
          <SAlert
            show={deleteAlert}
            title={deleteName}
            text="Are you Sure you want to delete !"
            onConfirm={() => deleteFilter(deleteId, deleteChildId)}
            showCancelButton={true}
            onCancel={CancelDelete}
          />
        </div>
      </div>
      ;
    </>
  );
}

export default FilterList;
