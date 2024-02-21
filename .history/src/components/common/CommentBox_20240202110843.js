import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaReplyAll } from "react-icons/fa";
import CommentReplyBox from "./CommentReplyBox";
export default function CommentBox({
  commentsReplyList,
  setAddCommentFlag,
  docData,
  adminid,
  setAdminId,
  allAdmin,
  annotationStatus,
  setAnnotationStatus,
  setFilteredEmails,
  commentsList,
  selectedAnnotation,
  setSelectedAnnotation,
  OnHandleUpdateComment,
  determineBackgroundColor,
  setReplyCommentClick,
  getCommentsReplyList,
  replyCommentClick,
  replyComment,
  handleInputChange,
  filteredEmails,
  handleEmailClick,
  handleEmailMouseOver,
  ReplyAnnotation,
}) {
  return (
    <div>
      <div
        style={
          docData.length === 0 ? { display: "none" } : { marginTop: "0px" }
        }
      >
        <div className="row m-0 px-7">
          <div className={"col mr-2 p-0 form_group"}>
            <p className="input_label">Filter by Admin:</p>
            <div className="select_div">
              <select
                name="admin"
                value={adminid}
                id="admin"
                onChange={(e) => {
                  setAdminId(e.target.value);
                  setAddCommentFlag(false);
                  setFilteredEmails([]);
                }}
                className="text-capitalize form-control"
              >
                <option value={""}>Select Admin</option>
                {(allAdmin || []).map((data, index) => {
                  return (
                    <option value={data.admin_id} key={index}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={"col ml-2 p-0 form_group"}>
            <p className="input_label">Filter by Status:</p>
            <div className="select_div">
              <select
                name="status"
                value={annotationStatus}
                id="status"
                onChange={(e) => {
                  setAnnotationStatus(e.target.value);
                  setAddCommentFlag(false);
                  setFilteredEmails([]);
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
        <div className="row m-0 p-7 flex-column" style={{ overflow: "auto" }}>
          {commentsList.length === 0 ? (
            <div className="col text-center">
              <h5>No comments</h5>
            </div>
          ) : (
            (commentsList || []).map((commentItem, index) => (
              <div
                className={`card col-12 mb-3 p-0 comment_box_card ${
                  selectedAnnotation &&
                  selectedAnnotation.x_axis === commentItem.x_axis &&
                  selectedAnnotation.y_axis === commentItem.y_axis
                    ? "highlighted-comment"
                    : ""
                }`}
                style={{
                  backgroundColor: "#fafafa",
                  color: "white",
                }}
                onClick={() => {
                  setSelectedAnnotation({
                    x_axis: commentItem.x_axis,
                    y_axis: commentItem.y_axis,
                  });
                  setAddCommentFlag(false);
                  setFilteredEmails([]);
                }}
                key={index}
              >
                <span
                  className="comment_status_update"
                  style={{
                    cursor: "pointer",
                    color: commentItem.status === "0" ? "blue" : "white",
                    border: commentItem.status === "0" ? "solid 1px blue" : "",
                    backgroundColor: commentItem.status === "1" && "green",
                  }}
                  onClick={(e) => {
                    OnHandleUpdateComment(commentItem);
                    setFilteredEmails([]);
                    setAddCommentFlag(false);
                  }}
                >
                  &#x2713; {/* Checkmark symbol */}
                </span>
                <div className="card-body p-5">
                  <div className="text-dark h4">
                    <div class="d-flex profile_box gx-2">
                      <div class="media  align-items-center">
                        <div
                          class={`circle-30 mx-auto overflow-hidden text-capitalize text-white ${determineBackgroundColor(
                            commentItem
                          )}`}
                        >
                          {commentItem.assined_to_user_id
                            ? allAdmin.find(
                                (item) =>
                                  item.admin_id ===
                                  commentItem.assined_to_user_id
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
                        </div>
                      </div>
                      <div class=" mb-0">
                        <div class="font-size-4 font-weight-bold text-capitalize">
                          {commentItem.assined_to_user_id
                            ? allAdmin.find(
                                (item) =>
                                  item.admin_id ===
                                  commentItem.assined_to_user_id
                              )
                              ? allAdmin.find(
                                  (item) =>
                                    item.admin_id ===
                                    commentItem.assined_to_user_id
                                ).name
                              : ""
                            : ""}
                        </div>
                        <div class="text-gray font-size-2 font-weight-normal m-0 text-capitalize">
                          {moment(commentItem.created_on).format("HH:mm D MMM")}
                        </div>
                      </div>
                    </div>
                  </div>

                  {commentItem.subject_description && (
                    <p className="card-title text-break m-0 font-size-4">
                      {commentItem.subject_description}
                    </p>
                  )}
                  {commentItem.assigned_to && (
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <Link
                        className="text-break"
                        to={`mailto:${commentItem.assigned_to}`}
                      >
                        {`${commentItem.assigned_to}`}
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
                  <Link
                    className="mx-5 mr-0 ml-auto"
                    onClick={() => {
                      setReplyCommentClick(commentItem.id);
                      getCommentsReplyList();
                      setAddCommentFlag(false);
                      setFilteredEmails([]);
                    }}
                  >
                    Reply <FaReplyAll />
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
