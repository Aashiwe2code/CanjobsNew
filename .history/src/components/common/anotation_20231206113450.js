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
  const [annotations, setAnnotations] = useState([]);
  const [comments, setComments] = useState({});
  const [currentAnnotation, setCurrentAnnotation] = useState({ x: 0, y: 0 });
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [isAnnotationMode, setAnnotationMode] = useState(false);

  const flagIconStyle = {
    position: "absolute",
    left: "-5px",
    top: "-5px",
    cursor: "pointer",
  };

  const handleMouseDown = (e) => {
    if (isAnnotationMode) {
      const imageRect = e.target.getBoundingClientRect();
      setCurrentAnnotation({
        x: e.clientX - imageRect.left,
        y: e.clientY - imageRect.top,
      });
    }
  };

  const handleMouseUp = () => {
    if (isAnnotationMode) {
      setAnnotations([...annotations, currentAnnotation]);
      setCurrentAnnotation({ x: 0, y: 0 });
    }
  };

  const toggleAnnotationMode = () => {
    setAnnotationMode(!isAnnotationMode);
    setSelectedAnnotation(null);
  };

  const handleFlagClick = (annotation) => {
    setSelectedAnnotation(annotation);
  };

  const getCommentsList = () => {
    const commentsList = [];
    for (const key in comments) {
      if (comments.hasOwnProperty(key)) {
        commentsList.push({ coordinates: key, comment: comments[key] });
      }
    }
    return commentsList;
  };

  useEffect(() => {
    if (currentAnnotation.x !== 0 && currentAnnotation.y !== 0) {
      setAnnotations([...annotations, currentAnnotation]);
    }
  }, [currentAnnotation, annotations]);

  return (
    <div style={{ position: "relative" }}>
      <img
        src="https://image.slidesharecdn.com/nextgenerationofdatascientist-220221085037/75/next-generation-of-data-scientist-4-2048.jpg?cb=1668057843"
        alt="Annotated Image"
        style={{ height: "50%", width: "50%" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />

      {annotations.map((annotation, index) => (
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
