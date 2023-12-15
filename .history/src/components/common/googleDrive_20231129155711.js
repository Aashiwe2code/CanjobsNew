import React, { useState } from "react";

const GoogleDrive = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [folderId, setFolderId] = useState(""); // Use state to manage folder ID

  const handleCreateUser = () => {
    // Call your backend API to create a user and get the folderId
    // Update the state with the received folderId
    // ...

    // For demonstration purposes, I'll set a sample folderId
    setFolderId("YOUR_ACTUAL_FOLDER_ID");
  };

  return (
    <div>
      <div>
        <h2>Google Drive Documents</h2>
        {/* {folderId && ( */}
        <iframe
          title="Google Drive Folder"
          src={`https://drive.google.com/drive/folders/1YThMlxSibuXDVTTqfCgma5ULy3yff0FP?usp=drive_link`}
          style={{ width: "100%", height: "600px", border: "0" }}
        ></iframe>
        {/* )} */}
      </div>
    </div>
  );
};

export default GoogleDrive;
