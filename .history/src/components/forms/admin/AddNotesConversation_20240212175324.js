import React from "react";

export default function AddNotesConversation({
  handleMessageSubmit,
  state,
  onInputChange,
}) {
  return (
    <div>
      <form onSubmit={handleMessageSubmit} className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={state.message}
          onChange={onInputChange}
          className="message-input"
          required
        />
        <input
          type="text"
          placeholder="Status"
          value={state.status}
          onChange={onInputChange}
          className="status-input"
          name="status"
          required
        />
        <input
          type="date"
          placeholder="Next Follow-up Date"
          value={state.nxtfollowupdate}
          onChange={onInputChange}
          className="follow-up-input"
          name="nxtfollowupdate"
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={state.subject}
          onChange={onInputChange}
          className="subject-input"
          name="subject"
          required
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}
