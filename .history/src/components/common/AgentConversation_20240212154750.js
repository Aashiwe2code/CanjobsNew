import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import { GetCommentsAndAssign } from "../../api/api";
import AddNotesConversation from "../forms/admin/AddNotesConversation";
export default function AgentConversation({ userId, userEmail, userName }) {
  const [allData, setAllData] = useState([]);
  const [allAdmin, setAllAdmmin] = useState([]);
  // Admin details
  let admin_id = localStorage.getItem("admin_id");
  let admin_type = localStorage.getItem("admin_type");
  let admin_name = localStorage.getItem("adminadmin_type");

  // User details
  let userType = localStorage.getItem("userType");
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
  const handleMessageSubmit = async () => {
    try {
      let res = await ADocAnnotation(
        admin_id,
        "",
        userId, //assigne dUserId
        userEmail,
        "", //subject
        comment,
        "", //x_axis
        "", //y_axis
        "notes",
        userType === "Admin" ? admin_type : userType,
        sender,
        userName //assigned Admin or user Name
      );
      //   id,
      //   docId,
      //   assineduserid,
      //   email,
      //   subject,
      //   comment,
      //   x,
      //   y,
      //   type,
      //   adminType,
      //   senderName,
      //   assignName
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="chat-container">
        <MessageList data={allData} />
        <AddNotesConversation handleMessageSubmit={handleMessageSubmit} />
      </div>
    </div>
  );
}
