import React, { useState } from "react";
import { Worker, Viewer, AnnotationLayer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/annotation-layer/lib/styles/index.css";
import { pdfjs } from "react-pdf";

const GoogleDrive = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
      >
        <Viewer fileUrl={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} />
        <AnnotationLayer pageIndex={pageNumber - 1} />
      </Worker>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export default GoogleDrive;
