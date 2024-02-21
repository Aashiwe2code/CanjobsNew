import React, { useState } from "react";
import { CiTrash, CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import moment from "moment";
import { Accordion } from "react-bootstrap";

export default function DocumentList({
  user_type,
  docData,
  setShowMoreDocType,
  setDocTypData,
  setDocName,
  setDocId,
  setOtherDoc,
  setHide,
  setShowSaveDoc,
  setFilteredEmails,
  setAnnotationMode,
  setReplyCommentClick,
  setDocFile,
  docName,
  docId,
  setEditName,
  OnDeleteDoc,
  textReplaceFunction,
  setBulkUpload,
  SaveBulkDocument,
  editName,
  setDocFileBase,
  isAnnotationMode,
  setSelecttDocTypeName,
  setApiCall,
  docAllTypes,
  setDocTypeName,
}) {
  const [editDocName, setEditDocName] = useState(docName);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionToggle = (type) => {
    setActiveAccordion(activeAccordion === type ? null : type);
    setSelecttDocTypeName(type);
    setDocTypData();
    setDocFile();
    setDocName();
  };

  return (
    <div
      className={`${
        user_type === "admin" ? "col-md-2" : "col-md-4"
      } p-0 border-right pb-7`}
    >
      <h5 className="pl-5 pt-5 d-flex justify-content-between align-items-center">
        Document List
      </h5>

      {/* Documents type list */}
      <div className="doc_list">
        {docAllTypes.length === 0 ? (
          <div>
            <p>No Data Found</p>
          </div>
        ) : (
          (docAllTypes || []).map((typeitem, index) => (
            <Accordion
              key={index}
              activeKey={activeAccordion}
              className="w-100 p-0 m-0 border-0"
            >
              <Accordion.Item
                eventKey={typeitem.type}
                className="card w-100 rounded-6 overflow-hidden border-0"
              >
                <Accordion.Header
                  className="w-100 m-0 border-0 bg-info accordian_btn_design font-size-4 text-dark text-left"
                  onClick={() => handleAccordionToggle(typeitem.type)}
                >
                  {typeitem.type}
                </Accordion.Header>
                <Accordion.Body>
                  <table className="table font-size-3">
                    <tbody className="doc_list">
                      {docData.length === 0 ? (
                        <tr>
                          <td>No Data Found</td>
                        </tr>
                      ) : (
                        docData.map((item) => (
                          <tr
                            key={item.id}
                            action
                            active={
                              item.document_name === docName ||
                              docId === item.id
                            }
                            onClick={() => {
                              setShowMoreDocType(false);
                              setDocTypData(item);
                              setDocTypeName(item.type);
                              setDocName(item.document_name);
                              setDocId(item.id);
                              setOtherDoc(false);
                              setHide(false);
                              setShowSaveDoc(false);
                              setFilteredEmails([]);
                              setAnnotationMode(!isAnnotationMode);
                              setReplyCommentClick();
                              setDocFile(
                                item.document_url +
                                  `?v=${
                                    new Date().getMinutes() +
                                    new Date().getSeconds()
                                  }`
                              );
                            }}
                            className={
                              item.document_name === docName ||
                              docId === item.id
                                ? "text-capitalize bg-primary text-white position-relative"
                                : "text-capitalize position-relative"
                            }
                          >
                            <td className="p-3 doc_name_td">
                              {editName === true && docId === item.id ? (
                                <form
                                  onSubmit={() => {
                                    SaveBulkDocument();
                                  }}
                                  className="reply_box position-relative d-flex w-100"
                                >
                                  <input
                                    type="text"
                                    value={
                                      editDocName === "" ? docName : editDocName
                                    }
                                    className="form-control font-size-2 bg-primary bg-white"
                                    onChange={(e) => {
                                      const key = e.target.value;
                                      setEditDocName(key);
                                      const newData = [
                                        {
                                          type: item.type,
                                          docName: key,
                                          docUrl: "",
                                        },
                                      ];
                                      setDocFileBase(newData);
                                      setBulkUpload("no");
                                    }}
                                  />
                                  <button
                                    type="submit"
                                    // onClick={() => {
                                    //   SaveBulkDocument();
                                    // }}
                                    className="btn btn-secondary rounded reply_btn doc_btn my-0 mx-2"
                                  >
                                    &#x2713;
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditName(false);
                                    }}
                                    className="btn btn-light border-0 rounded reply_btn doc_btn my-0 mx-2"
                                  >
                                    x
                                  </button>
                                </form>
                              ) : (
                                <>
                                  <span>
                                    {textReplaceFunction(item.document_name)}
                                  </span>
                                  <p className="font-size-2 m-0">
                                    {moment(item.updated_at).format(
                                      "DD-MMM-YYYY"
                                    )}
                                  </p>
                                </>
                              )}
                            </td>
                            <td className="p-3 d-flex align-items-center justify-content-end">
                              {item.is_varify === "1" ? (
                                <span>&#x2713;</span>
                              ) : (
                                ""
                              )}
                              <Link
                                onClick={() => {
                                  setEditName(true);
                                }}
                                className="text-dark"
                                title="Edit Name"
                              >
                                <CiEdit
                                  style={{
                                    color:
                                      item.type === docName ? "white" : "black",
                                    fontSize: "18px",
                                  }}
                                />
                              </Link>
                              <Link
                                onClick={() => OnDeleteDoc(item.id)}
                                title="Delete Document"
                              >
                                <CiTrash
                                  style={{
                                    color:
                                      item.type === docName ? "white" : "black",
                                    fontSize: "18px",
                                  }}
                                />
                              </Link>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))
        )}
      </div>
    </div>
  );
}
