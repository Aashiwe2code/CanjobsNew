import moment from "moment";
import React, { useEffect, useRef } from "react";

const MessageList = ({ data, loginuser }) => {
  // Create a ref for the div element
  const divRef = useRef(null);

  // Function to scroll to the end of the div
  const scrollToBottom = () => {
    if (divRef.current) {
      // Set scrollTop to the scrollHeight to scroll to the end
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  };
  //   Render data
  useEffect(() => {
    scrollToBottom();
  }, [data]);
  console.log(loginuser);
  return (
    <div className="chat-messages bg-light" ref={divRef}>
      {data.length === 0 ? (
        <div className="message">
          <div>No Data Found</div>
        </div>
      ) : (
        data.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.task_creator_user_id === loginuser ? "sent" : "received"
            }`}
          >
            <div className="message-content font-size-3">
              <div className="message-text">{message.subject_description}</div>
              <div className="message-info">
                {message.assigned_to && (
                  <span className="message-sender font-size-3">
                    {message.assigned_to}
                  </span>
                )}
                <small className="text-muted">
                  {moment(message.created_on).format("LLL")}
                </small>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;
