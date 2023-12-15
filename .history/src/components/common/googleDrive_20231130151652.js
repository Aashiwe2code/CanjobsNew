// GoogleDrive.js
import React, { useEffect } from "react";
import "annotator";
import "annotator/css/annotator.css";
import $ from "jquery";
const GoogleDrive = () => {
  useEffect(() => {
    // Initialize AnnotatorJS
    const element = document.getElementById("annotator-container");
    const annotator = $(element).annotator();
    useEffect(() => {
      setTimeout(() => {
        const element = document.getElementById("annotator-container");
        const annotator = $(element).annotator();
        annotator.annotator("addPlugin", "Tags");
      }, 1000); // Adjust the delay time if needed
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
