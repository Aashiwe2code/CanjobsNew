// import React, { useState, useEffect } from "react";
// import { FaFlag } from "react-icons/fa";

// /**
//  * Component for text annotation and image annotation.
//  */
// const Annotation = () => {
//   //  Annotation State
//   const [imageAnnotations, setImageAnnotations] = useState([]);
//   const [comments, setComments] = useState({});
//   const [currentAnnotation, setCurrentAnnotation] = useState({ x: 0, y: 0 });
//   const [selectedAnnotation, setSelectedAnnotation] = useState(null);
//   const [isAnnotationMode, setAnnotationMode] = useState(false);

//   // Handle mouse down event to set current annotation for image annotation
//   const handleMouseDown = (e) => {
//     if (isAnnotationMode) {
//       const imageRect = e.target.getBoundingClientRect();
//       setCurrentAnnotation({
//         x: e.clientX - imageRect.left,
//         y: e.clientY - imageRect.top,
//       });
//     }
//   };

//   // Handle mouse up event to save the current annotation for image annotation
//   const handleMouseUp = () => {
//     if (isAnnotationMode) {
//       setImageAnnotations([...imageAnnotations, currentAnnotation]);
//       setCurrentAnnotation({ x: 0, y: 0 });
//     }
//   };

//   // Toggle annotation mode for image annotation
//   const toggleAnnotationMode = () => {
//     setAnnotationMode(!isAnnotationMode);
//     setSelectedAnnotation(null);
//   };

//   // Handle flag click to select the annotation and toggle the form visibility for image annotation
//   const handleFlagClick = (annotation) => {
//     if (
//       selectedAnnotation &&
//       selectedAnnotation.x === annotation.x &&
//       selectedAnnotation.y === annotation.y
//     ) {
//       setSelectedAnnotation(null);
//     } else {
//       setSelectedAnnotation(annotation);
//     }
//   };

//   // Generate a list of comments from the state for image annotation
//   const getCommentsList = () => {
//     const commentsList = [];
//     for (const key in comments) {
//       if (comments.hasOwnProperty(key)) {
//         commentsList.push({ coordinates: key, comment: comments[key] });
//       }
//     }
//     return commentsList;
//   };

//   // Effect to add the current annotation to the annotations array for image annotation
//   useEffect(() => {
//     if (currentAnnotation.x !== 0 && currentAnnotation.y !== 0) {
//       setImageAnnotations([...imageAnnotations, currentAnnotation]);
//       setCurrentAnnotation({ x: 0, y: 0 });
//     }
//   }, [currentAnnotation]);

//   return (
//     <div>
//       {/* Annotation */}
//       <div style={{ position: "relative", overflow: "scroll" }}>
//         <img
//           src="https://image.slidesharecdn.com/nextgenerationofdatascientist-220221085037/75/next-generation-of-data-scientist-4-2048.jpg?cb=1668057843"
//           alt="Annotated Image"
//           style={{ height: "50%", width: "50%" }}
//           onMouseDown={handleMouseDown}
//           onMouseUp={handleMouseUp}
//         />

//         {imageAnnotations.map((annotation, index) => (
//           <div
//             key={index}
//             style={{
//               position: "absolute",
//               left: annotation.x - 5,
//               top: annotation.y - 5,
//               cursor: "pointer",
//             }}
//             onClick={() => handleFlagClick(annotation)}
//           >
//             <FaFlag
//               style={{
//                 color:
//                   selectedAnnotation &&
//                   selectedAnnotation.x === annotation.x &&
//                   selectedAnnotation.y === annotation.y
//                     ? "pink"
//                     : "red",
//               }}
//             />
//           </div>
//         ))}

//         {selectedAnnotation && (
//           <div
//             style={{
//               position: "absolute",
//               left: selectedAnnotation.x + 10,
//               top: selectedAnnotation.y + 20,
//               zIndex: 1,
//             }}
//           >
//             <form>
//               <input
//                 type="text"
//                 value={
//                   comments[`${selectedAnnotation.x}-${selectedAnnotation.y}`] ||
//                   ""
//                 }
//                 onChange={(e) =>
//                   setComments({
//                     ...comments,
//                     [`${selectedAnnotation.x}-${selectedAnnotation.y}`]:
//                       e.target.value,
//                   })
//                 }
//               />
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSelectedAnnotation(null);
//                 }}
//               >
//                 Save Comment
//               </button>
//             </form>
//           </div>
//         )}

//         <div style={{ marginTop: "20px" }}>
//           <button onClick={toggleAnnotationMode}>
//             {isAnnotationMode ? "Finish Annotation" : "Start Annotation"}
//           </button>
//           <h2>List of Comments:</h2>
//           <ul>
//             {getCommentsList().map((commentItem, index) => (
//               <li key={index} className="text-break">
//                 <strong>{commentItem.coordinates}:</strong>{" "}
//                 {commentItem.comment}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Annotation;
import React, { useState, useEffect, useRef } from "react";
import { FaFlag } from "react-icons/fa";
import FileViewer from "react-file-viewer";
import { MdAddComment } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { Link } from "react-router-dom";
import { ADocAnnotation, GetCommentsAndAssign } from "../../api/api";

const Annotation = () => {
  // State for image annotations, comments, selected annotation, and annotation mode
  const [imageAnnotations, setImageAnnotations] = useState([]);
  const [comments, setComments] = useState({});
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [isAnnotationMode, setAnnotationMode] = useState(false);
  const [assignments, setAssignments] = useState([]);

  const fileViewerRef = useRef(null);

  // Function to handle click events on the FileViewer to capture annotations
  const handleFileViewerClick = (e) => {
    if (isAnnotationMode) {
      const rect = fileViewerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Add annotation
      addAnnotation({ x, y });
    }
  };

  // Function to add annotation based on conditions
  const addAnnotation = ({ x, y }) => {
    // Retrieve data from local storage
    const id = localStorage.getItem("adminId");
    const docId = 111; //props.docId;
    const assignedUserId = assignments.find(
      (assignment) => assignment.docId === docId
    )?.assignedUserId;
    const email = isEmailConditionMet() ? comments : null;
    const subject = "";
    const comment = isEmailConditionMet() ? null : comments;

    // Perform any other conditions or checks required for adding annotations

    // Send data to the API
    ADocAnnotation({
      id,
      docId,
      assignedUserId,
      email,
      subject,
      comment,
      x,
      y,
    })
      .then((response) => {
        // Handle successful API response
        console.log("Annotation added successfully:", response);
        // You might want to update the state or perform other actions
      })
      .catch((error) => {
        // Handle API error
        console.error("Error adding annotation:", error);
      });

    // Update state to include the new annotation
    setImageAnnotations([...imageAnnotations, { x, y }]);
  };

  // Function to check if the email condition is met
  const isEmailConditionMet = () => {
    // Replace with actual condition to check if email should be sent
    return comments.includes("@");
  };

  // Function to handle flag click to select the annotation and toggle the form visibility for image annotation
  const handleFlagClick = (annotation) => {
    if (
      selectedAnnotation &&
      selectedAnnotation.x === annotation.x &&
      selectedAnnotation.y === annotation.y
    ) {
      setSelectedAnnotation(null);
    } else {
      setSelectedAnnotation(annotation);
    }
  };

  // Function to get comments and assignments from the API
  const getCommentsAndAssign = () => {
    GetCommentsAndAssign()
      .then((response) => {
        // Handle successful API response
        console.log("Comments and Assignments:", response);
        // Update the state with comments and assignments
        setAssignments(response.assignments);
        setComments(response.comments);
      })
      .catch((error) => {
        // Handle API error
        console.error("Error getting comments and assignments:", error);
      });
  };

  // Effect to clear selected annotation when the annotation mode is toggled
  useEffect(() => {
    setSelectedAnnotation(null);
    // Fetch comments and assignments when the component mounts
    getCommentsAndAssign();
  }, [isAnnotationMode]);

  return (
    <div>
      {/* Annotation */}
      <div style={{ position: "relative", overflow: "scroll" }}>
        <div className="d-flex justify-content-center">
          <React.Fragment ref={fileViewerRef} onClick={handleFileViewerClick}>
            <FileViewer
              alt="Annotated Image"
              style={{
                height: "100%",
                width: "100%",
                position: "relative",
                overflow: "scroll",
              }}
              fileType={"png"}
              filePath={
                "https://blog.hootsuite.com/wp-content/uploads/2023/09/Social-media-image-sizes-2023.png"
              }
              errorComponent={() => <div>Error loading document</div>}
            />
          </React.Fragment>
          <Link
            className={`btn-sm mt-7 ${
              isAnnotationMode ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setAnnotationMode(!isAnnotationMode)}
          >
            {isAnnotationMode ? <FcCancel /> : <MdAddComment />}
          </Link>
        </div>
        {isAnnotationMode && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          />
        )}

        {imageAnnotations.map((annotation, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: annotation.x - 5,
              top: annotation.y - 5,
              cursor: "pointer",
            }}
            onClick={() => handleFlagClick(annotation)}
          >
            <FaFlag
              style={{
                color:
                  selectedAnnotation &&
                  selectedAnnotation.x === annotation.x &&
                  selectedAnnotation.y === annotation.y
                    ? "pink"
                    : "red",
              }}
            />
          </div>
        ))}

        {selectedAnnotation && (
          <div
            style={{
              position: "absolute",
              left: selectedAnnotation.x + 10,
              top: selectedAnnotation.y + 20,
              zIndex: 1,
            }}
          >
            <form>
              <input
                type="text"
                value={
                  comments[`${selectedAnnotation.x}-${selectedAnnotation.y}`] ||
                  ""
                }
                onChange={(e) =>
                  setComments({
                    ...comments,
                    [`${selectedAnnotation.x}-${selectedAnnotation.y}`]:
                      e.target.value,
                  })
                }
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedAnnotation(null);
                }}
              >
                Save Comment
              </button>
            </form>
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <h2>List of Comments:</h2>
          <ul>
            {getCommentsList().map((commentItem, index) => (
              <li key={index} className="text-break">
                <strong>{commentItem.coordinates}:</strong>{" "}
                {commentItem.comment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Annotation;
