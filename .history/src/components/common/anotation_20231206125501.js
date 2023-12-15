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
/*IMage Annotation*/
// import React, { useState, useEffect } from "react";
// import { FaFlag } from "react-icons/fa";

// const Annotation = () => {
//   // State to manage annotations and comments
//   const [annotations, setAnnotations] = useState([]);
//   const [comments, setComments] = useState({});
//   const [currentAnnotation, setCurrentAnnotation] = useState({ x: 0, y: 0 });
//   const [selectedAnnotation, setSelectedAnnotation] = useState(null);
//   const [isAnnotationMode, setAnnotationMode] = useState(false);

//   // Handle mouse down event to set current annotation
//   const handleMouseDown = (e) => {
//     if (isAnnotationMode) {
//       const imageRect = e.target.getBoundingClientRect();
//       setCurrentAnnotation({
//         x: e.clientX - imageRect.left,
//         y: e.clientY - imageRect.top,
//       });
//     }
//   };

//   // Handle mouse up event to save the current annotation
//   const handleMouseUp = () => {
//     if (isAnnotationMode) {
//       setAnnotations([...annotations, currentAnnotation]);
//       setCurrentAnnotation({ x: 0, y: 0 });
//     }
//   };

//   // Toggle annotation mode (start/finish annotation)
//   const toggleAnnotationMode = () => {
//     setAnnotationMode(!isAnnotationMode);
//     setSelectedAnnotation(null); // Close any open input when toggling mode
//   };

//   // Handle flag click to select the annotation and toggle the form visibility
//   const handleFlagClick = (annotation) => {
//     if (
//       selectedAnnotation &&
//       selectedAnnotation.x === annotation.x &&
//       selectedAnnotation.y === annotation.y
//     ) {
//       // Clicking on the same flag, close the form
//       setSelectedAnnotation(null);
//     } else {
//       // Clicking on a different flag, open the form
//       setSelectedAnnotation(annotation);
//     }
//   };

//   // Generate a list of comments from the state
//   const getCommentsList = () => {
//     const commentsList = [];
//     for (const key in comments) {
//       if (comments.hasOwnProperty(key)) {
//         commentsList.push({ coordinates: key, comment: comments[key] });
//       }
//     }
//     return commentsList;
//   };

//   // Effect to add the current annotation to the annotations array
//   useEffect(() => {
//     if (currentAnnotation.x !== 0 && currentAnnotation.y !== 0) {
//       setAnnotations([...annotations, currentAnnotation]);
//       setCurrentAnnotation({ x: 0, y: 0 }); // Reset currentAnnotation after updating annotations
//     }
//   }, [currentAnnotation]); // Add currentAnnotation as a dependency

//   return (
//     <div style={{ position: "relative", overflow: "scroll" }}>
//       {/* Image element to annotate */}
//       <img
//         src="https://image.slidesharecdn.com/nextgenerationofdatascientist-220221085037/75/next-generation-of-data-scientist-4-2048.jpg?cb=1668057843"
//         alt="Annotated Image"
//         style={{ height: "50%", width: "50%" }}
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//       />

//       {/* Render annotations and flags */}
//       {annotations.map((annotation, index) => (
//         <div
//           key={index}
//           style={{
//             position: "absolute",
//             left: annotation.x - 5,
//             top: annotation.y - 5,
//             cursor: "pointer",
//           }}
//           onClick={() => handleFlagClick(annotation)}
//         >
//           <FaFlag
//             style={{
//               color:
//                 selectedAnnotation &&
//                 selectedAnnotation.x === annotation.x &&
//                 selectedAnnotation.y === annotation.y
//                   ? "pink"
//                   : "red",
//             }}
//           />
//         </div>
//       ))}

//       {/* Display the comment input form if a flag is selected */}
//       {selectedAnnotation && (
//         <div
//           style={{
//             position: "absolute",
//             left: selectedAnnotation.x + 10,
//             top: selectedAnnotation.y + 20,
//             zIndex: 1,
//           }}
//         >
//           <form>
//             <input
//               type="text"
//               value={
//                 comments[`${selectedAnnotation.x}-${selectedAnnotation.y}`] ||
//                 ""
//               }
//               onChange={(e) =>
//                 setComments({
//                   ...comments,
//                   [`${selectedAnnotation.x}-${selectedAnnotation.y}`]:
//                     e.target.value,
//                 })
//               }
//             />
//             <button
//               type="button"
//               onClick={() => {
//                 setSelectedAnnotation(null); // Close input on save
//               }}
//             >
//               Save Comment
//             </button>
//           </form>
//         </div>
//       )}

//       <div style={{ marginTop: "20px" }}>
//         {/* Annotation mode toggle button and list of comments */}
//         <button onClick={toggleAnnotationMode}>
//           {isAnnotationMode ? "Finish Annotation" : "Start Annotation"}
//         </button>
//         <h2>List of Comments:</h2>
//         <ul>
//           {getCommentsList().map((commentItem, index) => (
//             <li key={index} className="text-break">
//               <strong>{commentItem.coordinates}:</strong> {commentItem.comment}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Annotation;
/*Pdf Annotation */
import React, { useState, useEffect } from "react";
import { FaFlag } from "react-icons/fa";
import pdfjs from "pdfjs-dist";

import "pdfjs-dist/web/pdf_viewer.css";

const Annotation = () => {
  const [annotations, setAnnotations] = useState([]);
  const [comments, setComments] = useState({});
  const [currentAnnotation, setCurrentAnnotation] = useState({ x: 0, y: 0 });
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [isAnnotationMode, setAnnotationMode] = useState(false);
  const [pdfPage, setPdfPage] = useState(null);

  const canvasRef = React.useRef(null);

  const handleMouseDown = (e) => {
    if (isAnnotationMode) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      setCurrentAnnotation({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
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
      setCurrentAnnotation({ x: 0, y: 0 });
    }
  }, [currentAnnotation, annotations]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (pdfPage) {
      pdfPage.getTextContent().then((textContent) => {
        textContent.items.forEach((textItem) => {
          const { transform, width, height } = textItem;

          // Use transform to get the coordinates
          const x = transform[4];
          const y = transform[5];

          // Draw rectangles for text annotations
          ctx.fillStyle = "#FF0000";
          ctx.fillRect(x, y, width, height);
        });
      });
    }

    annotations.forEach((annotation) => {
      ctx.fillStyle = "#FF0000"; // Red color for annotations
      ctx.fillRect(annotation.x - 5, annotation.y - 5, 10, 10);
    });
  }, [annotations, pdfPage]);

  useEffect(() => {
    // Load PDF on component mount
    const loadPdf = async () => {
      const pdfPath = "path-to-your-pdf-file.pdf"; // Replace with the actual path to your PDF
      const loadingTask = pdfjs.getDocument(pdfPath);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1); // Load the first page
      setPdfPage(page);
    };

    loadPdf();
  }, []);

  return (
    <div style={{ position: "relative", overflow: "scroll" }}>
      {/* Canvas element for rendering PDF and annotations */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{ border: "1px solid #000" }}
      ></canvas>

      {/* Render flags on top of the canvas */}
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

      {/* Display the comment input form if a flag is selected */}
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
        {/* Annotation mode toggle button and list of comments */}
        <button onClick={toggleAnnotationMode}>
          {isAnnotationMode ? "Finish Annotation" : "Start Annotation"}
        </button>
        <h2>List of Comments:</h2>
        <ul>
          {getCommentsList().map((commentItem, index) => (
            <li key={index} className="text-break">
              <strong>{commentItem.coordinates}:</strong> {commentItem.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Annotation;
