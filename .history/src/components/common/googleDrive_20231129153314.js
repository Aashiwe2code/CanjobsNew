import React, { useState } from "react";

const GoogleDrive = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [driveLink, setDriveLink] = useState("");

  const handleCreateUser = () => {
    // Call your backend API to create a user and get the driveLink
    // Update the state with the received driveLink
    // ...

    // For demonstration purposes, I'll set a sample driveLink
    setDriveLink(
      "https://drive.google.com/drive/folders/1YThMlxSibuXDVTTqfCgma5ULy3yff0FP?usp=drive_link"
    );
  };

  return (
    <div>
      <div>
        <h2>Google Drive Documents</h2>
        <iframe
          title="Google Drive Document"
          src={
            "https://drive.google.com/drive/folders/1YThMlxSibuXDVTTqfCgma5ULy3yff0FP?usp=drive_link"
          }
          width="640"
          height="480"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleDrive;
