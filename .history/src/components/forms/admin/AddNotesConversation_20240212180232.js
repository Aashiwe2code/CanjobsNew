import React from "react";

export default function AddNotesConversation({
  handleMessageSubmit,
  state,
  onInputChange,
  errors,
}) {
  return (
    <div>
      <form onSubmit={handleMessageSubmit} className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={state.message}
          onChange={onInputChange}
          className={`message-input ${errors.message && "error"}`}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={state.Subject}
          onChange={onInputChange}
          className={`status-input ${errors.Subject && "error"}`}
          name="Subject"
          required
        />
        <input
          type="date"
          placeholder="Next Follow-up Date"
          value={state.nxtfollowupdate}
          onChange={onInputChange}
          className={`follow-up-input ${errors.nxtfollowupdate && "error"}`}
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
              className={`form-control ${
                errors.status && "border border-danger"
              }`}
              placeholder="status"
              id="status"
            >
              <option value={""}>Select Status</option>
              <option value={0}>Normal</option>
              <option value={1}>Private</option>
            </select>
          </div>
        </div>
        {errors.general && <p className="error-message">{errors.general}</p>}
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}
