import React from "react";

const MessageList = ({ data }) => {
  return (
    <div>
      <div className="chat-messages">
        {data.length === 0 ? (
          <div key={message.id} className="message">
            <p>No Data Found</p>
          </div>
        ) : (
          data.map((message) => (
            <div key={message.id} className="message">
              <p>{message.subject_description}</p>
              <p>Assigned to: {message.assigned_to}</p>
              <p>Created on: {message.created_on}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageList;
