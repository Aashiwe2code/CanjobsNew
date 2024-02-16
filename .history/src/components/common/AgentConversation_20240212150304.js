import React, { useState } from "react";
export default function AgentConversation() {
  const [allData, setAllData] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    setMessages([...messages, { text: newMessage, sender: "user" }]);
    setNewMessage("");
  };
  return (
    <div>
      <div className="chat-container">
        <MessageChannel data={allData} />
        <form onSubmit={handleMessageSubmit} className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
