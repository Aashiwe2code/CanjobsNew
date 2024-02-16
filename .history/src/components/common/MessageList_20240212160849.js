import moment from "moment";
import React from "react";

const MessageList = ({ data }) => {
  return (
    <div className="chat-messages">
      {data.length === 0 ? (
        <div className="message">
          <p>No Data Found</p>
        </div>
      ) : (
        data.map((message) => (
          <div
            key={message.id}
            className={`message ${message.assigned_to ? "received" : "sent"}`}
          >
            <div className="message-content">
              <p className="message-text text-capitalize">
                {message.subject_description}
              </p>

              <div className="message-info">
                {message.assigned_to && (
                  <p className="message-sender">{message.assigned_to}</p>
                )}
                {/* <p className="message-time"> */}
                {/* </p> */}
              </div>
              <div className="message-info">
                <p></p>
                <small className="text-mute">{message.created_on}</small>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;
