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
}) {
  const [editDocName, setEditDocName] = useState(docName);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionToggle = (type) => {
    setActiveAccordion(activeAccordion === type ? null : type);
    // setApiCall(true);
    setSelecttDocTypeName(type);
  };
  console.log(docData);
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
            <p className="bg-white text-center" colSpan={1}>
              No Data Found
            </p>
          </div>
        ) : (
          (docAllTypes || []).map((item, index) => (
            <Accordion
              className="w-100 p-0 m-0 border-0"
              activeKey={activeAccordion}
              onSelect={() => handleAccordionToggle(item.type)}
              flush
            >
              <Accordion.Item
                eventKey={item.id}
                className="card w-100 rounded-6 overflow-hidden border-0"
              >
                <Accordion.Header className="w-100 m-0 border-0 bg-white accordian_btn_design">
                  <div className="d-flex executive_box gx-2 w-100 justify-content-between align-items-center">
                    <div className="text-left mb-0 d-flex profile_name_box ">
                      <h6 className="m-0 text-black-3 font-weight-bold d-block text-capitalize ml-4">
                        {item.type}
                      </h6>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {/* Document's  Table */}
                  <table className="table font-size-3">
                    <thead>
                      <tr>
                        <th className="p-3" scope="col">
                          Document
                        </th>
                        {/* <th className="p-3" scope="col">
                  Date
                </th> */}
                        {/* <th className="p-3" scope="col"></th>
                <th className="p-3" scope="col"></th> */}
                      </tr>
                    </thead>
                    <tbody className="doc_list">
                      {docData.length === 0 ? (
                        <tr>
                          <th className="bg-white text-center" colSpan={1}>
                            No Data Found
                          </th>
                        </tr>
                      ) : (
                        (docAllTypes || []).map((item, index) => (
                          <tr
                            key={index}
                            action
                            // active={
                            //   docTypData.type === item.type ||
                            //   (showMoreDocType === false && item.type === docName)
                            // }
                            active={item.type === docName || docId === item.id}
                            onClick={() => {
                              setShowMoreDocType(false);
                              setDocTypData(item);
                              setDocName(item.type);
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
                              item.type === docName || docId === item.id
                                ? "text-capitalize bg-primary text-white position-relative"
                                : "text-capitalize position-relative"
                            }
                          >
                            <td className="p-3 doc_name_td">
                              {editName === true && docId === item.id ? (
                                <div className="reply_box position-relative d-flex w-100">
                                  <input
                                    type="text"
                                    value={
                                      editDocName === "" ? docName : editDocName
                                    }
                                    className="form-control font-size-2 bg-primary bg-white"
                                    onChange={(e) => {
                                      const key = e.target.value;
                                      setEditDocName(key);
                                      const newData = { [key]: "" };
                                      // setDocName(key);
                                      setDocFileBase(newData);
                                      setBulkUpload("no");
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      SaveBulkDocument();
                                    }}
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
                                </div>
                              ) : (
                                <>
                                  <span> {textReplaceFunction(item.type)}</span>
                                  <p className="font-size-2 m-0">
                                    {moment(item.updated_at).format(
                                      "DD-MMM-YYYY"
                                    )}
                                  </p>
                                </>
                              )}
                            </td>
                            {/* <td className="p-3">
                        {item.updated_by_name
                          ? item.updated_by_name
                          : item.created_by_name}
                      </td> */}
                            {/* <td className="p-3"></td>
                      <td className="p-3">

                      </td> */}
                            <td className="p-3 d-flex align-items-center justify-content-end">
                              {item.is_varify === "1" ? (
                                // <span className="verified_doc">
                                //   <img className="w-100" src={Verified} alt="" />
                                // </span>
                                <span>&#x2713;</span>
                              ) : (
                                ""
                              )}
                              <Link
                                onClick={() => {
                                  setEditName(true);
                                  // setEditDocName(item.type);
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
      {/* <ListGroup defaultActiveKey="#link1">
          {(docData || []).map((item, index) => (
            <ListGroup.Item
              key={index}
              action
              // active={
              //   docTypData.type === item.type ||
              //   (showMoreDocType === false && item.type === docName)
              // }
              active={item.type === docName}
              onClick={() => {
                setShowMoreDocType(false);
                setDocTypData(item);
                setDocName(item.type);
                setDocId(item.id);
                setOtherDoc(false);
                setHide(false);
                setShowSaveDoc(false);
                setDocFile(
                  item.document_url +
                    `?v=${new Date().getMinutes() + new Date().getSeconds()}`
                );
              }}
              className="text-capitalize"
            >
              {textReplaceFunction(item.type)}
              {item.is_varify === "1" ? (
                <span className="verified_doc">
                  <img className="w-100" src={Verified} alt="" />
                </span>
              ) : null}
            </ListGroup.Item>
          ))}
          <ListGroup.Item
            className={
              user_type === "company" || user_type === "admin"
                ? "bg-secondary text-white"
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
            }}
          >
            <b>+ Add New Documents</b>
          </ListGroup.Item>
        </ListGroup> */}
    </div>
  );
}
