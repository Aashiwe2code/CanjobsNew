import React, { useState } from "react";
export default function AgentConversation() {
  const [allData, setAllData] = useState([]);

  //   Get the notes list
  const GetNotesData = async () => {
    try {
      let res = await GetCommentsAndAssign();
      if (res.data.status === (1 || "1")) {
        setAllData(res.data.data.reverse());
        setImageAnnotations(res.data.data);
      } else if (res.data.message === "Task data not found") {
        setAllData([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="chat-container">
        <MessageChannel data={allData} />
        {/* <form onSubmit={handleMessageSubmit} className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form> */}
      </div>
    </div>
  );
}
