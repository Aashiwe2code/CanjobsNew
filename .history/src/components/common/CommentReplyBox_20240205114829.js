import React from "react";
// import { Link } from "react-router-dom";
import moment from "moment";
export default function CommentReplyBox({
  commentsReplyList,
  commentItem,
  replyComment,
  handleInputChange,
  filteredEmails,
  handleEmailClick,
  handleEmailMouseOver,
  ReplyAnnotation,
}) {
  return (
    <div className="reply_box_container mx-2">
      {/* Display replies only if task_id matches */}
      {(commentsReplyList || []).map(
        (replyItem, replyIndex) =>
          // Only render the reply if task_id matches the comment's id
          replyItem.task_id === commentItem.id && (
            <div key={replyIndex}>
              {/* Display reply message */}
              {
                <div className="p-2 bg-white rounded mb-1">
                  <div className="d-flex justify-content-between align-items-center text-dark">
                    <h6 className="font-size-3 text-break m-0 text-capitalize">
                      {replyItem.receiver_name}
                      {replyItem.task_creator_user_id
                        ? allAdmin.find(
                            (item) =>
                              item.admin_id === replyItem.task_creator_user_id
                          ).name
                          ? allAdmin.find(
                              (item) =>
                                item.admin_id === replyItem.task_creator_user_id
                            ).name
                          : ""
                        : ""}
                    </h6>
                    <i className="font-size-2">
                      {moment(replyItem.updated_at).format("HH:mm D MMM")}
                    </i>
                  </div>
                  {replyItem.msg && (
                    <span className="m-0 font-size-3 text-dark">
                      {replyItem.msg}
                    </span>
                  )}
                  {/* Display mention */}
                  {replyItem.mention && (
                    <span
                      className="text-break text-primary font-size-3"
                      to={`mailto:${replyItem.mention}`}
                      style={{ marginLeft: "5px" }}
                    >
                      {`${replyItem.mention}`}
                    </span>
                  )}
                </div>
              }
            </div>
          )
      )}
      <form
        className="comment-form x-auto flex-start"
        onSubmit={(e) => {
          e.preventDefault();
          ReplyAnnotation(commentItem);
        }}
      >
        <div className="comment-input-container rounded">
          <div className="reply_box position-relative">
            <input
              type="text"
              value={replyComment || ""}
              onChange={(e) => handleInputChange(e, "reply")}
              placeholder="Comments or add others with @"
              className="comment-input"
              onSubmit={() => {
                ReplyAnnotation(commentItem);
              }}
            />
            <button
              type="button"
              onClick={() => {
                ReplyAnnotation(commentItem);
              }}
              className="btn btn-primary border-0 rounded reply_btn"
            >
              {">>"}
            </button>
            {/* <a
              className="border-0 bg-white rounded cancel-btn text-dark"
              onClick={() => setReplyCommentClick()}
              type="button"
            >
              cancel
            </a> */}
          </div>
          {filteredEmails.length > 0 && (
            <ul
              className="email-suggestions overflow-scroll"
              style={{
                height: "300px",
              }}
            >
              {filteredEmails.map((email, index) => (
                <li
                  key={index}
                  onClick={() => handleEmailClick(email.email, "reply")}
                  onMouseOver={() => handleEmailMouseOver(email.email, "reply")}
                  className="email-suggestion-item text-dark"
                >
                  <strong>{email.name}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
}
