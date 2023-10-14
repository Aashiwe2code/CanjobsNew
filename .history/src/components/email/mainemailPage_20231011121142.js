import React, { useState } from "react";
import "./App.css";
import EmailList from "./emailList";
import EmailPreview from "./emailPreview";

const MainEmailPage = () => {
  const [emails] = useState([
    { id: 1, subject: "Meeting Reminder", content: "Lorem ipsum..." },
    { id: 2, subject: "Hello from John", content: "Lorem ipsum..." },
    // Add more emails as needed
  ]);

  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
  };

  return (
    <div className="app">
      <EmailList emails={emails} onSelectEmail={handleSelectEmail} />
      <EmailPreview selectedEmail={selectedEmail} />
    </div>
  );
};

export default MainEmailPage;
