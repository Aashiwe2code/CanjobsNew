import React, { useState, useEffect } from "react";
import { PdfLoader, PdfHighlighter } from "react-pdf-annotation";

const Annotation = () => {
  const [highlights, setHighlights] = useState([]);
  const [pdfScale, setPdfScale] = useState(1);

  useEffect(() => {
    // You can adjust the PDF scale factor based on your needs
    const scale = window.innerWidth < 600 ? 0.7 : 1;
    setPdfScale(scale);
  }, []);

  const saveHighlight = (highlight) => {
    setHighlights((prevHighlights) => [...prevHighlights, highlight]);
  };

  return (
    <div>
      <PdfLoader url="https://example.com/your-pdf-document.pdf">
        {(pdfDocument) => (
          <PdfHighlighter
            pdfDocument={pdfDocument}
            scale={pdfScale}
            onSelectionFinished={saveHighlight}
            highlights={highlights}
          />
        )}
      </PdfLoader>

      <div>
        <h4>Highlights</h4>
        <ul>
          {highlights.map((highlight, index) => (
            <li key={index}>{highlight.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Annotation;
