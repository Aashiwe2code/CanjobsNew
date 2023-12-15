// googleDrive.js
import React, { useEffect } from "react";
import Annotator from "annotator";
import "annotator/dist/annotator.min.css";

const GoogleDrive = () => {
  useEffect(() => {
    const element = document.getElementById("annotator-container");

    // Initialize AnnotatorJS
    const annotator = new Annotator(element);

    // Example: Add an annotation programmatically
    annotator.addPlugin("Tags");
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
