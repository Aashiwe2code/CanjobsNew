import React, { useState } from "react";
import ReactFileViewer from "react-file-viewer";
import {
  PDFViewer,
  PDFLinkService,
  PDFPage,
  AnnotationLayer,
} from "react-pdf-annotator";
import "react-pdf-annotator/build/css/react-pdf-annotator.css";

const GoogleDrive = ({ fileUrl, fileType }) => {
  const [annotations, setAnnotations] = useState([]);

  const handleAddAnnotation = (annotation) => {
    setAnnotations([...annotations, annotation]);
  };

  return (
    <div>
      {fileType !== "pdf" ? (
        <ReactFileViewer fileType={fileType} filePath={fileUrl} />
      ) : (
        <PDFViewer width={600} height={800}>
          <PDFLinkService>
            <div>
              <PDFPage pageIndex={0} />
              <AnnotationLayer
                pageIndex={0}
                annotations={annotations}
                onAddAnnotation={handleAddAnnotation}
              />
            </div>
          </PDFLinkService>
        </PDFViewer>
      )}
    </div>
  );
};

export default GoogleDrive;
