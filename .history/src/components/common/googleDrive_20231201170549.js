import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

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
const GoogleDrive = () => {
  const [isLoadingGoogleDriveApi, setIsLoadingGoogleDriveApi] = useState(false);
  const [isFetchingGoogleDriveFiles, setIsFetchingGoogleDriveFiles] =
    useState(false);
  const [listDocumentsVisibility, setListDocumentsVisibility] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [signedInUser, setSignedInUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    handleClientLoad();
  }, []);

  const handleClientLoad = () => {
    gapi.load("client:auth2", initClient);
  };

  const initClient = async () => {
    setIsLoadingGoogleDriveApi(true);
    try {
      await gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
        ],
        scope: [
          "https://www.googleapis.com/auth/drive",
        //   "https://www.googleapis.com/auth/drive",
        //   "https://www.googleapis.com/auth/drive.file",
        //   "https://www.googleapis.com/auth/drive.metadata",
        //   "https://www.googleapis.com/auth/drive.metadata.readonly",
        //   "https://www.googleapis.com/auth/drive.photos.readonly",
        //   "https://www.googleapis.com/auth/drive.readonly",
        // ],
      });
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    } catch (error) {
      setIsLoadingGoogleDriveApi(false);
      console.error("Error initializing Google Drive API:", error);
    }
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

  const listFiles = async (searchTerm = null) => {
    setIsFetchingGoogleDriveFiles(true);
    try {
      const response = await gapi.client.drive.files.list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name, mimeType, modifiedTime)",
        q: searchTerm,
      });
      setIsFetchingGoogleDriveFiles(false);
      setListDocumentsVisibility(true);
      setDocuments(response.result.files);
    } catch (error) {
      setIsFetchingGoogleDriveFiles(false);
      console.error("Error listing files:", error);
    }
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
    listFiles(value);
  }, 500);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleAddDocument = async () => {
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

    try {
      await gapi.client.drive.files.create(requestBody);
      listFiles(searchTerm);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const handleOpenDocument = async (file) => {
    if (!file || !file.id) {
      console.error("Invalid file object:", file);
      return;
    }

    const fileId = file.id;

    if (file.mimeType === "application/vnd.google-apps.folder") {
      listFiles(fileId);
      return;
    }

    try {
      let documentContent;
      if (file.mimeType.startsWith("application/vnd.google-apps.")) {
        const exportMimeType = "application/pdf";
        const response = await gapi.client.drive.files.export({
          fileId: fileId,
          mimeType: exportMimeType,
        });
        documentContent = response.body;
      } else {
        const response = await gapi.client.drive.files.get({
          fileId: fileId,
          alt: "media",
        });
        documentContent = response.body;
      }
      setSelectedDocument(documentContent);
    } catch (error) {
      console.error("Error getting document content:", error);
    }
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
                  onClick={() => handleOpenDocument(document)}
                >
                  {document.name}
                </FileListItem>
              ))}
            </FileList>
          )}
          {selectedDocument && (
            <div>
              <h2>Selected Document Content</h2>
              <iframe
                title="document-viewer"
                srcDoc={selectedDocument}
                width="100%"
                height="500px"
              />
            </div>
          )}
        </>
      )}
    </Container>
  );
};

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
