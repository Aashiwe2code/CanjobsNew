import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import { GetCommentsAndAssign } from "../../api/api";
import AddNotesConversation from "../forms/admin/AddNotesConversation";
export default function AgentConversation() {
  const [allData, setAllData] = useState([]);
  const [allAdmin, setAllAdmmin] = useState([]);

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
        DocId,
        assignedUserId,
        email,
        "", //subject
        comment,
        "", //x_axis
        "", //y_axis
        "notes",
        AdminType,
        sender,
        assignedAdminName
      );
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
