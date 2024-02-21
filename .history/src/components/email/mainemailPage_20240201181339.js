import React, { useState, useEffect } from "react";
import EmailList from "./emailList";
import { ToastContainer } from "react-toastify";
// import AdminHeader from "../admin/header";
// import AdminSidebar from "../admin/sidebar";
import {
  ReadEmail,
  ReadSentEmail /*, GetAllEmailPagination*/,
} from "../../api/api";
const MainEmailPage = ({ email }) => {
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  const [emailType, setEmailType] = useState("SENT");
  /* data and id states */
  const [emailData, setemailData] = useState([]);
  //  let [employeeId, setemployeeId] = useState();
  // let [lmiaStatus, setLmiaStatus] = useState();
  /* Pagination states */
  // const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState("");
  // const [pageToken, setPageToken] = useState([]);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  /* Shorting states */
  //   const [columnName, setcolumnName] = useState("msgno");
  //   const [sortOrder, setSortOrder] = useState("DESC");

  /* Function to get Email data*/
  const EmailData = async () => {
    setIsLoading(true);
    try {
      let userData;
      if (emailType === "SENT") {
        userData = await ReadSentEmail(
          currentPage,
          recordsPerPage,
          search,
          email
        );
      } else
        userData = await ReadEmail(currentPage, recordsPerPage, search, email);
      if (
        // userData.messsage === "No data found" ||
        userData.status === "0" ||
        userData.status === 0 ||
        userData.data.value === undefined ||
        userData.data.value.length === 0 ||
        userData.data.message === "No Mail Data Found"
      ) {
        setemailData([]);
        setIsLoading(false);
        // setTotalData(0);
        // setPageToken([]);
      } else {
        let reversedData = userData.data.value.slice(); // Create a copy of the array
        setemailData(reversedData);
        setIsLoading(false);
        // if (emailType === "SENT") {
        //   reversedData.reverse(); // Reverse the array if emailType is "SENT"
        // }
        // setPageToken([]);
        // setTotalData(0);
        // try {
        //   let PageRes = await GetAllEmailPagination(email);
        //   setPageToken(
        //     PageRes.data.paginationData.map((item) => item.split("=")[4])
        //   );
        //   setTotalData(PageRes.data.paginationDataCount || 0);
        // } catch (err) {
        //   console.log(err);
        // }
        // setPageToken(
        //   userData.data.paginationData &&
        //     userData.data.paginationData.map((item) => item.split("=")[4])
        // );
        // setTotalData(userData.data.paginationDataCount || 0);
      }
    } catch (err) {
      console.log(err);
      setemailData([]);
      // setTotalData(0);
      // setPageToken([]);
      setIsLoading(false);
    }
  };

  /*Render function to get the email data*/
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
    emailType,
  ]);
  // useEffect(() => {
  //   if (recordsPerPage !== emailData.length) {
  //     const handleScroll = () => {
  //       if (
  //         window.innerHeight + document.documentElement.scrollTop ===
  //         document.documentElement.offsetHeight
  //       ) {
  //         // User has scrolled to the bottom
  //         if (recordsPerPage + 10 <= emailData.length) {
  //           setRecordsPerPage(recordsPerPage + 10);
  //         } else {
  //           setRecordsPerPage(emailData.length);
  //         }
  //       }
  //     };

  //     window.addEventListener("scroll", handleScroll);

  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }
  // }, [recordsPerPage, emailData.length]);
  useEffect(() => {
    const handleScroll = () => {
      const targetDiv = document.getElementById("loadMails");
      console.log(targetDiv);
      if (
        targetDiv &&
        targetDiv.scrollTop + targetDiv.clientHeight >= targetDiv.scrollHeight
      ) {
        // User has scrolled to the bottom of the div
        if (recordsPerPage < emailData.length) {
          setRecordsPerPage(recordsPerPage + 10);
        }
      }
    };
    console.log(targetDiv);
    const targetDiv = document.getElementById("loadMails");
    targetDiv.addEventListener("scroll", handleScroll);

    return () => {
      targetDiv.removeEventListener("scroll", handleScroll);
    };
  }, [recordsPerPage, emailData]);

  /*Pagination Calculation */
  // const nPages = Math.ceil(totalData / recordsPerPage);

  /*Function to search the employee */
  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    setCurrentPage(1);
    if (inputValue.length > 0) {
      if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
        setSearchError("Client's Name cannot start with a number.");
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
        {/* <AdminHeader heading={"Email"} /> */}
        {/* <!-- navbar- --> */}
        {/* <AdminSidebar heading={"Email"} /> */}

        <ToastContainer />
        <div
          className={"container-fluid document_container bg-white py-7 px-0"}
          id="dashboard-body"
        >
          <div>
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className={"page___heading"}>
                  <h3 className="font-size-6 mb-0">Emails</h3>
                </div>
                {/* <!-- Email Search and Filter- --> */}
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
                {/*<-- Email Search  -->*/}
                {/* <div className={"row m-0 align-items-center"}>
                  
                  <div className="col p-1 form_group mb-3">
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
                </div>
                </div> */}
                {/* <small className="text-danger">{searcherror}</small> */}
              </div>
              <EmailList
                apiCall={apiCall}
                setApiCall={setApiCall}
                isLoading={isLoading}
                data={emailData}
                // totalData={totalData}
                // nPages={nPages}
                currentPage={currentPage}
                // pageToken={pageToken}
                setCurrentPage={setCurrentPage}
                setEmailType={setEmailType}
                emailType={emailType}
                onSearch={onSearch}
                searcherror={searcherror}
                search={search}
                email={email}
                recordsPerPage={recordsPerPage}
                // setPageToken={setPageToken}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainEmailPage;
