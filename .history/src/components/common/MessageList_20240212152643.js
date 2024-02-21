import moment from "moment";
import React from "react";

const MessageList = ({ data }) => {
  return (
    <div>
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
                <div className="message-info">
                  <p className="message-text text-capitalize">
                    {message.subject_description}
                  </p>
                  <p className="message-time">
                    {moment(message.created_on).fromNow()}
                  </p>
                </div>
                <div className="message-info">
                  {message.assigned_to && (
                    <p className="message-sender">{message.assigned_to}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageList;
