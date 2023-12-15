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

const Annotation = () => {
  const [annotations, setAnnotations] = useState([]);
  const [currentAnnotation, setCurrentAnnotation] = useState({ x: 0, y: 0 });
  const [isAnnotationMode, setAnnotationMode] = useState(false);
  const [plot, setPlot] = useState([]);

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
  };

  // Calculate the minimum and maximum values for x and y coordinates
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

  // Calculate the range for x and y axes
  const xAxisRange = maxX - minX;
  const yAxisRange = maxY - minY;

  useEffect(() => {
    // Update the plot array when currentAnnotation changes
    setPlot([...plot, { currentAnnotation }]);
  }, [currentAnnotation]);

  console.log(plot);

  return (
    <div style={{ position: "relative" }}>
      <img
        src="https://image.slidesharecdn.com/nextgenerationofdatascientist-220221085037/75/next-generation-of-data-scientist-4-2048.jpg?cb=1668057843"
        alt="Annotated Image"
        style={{ height: "100%", width: "100%" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />

      {annotations.map((annotation, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: annotation.x,
            top: annotation.y,
            width: "10px",
            height: "10px",
            backgroundColor: "red",
          }}
        ></div>
      ))}

      {isAnnotationMode && (
        <div
          style={{
            position: "absolute",
            left: currentAnnotation.x,
            top: currentAnnotation.y,
            width: "10px",
            height: "10px",
            backgroundColor: "blue",
          }}
        ></div>
      )}

      {/* Plot the x-axis */}
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

      {/* Plot the y-axis */}
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

      <button onClick={toggleAnnotationMode}>
        {isAnnotationMode ? "Finish Annotation" : "Start Annotation"}
      </button>
    </div>
  );
};

export default Annotation;
