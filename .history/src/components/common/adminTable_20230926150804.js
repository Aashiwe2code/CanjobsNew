import React from "react";
import { Link } from "react-router-dom";
import { LiaUserEditSolid } from "react-icons/lia";
import { RiDeleteBin5Line } from "react-icons/ri";
import Pagination from "./pagination";
import Loader from "./loader";
import { ReassignJobTOManager } from "../../api/api";
import { toast } from "react-toastify";
export default function AdminTable({
  data,
  isLoading,
  handleSort,
  editAdmin,
  ShowDeleteAlert,
  nPages,
  currentPage,
  setCurrentPage,
  totalData,
  page,
  OnManagerDetailClick,
  setAddTeamListShow,
  setApiCall,
  jobId,
}) {
  /*FUnction to reasign job to manager */
  const OnReasignManagerToJobClick = async (e) => {
    try {
      let Response = await ReassignJobTOManager(e, jobId);
      if (Response.message === "successfully") {
        toast.success("Job assigned successfully", {
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
    <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
      <div className="table-responsive main_table_div">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="table table-striped main_data_table">
            <thead>
              <tr>
                {/* <th></th> */}
                <th
                  scope="col"
                  className="border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    className="text-gray"
                    to={""}
                    onClick={() => handleSort("name")}
                    title="Sort by Name"
                  >
                    Name
                  </Link>
                </th>
                <th
                  scope="col"
                  className="pl-4 border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    className="text-gray"
                    to={""}
                    onClick={() => handleSort("admin_type")}
                    title="Sort by Type"
                  >
                    Type
                  </Link>
                </th>
                <th
                  scope="col"
                  className="pl-4 border-0 font-size-4 font-weight-normal"
                >
                  <Link
                    className="text-gray"
                    to={""}
                    onClick={() => handleSort("email")}
                    title="Sort by Email"
                  >
                    Email
                  </Link>
                </th>
                <th
                  scope="col"
                  className="pl-4 border-0 font-size-4 font-weight-normal"
                >
                  Mobile
                </th>
                <th
                  scope="col"
                  className="pl-4 border-0 font-size-4 font-weight-normal"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {totalData === 0 || data.length === 0 ? (
                <tr>
                  <th className="bg-white"></th>
                  <th className="bg-white"></th>
                  <th className="bg-white text-center">No Data Found</th>
                  <th className="bg-white"></th>
                  <th className="bg-white"></th>
                </tr>
              ) : (
                (data || []).map((admin) => (
                  <tr className="text-capitalize" key={admin.admin_id}>
                    {/* <th>
                      <Link
                        className="text-gray"
                        onClick={
                          page === "admin page" &&
                          admin.admin_type === "manager"
                            ? () => {
                                OnManagerDetailClick(admin);
                                setAddTeamListShow(false);
                              }
                            : null
                        }
                      >
                        <div className="d-flex profile_box gx-2">
                          <div className="media  align-items-center">
                            <div className="circle-36 mx-auto overflow-hidden">
                              {admin.profile_image === null ? (
                                <img
                                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                  alt=""
                                  className="w-100"
                                />
                              ) : (
                                <img
                                  src={admin.profile_image}
                                  alt=""
                                  className="w-100"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </th> */}
                    <th className=" py-5">
                      <Link
                        className="text-gray"
                        onClick={
                          page === "admin page" &&
                          admin.admin_type === "manager"
                            ? () => {
                                OnManagerDetailClick(admin);
                                setAddTeamListShow(false);
                              }
                            : null
                        }
                      >
                        <div className="d-flex profile_box gx-2">
                          <div className="media  align-items-center">
                            <div className="circle-36 mx-auto overflow-hidden">
                              {admin.profile_image === null ? (
                                <img
                                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                  alt=""
                                  className="w-100"
                                />
                              ) : (
                                <img
                                  src={admin.profile_image}
                                  alt=""
                                  className="w-100"
                                />
                              )}
                            </div>
                          </div>
                          <div className=" mb-0">
                            <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                              {admin.name}
                            </p>
                          </div>
                        </div>
                      </Link>
                      {/* <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-capitalize">
                        <Link
                          className="text-gray"
                          onClick={
                            page === "admin page" &&
                            admin.admin_type === "manager"
                              ? () => {
                                  OnManagerDetailClick(admin);
                                  setAddTeamListShow(false);
                                }
                              : null
                          }
                        >
                          {admin.name}
                        </Link>
                      </h3> */}
                    </th>
                    <th className="py-5">
                      <Link
                        className="text-gray"
                        onClick={
                          page === "admin page" &&
                          admin.admin_type === "manager"
                            ? () => {
                                OnManagerDetailClick(admin);
                                setAddTeamListShow(false);
                              }
                            : null
                        }
                      >
                        <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 text-capitalize">
                          {admin.admin_type}
                        </h3>
                      </Link>
                    </th>
                    <th className="py-5 ">
                      <h3 className="font-size-3 font-weight-normal mb-0">
                        <p className="font-size-3 m-0">
                          <Link
                            className="text-dark"
                            to={`mailto:${admin.email}`}
                          >
                            {admin.email}
                          </Link>
                        </p>
                      </h3>
                      {/* </Link> */}
                    </th>
                    <th className="py-5 ">
                      {/* <Link
                        className="text-gray"
                        onClick={
                          page === "admin page" &&
                          admin.admin_type === "manager"
                            ? () => {
                                OnManagerDetailClick(admin);
                                setAddTeamListShow(false);
                              }
                            : null
                        }
                      > */}
                      {admin.contact_no === null ? null : (
                        <Link
                          className="font-weight-normal  font-size-3 text-gray"
                          to={`tel:${admin.contact_no}`}
                        >
                          +{admin.contact_no}
                        </Link>
                      )}
                    </th>
                    <th className="">
                      {page === "admin page" ? (
                        <div
                          className="py-5 min-width-px-100 btn-group button_group"
                          role="group"
                        >
                          <button
                            className="btn btn-outline-info action_btn"
                            onClick={() => editAdmin(admin.admin_id)}
                            title="Edit Admin"
                          >
                            <span className="text-gray">
                              <LiaUserEditSolid />
                            </span>
                            {/* <span className=" fas fa-edit text-gray"></span> */}
                          </button>
                          <button
                            className="btn btn-outline-info action_btn"
                            onClick={() => ShowDeleteAlert(admin)}
                            title="Delete"
                          >
                            <span className=" text-danger">
                              <RiDeleteBin5Line />
                              {/* <i className="fa fa-trash"></i> */}
                            </span>
                          </button>
                        </div>
                      ) : (
                        <div
                          className="text-capitalize"
                          onClick={() =>
                            OnReasignManagerToJobClick(admin.admin_id)
                          }
                        >
                          <input type="checkbox" name="manager" id="manager" />
                        </div>
                      )}
                    </th>
                  </tr>
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
          count={data.length}
        />
      </div>
    </div>
  );
}
