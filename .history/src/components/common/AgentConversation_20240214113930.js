import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import { GetCommentsAndAssign, ADocAnnotation } from "../../api/api";
import AddNotesConversation from "../forms/admin/AddNotesConversation";
import useValidation from "./useValidation";
import { toast } from "react-toastify";
export default function AgentConversation({
  userId,
  userEmail,
  userName,
  assignusertype,
}) {
  const [allData, setAllData] = useState([]);
  const [apicall, setApiCall] = useState([]);
  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    name: "",
    status: "",
    nxtfollowupdate: "",
    subject: "",
    message: "",
    DocUrl: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    message: [
      (value) =>
        value === "" || value.trim() === ""
          ? "message is required"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "message can not have a number."
          : value.length < 2
          ? "message should have 2 or more letters"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : "",
    ],
    status: [
      (value) =>
        value === "" || value.trim() === "" ? "status is required" : null,
    ],
    subject: [
      (value) =>
        value === "" || value.trim() === "" ? "subject is required" : null,
    ],
    nxtfollowupdate: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Next follow Up Date is required"
          : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState /*, setErrors*/, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);

  // Admin details
  let admin_id = localStorage.getItem("admin_id");
  let admin_type = localStorage.getItem("admin_type");
  let admin_name = localStorage.getItem("admin");

  // User details
  let user_type = localStorage.getItem("userType");
  let user_name = localStorage.getItem("name");
  // task_creator_user_id: id,
  // task_creator_user_name: senderName,
  // doc_id: docId,
  // assined_to_user_id: assineduserid,
  // assigned_to: email,
  // assigned_to_type: adminType,
  // assigned_to_name: assignName,
  // assigned_user_type: AssignUserType,
  // document_url: "",
  // next_followup_date: nextFollowupDate,
  // followup_status: satus,
  // subject: subject,
  // subject_description: comment,
  // x_axis: x,
  // y_axis: y,
  // type: type,
  //   Render data
  useEffect(() => {
    GetNotesData();
    if (apicall === true) {
      setApiCall(false);
    }
  }, [apicall]);
  //   Get the notes list
  const GetNotesData = async () => {
    try {
      let res = await GetCommentsAndAssign("", "", "", "notes");
      if (res.data.status === (1 || "1")) {
        setAllData(res.data.data);
      } else if (res.data.message === "Task data not found") {
        setAllData([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Submit function to add notes conversation
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        let res = await ADocAnnotation(
          admin_id,
          "", //doc id
          userId, //assigne dUserId
          userEmail,
          state.subject, //subject
          state.message, //Comment
          0, //x_axis
          0, //y_axis
          "notes",
          user_type === "admin" ? admin_type : user_type,
          user_name === "admin" ? admin_name : user_name, //sender,
          userName, //assigned Admin or user Name,
          state.status, //follow up status
          state.nxtfollowupdate, //Next follow up date
          assignusertype, //Assign user type,
          state.DocUrl
        );
        if (res.data.message === "task inserted successfully!") {
          toast.success("Message sent Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setApiCall(true);
          setState(initialFormState);
        }
        //   console.log(res, "This is the response");
      } catch (err) {
        console.log(err);
        if (err.response.data.message === "required fields cannot be blank") {
          toast.error(" Please try again later.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setState(initialFormState);
        }
      }
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
  /*On change fnction to upload bulk document in 1 array*/
  const handleBulkFileChange = async (event, id) => {
    const files = event.target.files;
    {
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

      const fileList = [];
      let DocRealName;
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
        DocRealName = file.name.split(".")[0].replace(/ /g, "_");
        fileList.push({
          // type: "notes",
          docName: DocRealName,
          docUrl: DocFile,
        });
      }
      // Store the object of files
      setState({ ...state, DocUrl: fileList });
      // bulkUpload === "no" ? setDocName(DocRealName) : setDocName("");
      // setShowSaveDoc(true);
    }
  };
  return (
    <div className="chat_box_container bg-white row m-0">
      <div className="chat-container col-md-6">
        <MessageList data={allData} />
        <AddNotesConversation
          handleMessageSubmit={handleMessageSubmit}
          onInputChange={onInputChange}
          state={state}
          errors={errors}
          handleBulkFileChange={handleBulkFileChange}
        />
      </div>
    </div>
  );
}
