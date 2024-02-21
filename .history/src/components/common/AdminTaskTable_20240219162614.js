import React, { useState, useEffect } from "react";
import Loader from "./loader";
import { Link } from "react-router-dom";
import { GetCommentsAndAssign } from "../../api/api";
export default function AdminTaskTable(props) {
  const [taskData, setTaskData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskStatus, setTaskStatus] = useState("");
  const [columnName, setcolumnName] = useState("");
  const [sortOrder, setSortOrder] = useState("ASC");
  /*Pagination states */

  const [totalData, setTotalData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  let adminEmail = localStorage.getItem("admin_id");
  // Generate a list of admin;s task
  const getCommentsList = async () => {
    try {
      let res = await GetCommentsAndAssign(
        "",
        adminEmail,
        taskStatus,
        "document",
        currentPage,
        recordsPerPage,
        sortOrder,
        columnName,
        props.filter_by_time
      );
      console.log(res);
      if (res.data.status === (1 || "1")) {
        setTaskData(res.data.data.data);
        setIsLoading(false);
        setTotalData(res.data.data.total_rows);
      } else if (res.data.message === "Task data not found") {
        setIsLoading(false);
        setTaskData([]);
        setTotalData(0);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCommentsList();
  }, [taskStatus]);
  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
  };
  return (
    <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 ">
      <div className="table-responsive main_table_div">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="table table-striped main_data_table">
            <thead>
              <tr className="">
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {
                      handleSort("task_creator_user_name");
                      props.setpageNo(1);
                    }}
                    className="text-gray"
                    title="Sort by Assigned By"
                  >
                    Assigned By
                  </Link>
                </th>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {
                      handleSort("assigned_to_name");
                      props.setpageNo(1);
                    }}
                    className="text-gray"
                    title="Sort by Assigned To"
                  >
                    Assigned To
                  </Link>
                </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    onClick={() => {
                      handleSort("subject_description");
                      props.setpageNo(1);
                    }}
                    className="text-gray"
                    title="Sort by Description"
                  >
                    Description
                  </Link>
                </th>
                {/* {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      <Link
                        to={""}
                        onClick={() => {
                          handleSort("type");
                          props.setpageNo(1);
                        }}
                        className="text-gray"
                        title="Sort by Type"
                      >
                        Type
                      </Link>
                    </th>
                  )} */}
                {
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={() => {
                        handleSort("status");
                        props.setpageNo(1);
                      }}
                      className="text-gray"
                      title="Sort by Status"
                    >
                      Status
                    </Link>
                  </th>
                }
                {/* {props.heading === "Dashboard" ? (
                  ""
                ) : (
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      // onClick={() => {
                      //   handleSort("country");
                      //   props.setpageNo(1);
                      // }}
                      className="text-gray"
                      title="Sort by Country"
                    >
                      Country
                    </Link>
                  </th>
                )} */}
                {/* {props.heading === "Dashboard" ? (
                    ""
                  ) : (
                    <th
                      scope="col"
                      className="border-0 font-size-4 font-weight-normal"
                    >
                      Action
                    </th>
                  )} */}
              </tr>
            </thead>
            <tbody>
              {/* Map function to show the data in the list*/}
              {totalData === 0 || taskData.length === 0 ? (
                <tr>
                  <th colSpan={6} className="bg-white text-center">
                    No Data Found
                  </th>
                </tr>
              ) : (
                (taskData || []).map((data) => (
                  <React.Fragment key={data.id}>
                    <tr className="text-capitalize applicant_row">
                      <td className=" py-5">
                        <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {data.task_creator_user_name === null ||
                          data.task_creator_user_name === undefined ||
                          data.task_creator_user_name === "undefined" ||
                          data.task_creator_user_name === "" ||
                          data.task_creator_user_name === "0" ? (
                            <p className="font-size-3  mb-0">N/A</p>
                          ) : (
                            data.task_creator_user_name
                          )}
                        </p>
                      </td>
                      <td className=" py-5">
                        <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {data.assigned_to_name === null ||
                          data.assigned_to_name === undefined ||
                          data.assigned_to_name === "undefined" ||
                          data.assigned_to_name === "" ||
                          data.assigned_to_name === "0" ? (
                            <p className="font-size-3  mb-0">N/A</p>
                          ) : (
                            data.assigned_to_name
                          )}
                        </p>
                      </td>
                      <td className="py-5 ">
                        {data.subject_description === null ||
                        data.subject_description === undefined ||
                        data.subject_description === "undefined" ||
                        data.subject_description === "" ||
                        data.subject_description === "0" ? (
                          <p className="font-size-3  mb-0">N/A</p>
                        ) : (
                          <p className="m-0">
                            <p className="text-gray font-size-2 m-0">
                              {data.subject_description.replace(/@/g, "")}
                            </p>
                          </p>
                        )}
                      </td>

                      {/* {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <td className=" py-5">
                          {data.type === null ? (
                            <p className="font-size-3  mb-0">N/A</p>
                          ) : (
                            <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                              <p className="text-gray font-size-2 m-0">
                                {data.type}
                              </p>
                            </h3>
                          )}
                        </td>
                      )} */}

                      <td className=" py-5">
                        {data.status === null ||
                        data.status === undefined ||
                        data.status === "undefined" ||
                        data.status === "" ? (
                          <p className="font-size-3  mb-0">N/A</p>
                        ) : (
                          <p
                            className="font-size-2 font-weight-normal text-black-2 mb-0 text-truncate"
                            title={
                              data.status === (0 || "0")
                                ? "Pending"
                                : "Completed"
                            }
                          >
                            {data.status === (0 || "0") ? (
                              <span className="p-1 bg-primary-opacity-8 text-white text-center w-100 border rounded-pill">
                                Complete
                              </span>
                            ) : (
                              <span className="p-1 bg-warning text-white text-center w-100 border rounded-pill">
                                Pending
                              </span>
                            )}
                          </p>
                        )}
                      </td>

                      {/* {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <td className=" py-5">
                          {(data.city === null ||
                            data.city === undefined ||
                            data.city === "undefined" ||
                            data.city === "") &&
                          (data.state === null ||
                            data.state === undefined ||
                            data.state === "undefined" ||
                            data.state === "") &&
                          (data.country === null ||
                            data.country === undefined ||
                            data.country === "undefined" ||
                            data.country === "") ? (
                            <p className="font-size-3  mb-0">N/A</p>
                          ) : (
                            <p
                              className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate"
                              title={` ${data.city},${data.state},${data.country}`}
                            >
                              {` ${data.city},${data.state},${data.country}`}
                            </p>
                          )}
                        </td>
                      )} */}
                      {/* <td className=" py-5 min-width-px-100">
                          <div
                            className="btn-group button_group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              className="btn btn-outline-info action_btn"
                              onClick={() => {
                                setAgentId(data.id);
                              }}
                              title="Employee's"
                              disabled={data.agent_employee_count === "0" || 0}
                            >
                              <span className="text-gray px-2">
                                <MdFormatListBulletedAdd />
                              </span>
                            </button>
                            <button
                              className="btn btn-outline-info action_btn"
                              onClick={() => props.EditAgent(data.id)}
                              title="Edit Partner"
                            >
                              <span className="text-gray px-2">
                                <LiaUserEditSolid />
                              </span>
                            </button>
                            <button
                              className={
                                props.user === "agent"
                                  ? "d-none"
                                  : "btn btn-outline-info action_btn"
                              }
                              onClick={() => ShowDeleteAlert(data)}
                              title="Delete Partner"
                            >
                              <span className="px-2 text-danger">
                                <RiDeleteBin5Line />
                              </span>
                            </button>
                          </div>
                        </td> */}
                    </tr>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      <div className="pt-2">
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={totalData}
          count={taskData.length}
        />
      </div>
    </div>
  );
}
