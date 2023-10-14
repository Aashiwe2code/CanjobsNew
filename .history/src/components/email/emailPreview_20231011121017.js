import React from "react";

const EmailPreview = ({ selectedEmail }) => {
  return (
    <div className="email-preview">
      {selectedEmail ? (
        <>
          <h2>{selectedEmail.subject}</h2>
          <p>{selectedEmail.content}</p>
        </>
      ) : (
        <p>Select an email to view</p>
      )}
    </div>
  );
};

export default EmailPreview;
