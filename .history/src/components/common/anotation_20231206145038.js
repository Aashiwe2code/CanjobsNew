// import React, { useState, useEffect } from "react";
// import { FaFlag } from "react-icons/fa";

// /**
//  * Component for text annotation and image annotation.
//  */
// const Annotation = () => {
//   // Text Annotation State
//   const [selectedText, setSelectedText] = useState("");
//   const [annotation, setAnnotation] = useState("");
//   const [showAnnotation, setShowAnnotation] = useState(false);
//   const [annotations, setAnnotations] = useState([]);

//   // Image Annotation State
//   const [imageAnnotations, setImageAnnotations] = useState([]);
//   const [comments, setComments] = useState({});
//   const [currentAnnotation, setCurrentAnnotation] = useState({ x: 0, y: 0 });
//   const [selectedAnnotation, setSelectedAnnotation] = useState(null);
//   const [isAnnotationMode, setAnnotationMode] = useState(false);

//   // Handle text selection for annotation
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

//   // Handle annotation change for text annotation
//   const handleAnnotationChange = (e) => {
//     setAnnotation(e.target.value);
//   };

//   // Save text annotation
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
//       {/* Text Annotation */}
//       <p onMouseUp={handleTextSelection}>
//         {" "}
//         For the open-source mobile application framework, see React Native. //
//         React Original author(s) Jordan Walke Developer(s) Meta and community //
//         Initial release May 29, 2013; 10 years ago[1] Stable release 18.2.0[2]
//         // Edit this on Wikidata / 14 June 2022; 17 months ago Repository //
//         github.com/facebook/react Edit this at Wikidata Written in JavaScript //
//         Platform Web platform Type JavaScript library License MIT License //
//         Website react.dev React (also known as React.js or ReactJS) is a free //
//         and open-source front-end JavaScript library[3][4] for building user //
//         interfaces based on components. It is maintained by Meta (formerly //
//         Facebook) and a community of individual developers and //
//         companies.[5][6][7] React can be used to develop single-page, mobile, or
//         // server-rendered applications with frameworks like Next.js. Because
//         React // is only concerned with the user interface and rendering
//         components to // the DOM, React applications often rely on libraries for
//         routing and // other client-side functionality.
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
//         <h4>Text Annotations</h4>
//         <ul>
//           {annotations.map((item, index) => (
//             <li key={index}>
//               <strong>{item.text}:</strong> {item.annotation}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Image Annotation */}
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
// Annotation.js

import React, { useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";

const Annotation = () => {
  const viewerRef = useRef(null);

  useEffect(() => {
    const initWebViewer = async () => {
      const instance = await WebViewer(
        {
          path: "/static/lib",
          initialDoc: "/static/docs/form-example.pdf",
        },
        viewerRef.current
      );

      const { Annotations, annotManager, docViewer } = instance;

      // Create a function to draw image annots on the document
      const drawImageAnnot = (imageSrc, x, y, size) => {
        const stampAnnot = new Annotations.StampAnnotation();
        stampAnnot.PageNumber = 1;
        stampAnnot.X = x;
        stampAnnot.Y = y;
        stampAnnot.Width = size;
        stampAnnot.Height = size;

        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext("2d");

        var image = new Image();

        image.onload = function () {
          context.drawImage(image, 0, 0, size, size);

          const dataURL = canvas.toDataURL();
          stampAnnot.ImageData = dataURL;
          annotManager.addAnnotation(stampAnnot);
          annotManager.redrawAnnotation(stampAnnot);
        };

        image.width = size;
        image.height = size;
        image.src = imageSrc;
      };

      // Wait for annotations to be loaded
      docViewer.on("annotationsLoaded", () => {
        const fieldManager = annotManager.getFieldManager();

        fieldManager.forEachField((field) => {
          const { widgets } = field;
          if (widgets) {
            const widget = widgets[0];

            if (
              widget.defaultValue === "" &&
              widget.appearance !== "Off" &&
              widget.appearance !== "On"
            ) {
              const { X, Y } = widget;
              drawImageAnnot("/static/img/finger-point.png", X - 30, Y, 25);
            }
          }
        });
      });
    };

    initWebViewer();

    // Cleanup function
    return () => {
      // Perform any cleanup or teardown here
    };
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  return <div ref={viewerRef} style={{ width: "100%", height: "100vh" }}></div>;
};

export default Annotation;
