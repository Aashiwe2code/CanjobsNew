// import React from 'react'

// export default function anotation() {
//     const [selectedText, setSelectedText] = useState("");
//     const [annotation, setAnnotation] = useState("");
//     const [showAnnotation, setShowAnnotation] = useState(false);
//     const [annotations, setAnnotations] = useState([]);

//     const handleTextSelection = () => {
//       const selection = window.getSelection();
//       const selectedText = selection.toString().trim();

//       if (selectedText) {
//         setSelectedText(selectedText);
//         setShowAnnotation(true);
//       } else {
//         setShowAnnotation(false);
//       }
//     };

//     const handleAnnotationChange = (e) => {
//       setAnnotation(e.target.value);
//     };

//     const saveAnnotation = () => {
//       if (selectedText && annotation) {
//         setAnnotations((prevAnnotations) => [
//           ...prevAnnotations,
//           { text: selectedText, annotation },
//         ]);
//         setSelectedText("");
//         setAnnotation("");
//         setShowAnnotation(false);
//       }
//     };
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
//   )
// }
import React, { useState, useEffect } from "react";
import { FaFlag } from "react-icons/fa";

const Annotation = () => {
  // State to manage annotations and comments
  const [annotations, setAnnotations] = useState([]);
  const [comments, setComments] = useState({});
  const [currentAnnotation, setCurrentAnnotation] = useState({ x: 0, y: 0 });
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [isAnnotationMode, setAnnotationMode] = useState(false);

  // Style for the flag icon
  const flagIconStyle = {
    position: "absolute",
    left: "-5px",
    top: "-5px",
    cursor: "pointer",
  };

  // Handle mouse down event to set current annotation
  const handleMouseDown = (e) => {
    if (isAnnotationMode) {
      const imageRect = e.target.getBoundingClientRect();
      setCurrentAnnotation({
        x: e.clientX - imageRect.left,
        y: e.clientY - imageRect.top,
      });
    }
  };

  // Handle mouse up event to save the current annotation
  const handleMouseUp = () => {
    if (isAnnotationMode) {
      setAnnotations([...annotations, currentAnnotation]);
      setCurrentAnnotation({ x: 0, y: 0 });
    }
  };

  // Toggle annotation mode (start/finish annotation)
  const toggleAnnotationMode = () => {
    setAnnotationMode(!isAnnotationMode);
    setSelectedAnnotation(null); // Close any open input when toggling mode
  };

  // Handle flag click to select the annotation
  const handleFlagClick = (annotation) => {
    console.log(annotation);
    setSelectedAnnotation(annotation); // Open input for this annotation
  };

  // Generate a list of comments from the state
  const getCommentsList = () => {
    const commentsList = [];
    for (const key in comments) {
      if (comments.hasOwnProperty(key)) {
        commentsList.push({ coordinates: key, comment: comments[key] });
      }
    }
    return commentsList;
  };

  // Calculate the minimum and maximum values for x and y axes
  const minX = Math.min(
    ...annotations.map((point) => point.x),
    currentAnnotation.x
  );
  const maxX = Math.max(
    ...annotations.map((point) => point.x),
    currentAnnotation.x
  );
  const minY = Math.min(
    ...annotations.map((point) => point.y),
    currentAnnotation.y
  );
  const maxY = Math.max(
    ...annotations.map((point) => point.y),
    currentAnnotation.y
  );

  // Calculate the range of x and y axes
  const xAxisRange = maxX - minX;
  const yAxisRange = maxY - minY;

  // Effect to add the current annotation to the annotations array
  useEffect(() => {
    if (currentAnnotation.x !== 0 && currentAnnotation.y !== 0) {
      setAnnotations([...annotations, currentAnnotation]);
    }
  }, [currentAnnotation, annotations]);

  return (
    <div style={{ position: "relative" }}>
      {/* Image element to annotate */}
      <img
        src="https://image.slidesharecdn.com/nextgenerationofdatascientist-220221085037/75/next-generation-of-data-scientist-4-2048.jpg?cb=1668057843"
        alt="Annotated Image"
        style={{ height: "50%", width: "50%" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />

      {/* Render annotations and flags */}
      {annotations.map((annotation, index) => (
        <div key={index} style={{ ...flagIconStyle }}>
          <FaFlag
            style={{
              color:
                selectedAnnotation &&
                selectedAnnotation.x === annotation.x &&
                selectedAnnotation.y === annotation.y
                  ? "pink"
                  : "red",
              cursor: "pointer",
            }}
            onClick={() => handleFlagClick(annotation)}
          />

          {/* Display comments and input form */}
          {comments[`${annotation.x}-${annotation.y}`] && (
            <div
              style={{
                position: "absolute",
                left: annotation.x + 10,
                top: annotation.y,
                backgroundColor: "white",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                zIndex: 1,
              }}
            >
              {comments[`${annotation.x}-${annotation.y}`]}
            </div>
          )}

          {/* Input form for comments */}
          <form
            style={{
              position: "absolute",
              left: annotation.x + 10,
              top: annotation.y + 20,
              zIndex: 1,
              display:
                selectedAnnotation &&
                selectedAnnotation.x === annotation.x &&
                selectedAnnotation.y === annotation.y
                  ? "block"
                  : "none",
            }}
          >
            <input
              type="text"
              value={comments[`${annotation.x}-${annotation.y}`] || ""}
              onChange={(e) =>
                setComments({
                  ...comments,
                  [`${annotation.x}-${annotation.y}`]: e.target.value,
                })
              }
            />
            <button
              type="button"
              onClick={() => {
                setSelectedAnnotation(null); // Close input on save
              }}
            >
              Save Comment
            </button>
          </form>
        </div>
      ))}

      {/* Horizontal and vertical lines for annotation reference */}
      <div
        style={{
          position: "absolute",
          left: minX,
          top: minY + yAxisRange / 2,
          width: xAxisRange,
          height: "1px",
          backgroundColor: "green",
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          left: minX + xAxisRange / 2,
          top: minY,
          width: "1px",
          height: yAxisRange,
          backgroundColor: "green",
        }}
      ></div>

      {/* Annotation mode toggle button and list of comments */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={toggleAnnotationMode}>
          {isAnnotationMode ? "Finish Annotation" : "Start Annotation"}
        </button>
        <h2>List of Comments:</h2>
        <ul>
          {getCommentsList().map((commentItem, index) => (
            <li key={index}>
              <strong>{commentItem.coordinates}:</strong> {commentItem.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Annotation;
