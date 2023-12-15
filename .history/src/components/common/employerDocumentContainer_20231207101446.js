import React, { useState, useEffect, useRef } from "react";
import FileViewer from "react-file-viewer";
import { FaFlag } from "react-icons/fa";
import { MdAddComment } from "react-icons/md";
import { FcCancel } from "react-icons/fc";

const EmployerDocumentContainer = (props) => {
  const [imageAnnotations, setImageAnnotations] = useState([]);
  const [comments, setComments] = useState({});
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [isAnnotationMode, setAnnotationMode] = useState(false);

  const fileViewerRef = useRef(null);

  const handleFileViewerClick = (e) => {
    if (isAnnotationMode) {
      const rect = fileViewerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setImageAnnotations([...imageAnnotations, { x, y }]);
    }
  };

  const handleFlagClick = (annotation) => {
    if (
      selectedAnnotation &&
      selectedAnnotation.x === annotation.x &&
      selectedAnnotation.y === annotation.y
    ) {
      setSelectedAnnotation(null);
    } else {
      setSelectedAnnotation(annotation);
    }
  };

  const getCommentsList = () => {
    const commentsList = [];
    for (const key in comments) {
      if (comments.hasOwnProperty(key)) {
        commentsList.push({ coordinates: key, comment: comments[key] });
      }
    }
    return commentsList;
  };

  useEffect(() => {
    setSelectedAnnotation(null);
  }, [isAnnotationMode]);

  return (
    <div className="document_container bg-white py-7 mb-10">
      <div className="row m-0">
        <div className="col-md-4 p-0 border-right">
          {/* Your document list code here */}
        </div>
        <div className="col-md-4">
          <div className="row px-0 pt-0 pb-5 doc_upload_row m-0">
            {/* Your document upload code here */}
          </div>
          <div className="doc_preview_box p-5 bg-light rounded position-relative">
            <div className="doc_action_div">
              {/* Your document actions code here */}
            </div>

            {isAnnotationMode && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
              />
            )}

            {imageAnnotations.map((annotation, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: annotation.x - 5,
                  top: annotation.y - 5,
                  cursor: "pointer",
                }}
                onClick={() => handleFlagClick(annotation)}
              >
                <FaFlag
                  style={{
                    color:
                      selectedAnnotation &&
                      selectedAnnotation.x === annotation.x &&
                      selectedAnnotation.y === annotation.y
                        ? "pink"
                        : "red",
                  }}
                />
              </div>
            ))}

            {selectedAnnotation && (
              <div
                style={{
                  position: "absolute",
                  left: selectedAnnotation.x + 10,
                  top: selectedAnnotation.y + 20,
                  zIndex: 1,
                }}
              >
                <form>
                  <input
                    type="text"
                    value={
                      comments[
                        `${selectedAnnotation.x}-${selectedAnnotation.y}`
                      ] || ""
                    }
                    onChange={(e) =>
                      setComments({
                        ...comments,
                        [`${selectedAnnotation.x}-${selectedAnnotation.y}`]:
                          e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAnnotation(null);
                    }}
                  >
                    Save Comment
                  </button>
                </form>
              </div>
            )}

            {/* Your FileViewer component */}
            <div
              className="w-100"
              ref={fileViewerRef}
              onClick={handleFileViewerClick}
            >
              <FileViewer
                fileType={"pdf"}
                filePath={"https://example.com/sample.pdf"}
                errorComponent={() => <div>Error loading document</div>}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 p-0 border-left">
          <div
            style={
              getCommentsList().length === 0
                ? { display: "none" }
                : { marginTop: "20px" }
            }
          >
            <h2>List of Comments:</h2>
            <ul>
              {getCommentsList().map((commentItem, index) => (
                <li key={index} className="text-break">
                  <strong>{commentItem.coordinates}:</strong>{" "}
                  {commentItem.comment}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDocumentContainer;
