import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaReplyAll } from "react-icons/fa";
import { Accordion } from "react-bootstrap";
import CommentReplyBox from "./CommentReplyBox";
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
                  //Reply box
                  <CommentReplyBox
                    commentsReplyList={commentsReplyList}
                    replyComment={replyComment}
                    handleInputChange={handleInputChange}
                    filteredEmails={filteredEmails}
                    handleEmailClick={handleEmailClick}
                    handleEmailMouseOver={handleEmailMouseOver}
                    ReplyAnnotation={ReplyAnnotation}
                    setReplyCommentClick={setReplyCommentClick}
                    commentItem={commentItem}
                  />
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
