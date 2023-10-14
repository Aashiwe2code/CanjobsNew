import React, { useState } from "react";
import EmailList from "./emailList";
import EmailPreview from "./emailPreview";

const MainEmailPage = () => {
  const [emails] = useState([
    { id: 1, subject: "Meeting Reminder", content: "Lorem ipsum..." },
    { id: 2, subject: "Hello from John", content: "Lorem ipsum..." },
    // Add more emails as needed
  ]);

  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
  };

  return (
    <>
      <div
        className={
          userType === "company"
            ? "bg-default-1 pt-9 pb-10 pb-xl-30 pb-13 position-relative overflow-hidden"
            : "site-wrapper overflow-hidden bg-default-2"
        }
      >
        {userType === "company" ? (
          <EmployeeHeader />
        ) : (
          <>
            {/* <!-- Header Area --> */}
            <AdminHeader heading={"Visa status"} />
            {/* <!-- navbar- --> */}
            <AdminSidebar heading={"Visa status"} />
          </>
        )}

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
                  <p className="input_label">Filter by Visa Country:</p>
                  <div className="select_div">
                    <select
                      name="experience"
                      value={VisaCountryFilter}
                      id="experience"
                      onChange={(e) => {
                        setVisaCountryFilter(e.target.value);
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
                  <p className="input_label">Filter by Visa Status:</p>
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
                      <option value={""}>Select visa status </option>
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
                {/* <div className={userType === "company" ? "d-none"
              :"row m-0 align-items-center"}>
                <div className="col p-1 form_group mb-3">
                  <p className="input_label">Search:</p>
                  <input
                    required
                    type="text"
                    className="form-control w-100"
                    placeholder={"Search Job"}
                    value={search}
                    name={"name"}
                    onChange={(e) => onSearch(e)}
                  />
                  <small className="text-danger">{searcherror}</small>
                </div>
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
                //   search={search}
                //   VisaCountryFilterValue={VisaCountryFilter}
                //   IntrestedFilterValue={IntrestedFilterValue}
                //   VisStatusFilterValue={VisStatusFilterValue}
                apiCall={apiCall}
                setApiCall={setApiCall}
                //   employee_id={EmpId}
                setpageNo={setpageNo}
                pageNo={pageNo}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainEmailPage;
