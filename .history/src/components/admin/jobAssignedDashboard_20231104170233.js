import React, { useState, useEffect } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { ToastContainer } from "react-toastify";
import { getallAdminData } from "../../api/api";
import Loader from "../common/loader";
import ManegerBox from "../common/managerBox";
import { Accordion } from "react-bootstrap";
export default function JobAssignedDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [apiCall, setApiCall] = useState(false);
  let [adminData, setAdminData] = useState([]);
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
        "manager",
        search,
        currentPage,
        recordsPerPage,
        columnName,
        sortOrder
      );
      if (userData.data.length === 0) {
        setAdminData([]);
        setTotalData([]);
        setIsLoading(false);
      } else {
        setAdminData(userData.data);
        setTotalData(userData.total_rows);
        // setIsLoading(false);
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
  }, [search, apiCall]);

  /*Function to Search employer */
  const onSearch = (e) => {
    setSearch(e.target.value);
    if (/[^a-zA-Z0-9]/g.test(search)) {
      setSearchError("Cannot use special character");
    } else if (search === "") {
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
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Assigned Job's"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Assigned Job's"} />
        <ToastContainer />
        <div className={"dashboard-main-container mt-16"} id="dashboard-body">
          <div className="container-fluid">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Job Assigned Dashboard</h3>
                </div>
                {/* <!-- Manager Search and Filter --> */}
                <div className="row m-0 align-items-center">
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Search:</p>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={"Manger name"}
                      value={search}
                      name={"admin_type"}
                      onChange={(e) => onSearch(e)}
                      maxLength={30}
                    />
                  </div>
                </div>
                <small className="text-danger">{searcherror}</small>
              </div>
              {isLoading ? (
                <div className="table-responsive main_table_div">
                  <Loader />
                </div>
              ) : (
                <div className="row p-3 w-100 m-0">
                  <Accordion
                    className="w-100 p-0 m-0 border-0"
                    defaultActiveKey="1"
                    flush
                  >
                    {(adminData || []).map((item, index) => {
                      return (
                        <ManegerBox
                          key={index}
                          data={item}
                          allData={adminData}
                          isLoading={isLoading}
                          handleSort={handleSort}
                          nPages={nPages}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          totalData={totalData}
                          setApiCall={setApiCall}
                        />
                      );
                    })}
                  </Accordion>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
