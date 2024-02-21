import React, { useState, useRef } from "react";
// import { Form } from "react-bootstrap";
import Loader from "./loader";
import {
  // UploadDocument,
  UploadBulkDocument,
  GetEmployeeDocumentList,
  VarifyDocument,
  ADocAnnotation,
  GetCommentsAndAssign,
  getallAdminData,
  UpdateDocuentcommentAssign,
  // DeleteCommentsAndAssign,
  DeleteDocument,
  SendReplyCommit,
  GetReplyCommit,
} from "../../api/api";
import LazyLoad from "react-lazy-load";
import { toast } from "react-toastify";
import FileViewer from "react-file-viewer";
import { useEffect } from "react";
import Verified from "../../media/verified.png";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
/*Annotation */
import { FaFlag } from "react-icons/fa";
import { MdAddComment } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import moment from "moment";
import CommentBox from "./CommentBox";
export default function DocumrentContainer(props) {
  const [otherDoc, setOtherDoc] = useState(false);
  const [docName, setDocName] = useState("");
  const [docData, setDocData] = useState([]);
  const [docTypData, setDocTypData] = useState("");
  const [apiCall, setApiCall] = useState("");
  const [docFile, setDocFile] = useState("");
  const [docFileBase, setDocFileBase] = useState("");
  const [docFileExt, setDocFileExt] = useState("");
  const [docId, setDocId] = useState("");
  // const [documentName, setDocumentName] = useState("");
  const [showMoreDocType, setShowMoreDocType] = useState(false);
  const [showSaveDoc, setShowSaveDoc] = useState(false);
  const [hide, setHide] = useState(false);
  const [bulkUpload, setBulkUpload] = useState("");
  const [loading, setLoading] = useState(true);
  // let encoded;
  let user_type = localStorage.getItem("userType");
  let admin_id = localStorage.getItem("admin_id");
  // Annotation State
  const [commenAapiCall, setCommentApiCall] = useState("");
  const [imageAnnotations, setImageAnnotations] = useState([]);
  const [comments, setComments] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [isAnnotationMode, setAnnotationMode] = useState(false);
  let [allAdmin, setAllAdmin] = useState([]);
  let [adminid, setAdminId] = useState();
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [selectedAdminReply, setSelectedAdminReplye] = useState("");
  const [addCommentFlag, setAddCommentFlag] = useState(false);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const fileViewerRef = useRef(null);
  let [annotationStatus, setAnnotationStatus] = useState();
  let [replyCommentClick, setReplyCommentClick] = useState();
  const [commentsReplyList, setCommentsReplyList] = useState([]);
  /*Function to get admin list */
  const AdminData = async () => {
    try {
      const userData = await getallAdminData();
      if (userData.data.length === 0) {
        setAllAdmin([]);
      } else {
        // const filteredData = userData.data.filter(item => item.admin_type === "manager");
        setAllAdmin(userData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*onchange Function to set email or any other comment  */
  const handleInputChange = (event, type) => {
    const value = event.target.value;
    if (value.startsWith("@")) {
      AdminData();
      if (allAdmin) {
        // Filter admin emails based on input
        const filteredAdminEmails = allAdmin.filter((admin) =>
          admin.email.toLowerCase().includes(value.slice(1).toLowerCase())
        );

        // Update the filtered emails
        setFilteredEmails(filteredAdminEmails);
      }
    } else {
      // Reset filtered emails if input doesn't start with '@'
      setFilteredEmails([]);
    }

    // Update the input value
    if (type === "reply") {
      setReplyComment(value);
    } else {
      setComments(value);
    }
  };
  /*Function to get the email to assign */
  const handleEmailClick = (email, type) => {
    // Set the selected admin and update the input value
    if (type === "reply") {
      setSelectedAdminReplye(email);
      setReplyComment(replyComment);
    } else {
      setSelectedAdmin(email);
      setComments(comments);
    }
    setFilteredEmails([]);
  };
  /*Function to get the email to input on hover */
  const handleEmailMouseOver = (email, type) => {
    // Highlight the email on mouseover
    if (type === "reply") {
      setReplyComment(email);
    } else {
      setComments(email);
    }
  };
  // Handle click event on the FileViewer to capture annotations
  const handleFileViewerClick = (e) => {
    if (isAnnotationMode) {
      const rect = fileViewerRef.current.getBoundingClientRect();
      const x_axis = e.clientX - rect.left;
      const y_axis = e.clientY - rect.top;
      handleFlagClick({ x_axis, y_axis });
      setImageAnnotations([...imageAnnotations, { x_axis, y_axis }]);
      setAddCommentFlag(true);
    }
  };

  // Handle flag click to select the annotation and toggle the form visibility for image annotation
  const handleFlagClick = (annotation) => {
    // if (
    //   selectedAnnotation &&
    //   selectedAnnotation.x === annotation.x &&
    //   selectedAnnotation.y === annotation.y
    // ) {
    //   setSelectedAnnotation(null);
    // } else {
    setSelectedAnnotation(annotation);
    // }
  };
  // Generate a list of comments from the state for image annotation
  const getCommentsList = async () => {
    if (docId || (docData && docData.find((item) => item.type === docName))) {
      try {
        let res = await GetCommentsAndAssign(
          docId ? docId : docData.find((item) => item.type === docName).id,
          adminid,
          annotationStatus
        );
        if (res.data.status === (1 || "1")) {
          setCommentsList(res.data.data.reverse());
          setImageAnnotations(res.data.data);
        } else if (res.data.message === "Task data not found") {
          setCommentsList([]);
          setImageAnnotations([]);
        }
      } catch (err) {
        console.log(err);
        setCommentsList([]);
        setImageAnnotations([]);
      }
    } else {
      setCommentsList([]);
      setImageAnnotations([]);
    }
  };

  // Generate a list of comments reply
  const getCommentsReplyList = async () => {
    if (docId || docData.find((item) => item.type === docName)) {
      try {
        let res = await GetReplyCommit(
          docId ? docId : docData.find((item) => item.type === docName).id,
          adminid,
          annotationStatus
        );
        if (res.data.status === (1 || "1")) {
          setCommentsReplyList(res.data.data.reverse());
        }
      } catch (err) {
        console.log(err);
        setCommentsReplyList([]);
      }
    } else {
      setCommentsReplyList([]);
    }
  };
  /*Annotaton functionalites close */
  /*Functo get Applicants Document */
  const GetDocument = async () => {
    try {
      let response = await GetEmployeeDocumentList(props.employee_id);
      if (
        response.data.data === undefined ||
        response.data.data === "" ||
        response.data.data === null ||
        response.data.data.length === 0 ||
        response.data.message === "No data found"
      ) {
        setDocData([]);
        setLoading(false);
      } else {
        setDocData(response.data.data);
        setLoading(false);
        // eslint-disable-next-line
        if (
          docTypData === undefined ||
          docTypData === "undefined" ||
          (docTypData === "" && docName === "" && otherDoc === false)
        ) {
          setDocTypData(response.data.data[0]);
          setDocFile(
            response.data.data[0].document_url +
              `?v=${new Date().getMinutes() + new Date().getSeconds()}`
          );
          setDocName(response.data.data[0].type);
          setDocId(response.data.data[0].id);
        } else if (
          showMoreDocType === false &&
          response.data.data.find((item) => item.type === docName)
        ) {
          if (
            response.data.data.find((item) => item.type === docName).type ===
            docName
          ) {
            setDocTypData(
              response.data.data.find((item) => item.type === docName)
            );

            setDocFile(
              response.data.data.find((item) => item.type === docName)
                .document_url +
                `?v=${new Date().getMinutes() + new Date().getSeconds()}`
            );
          }
        }
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  /*Function to convert file to base64 */
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        resolve({ base64: fileReader.result });
      });
      fileReader.readAsDataURL(file);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  /*Onchange function of SIngle update document */
  // const handleFileChange = async (event, id) => {
  //   const file = event.target.files[0];
  //   if (!file) {
  //     toast.error("No file selected", {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 1000,
  //     });
  //     return;
  //   }
  //   // Check file type
  //   const allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
  //   const fileType = `.${file.name.split(".").pop()}`;
  //   if (!allowedTypes.includes(fileType.toLowerCase())) {
  //     toast.error(
  //       "Invalid document type. Allowed types: PDF, DOC, DOCX, JPG, JPEG, PNG",
  //       {
  //         position: toast.POSITION.TOP_RIGHT,
  //         autoClose: 1000,
  //       }
  //     );
  //     return;
  //   }
  //   // Check file size
  //   else if (file.size > 1024 * 8000) {
  //     toast.error("Document size can't be more than 8 mb", {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 1000,
  //     });
  //     return;
  //   } else {
  //     const reader = new FileReader();
  //     // Read the file as a data URL
  //     reader.readAsDataURL(file);
  //     encoded = await convertToBase64(file);
  //     let base64Name = encoded.base64;
  //     let DocFile = `data:/${base64Name.split(";")[0].split("/")[1]};${
  //       base64Name.split(";")[1]
  //     }`;
  // setDocFile(base64Name);
  // setDocFileExt(fileType.slice(1));
  // setDocumentName(file.name.split(".")[0].replace(/ /g, "_"));
  // setDocFileBase(DocFile);
  //     setShowSaveDoc(true);
  //     // if (window.confirm("Are you sure you want to upload this document?")) {
  //     //   let DocFile =
  //     //     `data:/${base64Name.split(";")[0].split("/")[1]};${base64Name.split(";")[1]}`
  //     //   //Api to upload document
  //     //   let response = await UploadDocument(props.employee_id, docName, DocFile, id)
  //     //   if (response.data.message === "inserted successfully") {
  //     //     toast.success("Document uploaded Successfully", {
  //     //       position: toast.POSITION.TOP_RIGHT,
  //     //       autoClose: 1000,
  //     //     });
  //     //     setShowMoreDocType(false)
  //     //     setDocName(docName)
  //     //     setApiCall(true)
  //     //   }
  //     //   if (response.data.message === "updated successfully") {
  //     //     toast.success("Document Updated Successfully", {
  //     //       position: toast.POSITION.TOP_RIGHT,
  //     //       autoClose: 1000,
  //     //     });
  //     //     setShowMoreDocType(false)
  //     //     setApiCall(true)
  //     //     setDocTypData(docData.find((item) => item.type === docName))
  //     //     setDocFile(docData.find((item) => item.type === docName).document_url + `?v=${new Date().getMinutes() + new Date().getSeconds()}`)
  //     //   }
  //     //   if (response.data.message === "Invalid base64-encoded data !") {
  //     //     toast.error("Document type is not valid", {
  //     //       position: toast.POSITION.TOP_RIGHT,
  //     //       autoClose: 1000,
  //     //     });
  //     //     setApiCall(true)
  //     //   }
  //     // } else {
  //     //   toast.error("Document update denied.", {
  //     //     position: toast.POSITION.TOP_RIGHT,
  //     //     autoClose: 1000,
  //     //   });
  //     //   setApiCall(true);
  //     // }
  //   }
  // };

  /*On change fnction to upload bulk document in 1 array*/
  const handleBulkFileChange = async (event, id) => {
    const files = event.target.files;

    // Check the number of files selected
    if (files.length > 15) {
      toast.error("You can only upload a maximum of 15 files at a time", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    // Continue with file validation and processing
    const allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
    const maxSize = 1024 * 8000; // 8 MB

    const fileList = {};
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check file type
      const fileType = `.${file.name.split(".").pop()}`;
      if (!allowedTypes.includes(fileType.toLowerCase())) {
        toast.error(
          `Invalid document type for file '${file.name}'. Allowed types: PDF, DOC, DOCX, JPG, JPEG, PNG`,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          }
        );
        return;
      }

      // Check file size
      if (file.size > maxSize) {
        toast.error(
          `Document size can't be more than 8 MB for file '${file.name}'`,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          }
        );
        return;
      }

      // Read file as data URL
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const encoded = await convertToBase64(file);
      const base64Name = encoded.base64;

      // Construct file object with base64 data
      const DocFile = `data:/${base64Name.split(";")[0].split("/")[1]};${
        base64Name.split(";")[1]
      }`;

      // Use DocRealName as the key for DocFile
      const DocRealName = file.name.split(".")[0].replace(/ /g, "_");
      fileList[DocRealName] = DocFile;
    }

    // Store the object of files
    setDocFileBase(fileList);
    bulkUpload === "no" ? setDocName(DocRealName) : setDocName("");
    setShowSaveDoc(true);
  };

  /*Function to save document */
  // const SaveDocument = async () => {
  //   try {
  //     let response = await UploadDocument(
  //       props.employee_id,
  //       docData[0] === docTypData ? docTypData.type : docName,
  //       docFileBase,
  //       docData[0] === docTypData ? docTypData.id : docId,
  //       documentName
  //     );
  //     if (response.data.message === "inserted successfully") {
  //       toast.success("Document uploaded Successfully", {
  //         position: toast.POSITION.TOP_RIGHT,
  //         autoClose: 1000,
  //       });
  //       setShowMoreDocType(false);
  //       setOtherDoc(false);
  //       setDocName(docName);
  //       setDocFileBase("");
  //       setDocFileExt("");
  //       setDocId("");
  //       setShowSaveDoc(false);
  //       setApiCall(true);
  //       setCommentApiCall(true);
  //       setHide(false);
  //     }
  // if (response.data.message === "updated successfully") {
  //   toast.success("Document Updated Successfully", {
  //     position: toast.POSITION.TOP_RIGHT,
  //     autoClose: 1000,
  //   });
  //   if (commentsList.length > 0) {
  //     OnHandleUpdateComment(
  //       docData[0] === docTypData ? docTypData.id : docId
  //     );
  //     // OnDeleteComment(docData[0] === docTypData ? docTypData.id : docId);
  //   }
  //   setShowMoreDocType(false);
  //   setApiCall(true);
  //   setCommentApiCall(true);
  //   setHide(false);
  //   setDocTypData(
  //     docData.find(
  //       (item) =>
  //         item.type ===
  //         (docData[0] === docTypData ? docTypData.type : docName)
  //     )
  //   );
  //   setDocFile(
  //     docData.find(
  //       (item) =>
  //         item.type ===
  //         (docData[0] === docTypData ? docTypData.type : docName)
  //     ).document_url +
  //       `?v=${new Date().getMinutes() + new Date().getSeconds()}`
  //   );
  // }
  //     if (response.data.message === "fields must not be empty !") {
  //       toast.error("Document type is requried", {
  //         position: toast.POSITION.TOP_RIGHT,
  //         autoClose: 1000,
  //       });
  //       setApiCall(true);
  //       setHide(false);
  //     }

  //     if (
  //       response.data.message === "Invalid base64-encoded data !" ||
  //       response.data.message === "Unsupported file type !"
  //     ) {
  //       toast.error("Document type is not valid", {
  //         position: toast.POSITION.TOP_RIGHT,
  //         autoClose: 1000,
  //       });
  //       setApiCall(true);
  //       setHide(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setHide(false);
  //   }
  // };
  /* Upload documents in bulk*/
  let SaveBulkDocument = async () => {
    try {
      let response = await UploadBulkDocument(
        props.employee_id,
        docFileBase,
        bulkUpload === "no"
          ? docData[0] === docTypData
            ? docTypData.id
            : docId
          : ""
      );

      if (response.data.message === "inserted successfully") {
        // Condition: If some file types are not supported and some are supported, then those that are supported will be uploaded while those that are not supported won't.
        if (response.data.data.length > 0) {
          toast.success(" Documents uploaded successfully.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          toast.error(
            <>
              Unsupported Files:
              <ul>
                {response.data.data.map((item, index) => (
                  <li key={index}>{item.type}</li>
                ))}
              </ul>
            </>,
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
            }
          );
        } else {
          toast.success("Documents uploaded Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
        setShowMoreDocType(false);
        setOtherDoc(false);
        setDocName(docName);
        setBulkUpload("");
        setDocFileBase("");
        setDocFileExt("");
        setDocId("");
        setShowSaveDoc(false);
        setApiCall(true);
        setCommentApiCall(true);
        setHide(false);
      }
      if (response.data.message === "updated successfully") {
        toast.success("Document Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setDocId(docData[0] === docTypData ? docTypData.id : docId);
        setShowMoreDocType(false);
        setOtherDoc(false);
        setApiCall(true);
        setCommentApiCall(true);
        setBulkUpload("");
        setHide(false);
        setShowSaveDoc(false);
        setDocTypData(docData.find((item) => item.type === docName));
        console.log(docData.find((item) => item.type === docName).document_url);
        setDocFile(
          docData.find((item) => item.type === docName).document_url +
            `?v=${new Date().getMinutes() + new Date().getSeconds()}`
        );
        if (commentsList.length > 0) {
          OnHandleUpdateComment(
            docData[0] === docTypData ? docTypData.id : docId
          );
          // OnDeleteComment(docData[0] === docTypData ? docTypData.id : docId);
        }
      }

      if (
        response.data.message === "Invalid base64-encoded data !" ||
        response.data.message === "Unsupported file type !"
      ) {
        toast.error("Document type is not valid", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        setHide(false);
        setBulkUpload("");
        setShowSaveDoc(false);
      }
      if (
        response.data.message === "all fields required !" ||
        response.data.message === "fields must not be empty !"
      ) {
        toast.error("All fields are required !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        setShowSaveDoc(false);
        setHide(false);
        setBulkUpload("");
      }
      if (response.error === "Unauthorized") {
        toast.error("Token expires, please log in again.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        setHide(false);
        setShowSaveDoc(false);
        setBulkUpload("");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong try again later!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setApiCall(true);
      setShowSaveDoc(false);
      setHide(false);
      setBulkUpload("");
    }
  };
  /*Fuinction to render image */
  const RenderNewDocFile = () => {
    return (
      <React.Fragment>
        {docFile ? (
          <>
            <div
              className="w-100"
              ref={fileViewerRef}
              onClick={handleFileViewerClick}
            >
              <LazyLoad
                height={"100%"}
                offsetVertical={"100%"}
                debounce={false}
              >
                {docTypData.document_name &&
                docTypData.document_name.toLowerCase().includes("imm") ? (
                  <iframe
                    src={docFile}
                    height={"768px"}
                    width={"768px"}
                    title={docTypData.document_name}
                  ></iframe>
                ) : (
                  <FileViewer
                    key={docTypData.id}
                    fileType={
                      docFileExt
                        ? docFileExt
                        : docTypData.extension_type ===
                          "vnd.openxmlformats-officedocument.wordprocessingml.document"
                        ? "docx"
                        : docTypData.extension_type
                    }
                    filePath={docFile}
                    errorComponent={() => <div>Error loading document</div>}
                  />
                )}
              </LazyLoad>
            </div>
          </>
        ) : (
          <div className="text-center mt-5">No document found</div>
        )}
      </React.Fragment>
    );
  };
  /* Function to replace the _ and correct the document type */
  const textReplaceFunction = (e) => {
    let new_text = e.replaceAll("_", " ");
    return new_text;
  };
  /*Function to verify the applicants documents */
  const onVerifyDocuments = async (id, verify) => {
    try {
      let response = await VarifyDocument(id, verify);
      if (response.data.message === "successfully") {
        toast.success("Document Verify Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*Function to delete document  */
  const OnDeleteDoc = async (id) => {
    try {
      let res = await DeleteDocument(id, "employee");
      if (res.data.message === "document deleted successfully!") {
        toast.success("Document deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setDocFile("");
        setDocId("");
        setDocData("");
        setDocTypData("");
        setDocName("");
        setApiCall(true);
        GetDocument();
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*Type array */
  // let DocTypeData = [
  //   "passport",
  //   "drivers_license",
  //   "photograph",
  //   "immigration_status",
  //   "lmia",
  //   "job_offer_letter",
  //   "provincial_nominee_letter",
  //   "proof_of_funds",
  //   "proof_of_employment",
  //   "marriage_certificate",
  //   "education_metric",
  //   "education_higher_secondary",
  //   "education_graduation",
  //   "education_post_graduation",
  //   "resume_or_cv",
  //   "ielts",
  //   "medical",
  //   "police_clearance",
  //   "refusal_letter",
  //   "Employment Contract",
  //   "Reference Letters",
  //   "Client Info",
  //   "Representative Submission Letter",
  //   "Bank Statement",
  // ];
  //UseEfect for document
  useEffect(() => {
    GetDocument();
    RenderNewDocFile();
    if (apiCall === true) {
      setApiCall(false);
    }
    setAnnotationMode(false);
  }, [docId, apiCall, docName]);
  //USeEffect foe commet replies list
  useEffect(() => {
    // getCommentsReplyList();
    if (user_type === "admin") {
      AdminData();
    }
  }, [replyCommentClick]);
  //USeEffect foe commet list
  useEffect(() => {
    setSelectedAnnotation(null);
    getCommentsList();
    if (commenAapiCall === true) {
      setCommentApiCall(false);
    }
  }, [docId, commenAapiCall, adminid, annotationStatus]);

  // const handleDocTypeChange = (e) => {
  //   const selectedValue = e.target.value;
  //   if (selectedValue === "other") {
  //     setOtherDoc(true);
  //     setShowMoreDocType(false);
  //     setDocTypData("");
  //     setDocId("");
  //     setDocName("");
  //   } else {
  //     setOtherDoc(false);
  //     setDocName(selectedValue);
  //   }
  // };
  /*Function to download Document */
  const DownloadDocument = async () => {
    const response = await fetch(docFile);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = docTypData.document_name + "." + docTypData.extension_type;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the temporary URL
    URL.revokeObjectURL(url);
  };
  /*Function to Print Document  */
  const PrintDocument = () => {
    const printWindow = window.open("", "_blank");
    const content = `
      <html>
        <head>
          <title>Print Document</title>
        </head>
        <body>
          <embed src="${docFile}" width="100%" height="100%">
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  /*Major api's for annotations */
  // Function to add annotation based on conditions
  const addAnnotation = async (annotation) => {
    setAddCommentFlag(false);
    // Retrieve data from local storage
    const assignedUserId = allAdmin.find((item) => item.email === comments)
      ? allAdmin.find((item) => item.email === comments).admin_id
      : admin_id;
    const email = selectedAdmin || ""; ///\S+@\S+\.\S+/.test(comments) ? comments : "";
    const subject = "";
    const comment = /\S+@\S+\.\S+/.test(comments)
      ? comments.replace(/\S+@\S+\.\S+/g, "")
      : comments; ///\S+@\S+\.\S+/.test(comments) ? "" : comments;
    let DocId = docId
      ? docId
      : docData.find((item) => item.type === docName).id;
    // Send data to the API
    try {
      let res = await ADocAnnotation(
        admin_id,
        DocId,
        assignedUserId,
        email,
        subject,
        comment,
        annotation.x_axis,
        annotation.y_axis,
        "employee"
      );
      if (res.data.message === "task inserted successfully!") {
        toast.success("Comment uploaded Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setSelectedAnnotation(null);
        setComments("");
        setCommentApiCall(true);
        setSelectedAdmin("");
        setAnnotationMode(!isAnnotationMode);
        setFilteredEmails([]);
      }
    } catch (err) {
      console.log(err);
      if (err.response.data.message === "required fields cannot be blank") {
        toast.error(" Please try again later.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setSelectedAnnotation(null);
        setComments("");
        setSelectedAdmin("");
        setCommentApiCall(true);
        setAnnotationMode(!isAnnotationMode);
        setAddCommentFlag();
        setFilteredEmails([]);
      }
    }
    // Update state to include the new annotation
    // setImageAnnotations([...imageAnnotations, { x, y }]);
  };
  /* Function to update comment and assign */
  const OnHandleUpdateComment = async (originalData) => {
    let updatedData;
    //Condtion to update x and y axis on documet update
    if (originalData === (docData[0] === docTypData ? docTypData.id : docId)) {
      updatedData = { doc_id: originalData, x_axis: 0, y_axis: 0 };
    } else {
      updatedData = { ...originalData };
      updatedData.status = originalData.status === "1" ? "0" : "1";
    }
    try {
      // Call the API with the updated data
      let res = await UpdateDocuentcommentAssign(updatedData);
      if (res.message === "Task updated successfully!") {
        toast.success("Task completed Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setSelectedAnnotation(null);
        setComments("");
        setCommentApiCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*Function to delete document comments*/
  // const OnDeleteComment = async (docId) => {
  //   try {
  //     let res = await DeleteCommentsAndAssign(docId);
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  /*Function to set the color code to the background of the user name */
  const determineBackgroundColor = (commentItem) => {
    const colorClasses = [
      "bg-primary-opacity-7",
      "bg-warning-opacity-7",
      "bg-orange-opacity-6",
      "bg-info-opacity-7",
      "bg-secondary-opacity-7",
      "bg-danger-opacity-6",
      "bg-info-opacity-visible",
    ];

    const assignedUserId = commentItem.assigned_to_user_id;

    // Create a mapping dynamically based on assignedUserId
    const userColorMap = {};

    // Check if assignedUserId is present in the mapping
    if (assignedUserId && userColorMap.hasOwnProperty(assignedUserId)) {
      return userColorMap[assignedUserId];
    }

    // If not found in the mapping, use the colorClasses logic
    const id = commentItem.id;
    const hashCode = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
      }
      return hash;
    };

    const hash = Math.abs(hashCode(id.toString()));
    const index = hash % colorClasses.length;

    return colorClasses[index];
  };
  /*Function to reply for the comment */
  const ReplyAnnotation = async (data) => {
    let emailrejex = /\S+@\S+\.\S+/;
    let id = emailrejex.test(selectedAdminReply)
      ? allAdmin.find((item) => item.email === selectedAdminReply).admin_id
      : data.assined_to_user_id;
    try {
      let res = await SendReplyCommit(
        data,
        selectedAdminReply || "", //emailrejex.test(replyComment) ? replyComment : "",
        /\S+@\S+\.\S+/.test(replyComment)
          ? replyComment.replace(/\S+@\S+\.\S+/g, "")
          : replyComment, //!emailrejex.test(replyComment) ? replyComment : "",
        id
      );
      if (res.data.message === "message sent successfully!") {
        toast.success("Replied Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setReplyComment("");
        getCommentsReplyList();
        setSelectedAdminReplye("");
        setFilteredEmails([]);
      }
    } catch (err) {
      console.log(err);
      setSelectedAdminReplye("");
      setFilteredEmails([]);
    }
  };
  return (
    <div
      className={
        // props.page === "company_profile"
        //
        "document_container bg-white mb-10"
        // : "container document_container bg-white p-5 mb-10"
      }
    >
      <div className="row m-0">
        <div
          className={`${
            user_type === "admin" ? "col-md-2" : "col-md-4"
          } p-0 border-right pb-7`}
        >
          <h5 className="pl-5 pt-5 d-flex justify-content-between align-items-center">
            Document List
          </h5>
          {/* Documents type list */}
          <table className="table font-size-3">
            <thead>
              <tr>
                <th className="p-3" scope="col">
                  Document
                </th>
                {/* <th className="p-3" scope="col">
                  Date
                </th> */}
                <th className="p-3" scope="col"></th>
                <th className="p-3" scope="col"></th>
              </tr>
            </thead>
            <tbody className="doc_list">
              {docData.length === 0 ? (
                <tr>
                  <th className="bg-white text-center" colSpan={5}>
                    No Data Found
                  </th>
                </tr>
              ) : (
                (docData || []).map((item, index) => (
                  <tr
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
                      setFilteredEmails([]);
                      setAnnotationMode(!isAnnotationMode);
                      setReplyCommentClick();
                      setDocFile(
                        item.document_url +
                          `?v=${
                            new Date().getMinutes() + new Date().getSeconds()
                          }`
                      );
                    }}
                    className={
                      item.type === docName
                        ? "text-capitalize bg-primary text-white"
                        : "text-capitalize"
                    }
                  >
                    <td className="p-3">
                      {textReplaceFunction(item.type)}
                      <p className="font-size-2 m-0">
                        {moment(item.updated_at).format("DD-MMM-YYYY")}
                      </p>
                    </td>
                    {/* <td className="p-3">
                      {item.updated_by_name
                        ? item.updated_by_name
                        : item.created_by_name}
                    </td> */}
                    <td className="p-3"></td>
                    <td className="p-3">
                      {item.is_varify === "1" ? (
                        // <span className="verified_doc">
                        //   <img className="w-100" src={Verified} alt="" />
                        // </span>
                        <span>&#x2713;</span>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="p-3">
                      <Link onClick={() => OnDeleteDoc(item.id)}>
                        <CiTrash
                          style={{
                            color: item.type === docName ? "white" : "black",
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
        <div
          className={`${user_type === "admin" ? "col-md-7" : "col-md-8"} py-7`}
        >
          <div className="row px-0 pt-0 pb-5 doc_upload_row m-0">
            {/* {showMoreDocType ? (
              <div className="doc_upload_col">
                <Form.Select
                  className="form-control select_document_type"
                  value={docName}
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
                    ? "btn btn-secondary btn-sm text-white mr-0"
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
                + Add New Documents
              </button>
            )} */}
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
              <label className="btn btn-secondary">
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
                <label className="btn btn-light">
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
                <button className="btn btn-primary" onClick={SaveBulkDocument}>
                  Save Documents
                </button>
              </div>
            ) : null}
            {hide === true ? (
              <div className="doc_upload_col">
                <button
                  className="btn btn-light"
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
          <div className="doc_preview_box p-5 bg-light rounded position-relative">
            {/* {docTypData ? ( */}
            <div className="doc_action_div">
              {docFile ? (
                hide === false && docTypData && user_type === "admin" ? (
                  <div className="doc_upload_col">
                    {docTypData.is_varify === "1" ? (
                      <img className="verified_doc_img" src={Verified} alt="" />
                    ) : (
                      <button
                        className="btn btn-info"
                        disabled={docTypData.is_varify === "0" ? false : true}
                        onClick={() => onVerifyDocuments(docTypData.id, 1)}
                      >
                        Verify document
                      </button>
                    )}
                  </div>
                ) : null
              ) : null}
              {hide === false && docFile && docName && user_type === "admin" ? (
                <div className="doc_upload_col flex-end">
                  <button
                    className="p-1 rounded-3 btn-warning mx-3 w-auto"
                    onClick={PrintDocument}
                    title="Print Document"
                  >
                    <i className="fa fa-print" aria-hidden="true"></i>
                  </button>
                  <button
                    className="p-1 rounded-3 btn-info w-auto"
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
                    overflow: "scroll",
                    width: "100%",
                    height: "100vh",
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
                          ? `btn-sm mt-7 ${
                              isAnnotationMode
                                ? "btn-primary "
                                : "btn-secondary"
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
                                selectedAnnotation.x_axis ===
                                  annotation.x_axis &&
                                selectedAnnotation.y_axis === annotation.y_axis
                                  ? "blue"
                                  : annotation.status === "1"
                                  ? "green"
                                  : "red",
                              display:
                                annotation.status === "1" ? "none" : "block",
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
        <div className="col-md-3 p-0 py-7 border-left">
          {/* Add Annotation form */}

          {!hide &&
          docFile &&
          docName &&
          user_type === "admin" &&
          selectedAnnotation && //condition for imm pdf
          (docTypData.document_name &&
          docTypData.document_name.toLowerCase().includes("imm")
            ? replyCommentClick === undefined ||
              replyCommentClick === "" ||
              replyCommentClick === null
            : addCommentFlag === true) ? (
            <div
              style={
                {
                  // position: "absolute",
                  // left: selectedAnnotation.x_axis + 10,
                  // top: selectedAnnotation.y_axis + 20,
                  // zIndex: 1,
                }
              }
              className="pt-5 pb-5"
            >
              <form
                className="comment-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  addAnnotation(selectedAnnotation);
                }}
              >
                <div className="comment-input-container m-5">
                  <label>
                    <b> Add Annotation:</b>
                  </label>
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
                          onClick={() => handleEmailClick(email.email)}
                          onMouseOver={() => handleEmailMouseOver(email.email)}
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
          ) : null}
          {/* Comment box */}
          {user_type === "admin" && (
            <CommentBox
              commentsReplyList={commentsReplyList}
              docData={docData}
              adminid={adminid}
              setAdminId={setAdminId}
              allAdmin={allAdmin}
              annotationStatus={annotationStatus}
              setAnnotationStatus={setAnnotationStatus}
              commentsList={commentsList}
              selectedAnnotation={selectedAnnotation}
              setSelectedAnnotation={setSelectedAnnotation}
              OnHandleUpdateComment={OnHandleUpdateComment}
              determineBackgroundColor={determineBackgroundColor}
              setReplyCommentClick={setReplyCommentClick}
              replyCommentClick={replyCommentClick}
              replyComment={replyComment}
              handleInputChange={handleInputChange}
              filteredEmails={filteredEmails}
              handleEmailClick={handleEmailClick}
              handleEmailMouseOver={handleEmailMouseOver}
              ReplyAnnotation={ReplyAnnotation}
              getCommentsReplyList={getCommentsReplyList}
              setAddCommentFlag={setAddCommentFlag}
              setFilteredEmails={setFilteredEmails}
            />
          )}
        </div>
      </div>
    </div>
  );
}
