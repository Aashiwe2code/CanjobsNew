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
              <p className="message-text">{message.subject_description}</p>
              <div className="message-info">
                <p className="message-sender">
                  {message.assigned_to ? `From: ${message.assigned_to}` : "You"}
                </p>
                <p className="message-time">{message.created_on}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageList;
