import React, { useState } from "react";
import Pagination from "../common/pagination";
import Loader from "../common/loader";
import { Link } from "react-router-dom";
import PreviewEmail from "./emailPreview";
import SendMailForm from "../forms/user/sendMailForm";
import { BsFillPencilFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import moment from "moment";
// import MailPaination from "./mailPaination";
import { TiAttachment } from "react-icons/ti";
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
  email,
  pageToken,
}) => {
  const [emailId, setEmailId] = useState();
  const [singleEmailData, setSingleEmailData] = useState();
  const [sentEmail, setSentEmail] = useState("no");
  let user_type = localStorage.getItem("userType");

  /*Function to decode the email subject */
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
        <div
          className={`btn-group mb-5 `}
          role="group"
          aria-label="Basic example"
        >
          <div
            className={` ${
              user_type === "user" || user_type === "company" ? "" : "row"
            }`}
          >
            <div
              className={` ${
                user_type === "user" || user_type === "company" ? "" : "col-11"
              }`}
            >
              <button
                type="button"
                className={
                  emailType === "SENT"
                    ? "btn btn-primary"
                    : "btn btn-outline-primary"
                }
                onClick={() => {
                  setEmailType("SENT");
                  setEmailId();
                }}
              >
                Sent
              </button>
              <button
                type="button"
                className={
                  emailType === "INBOX"
                    ? "btn btn-primary"
                    : "btn btn-outline-primary"
                }
                onClick={() => {
                  setEmailType("INBOX");
                  setEmailId();
                }}
              >
                Inbox
              </button>
            </div>
            <div
              className={`${
                user_type === "user" || user_type === "company" ? "d-none" : ""
              } col-1`}
            >
              <button
                type="button"
                className={"btn btn-outline-primary "}
                onClick={() => {
                  sentEmail === "yes"
                    ? setSentEmail("no")
                    : setSentEmail("yes");
                }}
              >
                {sentEmail === "yes" ? (
                  <div>
                    Cancel <ImCross />
                  </div>
                ) : (
                  <div>
                    Compose <BsFillPencilFill />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-8 datatable_div pt-7 rounded pb-8 px-2 row m-0 p-5 ">
          <div className="table-responsive main_table_div col-md-6 ">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <table className="table table-striped main_data_table ">
                  <thead>
                    <tr className="">
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
                            Date
                          </Link>
                        </th>
                      }
                      <th title="Attachment">ATCH</th>
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
                        <th colSpan={4} className="bg-white text-center">
                          No Data Found
                        </th>
                      </tr>
                    ) : (
                      (data || []).map((email, i) => (
                        <React.Fragment key={i}>
                          <tr
                            className={` applicant_row`}
                            key={i}
                            style={
                              emailId === email.Id
                                ? { backgroundColor: "#f0f5f6" }
                                : null
                            }
                          >
                            {
                              // props.heading === "Dashboard" ? (
                              //   ""
                              // ) :
                              <td className=" py-5 text-capitalize">
                                {email.Sender === null ? (
                                  <p className="font-size-3  mb-0">N/A</p>
                                ) : (
                                  <h3 className="font-size-3 font-weight-normal text-black-2 mb-0 ">
                                    <p className="text-gray font-size-2 m-0">
                                      <Link
                                        className="text-dark"
                                        to={`mailto:${email.Sender.EmailAddress.Address}`}
                                      >
                                        {email.IsRead === true ? (
                                          email.Sender.EmailAddress.Name
                                        ) : (
                                          <b>
                                            {email.Sender.EmailAddress.Name}
                                          </b>
                                        )}
                                      </Link>
                                    </p>
                                  </h3>
                                )}
                              </td>
                            }
                            <td className="py-5 text-capitalize">
                              {email.Subject === null ||
                              email.Subject === "" ||
                              email.Subject === undefined ||
                              email.Subject === "undefined" ? (
                                <p className="font-size-3 mb-0">N/A</p>
                              ) : (
                                <Link
                                  title="Emil Preview"
                                  onClick={() => {
                                    setEmailId(email.Id);
                                    setSingleEmailData(email);
                                    setApiCall(true);
                                    setSentEmail("no");
                                  }}
                                >
                                  <p
                                    className="m-0 text-truncate"
                                    style={{ width: "170px" }}
                                  >
                                    {email.IsRead === true ? (
                                      email.Subject.includes("=?UTF-8?Q?") ? (
                                        decodeEmailSubject(email.Subject)
                                      ) : (
                                        email.Subject
                                      )
                                    ) : (
                                      <b>
                                        {email.Subject.includes("=?UTF-8?Q?")
                                          ? decodeEmailSubject(email.Subject)
                                          : email.Subject}
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
                              <td className=" py-5 ">
                                {email.date === null || email.date === "" ? (
                                  <p className="font-size-2  mb-0">N/A</p>
                                ) : (
                                  <p className=" font-weight-normal text-black-2 font-size-2 mb-0 ">
                                    {email.IsRead === true ? (
                                      moment(email.SentDateTime).format(
                                        "DD MMMM, YYYY"
                                      )
                                    ) : (
                                      <b>
                                        {moment(email.SentDateTime).format(
                                          "DD MMMM, YYYY"
                                        )}
                                      </b>
                                    )}
                                  </p>
                                )}
                              </td>
                            }
                            <td>
                              {email.IsRead === true ? (
                                <TiAttachment />
                              ) : (
                                `No Attchment's`
                              )}
                            </td>
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
            <div className="pt-2 mx-23">
              <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                total={totalData}
                count={data.length}
              />
              {/* <MailPaination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                total={totalData}
                count={data.length}
                pageToken={pageToken}
              /> */}
            </div>
          </div>
          <div className="table-responsive main_table_div col-md-6">
            {sentEmail === "yes" ? (
              <div>
                <h5 className="px-3">Send Email to User</h5>
                <div className="p-10">
                  <SendMailForm email={email} setApiCall={setApiCall} />
                </div>
              </div>
            ) : (
              emailId && (
                <PreviewEmail
                  id={emailId}
                  emailType={emailType}
                  singleEmailData={singleEmailData}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailList;
