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
          src="https://drive.google.com/embeddedfolderview?id=FOLDER-ID#list"
          style={{ width: "100%", height: "600px", border: "0" }}
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleDrive;
