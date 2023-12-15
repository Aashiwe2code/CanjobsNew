// GoogleDrive.js
import React, { useEffect, useRef } from "react";
import "annotator";

const GoogleDrive = () => {
  const annotatorRef = useRef(null);

  useEffect(() => {
    // Initialize AnnotatorJS
    const element = document.getElementById("annotator-container");

    // Use annotatorRef.current to access the annotator instance
    annotatorRef.current = new Annotator(element);

    // Example: Add an annotation programmatically
    annotatorRef.current.addPlugin("Tags");
  }, []);

  return (
    <div>
      <h1>AnnotatorJS in React</h1>
      <div id="annotator-container">
        {/* Your content goes here */}
        <p>This is the content you want to annotate.</p>
      </div>
    </div>
  );
};

export default GoogleDrive;
