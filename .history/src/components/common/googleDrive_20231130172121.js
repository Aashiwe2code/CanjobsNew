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
    <div className={styles.container}>
      <h1 className={styles.introSection}>
        Welcome to the Annotations App Demo
      </h1>
      <div className={styles.firstSection}>
        <Button onClick={() => false} variant="white" ref={emojiButtonRef}>
          <span role="img" aria-label="emoji">
            &#128512;&#128516;&#128151;&#128525;
          </span>
        </Button>
      </div>
      <div className={styles.secondSection}>
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
          <div className={styles.annotationArrow} />
          <div className={styles.annotation}>
            <h2 className={styles.annotationText}>This is an Emoji Button!</h2>
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
