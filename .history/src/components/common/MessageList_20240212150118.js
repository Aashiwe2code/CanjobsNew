import React from "react";

const MessageList = ({ data }) => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        {data.map((message) => (
          <div key={message.id} className="message">
            <p>{message.subject_description}</p>
            <p>Assigned to: {message.assigned_to}</p>
            <p>Created on: {message.created_on}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
