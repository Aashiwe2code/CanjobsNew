import React, { useState } from "react";
import { PdfAnnotator } from "react-pdf-annotator";

const GoogleDrive = ({ pdfUrl }) => {
  const [annotations, setAnnotations] = useState([]);

  const handleAnnotationAdded = (annotation) => {
    setAnnotations([...annotations, annotation]);
  };

  return (
    <PdfAnnotator
      pdfUrl={pdfUrl}
      annotations={annotations}
      onAnnotationAdded={handleAnnotationAdded}
    />
  );
};

export default GoogleDrive;
