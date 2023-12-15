import React, { useState, useRef } from "react";
import Button from "./components/Button/Button";
import Annotation from "./components/Annotation/Annotation";

const GoogleDrive = () => {
  const [showAnnotation, setShowAnnotation] = useState(false);
  const emojiButtonRef = useRef(null);

  const toggleAnnotation = (state = false) => {
    setShowAnnotation(state);
  };

  return (
    <div className={"container"}>
      <h1 className={"introSection"}>Welcome to the Annotations App Demo</h1>
      <div className={"firstSection"}>
        <Button onClick={() => false} variant="white" ref={emojiButtonRef}>
          <span role="img" aria-label="emoji">
            &#128512;&#128516;&#128151;&#128525;
          </span>
        </Button>
      </div>
      <div className={"secondSection"}>
        <Button
          variant="blue"
          onClick={() => toggleAnnotation(true)}
          ref={null}
        >
          Click Here to Toggle Annotation
        </Button>
      </div>
      {showAnnotation && (
        <Annotation
          elementRef={emojiButtonRef}
          toggleClose={() => toggleAnnotation(false)}
        >
          <div className={"annotationArrow"} />
          <div className={"annotation"}>
            <h2 className={"annotationText"}>This is an Emoji Button!</h2>
            <Button
              ref={null}
              variant="flat"
              onClick={() => toggleAnnotation(false)}
            >
              OK
            </Button>
          </div>
        </Annotation>
      )}
    </div>
  );
};

export default GoogleDrive;
