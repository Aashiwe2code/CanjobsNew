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
      "https://drive.google.com/file/d/1rEp6yhr_nT4mwOTor2B8zpV_xeaUPDQv/preview"
    );
  };

  return (
    <div>
      <h1>Google Drive Integration</h1>
      <label>
        User ID:
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button onClick={handleCreateUser}>Create User</button>

      {driveLink && (
        <div>
          <h2>Google Drive Documents</h2>
          <iframe
            title="Google Drive Document"
            src={driveLink}
            width="640"
            height="480"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          {/* <iframe src="https://drive.google.com/file/d/1rEp6yhr_nT4mwOTor2B8zpV_xeaUPDQv/preview" width="640" height="480" allow="autoplay"></iframe> */}
        </div>
      )}
    </div>
  );
};

export default GoogleDrive;
