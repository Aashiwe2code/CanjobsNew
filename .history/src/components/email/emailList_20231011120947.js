import React from "react";

const EmailList = ({ emails, onSelectEmail }) => {
  return (
    <div className="email-list">
      <ul>
        {emails.map((email) => (
          <li key={email.id} onClick={() => onSelectEmail(email)}>
            {email.subject}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
