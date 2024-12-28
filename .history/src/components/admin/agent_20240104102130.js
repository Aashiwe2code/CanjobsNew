import React, { useState } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import CustomButton from "../common/button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAgent from "../forms/admin/addAgent";
// import { GetFilter } from "../../api/api";
import AgentTable from "../common/agentTable";
// import FilterJson from "../json/filterjson";
function Agent() {
  /*Show modal states */
  let [apiCall, setApiCall] = useState(false);
  let [showAddEAgentModal, setShowAgentMOdal] = useState(false);
  /*data and id states */
  let [agentId, setAgentId] = useState();
  /*Filter and search state */
  //   const [experienceFilterValue, setExperienceFilterValue] = useState("");
  //   const [skillFilterValue, setSkillFilterValue] = useState(
  //     /*props ? props.skill : */ ""
  //   );
  const [pageNo, setpageNo] = useState(1);
  //   const [educationFilterValue, setEducationFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  //   let [SkillList, setSkillList] = useState([]);
  //   let [EducationList, setEducationList] = useState([]);
  let user_type = localStorage.getItem("userType");
  /*Function to get thejSon */
  //   const JsonData = async () => {
  //     try {
  //       let Json = await GetFilter();
  //       if (Json.data.message === "No data found") {
  //         setSkillList([]);
  //         setEducationList([]);
  //       } else {
  //         setSkillList(Json.data.data.Skill);
  //         setEducationList(Json.data.data.Education);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  /*Render method to get the json*/
  //   useEffect(() => {
  //     JsonData();
  //     if ((search === "") === true) {
  //       setSearchError("");
  //     }
  //   }, [skillFilterValue, educationFilterValue]);

  /* Function to show the single data to update Employee*/
  const EditAgent = (e) => {
    setShowAgentMOdal(true);
    setAgentId(e);
  };
  /*Function to search the agent */
  const onSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    // setpageNo(1);
    if (inputValue.length > 0) {
      if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
        setSearchError("Partner Name cannot start with a number.");
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
        <AdminHeader
          heading={user_type === "agent" ? "Profile" : "Manage Partner"}
        />
        {/* <!-- navbar- --> */}
        <AdminSidebar
          heading={user_type === "agent" ? "Profile" : "Manage Partner"}
        />
        <ToastContainer />
        {/* <!--Add Adgent Details Modal --> */}

        <div className={"dashboard-main-container mt-16"} id="dashboard-body">
          <div className="container-fluid">
            <div className="mb-18">
              <div
                className={
                  user_type === "agent" ? "d-none" : "mb-4 align-items-center"
                }
              >
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Partner's</h3>
                </div>
                {/* <!-- Agent Search and Filter- --> */}
                <div className="row m-0 align-items-center">
                  <div className={"col p-1 form_group"}>
                    <p className="input_label">Search Partner:</p>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={"Search Partner"}
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
                      onClick={() => EditAgent("0")}
                      title="Add Partner"
                    >
                      Add Partner
                    </CustomButton>
                  </div>
                </div>
                <small className="text-danger">{searcherror}</small>
              </div>
              {/* <!-- Agent List Table- --> */}
              <AgentTable
                // showEmployeeProfile={showEmployeeProfile}
                // employeeDetails={employeeDetails}
                search={search}
                // experienceFilterValue={experienceFilterValue}
                // educationFilterValue={educationFilterValue}
                // skillFilterValue={skillFilterValue}
                apiCall={apiCall}
                setApiCall={setApiCall}
                pageNo={pageNo}
                setpageNo={setpageNo}
                EditAgent={EditAgent}
              />
              {showAddEAgentModal ? (
                <AddAgent
                  show={showAddEAgentModal}
                  agentId={agentId}
                  apiCall={apiCall}
                  setApiCall={setApiCall}
                  close={() => setShowAgentMOdal(false)}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Agent;
