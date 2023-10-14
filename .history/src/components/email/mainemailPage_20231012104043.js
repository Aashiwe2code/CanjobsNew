import React, { useState, useEffect } from "react";
import EmailList from "./emailList";
import { ToastContainer } from "react-toastify";
import AdminHeader from "../admin/header";
import AdminSidebar from "../admin/sidebar";
import { ReadEmail } from "../../api/api";
const MainEmailPage = () => {
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  /* data and id states */
  const [emailData, setemailData] = useState([]);
  //  let [employeeId, setemployeeId] = useState();
  // let [lmiaStatus, setLmiaStatus] = useState();
  /* Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /* Shorting states */
  //   const [columnName, setcolumnName] = useState("msgno");
  //   const [sortOrder, setSortOrder] = useState("DESC");
  /* Function to get Employee Email data*/
  const EmailData = async () => {
    setIsLoading(true);
    try {
      const userData = await ReadEmail("", currentPage, recordsPerPage, search);
      // // console.log(userData.data)
      if (userData.data.length === 0) {
        setemailData([]);
        setIsLoading(false);
      } else {
        setemailData(userData.data);
        setTotalData(userData.total);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  /*Render function to get the employee data*/
  useEffect(() => {
    EmailData();
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [
    currentPage,
    recordsPerPage,
    search /*, columnName, sortOrder*/,
    apiCall,
  ]);

  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Function to search the employee */
  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    setCurrentPage(1);
    if (inputValue.length > 0) {
      if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
        setSearchError("Company Name cannot start with a number.");
      } else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
        setSearchError("Cannot use special characters.");
      } else {
        setSearchError("");
      }
    } else {
      setSearchError("");
    }
  };
  return (
    <>
      <div className={"site-wrapper overflow-hidden bg-default-2"}>
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Email"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Email"} />

        <ToastContainer />
        <div className={"dashboard-main-container mt-16"} id="dashboard-body">
          <div className="container-fluid">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className={"page___heading"}>
                  <h3 className="font-size-6 mb-0">Emails</h3>
                </div>
                {/* <!-- Employee Search and Filter- --> */}
                {/* <div
                className={
                  userType === "company"
                    ? "d-none"
                    : "row m-0 align-items-center"
                }
              >
                <div className="col p-1 form_group mb-3">
                  <p className="input_label">Search Employee:</p>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder={"Search Employee"}
                    value={search}
                    name={"Employee_name"}
                    onChange={(e) => onSearch(e)}
                  />
                </div>
                <div className="col p-1 form_group mb-3">
                  <p className="input_label">Filter by Email Country:</p>
                  <div className="select_div">
                    <select
                      name="experience"
                      value={EmailCountryFilter}
                      id="experience"
                      onChange={(e) => {
                        setEmailCountryFilter(e.target.value);
                        setEmpId("");
                        setpageNo(1)
                      }}
                      className="text-capitalize form-control"
                    >
                      <option value={""}>Select Country</option>
                      {(FilterJson.location || []).map((item, i) => (
                        <option value={item} key={i}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col p-1 form_group mb-3">
                  <p className="input_label">Filter by Email Status:</p>
                  <div className="select_div">
                    <select
                      name="status"
                      value={VisStatusFilterValue}
                      id="status"
                      onChange={(e) => {
                        setVisStatusFilterValue(e.target.value);
                        setEmpId("");
                        setpageNo(1)
                      }}
                      className="text-capitalize form-control"
                    >
                      <option value={""}>Select Email status </option>
                      <option value={"pending"}>Pending</option>
                      <option value={"approved"}>Approved</option>
                      <option value={"reject"}>Rejected</option>
                      <option value={"experied"}>experied</option>
                      <option value={"cancel"}>Cancel</option>
                    </select>
                  </div>
                </div>
                <div className="col p-1 form_group mb-3">
                  <p className="input_label">Filter by Interested In:</p>
                  <div className="select_div">
                    <select
                      name="intrested_in"
                      value={IntrestedFilterValue}
                      id="intrested_in"
                      onChange={(e) => {
                        setIntrestedFilterValue(e.target.value);
                        setEmpId("");
                        setpageNo(1)
                      }}
                      className="text-capitalize form-control"
                    >
                      <option value="" data-display="Product Designer">
                        Select Interested in
                      </option>
                      {(FilterJson.interested || []).map((data, i) => {
                        return (
                          <option value={data} key={i}>
                            {data}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div> */}
                {/*<-- Job Search and Filter -->*/}
                <div className={"row m-0 align-items-center"}>
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Search:</p>
                    <input
                      required
                      type="text"
                      className="form-control w-100"
                      placeholder={"Search email"}
                      value={search}
                      name={"name"}
                      onChange={(e) => onSearch(e)}
                    />
                    <small className="text-danger">{searcherror}</small>
                  </div>
                  {/* <div className="col p-1 form_group mb-3">
                  <p className="input_label">Company Name:</p>
                  <input
                    required
                    type="text"
                    className="form-control w-100"
                    placeholder={"Company name"}
                    value={company}
                    name={"compnay_name"}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="col p-1 form_group mb-3">
                  <p className="input_label">Filter by Job Category:</p>
                  <div className="select_div">
                    <select
                      name="country"
                      id="country"
                      value={categoryFilterValue}
                      onChange={(e) => setCategoryFilterValue(e.target.value)}
                      className=" form-control"
                    >
                      <option value="">Job Category</option>
                      {(Json.Category || []).map((data) => {
                        return (
                          <option value={data.id} key={data.id}>
                            {data.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col p-1 form_group mb-3">
                  <p className="input_label">Filter by Job Type:</p>
                  <div className="select_div">
                    <select
                      name="country"
                      id="country"
                      value={jobSwapFilterValue}
                      onChange={(e) => {
                        setJobSwapFilterValue(e.target.value);
                      }}
                      className=" form-control"
                    >
                      <option value="">Job Type</option>
                      {(FilterJson.job_type || []).map((job, i) => (
                        <option key={i} value={job}>
                          {job}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col p-1 form_group mb-3">
                  <p className="input_label">Filter by Job Skill:</p>
                  <div className="select_div">
                    <select
                      name="country"
                      id="country"
                      value={skillFilterValue}
                      onChange={(e) => setSkillFilterValue(e.target.value)}
                      className=" form-control"
                    >
                      <option value="">Job Skill</option>
                      {(json.skill || []).map((data) => {
                        return (
                          <option value={data.value} key={data.id}>
                            {data.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col p-1 form_group mb-3">
                  <p className="input_label">Filter by Job Location:</p>
                  <div className="select_div">
                    <select
                      name="country"
                      id="country"
                      value={locationFilterValue}
                      onChange={(e) => setLocationFilterValue(e.target.value)}
                      className=" form-control"
                    >
                      <option value="">Job Location</option>
                      {(FilterJson.location || []).map((data) => {
                        return (
                          <option value={data} key={data}>
                            {data}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div> */}
                </div>
                {/* <small className="text-danger">{searcherror}</small> */}
              </div>
              <EmailList
                apiCall={apiCall}
                setApiCall={setApiCall}
                isLoading={isLoading}
                data={emailData}
                totalData={totalData}
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainEmailPage;
