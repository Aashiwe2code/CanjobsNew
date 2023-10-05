import React from "react";

export default function EmployeeNotesTable() {
  /*function to change applicants status */
  const OnStatusChange = async (e) => {
    // e.preventDefault()
    let data = {
      employee_id: eid,
      status: e,
    };
    try {
      let response = await AddEmployeeDetails(data);
      if (response.message === "Employee data updated successfully") {
        toast.success("Employee status changes successfully", {
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
                        handleSort("category_name");
                        setCurrentPage(1);
                      }}
                      className="text-gray"
                      title="Sort by Name"
                    >
                      Name
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    <Link
                      to={""}
                      onClick={() => {
                        handleSort("category_type");
                        setCurrentPage(1);
                      }}
                      className="text-gray"
                      title="Sort by Type"
                    >
                      Category Type
                    </Link>
                  </th>
                  <th
                    scope="col"
                    className=" border-0 font-size-4 font-weight-normal"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Map function to show the data in the list*/}
                {totalData === 0 || categoryData.length === 0 ? (
                  <tr>
                    <th className="bg-white"></th>
                    <th className="bg-white text-center">No Data Found</th>
                    <th className="bg-white"></th>
                  </tr>
                ) : (
                  (categoryData || []).map((data) => (
                    <tr className="text-capitalize" key={data.job_category_id}>
                      <th scope="row" className="py-5 ">
                        <div className="font-size-3 mb-0 font-weight-semibold text-black-2">
                          {data.category_name}
                        </div>
                      </th>
                      <th className=" py-5">
                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                          {data.parent_type}
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
                            onSelect={() => OnStatusChange(data)}
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
          count={categoryData.length}
        />
      </div>
    </div>
  );
}
