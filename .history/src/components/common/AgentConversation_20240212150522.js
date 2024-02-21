import React, { useState } from "react";
export default function AgentConversation() {
  const [allData, setAllData] = useState([]);

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
