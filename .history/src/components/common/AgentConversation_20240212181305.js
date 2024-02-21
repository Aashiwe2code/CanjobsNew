import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import { GetCommentsAndAssign, ADocAnnotation } from "../../api/api";
import AddNotesConversation from "../forms/admin/AddNotesConversation";
import useValidation from "./useValidation";
export default function AgentConversation({
  userId,
  userEmail,
  userName,
  assignusertype,
}) {
  const [allData, setAllData] = useState([]);
  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    name: "",
    status: "",
    nxtfollowupdate: "",
    subject: "",
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
  const { state, setState, setErrors, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);

  // Admin details
  let admin_id = localStorage.getItem("admin_id");
  let admin_type = localStorage.getItem("admin_type");
  let admin_name = localStorage.getItem("admin");

  // User details
  let user_type = localStorage.getItem("userType");
  let user_name = localStorage.getItem("name");

  //   Render data
  useEffect(() => {
    GetNotesData();
  }, []);
  //   Get the notes list
  const GetNotesData = async () => {
    try {
      let res = await GetCommentsAndAssign();
      if (res.data.status === (1 || "1")) {
        setAllData(res.data.data.reverse());
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
        user_type === "admin" ? admin_name : user_name, //sender,
        userName, //assigned Admin or user Name,
        state.status, //follow up status
        state.nxtfollowupdate, //Next follow up sattus
        assignusertype //Assign user type
      );
      if (res.data.message === "task inserted successfully!") {
        toast.success("Message sent Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
      console.log(res, "This is the response");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="chat-container">
        <MessageList data={allData} />
        <AddNotesConversation
          handleMessageSubmit={handleMessageSubmit}
          onInputChange={onInputChange}
          state={state}
          errors={errors}
        />
      </div>
    </div>
  );
}
