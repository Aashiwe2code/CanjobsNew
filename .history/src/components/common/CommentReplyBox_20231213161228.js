import React from "react";

export default function CommentReplyBox({
  commentsReplyList,
  commentItem,
  replyComment,
  handleInputChange,
  filteredEmails,
  handleEmailClick,
  handleEmailMouseOver,
  ReplyAnnotation,
  setReplyCommentClick,
}) {
  return (
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
                  onClick={() => handleEmailClick(email.email, "reply")}
                  onMouseOver={() => handleEmailMouseOver(email.email, "reply")}
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
        style={{ overflowY: "scroll" }}
        defaultActiveKey="1"
        flush
      >
        <Accordion.Item
          className=" w-100 rounded-6 overflow-hidden border-0 mb-2 "
          eventKey={commentItem.id} // Assuming commentItem.id is unique
        >
          <Accordion.Header className="accordian_btn_design w-100 m-0 border-0 bg-white h5">
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
          <Accordion.Body>
            {(commentsReplyList || []).map(
              (replyItem, replyIndex) =>
                // Only render the reply if task_id matches the comment's id
                replyItem.task_id === commentItem.id && (
                  <div key={replyIndex}>
                    {/* Display reply message */}
                    {replyItem.msg && (
                      <>
                        <h6 className=" text-break">
                          {replyItem.receiver_name}
                        </h6>
                        <p>{replyItem.msg}</p>
                      </>
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
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
