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
  setApiCall,
  emailType,
  setEmailType,
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
        <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-8 px-2 row m-0 p-5 ">
          <div
            className="btn-group mb-5 "
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className={
                emailType === "sent"
                  ? "btn btn-primary"
                  : "btn btn-outline-primary"
              }
              onClick={() => setEmailType("sent")}
            >
              Sent
            </button>
            <button
              type="button"
              className={
                emailType === "rec"
                  ? "btn btn-primary"
                  : "btn btn-outline-primary"
              }
              onClick={() => setEmailType("rec")}
            >
              Inbox
            </button>
          </div>
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
                          className="text-gray"
                          title="Sort by Contact"
                        >
                          Sender
                        </Link>
                      </th>
                      <th
                        scope="col"
                        className="border-0 font-size-4 font-weight-normal"
                      >
                        <Link
                          to={""}
                          className="text-gray"
                          title="Sort by interested in"
                        >
                          Date
                        </Link>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {totalData === 0 || data.length === 0 ? (
                      <tr>
                        <th colSpan={3} className="bg-white text-center">
                          No Data Found
                        </th>
                      </tr>
                    ) : (
                      data.map((email, i) => (
                        <tr className="applicant_row" key={i}>
                          <td className="py-5 ">
                            {email.subject === null ? (
                              <p className="font-size-3 mb-0">N/A</p>
                            ) : (
                              <Link
                                title="Emil Preview"
                                onClick={() => {
                                  setEmailId(email.msgno);
                                  setApiCall(true);
                                }}
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
                                    {email.seen === "1" || email.seen === 1 ? (
                                      email.sender
                                    ) : (
                                      <b>{email.sender}</b>
                                    )}
                                  </Link>
                                </p>
                              </h3>
                            )}
                          </td>
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
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </>
            )}
            <div className="pt-2 mx-23">
              <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                total={totalData}
                count={data.length}
              />
            </div>
          </div>
          <div className="table-responsive main_table_div col-md-6">
            {emailId && <PreviewEmail id={emailId} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailList;
