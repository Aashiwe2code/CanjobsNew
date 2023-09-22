import React, { useEffect, useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import CustomButton from "../common/button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import UserProfile from "../user/profile";
import { GetFilter } from "../../api/api";
// import EmployeeTable from "../common/employeeTable";
// import FilterJson from "../json/filterjson";
function Agent() {
  /*Show modal states */
  let [apiCall, setApiCall] = useState(false);
  let [showAddEAgentModal, setShowAgentMOdal] = useState(false);
  /*data and id states */
  let [employeeId, setemployeeId] = useState();
  /*Filter and search state */
  //   const [experienceFilterValue, setExperienceFilterValue] = useState("");
  //   const [skillFilterValue, setSkillFilterValue] = useState(
  //     /*props ? props.skill : */ ""
  //   );
  const [pageNo, setpageNo] = useState(1);
  const [educationFilterValue, setEducationFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  //   let [SkillList, setSkillList] = useState([]);
  //   let [EducationList, setEducationList] = useState([]);

  /*Function to get thejSon */
  const JsonData = async () => {
    try {
      let Json = await GetFilter();
      if (Json.data.message === "No data found") {
        setSkillList([]);
        setEducationList([]);
      } else {
        setSkillList(Json.data.data.Skill);
        setEducationList(Json.data.data.Education);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*Render method to get the json*/
  useEffect(() => {
    JsonData();
    if ((search === "") === true) {
      setSearchError("");
    }
  }, [skillFilterValue, educationFilterValue]);
  /* Function to show the single data to update Employee*/
  const employeeDetails = (e) => {
    setShowEmployeeProfile(true);
    setemployeeId(e);
  };
  /* Function to show the single data to update Employee*/
  const EdirAgent = (e) => {
    setShowAgentMOdal(true);
    setemployeeId(e);
  };
  /*Function to search the employee */
  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    setpageNo(1);
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
      <div
        className={
          props.skill === null || props.skill === undefined
            ? "site-wrapper overflow-hidden bg-default-2"
            : "site-wrapper overflow-hidden "
        }
      >
        {props.skill === null ||
        props.skill === undefined ||
        Object.keys(props.skill).length === 0 ? (
          <>
            {/* <!-- Header Area --> */}
            <AdminHeader heading={"Manage Applicants"} />
            {/* <!-- navbar- --> */}
            <AdminSidebar heading={"Manage Applicants"} />
          </>
        ) : null}
        <ToastContainer />
        {/* <!--Add Employee Details Modal --> */}
        {showAddEAgentModal ? (
          <AddAgent
            show={showAddEAgentModal}
            employeeId={employeeId}
            apiCall={apiCall}
            setApiCall={setApiCall}
            close={() => setShowAgentMOdal(false)}
          />
        ) : null}
        <div className={"dashboard-main-container mt-16"} id="dashboard-body">
          <div className="container-fluid">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Agent's</h3>
                </div>
                {/* <!-- Employee Search and Filter- --> */}
                <div className="row m-0 align-items-center">
                  <div className={"col p-1 form_group"}>
                    <p className="input_label">Search Agent:</p>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={"Search Agent"}
                      value={search}
                      name={"Agent_name"}
                      onChange={(e) => onSearch(e)}
                    />
                  </div>
                  {/* <div
                    className={
                      props.skill === null || props.skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "col p-1 form_group"
                    }
                  >
                    <p className="input_label">Filter by Experience:</p>
                    <div className="select_div">
                      <select
                        name="experience"
                        value={experienceFilterValue}
                        id="experience"
                        onChange={(e) => {
                          setExperienceFilterValue(e.target.value);
                          setpageNo(1);
                        }}
                        className="text-capitalize form-control"
                      >
                        <option value={""}>Select Experience</option>
                        {(FilterJson.experience || []).map((ex, i) => (
                          <option value={ex} key={i}>
                            {ex}
                            {ex === "fresher" || ex === "Other" ? "" : "Years"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div> */}
                  {/* <div
                    className={
                      props.skill === null || props.skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "col p-1 form_group"
                    }
                  >
                    <p className="input_label">Filter by Skill:</p>
                    <div className="select_div">
                      <select
                        name="skill"
                        value={skillFilterValue}
                        id="Skill"
                        onChange={(e) => {
                          setSkillFilterValue(e.target.value);
                          setpageNo(1);
                        }}
                        className="text-capitalize form-control"
                      >
                        <option value={""}>Select Skill</option>
                        {(SkillList || []).map((data) => {
                          return (
                            <option value={data.value} key={data.id}>
                              {data.value}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div> */}
                  {/* <div
                    className={
                      props.skill === null || props.skill === undefined
                        ? "col p-1 form_group mb-3"
                        : "col p-1 form_group"
                    }
                  >
                    <p className="input_label">Filter by Education:</p>
                    <div className="select_div">
                      <select
                        name="education"
                        value={educationFilterValue}
                        id="education"
                        onChange={(e) => {
                          setEducationFilterValue(e.target.value);
                          setpageNo(1);
                        }}
                        className="text-capitalize form-control"
                      >
                        <option value="" data-display="Product Designer">
                          Select Education
                        </option>
                        {(EducationList || []).map((data) => {
                          return (
                            <option value={data.value} key={data.id}>
                              {data.value}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div> */}

                  <div className="col px-1 form_group mt-4 text-right">
                    <CustomButton
                      className="font-size-3 rounded-3 btn btn-primary border-0"
                      onClick={() => EdirAgent("0")}
                      title="Add Agent"
                    >
                      Add Agent
                    </CustomButton>
                  </div>
                </div>
                <small className="text-danger">{searcherror}</small>
              </div>
              {/* <!-- Employee List Table- --> */}
              <AgentTable
                showEmployeeProfile={showEmployeeProfile}
                employeeDetails={employeeDetails}
                search={search}
                experienceFilterValue={experienceFilterValue}
                educationFilterValue={educationFilterValue}
                skillFilterValue={skillFilterValue}
                apiCall={apiCall}
                setApiCall={setApiCall}
                skill={props.skill}
                job_id={props.job_id}
                self={"no"}
                status={"-1"}
                pageNo={pageNo}
                setpageNo={setpageNo}
                EmployeeCall={props.EmployeeCall}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Agent;
