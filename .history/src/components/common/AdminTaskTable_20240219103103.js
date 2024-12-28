import React, { useState, useEffect } from "react";
import Loader from "./loader";
import { Link } from "react-router-dom";
export default function AdminTaskTable(props) {
  const [taskData, setTaskData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskStatus, setTaskStatus] = useState("");
  // const [columnName, setcolumnName] = useState(true)

  let adminEmail = localStorage.getItem("admin_email");
  // Generate a list of admin;s task
  const getCommentsList = async () => {
    // if (docId || (docData && docData.find((item) => item.type === docName))) {
    try {
      let res = await GetCommentsAndAssign(
        "",
        adminEmail,
        taskStatus,
        "document"
      );
      console.log(res);
      if (res.data.status === (1 || "1")) {
        // setTaskData(res.data.data.reverse());
        setIsLoading(false);
      } else if (res.data.message === "Task data not found") {
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
    // } else {
    // }
  };
  useEffect(() => {
    getCommentsList();
  }, [taskStatus]);
  /*Sorting Function */
  //   const handleSort = (columnName) => {
  //     setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
  //     setcolumnName(columnName);
  //   };
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
                    //   onClick={() => {
                    //     handleSort("u_id");
                    //     props.setpageNo(1);
                    //   }}
                    className="text-gray"
                    title="Sort by Name"
                  >
                    DN
                  </Link>
                </th>
                <th
                  scope="col"
                  className=" border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    //   onClick={() => {
                    //     handleSort("name");
                    //     props.setpageNo(1);
                    //   }}
                    className="text-gray"
                    title="Sort by Name"
                  >
                    Name
                  </Link>
                </th>
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    to={""}
                    //   onClick={() => {
                    //     handleSort("contact_no");
                    //     props.setpageNo(1);
                    //   }}
                    className="text-gray"
                    title="Sort by Contact"
                  >
                    Contact
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
                {props.heading === "Dashboard" ? (
                  ""
                ) : (
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      // onClick={() => {
                      //   handleSort("address");
                      //   props.setpageNo(1);
                      // }}
                      className="text-gray"
                      title="Sort by Address"
                    >
                      Address
                    </Link>
                  </th>
                )}
                {props.heading === "Dashboard" ? (
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
                )}
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
                          {data.u_id}
                        </p>
                      </td>
                      <td className=" py-5">
                        {/* <Link
                        //   to={`/${data.employee_id}`}
                          // onClick={
                          //   data.name !== null
                          //     ? () => employeeDetails(data.employee_id)
                          //     : null
                          // }
                          title="Employee Details"
                        > */}
                        <div className="d-flex profile_box gx-2">
                          <div className="media  align-items-center">
                            <div className="circle-30 mx-auto overflow-hidden">
                              {data.profile_image === null ? (
                                <img
                                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                  alt=""
                                  className="w-100"
                                />
                              ) : (
                                <img
                                  src={data.profile_image}
                                  alt=""
                                  className="w-100"
                                />
                              )}
                            </div>
                          </div>

                          <div className=" mb-0">
                            {data.name === null ||
                            data.name === undefined ||
                            data.name === "undefined" ||
                            data.name === "" ? (
                              <p className="font-size-3  mb-0">N/A</p>
                            ) : (
                              <p
                                className="m-0 text-black-2 font-weight-bold text-capitalize text-truncate"
                                title={data.name}
                              >
                                {data.name}
                              </p>
                            )}
                            {/* {data.gender || data.marital_status ? (
                                <p className="text-gray font-size-2 m-0 text-capitalize">
                                  {data.gender === "female"
                                    ? "F"
                                    : data.gender === "male"
                                    ? "M"
                                    : "O"}
                                  //Calculation of age from date of birth
                                  (
                                  {data.marital_status ||
                                  data.date_of_birth
                                    ? `${
                                        data.marital_status
                                      },${moment().diff(
                                        data.date_of_birth,
                                        "years"
                                      )} Y`
                                    : null}
                                  )
                                </p>
                              ) : null} */}
                          </div>
                        </div>
                        {/* </Link> */}
                      </td>
                      <td className="py-5 ">
                        {(data.contact_no === null ||
                          data.contact_no === undefined ||
                          data.contact_no === "undefined" ||
                          data.contact_no === "" ||
                          data.contact_no === "0") &&
                        (data.email === null ||
                          data.email === undefined ||
                          data.email === "undefined" ||
                          data.email === "") ? (
                          <p className="font-size-3  mb-0">N/A</p>
                        ) : (
                          <p className="m-0">
                            <Link
                              className="text-dark"
                              to={`tel:${data.contact_no}`}
                            >
                              {data.contact_no === "0"
                                ? ""
                                : `+${data.contact_no}`}
                            </Link>
                            <p className="text-gray font-size-2 m-0">
                              <Link
                                className="text-dark"
                                to={`mailto:${data.email}`}
                              >
                                {data.email}
                              </Link>
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
                      {props.heading === "Dashboard" ? (
                        ""
                      ) : (
                        <td className=" py-5">
                          {data.address === null ||
                          data.address === undefined ||
                          data.address === "undefined" ||
                          data.address === "" ? (
                            <p className="font-size-3  mb-0">N/A</p>
                          ) : (
                            <p
                              className="font-size-3 font-weight-normal text-black-2 mb-0 text-truncate"
                              title={data.address}
                            >
                              {data.address}
                            </p>
                          )}
                        </td>
                      )}
                      {props.heading === "Dashboard" ? (
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
                      )}
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
        {/* <Pagination
          nPages={nPages}
          currentPage={props.pageNo}
          setCurrentPage={props.setpageNo}
          total={totalData}
          count={agenteData.length}
        /> */}
      </div>
    </div>
  );
}
