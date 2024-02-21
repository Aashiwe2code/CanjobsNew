import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import { GetCommentsAndAssign, ADocAnnotation } from "../../api/api";
import AddNotesConversation from "../forms/admin/AddNotesConversation";
export default function AgentConversation({ userId, userEmail, userName }) {
  const [allData, setAllData] = useState([]);
  const [message, setMessage] = useState("");
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
        "",
        userId, //assigne dUserId
        userEmail,
        "", //subject
        message, //Comment
        "", //x_axis
        "", //y_axis
        "notes",
        user_type === "Admin" ? admin_type : user_type,
        user_type === "Admin" ? admin_name : user_name, //sender,
        userName //assigned Admin or user Name
      );
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
          setMessage={setMessage}
          message={message}
        />
      </div>
    </div>
  );
}
