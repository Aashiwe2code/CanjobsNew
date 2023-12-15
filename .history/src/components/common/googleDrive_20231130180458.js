import React, { useState } from "react";

const GoogleDrive = () => {
  const [selectedText, setSelectedText] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [annotations, setAnnotations] = useState([]);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
      setSelectedText(selectedText);
      setShowAnnotation(true);
    } else {
      setShowAnnotation(false);
    }
  };

  const handleAnnotationChange = (e) => {
    setAnnotation(e.target.value);
  };

  const saveAnnotation = () => {
    if (selectedText && annotation) {
      setAnnotations((prevAnnotations) => [
        ...prevAnnotations,
        { text: selectedText, annotation },
      ]);
      setSelectedText("");
      setAnnotation("");
      setShowAnnotation(false);
    }
  };

  return (
    <div>
      <p onMouseUp={handleTextSelection}>
        Select text in this paragraph to annotate:
      </p>
      {showAnnotation && (
        <div>
          <p>Selected Text: {selectedText}</p>
          <textarea
            placeholder="Add annotation..."
            value={annotation}
            onChange={handleAnnotationChange}
          />
          <button onClick={saveAnnotation}>Save Annotation</button>
        </div>
      )}
      <div>
        <h2>Annotations</h2>
        <ul>
          {annotations.map((item, index) => (
            <li key={index}>
              <strong>{item.text}:</strong> {item.annotation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GoogleDrive;
