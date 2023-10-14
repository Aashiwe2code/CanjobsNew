import React, { useState } from "react";
import Pagination from "../common/pagination";
import Loader from "../common/loader";
import { Link } from "react-router-dom";
import PreviewEmail from "./emailPreview";
const EmailList = ({
  data,
  isLoading,
  totalData,
  setCurrentPage,
  currentPage,
  nPages,
}) => {
  const [emailId, setEmailId] = useState();
  function decodeEmailSubject(encodedSubject) {
    return decodeURIComponent(
      encodedSubject
        .replace(/=\?UTF-8\?Q\?/g, "")
        .replace(/\?=/g, "")
        .replace(/=([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode(parseInt(p1, 16))
        )
    );
  }

  return (
    <div className="emails">
      <div className="email-list">
        <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 row m-0 ">
          <div className="table-responsive main_table_div col-md-6">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <table className="table table-striped main_data_table">
                  <thead>
                    <tr className="">
                      <th
                        scope="col"
                        className=" border-0 font-size-4 font-weight-normal"
                      >
                        <Link
                          to={""}
                          // onClick={() => {
                          //   handleSort("name");
                          //   props.setpageNo(1);
                          // }}
                          className="text-gray"
                          title="Sort by Name"
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
                          // onClick={() => {
                          //   handleSort("contact_no");
                          //   props.setpageNo(1);
                          // }}
                          className="text-gray"
                          title="Sort by Contact"
                        >
                          Sender
                        </Link>
                      </th>

                      {
                        // props.heading === "Dashboard" ? (
                        //   ""
                        // ) :
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            // onClick={() => {
                            //   handleSort("interested_in");
                            //   props.setpageNo(1);
                            // }}
                            className="text-gray"
                            title="Sort by interested in"
                          >
                            Date{" "}
                          </Link>
                        </th>
                      }

                      {/*                     
                    {props.heading === "Dashboard" ||
                    user_type === "company" ? (
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
                    {totalData === 0 || data.length === 0 ? (
                      <tr>
                        <th className="bg-white"></th>
                        {/* {props.heading === "Dashboard" ? (
                        <th className="bg-white text-center">No Data Found</th>
                      ) : (
                        <th className="bg-white"></th>
                      )} */}
                        {/* <th className="bg-white"></th> */}
                        {/* {props.heading === "Dashboard" ? null : ( */}
                        <th className="bg-white text-center">No Data Found</th>
                        {/* )} */}
                        <th className="bg-white"></th>
                        {/* {props.heading !== "Dashboard" ? (
                        <>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th className="bg-white"></th>
                          <th
                            className={
                              user_type === "company" ? "d-none" : "bg-white"
                            }
                          ></th>
                        </>
                      ) : (
                        ""
                      )} */}
                      </tr>
                    ) : (
                      (data || []).map((email, i) => (
                        <React.Fragment key={i}>
                          <tr className="applicant_row" key={i}>
                            <td className="py-5 ">
                              {email.subject === null ? (
                                <p className="font-size-3 mb-0">N/A</p>
                              ) : (
                                <Link
                                  title="Emil Preview"
                                  onClick={() => setEmailId(email.msgno)}
                                >
                                  <p className="m-0 text-truncate">
                                    {email.seen === "1" || email.seen === 1 ? (
                                      email.subject.includes("=?UTF-8?Q?") ? (
                                        decodeEmailSubject(email.subject)
                                      ) : (
                                        email.subject
                                      )
                                    ) : (
                                      <b>
                                        {" "}
                                        {email.subject.includes("=?UTF-8?Q?")
                                          ? decodeEmailSubject(email.subject)
                                          : email.subject}
                                      </b>
                                    )}
                                  </p>
                                </Link>
                              )}
                            </td>

                            {
                              // props.heading === "Dashboard" ? (
                              //   ""
                              // ) :
                              <td className=" py-5">
                                {email.sender === null ? (
                                  <p className="font-size-3  mb-0">N/A</p>
                                ) : (
                                  <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                    <p className="text-gray font-size-2 m-0">
                                      <Link
                                        className="text-dark"
                                        to={`mailto:${email.sender}`}
                                      >
                                        {email.seen === "1" ||
                                        email.seen === 1 ? (
                                          email.sender
                                        ) : (
                                          <b>{email.sender}</b>
                                        )}
                                      </Link>
                                    </p>
                                  </h3>
                                )}
                              </td>
                            }

                            {
                              // props.heading === "Dashboard" ? (
                              //   ""
                              // ) :
                              <td className=" py-5">
                                {email.date === null || email.date === "" ? (
                                  <p className="font-size-2  mb-0">N/A</p>
                                ) : (
                                  <p className=" font-weight-normal text-black-2 font-size-2 mb-0 ">
                                    {email.seen === "1" || email.seen === 1 ? (
                                      email.date
                                    ) : (
                                      <b>{email.date}</b>
                                    )}
                                  </p>
                                )}
                              </td>
                            }
                            {/* <td
                        className={
                          user_type === "company"
                            ? "d-none"
                            : " py-5 min-width-px-100"
                        }
                      >
                        <div
                          className={"btn-group button_group"}
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            className={
                              user_type === "company"
                                ? "d-none"
                                : "btn btn-outline-info action_btn"
                            }
                            onClick={() => editVisa(email)}
                            title="Update Visa status"
                          >
                            <span className="text-gray px-2">
                              <LiaCcVisa />
                            </span>
                          </button>

                          <button
                            className={
                              user_type === "company" ||
                              props.page === "user_profile"
                                ? "d-none"
                                : "btn btn-outline-info action_btn"
                            }
                            onClick={() => AddDoucument(email)}
                            title="Documents"
                          >
                            <span className="text-gray">
                              <GrDocumentUser />
                            </span>
                          </button>
                          <button
                            className={"btn btn-outline-info action_btn"}
                            onClick={() => ShowDeleteAlert(email)}
                            title="Delete"
                          >
                            <span className=" text-danger px-1">
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
              </>
            )}
          </div>
          <div className="col-md-6">
            {console.log(emailId)}
            {emailId ? <PreviewEmail id={emailId} /> : null}
          </div>

          <div className="pt-2 mx-15">
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={totalData}
              count={data.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailList;
