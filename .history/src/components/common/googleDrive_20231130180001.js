import React from "react";

// Custom hook for adding an annotation

// Using the custom hook to add an annotation
const GoogleDrive = () => {
  const useAnnotation = (component, annotationText) => {
    return (
      <div style={{ border: "2px solid red", padding: "10px" }}>
        <p>{annotationText}</p>
        {component}
      </div>
    );
  };
  const annotatedComponent = useAnnotation(
    <div>Content of MyFunctionalComponent</div>,
    "This is an annotation"
  );

  return <div>{annotatedComponent}</div>;
};
export default GoogleDrive;
