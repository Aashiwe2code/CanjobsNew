import React, { useState } from "react";

export default function Annotation() {
  const [selectedText, setSelectedText] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [annotations, setAnnotations] = useState([]);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
      setSelectedText(selectedText);
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
    }
  };

  return (
    <div>
      <p onMouseUp={handleTextSelection}>
        Select text in the PDF document for annotation.
      </p>

      {selectedText && (
        <div>
          <p>Selected Text: {selectedText}</p>
          <textarea
            placeholder="Add comment"
            value={annotation}
            onChange={handleAnnotationChange}
          />
          <button onClick={saveAnnotation}>Save</button>
        </div>
      )}

      <div>
        <h4>Comments</h4>
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
}
