import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import { MdAddComment } from "react-icons/md";
import { FaFlag } from "react-icons/fa";
import { Form } from "react-bootstrap";
export default function ViewDocument({
  handleBulkFileChange,
  setBulkUpload,
  showSaveDoc,
  SaveBulkDocument,
  setHide,
  setApiCall,
  setShowSaveDoc,
  setDocFile,
  setDocFileExt,
  setFilteredEmails,
  docFile,
  docName,
  Verified,
  onVerifyDocuments,
  PrintDocument,
  DownloadDocument,
  loading,
  Loader,
  RenderNewDocFile,
  setAnnotationMode,
  setComments,
  setReplyCommentClick,
  setAddCommentFlag,
  docTypData,
  handleFlagClick,
  setSelectedAnnotation,
  hide,
  user_type,
  isAnnotationMode,
  imageAnnotations,
  selectedAnnotation,
  otherDoc,
  setDocName,
  DocTypeData,
  textReplaceFunction,
  setShowMoreDocType,
  setDocTypData,
  setDocId,
  setOtherDoc,
  showMoreDocType,
  handleDocTypeChange,
  setDocTypeName,
  docTypeName,
  bulkUpload,
}) {
  return (
    <div
      className={`${
        user_type === "admin" ? "col-md-7" : "col-md-8"
      } p-2 bg-dark`}
    >
      <div className="row px-0 pt-0 pb-2 doc_upload_row m-0">
        {/* <div className="d-flex flex-wrap justify-content-start">
              {otherDoc === true ? (
                <div className="doc_upload_col">
                  <input
                    className="form-control"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    placeholder="Document Name"
                  />
                </div>
              ) : null}
              <div className="">
                <label className="btn btn-secondary doc_btn">
                  <AiOutlineCloudUpload className="font-size-3 mr-2" />
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      handleBulkFileChange(e, docTypData.id);
                      setHide(true);
                    }}
                    multiple
                  />
                  Upload New Documents
                </label>
              </div>
              {docTypData.id && (
                <div className="">
                  <label className="btn btn-light doc_btn">
                    <AiOutlineCloudUpload className="font-size-3 mr-2" />
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        handleBulkFileChange(e, docTypData.id);
                        setHide(true);
                      }}
                    />
                    Update Current Document
                  </label>
                </div>
              )}
              {showSaveDoc ? (
                <div className="doc_upload_col">
                  <button
                    className="btn btn-primary doc_btn"
                    onClick={SaveBulkDocument}
                  >
                    Save Documents
                  </button>
                </div>
              ) : null}
              {hide === true ? (
                <div className="doc_upload_col">
                  <button
                    className="btn btn-light doc_btn"
                    onClick={() => {
                      setHide(false);
                      setApiCall(true);
                      setShowSaveDoc(false);
                      setDocFile("");
                      setDocFileExt("");
                      setFilteredEmails([]);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
            </div> */}
        {showMoreDocType ? (
          <div className="doc_upload_col doc_btn">
            <Form.Select
              className="form-control select_document_type"
              value={docTypeName}
              onChange={(e) => handleDocTypeChange(e)}
            >
              <option value={""}>Select document</option>
              {(DocTypeData || []).map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {textReplaceFunction(item)}
                  </option>
                );
              })}
              <option value={"other"}>Other</option>
            </Form.Select>
          </div>
        ) : (
          <button
            className={
              user_type === "user" ||
              user_type === "admin" ||
              user_type === "agent"
                ? "btn btn-secondary btn-sm text-white mr-0 doc_btn"
                : "d-none"
            }
            onClick={() => {
              setShowMoreDocType(true);
              setDocTypData("");
              setDocId("");
              setOtherDoc(false);
              setDocFile("");
              setHide(false);
              setShowSaveDoc(false);
              setBulkUpload("yes");
            }}
          >
            + Add New Documents
          </button>
        )}
        {otherDoc === true ? (
          <div className="doc_upload_col doc_btn">
            <input
              className="form-control"
              value={docTypeName}
              onChange={(e) => setDocTypeName(e.target.value)}
              placeholder="Document Type Name"
            />
          </div>
        ) : null}
        {console.log(
          !docTypeName && (bulkUpload === "" || bulkUpload === "no"),
          bulkUpload,
          "pppppp",
          docTypeName
        )}
        {!docTypeName && (bulkUpload === "" || bulkUpload === "no") ? null : (
          <div className="">
            <label className="btn btn-secondary doc_btn">
              <AiOutlineCloudUpload className="font-size-3 mr-2" />
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                style={{ display: "none" }}
                onChange={(e) => {
                  handleBulkFileChange(e);
                  setHide(true);
                }}
                multiple
              />
              Select Documents
            </label>
          </div>
        )}
        {docTypData && docTypData.id && (
          <div className="">
            <label className="btn btn-light doc_btn">
              <AiOutlineCloudUpload className="font-size-3 mr-2" />
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                style={{ display: "none" }}
                onChange={(e) => {
                  handleBulkFileChange(e, docTypData.id);
                  setHide(true);
                  setBulkUpload("no");
                }}
              />
              Update Current Document
            </label>
          </div>
        )}
        {showSaveDoc ? (
          <div className="doc_upload_col">
            <button
              className="btn btn-primary doc_btn"
              onClick={SaveBulkDocument}
            >
              Save Documents
            </button>
          </div>
        ) : null}
        {hide === true ? (
          <div className="doc_upload_col">
            <button
              className="btn btn-light doc_btn"
              onClick={() => {
                setHide(false);
                setApiCall(true);
                setShowSaveDoc(false);
                setDocFile("");
                setDocFileExt("");
                setFilteredEmails([]);
              }}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </div>
      <div className="doc_preview_box p-0 bg-light rounded position-relative">
        {/* {docTypData ? ( */}
        <div className="doc_action_div">
          {/* {docFile ? (
                hide === false && docTypData && user_type === "admin" ? (
                  <div className="doc_upload_col">
                    {docTypData.is_varify === "1" ? (
                      <img className="verified_doc_img" src={Verified} alt="" />
                    ) : (
                      <button
                        className="btn btn-info doc_btn"
                        disabled={docTypData.is_varify === "0" ? false : true}
                        onClick={() => onVerifyDocuments(docTypData.id, 1)}
                      >
                        Verify document
                      </button>
                    )}
                  </div>
                ) : null
              ) : null} */}
          {hide === false && docFile && docName && user_type === "admin" ? (
            <div className="doc_upload_col d-flex flex-end align-items-center">
              {docTypData.is_varify === "0" ? (
                <button
                  className="btn btn-info doc_btn"
                  disabled={docTypData.is_varify === "0" ? false : true}
                  onClick={() => onVerifyDocuments(docTypData.id, 1)}
                >
                  Verify document
                </button>
              ) : (
                <img className="verified_doc_img" src={Verified} alt="" />
              )}
              <button
                className="p-1 rounded-3 btn-warning mx-2 w-auto btn doc_btn"
                onClick={PrintDocument}
                title="Print Document"
              >
                <i className="fa fa-print" aria-hidden="true"></i>
              </button>
              <button
                className="p-1 rounded-3 btn-info w-auto btn doc_btn"
                onClick={DownloadDocument}
                title="Download Document"
              >
                <i className="fa fa-download" aria-hidden="true"></i>
              </button>
            </div>
          ) : null}
        </div>
        {/* Annotation */}
        {loading === true ? (
          <Loader />
        ) : docFile ? (
          <div>
            <div
              id="annotation-container"
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <div className="d-flex justify-content-center position-relative">
                {/* <RenderNewDocFile /> */}
                {RenderNewDocFile()}
                <Link
                  className={` ${
                    hide === false &&
                    docFile &&
                    docName &&
                    user_type === "admin"
                      ? `btn-sm mt-7 doc_btn ${
                          isAnnotationMode ? "btn-primary " : "btn-secondary"
                        }`
                      : "d-none"
                  }`}
                  style={{
                    position: "fixed",
                    bottom: "285px",
                    right: "24%",
                    zIndex: "99",
                  }}
                  onClick={() => {
                    setAnnotationMode(!isAnnotationMode);
                    setComments("");
                    setReplyCommentClick();
                    setAddCommentFlag(false);
                    //condition if the pdf is of imm
                    if (
                      docTypData.document_name &&
                      !isAnnotationMode &&
                      docTypData.document_name.toLowerCase().includes("imm")
                    ) {
                      handleFlagClick({ x_axis: 1, y_axis: 1 });
                    } else setSelectedAnnotation(null);
                  }}
                >
                  {isAnnotationMode ? <RxCrossCircled /> : <MdAddComment />}
                </Link>
              </div>
              {/* Transparent overlay for capturing click events */}
              {!hide && docFile && docName && user_type === "admin" && (
                <>
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
                        left: annotation.x_axis - 5,
                        top: annotation.y_axis - 5,
                        cursor: "pointer",
                      }}
                      onClick={() => handleFlagClick(annotation)}
                    >
                      <FaFlag
                        className=""
                        style={{
                          color:
                            selectedAnnotation &&
                            selectedAnnotation.x_axis === annotation.x_axis &&
                            selectedAnnotation.y_axis === annotation.y_axis
                              ? "blue"
                              : annotation.status === "1"
                              ? "green"
                              : "red",
                          display: annotation.status === "1" ? "none" : "block",
                        }}
                      />
                    </div>
                  ))}

                  {/* {selectedAnnotation && addCommentFlag === true && (
                        <div
                          style={{
                            position: "absolute",
                            left: selectedAnnotation.x_axis + 10,
                            top: selectedAnnotation.y_axis + 20,
                            zIndex: 1,
                          }}
                        >
                          <form
                            className="comment-form"
                            onSubmit={(e) => {
                              e.preventDefault();
                              addAnnotation(selectedAnnotation);
                            }}
                          >
                            <div className="comment-input-container">
                              <input
                                type="text"
                                value={comments || ""}
                                onChange={handleInputChange}
                                placeholder="Comments or add others with @"
                                className="rounded-pill comment-input"
                              />
                              {filteredEmails.length > 0 && (
                                <ul className="email-suggestions">
                                  {filteredEmails.map((email) => (
                                    <li
                                      key={email.email}
                                      onClick={() =>
                                        handleEmailClick(email.email)
                                      }
                                      onMouseOver={() =>
                                        handleEmailMouseOver(email.email)
                                      }
                                      className="email-suggestion-item"
                                    >
                                      <strong>{email.name}</strong>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                            <div className="button-container mx-4">
                              <button
                                type="submit"
                                // onClick={(e) => {
                                //   e.preventDefault();
                                //   addAnnotation(selectedAnnotation);

                                // }}
                                className="btn-sm btn-primary rounded-pill save-comment-btn"
                              >
                                Save Comment
                              </button>
                              <button
                                className="btn-sm btn-info rounded-pill cancel-btn"
                                onClick={() => {
                                  setAddCommentFlag();
                                  setSelectedAnnotation(null);
                                  setComments("");
                                  setAnnotationMode(!isAnnotationMode);
                                  setFilteredEmails([]);
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      )} */}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center mt-5">No document found</div>
        )}
        {/* Annotation Close */}
      </div>
    </div>
  );
}
