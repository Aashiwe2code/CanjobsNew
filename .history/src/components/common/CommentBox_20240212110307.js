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
        <div className="row m-0 px-2">
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
        {console.log(selectedAnnotation.x_axis)}
        <div className="row m-0 p-2 flex-column">
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
                {console.log(commentItem.x_axis)}
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
                <div className="card-body p-2">
                  <div className="text-dark">
                    <div className="d-flex profile_box gx-2 mb-1">
                      <div className="media  align-items-center">
                        <div
                          class={`circle-24 mx-auto overflow-hidden text-capitalize text-white ${determineBackgroundColor(
                            commentItem
                          )}`}
                          style={{ fontSize: "20px" }}
                        >
                          {commentItem.task_creator_user_id
                            ? allAdmin.find(
                                (item) =>
                                  item.admin_id ===
                                  commentItem.task_creator_user_id
                              )
                              ? allAdmin
                                  .find(
                                    (item) =>
                                      item.admin_id ===
                                      commentItem.task_creator_user_id
                                  )
                                  .name.charAt(0)
                              : ""
                            : ""}
                        </div>
                      </div>
                      <div class=" mb-0">
                        <div class="font-size-3 font-weight-bold text-capitalize">
                          {commentItem.task_creator_user_id
                            ? allAdmin.find(
                                (item) =>
                                  item.admin_id ===
                                  commentItem.task_creator_user_id
                              )
                              ? allAdmin.find(
                                  (item) =>
                                    item.admin_id ===
                                    commentItem.task_creator_user_id
                                ).name
                              : ""
                            : ""}
                        </div>
                        <div className="text-gray font-size-2 font-weight-normal m-0 text-capitalize">
                          {moment(commentItem.created_on).format("HH:mm D MMM")}
                        </div>
                      </div>
                    </div>
                  </div>

                  {commentItem.subject_description && (
                    <span className="card-title text-break text-dark m-0 font-size-3">
                      {commentItem.subject_description.replace(/@ /g, " ")}
                    </span>
                  )}
                  {/* {commentItem.assigned_to && (
                    <span
                      className="text-break font-size-3 text-primary"
                      to={`mailto:${commentItem.assigned_to}`}
                      style={{ marginLeft: "5px" }}
                    >
                      {`${commentItem.assigned_to}`}
                    </span>
                  )} */}
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
                    allAdmin={allAdmin}
                  />
                ) : (
                  <Link
                    className="mx-5 mr-0 ml-auto font-size-3"
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
