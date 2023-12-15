import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import mammoth from "mammoth"; // Library for handling DOCX files

import "./Anotation.css"; // You might want to style your annotation overlay

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/build/pdf.worker.min.js`;

const Anotation = () => {
  const [selectedText, setSelectedText] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.type;

      if (fileType === "application/pdf") {
        // Handle PDF file
        // You may want to set the PDF file path in the state
      } else if (
        fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        // Handle DOCX file
        const reader = new FileReader();
        reader.onload = async (event) => {
          const result = event.target.result;
          const { value } = await mammoth.extractRawText({
            arrayBuffer: result,
          });
          console.log("DOCX Content:", value);
          // You can set the DOCX content in the state and render it
        };
        reader.readAsArrayBuffer(file);
      } else if (fileType.startsWith("image/")) {
        // Handle image file
        // You may want to set the image file path in the state
      } else {
        console.log("Unsupported file type");
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      {/* Display PDF document */}
      {numPages && (
        <div>
          <p onMouseUp={handleTextSelection}>
            Select text in the PDF document for annotation.
          </p>

          <Document
            file="/sample.pdf" // Assuming the PDF file is in the public folder
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>

          {showAnnotation && (
            <div className="annotation-overlay">
              <p>Selected Text: {selectedText}</p>
              <textarea
                placeholder="Add comment"
                value={annotation}
                onChange={handleAnnotationChange}
              />
              <button onClick={saveAnnotation} className="btn btn-primary">
                Save
              </button>
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
      )}
    </div>
  );
};

export default Anotation;
