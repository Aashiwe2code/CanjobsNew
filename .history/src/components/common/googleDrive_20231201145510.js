// GoogleDrive.js

import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import styled from "styled-components";

const Container = styled.div`
  font-family: "Arial", sans-serif;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: #4285f4;
`;

const Button = styled.button`
  background-color: #4285f4;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  margin: 10px;
`;

const LoadingMessage = styled.div`
  color: #4285f4;
  font-size: 18px;
  margin-top: 20px;
`;

const FileList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

const FileListItem = styled.li`
  background-color: #f2f2f2;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;
const API_KEY = "AIzaSyAV4SubRxacR2-L-sv_EJ_adINPhtKWtQI"; // Replace with your actual API key
const CLIENT_ID =
  "654480915922-bgepo1btfcgm8n6mlc0ea7k8nj7l4ls7.apps.googleusercontent.com";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const GoogleDrive = () => {
  const [isLoadingGoogleDriveApi, setIsLoadingGoogleDriveApi] = useState(false);
  const [isFetchingGoogleDriveFiles, setIsFetchingGoogleDriveFiles] =
    useState(false);
  const [listDocumentsVisibility, setListDocumentsVisibility] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [signedInUser, setSignedInUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    handleClientLoad();
  }, []);

  const handleClientLoad = () => {
    gapi.load("client:auth2", initClient);
  };

  const initClient = () => {
    setIsLoadingGoogleDriveApi(true);
    gapi.client
      .init({
        apiKey: API_KEY, // Replace with your actual API key
        clientId: CLIENT_ID, // Replace with your actual client ID
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      })
      .catch((error) => {
        setIsLoadingGoogleDriveApi(false);
        console.error("Error initializing Google Drive API:", error);
      });
  };

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      setSignedInUser(gapi.auth2.getAuthInstance().currentUser.get());
      setIsLoadingGoogleDriveApi(false);
      listFiles();
    } else {
      handleAuthClick();
    }
  };

  const listFiles = (folderId = null) => {
    setIsFetchingGoogleDriveFiles(true);
    const query = folderId ? `'${folderId}' in parents` : null;

    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name, mimeType, modifiedTime)",
        q: query,
      })
      .then((response) => {
        setIsFetchingGoogleDriveFiles(false);
        setListDocumentsVisibility(true);
        const res = response.result;
        setDocuments(res.files);
      })
      .catch((error) => {
        setIsFetchingGoogleDriveFiles(false);
        console.error("Error listing files:", error);
      });
  };

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOutClick = () => {
    setListDocumentsVisibility(false);
    gapi.auth2.getAuthInstance().signOut();
  };

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
    listFiles();
  }, 500);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleAddDocument = () => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const metadata = {
      name: selectedFile.name,
    };

    const requestBody = {
      resource: metadata,
      media: {
        mimeType: selectedFile.type,
        body: selectedFile,
      },
    };

    gapi.client.drive.files
      .create(requestBody)
      .then(() => {
        // File added successfully, you might want to refresh the file list
        listFiles();
        setSelectedFile(null); // Reset selected file after upload
      })
      .catch((error) => {
        console.error("Error adding document:", error);
      });
  };

  return (
    <Container>
      <Title>Google Drive Integration</Title>
      {isLoadingGoogleDriveApi && (
        <LoadingMessage>Loading Google Drive API...</LoadingMessage>
      )}
      {!signedInUser && !isLoadingGoogleDriveApi && (
        <Button onClick={handleAuthClick}>Sign In</Button>
      )}
      {signedInUser && (
        <>
          <Button onClick={handleSignOutClick}>Sign Out</Button>
          <Input
            type="text"
            placeholder="Search files..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          <input type="file" onChange={handleFileChange} />
          <Button onClick={handleAddDocument}>Add Document</Button>
          {isFetchingGoogleDriveFiles && (
            <LoadingMessage>Fetching Google Drive files...</LoadingMessage>
          )}
          {listDocumentsVisibility && (
            <FileList>
              {documents.map((document) => (
                <FileListItem
                  key={document.id}
                  onClick={() => {
                    if (
                      document.mimeType === "application/vnd.google-apps.folder"
                    ) {
                      // If the clicked document is a folder, list its contents
                      listFiles(document.id);
                    } else {
                      // Handle opening/viewing non-folder documents
                      console.log("Opening document:", document);
                    }
                  }}
                >
                  {document.name}
                </FileListItem>
              ))}
            </FileList>
          )}
        </>
      )}
    </Container>
  );
};

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

export default GoogleDrive;
