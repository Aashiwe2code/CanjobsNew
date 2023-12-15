import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaReplyAll } from "react-icons/fa";
import { Accordion } from "react-bootstrap";
export default function CommentBox({
  commentsReplyList,
  docData,
  adminid,
  setAdminId,
  allAdmin,
  annotationStatus,
  setAnnotationStatus,
  commentsList,
  selectedAnnotation,
  setSelectedAnnotation,
  OnHandleUpdateComment,
  determineBackgroundColor,
  setReplyCommentClick,
  replyCommentClick,
  replyComment,
  handleInputChange,
  filteredEmails,
  handleEmailClick,
  handleEmailMouseOver,
  ReplyAnnotation,
}) {
  return (
    <div className="col-md-3 p-0 border-left">
      <div
        style={
          docData.length === 0 ? { display: "none" } : { marginTop: "20px" }
        }
      >
        <div className="row">
          <div className={"col mx-2 form_group"}>
            <p className="input_label">Filter by Admin:</p>
            <div className="select_div">
              <select
                name="admin"
                value={adminid}
                id="admin"
                onChange={(e) => {
                  setAdminId(e.target.value);
                }}
                className="text-capitalize form-control"
              >
                <option value={""}>Select Admin</option>
                {(allAdmin || []).map((data, index) => {
                  return (
                    <option value={data.admin_id} key={index}>
                      {data.name} {data.email}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={"col mx-2 form_group"}>
            <p className="input_label">Filter by Status:</p>
            <div className="select_div">
              <select
                name="status"
                value={annotationStatus}
                id="status"
                onChange={(e) => {
                  setAnnotationStatus(e.target.value);
                }}
                className="text-capitalize form-control"
              >
                <option value={""}>Select Status</option>
                <option value={"1"}>Done </option>
                <option value={"0"}>Pending</option>
              </select>
            </div>
          </div>
        </div>
        <div
          className="d-flex flex-column h-100vh"
          style={{ overflowY: "scroll" }}
        >
          {commentsList.length === 0 ? (
            <div className="text-center mt-5">
              <h5>No comments</h5>
            </div>
          ) : (
            (commentsList || []).map((commentItem, index) => (
              <div
                className={`card m-2 ${
                  selectedAnnotation &&
                  selectedAnnotation.x_axis === commentItem.x_axis &&
                  selectedAnnotation.y_axis === commentItem.y_axis
                    ? "highlighted-comment"
                    : ""
                }`}
                style={{
                  backgroundColor: "#edf2fa",
                  color: "white",
                }}
                onClick={() =>
                  setSelectedAnnotation({
                    x_axis: commentItem.x_axis,
                    y_axis: commentItem.y_axis,
                  })
                }
                key={index}
              >
                <p className="d-flex flex-row-reverse mt-2 mx-3">
                  <span
                    style={{
                      cursor: "pointer",
                      margin: "2px",
                      color: commentItem.status === "0" ? "blue" : "white",
                      borderRadius: "40px",
                      border:
                        commentItem.status === "0" ? "solid 1px blue" : "",
                      padding: "1px 5px",
                      backgroundColor:
                        commentItem.status === "1" && "lightgreen",
                    }}
                    onClick={(e) => {
                      OnHandleUpdateComment(commentItem);
                    }}
                  >
                    &#x2713; {/* Checkmark symbol */}
                  </span>
                </p>
                <div className="card-body">
                  <div className="text-dark h4">
                    <span
                      className={`rounded-circle text-capitalize px-2 mx-2 text-white ${determineBackgroundColor(
                        commentItem
                      )}`}
                    >
                      {commentItem.assined_to_user_id
                        ? allAdmin.find(
                            (item) =>
                              item.admin_id === commentItem.assined_to_user_id
                          )
                          ? allAdmin
                              .find(
                                (item) =>
                                  item.admin_id ===
                                  commentItem.assined_to_user_id
                              )
                              .name.charAt(0)
                          : ""
                        : ""}
                    </span>
                    {commentItem.assined_to_user_id
                      ? allAdmin.find(
                          (item) =>
                            item.admin_id === commentItem.assined_to_user_id
                        )
                        ? allAdmin.find(
                            (item) =>
                              item.admin_id === commentItem.assined_to_user_id
                          ).name
                        : ""
                      : ""}
                    <br />
                    <span className="text-gray-400 h6 mx-8">
                      {moment(commentItem.created_on).format("HH:mm D MMM")}
                    </span>
                  </div>

                  {commentItem.subject_description && (
                    <h5 className="card-title text-break">
                      {commentItem.subject_description}
                    </h5>
                  )}
                  {commentItem.assigned_to && (
                    <div
                      style={{
                        borderRadius: "15px",
                        padding: "5px 10px",
                        margin: "5px 0",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Link
                        className="text-break"
                        to={`mailto:${commentItem.assigned_to}`}
                        style={{ marginLeft: "5px" }}
                      >
                        {`@${commentItem.assigned_to}`}
                      </Link>
                    </div>
                  )}
                </div>
                {replyCommentClick === commentItem.id ? (
                  <>
                    <form className="comment-form x-auto flex-start">
                      <div className="comment-input-container">
                        <input
                          type="text"
                          value={replyComment || ""}
                          onChange={(e) => handleInputChange(e, "reply")}
                          placeholder="Comments or add others with @"
                          className="rounded-pill comment-input"
                        />
                        {filteredEmails.length > 0 && (
                          <ul className="email-suggestions">
                            {filteredEmails.map((email, index) => (
                              <li
                                key={index}
                                onClick={() =>
                                  handleEmailClick(email.email, "reply")
                                }
                                onMouseOver={() =>
                                  handleEmailMouseOver(email.email, "reply")
                                }
                                className="email-suggestion-item text-dark"
                              >
                                <strong>{email.name}</strong> {email.email}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="button-container mb-3">
                        <button
                          type="button"
                          onClick={() => {
                            ReplyAnnotation(commentItem);
                          }}
                          className="btn-sm btn-primary rounded-pill save-comment-btn"
                        >
                          Reply Comment
                        </button>
                        <button
                          className="btn-sm btn-info rounded-pill cancel-btn"
                          onClick={() => setReplyCommentClick()}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                    {/* Display replies only if task_id matches */}
                    <Accordion
                      className="w-100 p-0 m-0 border-0 "
                      defaultActiveKey="1"
                      flush
                    >
                      <Accordion.Item
                        className=" w-100 rounded-6 overflow-hidden border-0 mb-2 h-100vh"
                        style={{ overflowY: "scroll" }}
                        eventKey={commentItem.id} // Assuming commentItem.id is unique
                      >
                        <Accordion.Header className="w-100 m-0 border-0 bg-white accordian_btn_design h5">
                          Replies
                          {/* <span
                                  className={`rounded-circle text-capitalize px-2 mx-2 text-white ${determineBackgroundColor(
                                    replyItem
                                  )}`}
                                >
                                  {replyItem.receiver_name &&
                                    replyItem.receiver_name.charAt(0)}
                                </span>
                                {replyItem.receiver_name}
                                <br />
                                <span
                                  className="text-gray-400 h6 mx-8"
                                  style={{ fontSize: "12px" }}
                                >
                                  {moment(replyItem.created_on).format(
                                    "HH:mm D MMM"
                                  )}
                                </span> */}
                        </Accordion.Header>
                        {(commentsReplyList || []).map(
                          (replyItem, replyIndex) =>
                            // Only render the reply if task_id matches the comment's id
                            replyItem.task_id === commentItem.id && (
                              <Accordion.Body>
                                (
                                <div key={replyIndex}>
                                  {/* Display reply message */}
                                  {replyItem.msg && (
                                    <h5 className=" text-break">
                                      {replyItem.receiver_name}
                                      <br />
                                      {replyItem.msg}
                                    </h5>
                                  )}

                                  {/* Display mention */}
                                  {replyItem.mention && (
                                    <div
                                      style={{
                                        borderRadius: "15px",
                                        // padding: "5px 10px",
                                        // margin: "5px 0",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Link
                                        className="text-break"
                                        to={`mailto:${replyItem.mention}`}
                                        style={{ marginLeft: "5px" }}
                                      >
                                        {`@${replyItem.mention}`}
                                      </Link>
                                    </div>
                                  )}
                                </div>
                                )
                              </Accordion.Body>
                            )
                        )}
                      </Accordion.Item>
                    </Accordion>
                  </>
                ) : (
                  <Link onClick={() => setReplyCommentClick(commentItem.id)}>
                    <FaReplyAll />
                  </Link>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
