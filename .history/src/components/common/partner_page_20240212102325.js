import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import SAlert from "../common/sweetAlert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../common/pagination";
import Loader from "../common/loader";
import { LiaUserEditSolid } from "react-icons/lia";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GetAgent, DeleteAgent } from "../../api/api";
import { MdFormatListBulletedAdd } from "react-icons/md";
import AgentsEmployee from "./AgentEmployee";
export default function PartnerPage(props) {
  /*Show modal states */
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [AgentId, setAgentId] = useState(
    props.user === "agent" ? localStorage.getItem("agent_id") : ""
  );
  /*data and id states */
  const [agenteData, setAgentData] = useState([]);
  /*delete state */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
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
        props.user === "agent" ? AgentId : "",
        props.search,
        props.pageNo,
        recordsPerPage,
        columnName,
        sortOrder
      );
      if (userData.data.data === undefined || userData.data.data.length === 0) {
        setAgentData([]);
        setIsLoading(false);
        setTotalData(0);
      } else {
        setAgentData(userData.data.data);
        setTotalData(userData.data.total_rows);
        // setAgentId(userData.data.data[0].id);
        //Condition to get the Employee of Agent id
        const filteredItems = userData.data.data.filter(
          (item) => item.agent_employee_count > 0
        );
        if (filteredItems.length === 0) {
          setAgentId();
        } else {
          // setAgentId 4: Get the First Item
          setAgentId(filteredItems[0].id);
        }
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
      if (props.user === "agent") {
        setAgentId(localStorage.getItem("agent_id"));
      } else {
        setAgentId("");
      }
    }
  }, [
    props.search,
    props.pageNo,
    recordsPerPage,
    columnName,
    sortOrder,
    props.apiCall,
    apiCall,
  ]);
  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.id);
    setDeleteName(e.name);
    setDeleteAlert(true);
  };

  //   /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };

  /*Function to open add Document up modal */
  // const AddDoucument = (e) => {
  //   setDocumentModal(true);
  //   setemployeeId(e);
  // };
  // /*
  /*To call Api to delete employee */
  async function OnDeleteAgent(e) {
    try {
      const responseData = await DeleteAgent(e);
      if (responseData.message === "successfully") {
        toast.error("Partner deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setDeleteAlert(false);
        setApiCall(true);
        props.setApiCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  // const handleSort = (columnName) => {
  //   setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
  //   setcolumnName(columnName);
  // };

  return (
    <>
      <div className="bg-white rounded p-4">
        <div className="table-responsive main_table_div">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {(agenteData || []).map((data) => (
                <div className="rounded bg-light p-4 mb-1">
                  <div
                    className="d-flex align-items-center position-relative"
                    key={data.id}
                  >
                    {data.profile_image === null ? (
                      <img
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                        alt="UserName"
                        className="rounded"
                        width="90px"
                        height="90px"
                      />
                    ) : (
                      <img
                        src={data.profile_image}
                        className="rounded"
                        alt={data.name}
                        width="90px"
                        height="90px"
                      />
                    )}
                    <div className="ml-5 w-100">
                      <h5 className="mb-0 text-capitalize line-height-1 text-break">
                        {data.name === null ||
                        data.name === undefined ||
                        data.name === "undefined" ||
                        data.name === ""
                          ? "N/A"
                          : data.name}
                      </h5>
                      <hr className="my-3" />
                      <div className="m-0 age_gender d-flex align-items-center">
                        <span className="bg-secondary rounded-pill font-size-3 px-3 py-2 text-white mr-2">
                          {data.u_id}
                        </span>
                        <span className="bg-info rounded-pill font-size-3 px-3 py-2 text-white mr-2">
                          {data.contact_no}
                        </span>
                        <span className="bg-warning rounded-pill font-size-3 px-3 py-2 text-white mr-2">
                          {data.email}
                        </span>
                        <span className="bg-primary rounded-pill font-size-3 px-3 py-2 text-white mr-2">
                          {` ${data.city},${data.state},${data.country}`}
                        </span>
                      </div>
                    </div>
                    <div className="partner_action_div ml-5 ">
                      <button
                        className="font-size-3 text-break btn btn-outline-secondary btn-rounded px-4 action_btn m-1"
                        onClick={() => {
                          setAgentId(data.id);
                        }}
                        title="View Employees"
                        disabled={data.agent_employee_count === "0" || 0}
                      >
                        <MdFormatListBulletedAdd /> {"View Employees"}
                        {/* <i className="fa fa-list"></i> */}
                      </button>
                      <button
                        className="font-size-3 text-break btn btn-outline-secondary btn-rounded px-4 action_btn m-1"
                        onClick={() => props.EditAgent(data.id)}
                        title="Edit Partner"
                      >
                        <LiaUserEditSolid /> {"Edit Partner"}
                      </button>
                      <button
                        className={
                          props.user === "agent"
                            ? "d-none"
                            : "font-size-3 text-break btn btn-outline-secondary btn-rounded px-4 action_btn m-1"
                        }
                        onClick={() => ShowDeleteAlert(data)}
                        title="Delete Partner"
                      >
                        <RiDeleteBin5Line /> {"Delete Partner"}
                      </button>
                    </div>
                  </div>
                  {data.id === AgentId &&
                  data.agent_employee_count !== (0 || "0") ? (
                    <>
                      {/* <!-- Agent by emmployee --> */}
                      <AgentsEmployee
                        Agentid={AgentId}
                        apiCall={apiCall}
                        setApiCall={setApiCall}
                        heading={"Manage Partner"}
                      />
                    </>
                  ) : null}
                </div>
              ))}
            </>
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
      <SAlert
        show={deleteAlert}
        title={deleteName}
        text="Are you Sure you want to delete !"
        onConfirm={() => OnDeleteAgent(deleteId)}
        showCancelButton={true}
        onCancel={CancelDelete}
      />
    </>
  );
}
