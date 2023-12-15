import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { useDropzone } from "react-dropzone";
export default function Anotation() {
  const [selectedText, setSelectedText] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setPdfFile(file);

    // You can perform additional actions with the PDF file here
  };

  const addAnnotation = async () => {
    if (!pdfFile) return;

    const fileArrayBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileArrayBuffer);

    // Example: Add a text annotation on the first page
    const firstPage = pdfDoc.getPage(0);
    const annotation = firstPage.drawText("Your annotation text", {
      x: 50,
      y: 50,
      font: await pdfDoc.embedFont(PDFDocument.Font.Helvetica),
      size: 12,
      color: [1, 0, 0],
    });

    setAnnotations([...annotations, annotation]);

    // Save the modified PDF
    const modifiedPdfBytes = await pdfDoc.save();
    const modifiedPdfBlob = new Blob([modifiedPdfBytes], {
      type: "application/pdf",
    });
    const modifiedPdfFile = new File([modifiedPdfBlob], "modified.pdf", {
      type: "application/pdf",
    });

    // Now you can save or display the modified PDF file as needed
  };

  const renderAnnotations = () => {
    return annotations.map((annotation, index) => (
      <div key={index}>
        Annotation {index + 1}: {annotation.contents}
      </div>
    ));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
        For the open-source mobile application framework, see React Native.
        React Original author(s) Jordan Walke Developer(s) Meta and community
        Initial release May 29, 2013; 10 years ago[1] Stable release 18.2.0[2]
        Edit this on Wikidata / 14 June 2022; 17 months ago Repository
        github.com/facebook/react Edit this at Wikidata Written in JavaScript
        Platform Web platform Type JavaScript library License MIT License
        Website react.dev React (also known as React.js or ReactJS) is a free
        and open-source front-end JavaScript library[3][4] for building user
        interfaces based on components. It is maintained by Meta (formerly
        Facebook) and a community of individual developers and
        companies.[5][6][7] React can be used to develop single-page, mobile, or
        server-rendered applications with frameworks like Next.js. Because React
        is only concerned with the user interface and rendering components to
        the DOM, React applications often rely on libraries for routing and
        other client-side functionality.
      </p>
      {showAnnotation && (
        <div>
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
      <div>
        <h1>PDF Annotation Example</h1>

        <div
          {...getRootProps()}
          style={{ border: "2px dashed #ccc", padding: "20px", margin: "20px" }}
        >
          <input {...getInputProps()} />
          <p>Drag and drop a PDF file here, or click to select one</p>
        </div>

        {pdfFile && (
          <div>
            <h2>Annotations:</h2>
            {renderAnnotations()}
            <button onClick={addAnnotation}>Add Annotation</button>
          </div>
        )}
      </div>
    </div>
  );
}
