// GoogleDrive.js
import React, { useEffect } from "react";
import "annotator";
import "annotator/css/annotator.css";
import $ from "jquery";
const GoogleDrive = () => {
  useEffect(() => {
    const element = document.getElementById("annotator-container");

    // Wait for jQuery and Annotator to be ready
    $(document).ready(() => {
      $(element).annotator();
    });
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
