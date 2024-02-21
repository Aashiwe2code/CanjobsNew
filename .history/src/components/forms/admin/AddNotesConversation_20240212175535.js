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
        <div className="form-group col px-0 pr-3">
          <label
            htmlFor="subject"
            className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
          >
            Status:
          </label>
          <div className="position-relative">
            <select
              name="status"
              value={state.status || ""}
              onChange={onInputChange}
              type="text"
              className={
                errors.status
                  ? "form-control border border-danger"
                  : "form-control"
              }
              placeholder="status"
              id="status"
            >
              <option value={""}>Select Status</option>
              <option value={0}>Normal</option>
              <option value={1}>Private</option>
            </select>
          </div>
        </div>
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}
