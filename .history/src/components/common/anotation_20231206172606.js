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

const Annotation = () => {
  // Annotation State
  const [imageAnnotations, setImageAnnotations] = useState([]);
  const [comments, setComments] = useState({});
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [isAnnotationMode, setAnnotationMode] = useState(false);

  const fileViewerRef = useRef(null);

  // Handle click event on the FileViewer to capture annotations
  const handleFileViewerClick = (e) => {
    if (isAnnotationMode) {
      const rect = fileViewerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setImageAnnotations([...imageAnnotations, { x, y }]);
    }
  };

  // Handle flag click to select the annotation and toggle the form visibility for image annotation
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

  // Generate a list of comments from the state for image annotation
  const getCommentsList = () => {
    const commentsList = [];
    for (const key in comments) {
      if (comments.hasOwnProperty(key)) {
        commentsList.push({ coordinates: key, comment: comments[key] });
      }
    }
    return commentsList;
  };

  // Effect to clear selected annotation when the annotation mode is toggled
  useEffect(() => {
    setSelectedAnnotation(null);
  }, [isAnnotationMode]);

  return (
    <div>
      {/* Annotation */}
      <div style={{ position: "relative", overflow: "scroll" }}>
        <div ref={fileViewerRef} onClick={handleFileViewerClick}>
          <FileViewer
            alt="Annotated Image"
            style={{
              height: "50%",
              width: "50%",
              position: "relative",
              overflow: "scroll",
            }}
            fileType={"png"}
            filePath={
              "https://blog.hootsuite.com/wp-content/uploads/2023/09/Social-media-image-sizes-2023.png"
            }
            errorComponent={() => <div>Error loading document</div>}
          />
        </div>
        {/* Transparent overlay for capturing click events */}
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
          <button
            className={`btn ${
              isAnnotationMode ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setAnnotationMode(!isAnnotationMode)}
          >
            {isAnnotationMode ? <FcCancel /> : <MdAddComment />}
          </button>
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
