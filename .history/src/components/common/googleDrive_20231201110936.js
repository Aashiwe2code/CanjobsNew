// import React, { useState } from "react";

// const GoogleDrive = () => {
//   const [selectedText, setSelectedText] = useState("");
//   const [annotation, setAnnotation] = useState("");
//   const [showAnnotation, setShowAnnotation] = useState(false);
//   const [annotations, setAnnotations] = useState([]);

//   const handleTextSelection = () => {
//     const selection = window.getSelection();
//     const selectedText = selection.toString().trim();

//     if (selectedText) {
//       setSelectedText(selectedText);
//       setShowAnnotation(true);
//     } else {
//       setShowAnnotation(false);
//     }
//   };

//   const handleAnnotationChange = (e) => {
//     setAnnotation(e.target.value);
//   };

//   const saveAnnotation = () => {
//     if (selectedText && annotation) {
//       setAnnotations((prevAnnotations) => [
//         ...prevAnnotations,
//         { text: selectedText, annotation },
//       ]);
//       setSelectedText("");
//       setAnnotation("");
//       setShowAnnotation(false);
//     }
//   };

//   return (
//     <div>
//       <p onMouseUp={handleTextSelection}>
//         For the open-source mobile application framework, see React Native.
//         React Original author(s) Jordan Walke Developer(s) Meta and community
//         Initial release May 29, 2013; 10 years ago[1] Stable release 18.2.0[2]
//         Edit this on Wikidata / 14 June 2022; 17 months ago Repository
//         github.com/facebook/react Edit this at Wikidata Written in JavaScript
//         Platform Web platform Type JavaScript library License MIT License
//         Website react.dev React (also known as React.js or ReactJS) is a free
//         and open-source front-end JavaScript library[3][4] for building user
//         interfaces based on components. It is maintained by Meta (formerly
//         Facebook) and a community of individual developers and
//         companies.[5][6][7] React can be used to develop single-page, mobile, or
//         server-rendered applications with frameworks like Next.js. Because React
//         is only concerned with the user interface and rendering components to
//         the DOM, React applications often rely on libraries for routing and
//         other client-side functionality.
//       </p>
//       {showAnnotation && (
//         <div>
//           <p>Selected Text: {selectedText}</p>
//           <textarea
//             placeholder="Add comment"
//             value={annotation}
//             onChange={handleAnnotationChange}
//           />
//           <button onClick={saveAnnotation} className="btn btn-primary">
//             Save
//           </button>
//         </div>
//       )}
//       <div>
//         <h4>Comments</h4>
//         <ul>
//           {annotations.map((item, index) => (
//             <li key={index}>
//               <strong>{item.text}:</strong> {item.annotation}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default GoogleDrive;
import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const API_KEY = "AIzaSyAV4SubRxacR2-L-sv_EJ_adINPhtKWtQI"; // Replace with your actual API key
const CLIENT_ID =
  "654480915922-bgepo1btfcgm8n6mlc0ea7k8nj7l4ls7.apps.googleusercontent.com"; // Replace with your actual client ID
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly";

const GoogleDrive = () => {
  const [isLoadingGoogleDriveApi, setIsLoadingGoogleDriveApi] = useState(false);
  const [isFetchingGoogleDriveFiles, setIsFetchingGoogleDriveFiles] =
    useState(false);
  const [listDocumentsVisibility, setListDocumentsVisibility] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [signedInUser, setSignedInUser] = useState(null);

  useEffect(() => {
    handleClientLoad();
  }, []);

  // const handleClientLoad = () => {
  //   gapi.load("client:auth2", initClient);
  // };

  const initClient = () => {
    setIsLoadingGoogleDriveApi(true);
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
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

  const listFiles = (searchTerm = null) => {
    setIsFetchingGoogleDriveFiles(true);
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name, mimeType, modifiedTime)",
        q: searchTerm,
      })
      .then((response) => {
        setIsFetchingGoogleDriveFiles(false);
        setListDocumentsVisibility(true);
        const res = response.result;
        setDocuments(res.files);
      })
      .catch((error) => {
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
  const handleClientLoad = () => {
    if (window.gapi) {
      gapi.load("client:auth2", initClient);
    } else {
      console.error("Google API script failed to load.");
    }
  };

  return (
    <div>
      <h1>Google Drive Integration</h1>
      {isLoadingGoogleDriveApi && <div>Loading Google Drive API...</div>}
      {!signedInUser && !isLoadingGoogleDriveApi && (
        <button onClick={handleAuthClick}>Sign In</button>
      )}
      {signedInUser && (
        <>
          <button onClick={handleSignOutClick}>Sign Out</button>
          {isFetchingGoogleDriveFiles && (
            <div>Fetching Google Drive files...</div>
          )}
          {listDocumentsVisibility && (
            <ul>
              {documents.map((document) => (
                <li key={document.id}>{document.name}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default GoogleDrive;
