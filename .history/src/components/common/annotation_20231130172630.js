import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Annotation = ({ elementRef, toggleClose, children, className = "" }) => {
  const elementWrapperRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleElementClick = () => {
      toggleClose();
    };

    if (elementRef.current) {
      const clonedElement = elementRef.current.cloneNode(true);
      clonedElement.addEventListener("click", handleElementClick);

      const elementPosition = elementRef.current.getBoundingClientRect();

      if (elementWrapperRef.current && wrapperRef.current) {
        elementWrapperRef.current.appendChild(clonedElement);
        wrapperRef.current.style.top = `${elementPosition.top}px`;
        wrapperRef.current.style.left = `${elementPosition.left}px`;
      }

      return () => {
        clonedElement.removeEventListener("click", handleElementClick);
      };
    }
  }, [elementRef, toggleClose]);

  return (
    <>
      <div className={"backdrop"} />
      <div ref={wrapperRef} className={"container"}>
        <div ref={elementWrapperRef} className={"annotationWrapper"}>
          <div className={`annotationInfo className`}>{children}</div>
        </div>
      </div>
    </>
  );
};

Annotation.propTypes = {
  elementRef: PropTypes.object.isRequired,
  toggleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Annotation;
