import React, { useState, useEffect } from "react";
import { AddFollowup, getSingleFollowup } from "../../api/api";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { toast } from "react-toastify";
import Pagination from "./pagination";
import { Link } from "react-router-dom";
import Loader from "./loader";
export default function EmployeeNotesTable() {
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
  const EmployeeNotes = async () => {
    try {
      let res = await getSingleFollowup(
        "",
        columnName,
        sortOrder
        // props.job_id
      );
      console.log(res);
      if (res.status === 1) {
        setTotalData();
        setData(res.data);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    EmployeeNotes();
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
      employee_id: value.id,
      status: e,
    };
    try {
      let responseData = await AddFollowup(data);
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Map function to show the data in the list*/}
                {/* {totalData === 0 || data.length === 0 ? (
                  <tr>
                    <th className="bg-white"></th>
                    <th className="bg-white text-center">No Data Found</th>
                    <th className="bg-white"></th>
                  </tr>
                ) : (
                  (data || []).map((data) => (
                    <tr className="text-capitalize" key={data.job_category_id}>
                      <th scope="row" className="py-5 ">
                        <div className="font-size-3 mb-0 font-weight-semibold text-black-2">
                          {data.subject}
                        </div>
                      </th>
                      <th className=" py-5">
                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {data.remark}
                        </h3>
                      </th>
                      <th className="py-5 min-width-px-100">
                        <div className="btn-group button_group" role="group">
                          <DropdownButton
                            as={ButtonGroup}
                            title={
                              data.status === "1"
                                ? "Urgent"
                                : data.status === "0"
                                ? "New"
                                : "status"
                            }
                            size="sm"
                            className="user_status_btn btn-primary text-white ml-1"
                            onSelect={(e) => OnStatusChange(e, data)}
                          >
                            <Dropdown.Item
                              value={"0"}
                              eventKey={0}
                              className="text-capitalize"
                            >
                              Complete
                            </Dropdown.Item>
                            <Dropdown.Item
                              value={"1"}
                              eventKey={0}
                              className="text-capitalize"
                            >
                              Urgent
                            </Dropdown.Item>
                          </DropdownButton>
                        </div>
                      </th>
                    </tr>
                  ))
                )} */}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* <!-- Pagination- --> */}
      <div className="pt-2">
        {/* <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={totalData}
          count={data.length}
        /> */}
      </div>
    </div>
  );
}
