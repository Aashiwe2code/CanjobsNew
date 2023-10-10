import React, { useState, useEffect } from "react";
import { getSingleCompanyFollowup, AddCompanyFollowup } from "../../api/api";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { toast } from "react-toastify";
import Pagination from "./pagination";
import { Link } from "react-router-dom";
import Loader from "./loader";
import moment from "moment";
export default function EmployerNotesTable() {
  let [isLoading, setIsLoading] = useState(true);
  let [apiCall, setApiCall] = useState(false);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /* Shorting states */
  const [columnName, setcolumnName] = useState("id");
  const [sortOrder, setSortOrder] = useState("DESC");
  /*Function to get Employee's notes */
  const EmployerNotes = async () => {
    try {
      let res = await getSingleCompanyFollowup(
        "",
        columnName,
        sortOrder,
        currentPage,
        recordsPerPage,
        "1"
      );
      if (res.status === 1) {
        setTotalData(res.data.total_rows);
        setData(res.data.data);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    EmployerNotes();
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [apiCall, sortOrder]);

  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function */
  const handleSort = (columnName) => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    setcolumnName(columnName);
    setCurrentPage(1);
  };
  /*function to change Notes status */
  const OnStatusChange = async (e, value) => {
    // e.preventDefault()
    let data = {
      company_id: value.company_id,
      status: e,
    };
    try {
      let responseData = await AddCompanyFollowup(data);
      if (responseData.message === "follow up updated successfully") {
        toast.success("Followup Updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5 ">
        <div className="table-responsive main_table_div">
          {isLoading ? (
            <Loader />
          ) : (
            <table className="table table-striped main_data_table text-capitalize ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    {" "}
                    <Link
                      to={""}
                      onClick={() => {
                        handleSort("company_id");
                      }}
                      className="text-gray"
                      title="Sort by aadded date"
                    >
                      CID
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={() => {
                        handleSort("ecompany_name");
                      }}
                      className="text-gray"
                      title="Sort by aadded date"
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
                      onClick={() => {
                        handleSort("subject");
                      }}
                      className="text-gray"
                      title="Sort by Subject"
                    >
                      Subject
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={() => {
                        handleSort("created_at");
                      }}
                      className="text-gray"
                      title="Sort by added date"
                    >
                      Date added
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={() => {
                        handleSort("remark");
                      }}
                      className="text-gray"
                      title="Sort by Description"
                    >
                      Description
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className="border-0 font-size-4 font-weight-normal"
                  >
                    status
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Map function to show the data in the list*/}
                {totalData === 0 || data.length === 0 ? (
                  <tr>
                    <th className="bg-white"></th>
                    <th className="bg-white"></th>
                    <th className="bg-white text-center">No Data Found</th>
                    <th className="bg-white"></th>
                  </tr>
                ) : (
                  (data || []).map((data, i) => (
                    <tr className="text-capitalize" key={i}>
                      <th className=" py-5">
                        <p className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {data.company_id}
                        </p>
                      </th>
                      <th className=" py-5">
                        <Link
                          to={`/company_detail`}
                          title="Company Details"
                          onClick={() =>
                            localStorage.setItem(
                              "company_id",
                              empdata.company_id
                            )
                          }
                        >
                          <div className="d-flex profile_box gx-2">
                            <div className="media  align-items-center">
                              <div className="circle-36 mx-auto overflow-hidden">
                                {data.logo === null ? (
                                  <img
                                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                    alt=""
                                    className="w-100"
                                  />
                                ) : (
                                  <img
                                    src={data.logo}
                                    alt=""
                                    className="w-100"
                                  />
                                )}
                              </div>
                            </div>

                            <div className=" mb-0">
                              {data.company_name === null ||
                              data.company_name === undefined ||
                              data.company_name === "undefined" ||
                              data.company_name === "" ? (
                                <p className="font-size-3  mb-0">Unavailable</p>
                              ) : (
                                <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                                  {data.company_name}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      </th>
                      <th scope="row" className="py-5 ">
                        <div className="font-size-3 mb-0 font-weight-semibold text-black-2">
                          {moment(
                            data.created_at,
                            "YYYY-MM-DD HH:mm:ss"
                          ).fromNow()}
                        </div>
                      </th>
                      <th scope="row" className="py-5 ">
                        <div className="font-size-3 mb-0 font-weight-semibold text-black-2">
                          {data.subject}
                        </div>
                      </th>
                      <th className=" py-5">
                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0text-truncate">
                          {data.remark}
                        </h3>
                      </th>
                      <th className="py-5 min-width-px-100 ">
                        <div
                          className="btn-group button_group d-flex"
                          role="group"
                        >
                          <h3 className="font-size-3 font-weight-normal ">
                            overdue:
                          </h3>
                          <DropdownButton
                            as={ButtonGroup}
                            title={data.status === "1" ? "Urgent" : "Complete"}
                            size="sm"
                            className="user_status_btn btn-primary text-white ml-1"
                            onSelect={(e) => OnStatusChange(e, data)}
                          >
                            <Dropdown.Item
                              value={"2"}
                              eventKey={2}
                              className="text-capitalize"
                            >
                              Complete
                            </Dropdown.Item>
                          </DropdownButton>
                        </div>
                      </th>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* <!-- Pagination- --> */}
      <div className="pt-2">
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={totalData}
          count={data.length}
        />
      </div>
    </div>
  );
}
