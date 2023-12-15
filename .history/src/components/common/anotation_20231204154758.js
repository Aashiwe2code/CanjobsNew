import React, { useState, useRef, useEffect } from "react";
import { fabric } from "fabric";

const Annotation = () => {
  const [canvas, setCanvas] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: false,
    });

    setCanvas(newCanvas);

    // Handle mouse events for drawing
    newCanvas.on("mouse:down", (options) => handleMouseDown(options));
    newCanvas.on("mouse:move", (options) => handleMouseMove(options));
    newCanvas.on("mouse:up", (options) => handleMouseUp(options));

    // Load existing annotations
    loadAnnotations(newCanvas);

    return () => {
      newCanvas.off("mouse:down");
      newCanvas.off("mouse:move");
      newCanvas.off("mouse:up");
    };
  }, []);

  const handleMouseDown = (options) => {
    if (!options.target) {
      setIsDrawing(true);

      const pointer = canvas.getPointer(options.e);
      const newAnnotation = new fabric.IText("Type your annotation", {
        left: pointer.x,
        top: pointer.y,
        fontSize: 16,
        fill: "red",
        hasControls: true,
        lockUniScaling: true,
      });

      canvas.add(newAnnotation);
      setAnnotations([...annotations, newAnnotation]);
    }
  };

  const handleMouseMove = (options) => {
    if (isDrawing && options.target) {
      options.target.set({
        left: options.e.clientX - options.target.width / 2,
        top: options.e.clientY - options.target.height / 2,
      });
      canvas.renderAll();
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const loadAnnotations = (loadedCanvas) => {
    // You can load existing annotations from a database or storage
    // In this example, we're loading a hardcoded set of annotations
    const savedAnnotations = [
      { text: "Annotation 1", left: 100, top: 100 },
      { text: "Annotation 2", left: 200, top: 200 },
    ];

    savedAnnotations.forEach((annotation) => {
      const loadedAnnotation = new fabric.IText(annotation.text, {
        left: annotation.left,
        top: annotation.top,
        fontSize: 16,
        fill: "red",
        hasControls: true,
        lockUniScaling: true,
      });

      loadedCanvas.add(loadedAnnotation);
      setAnnotations([...annotations, loadedAnnotation]);
    });
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid #000" }}
      ></canvas>
    </div>
  );
};

export default Annotation;
