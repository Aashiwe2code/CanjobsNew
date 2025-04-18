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
          name="message"
          className={`message-input ${
            errors.message && "border border-danger"
          }`}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={state.subject}
          onChange={onInputChange}
          className={`message-input ${
            errors.Subject && "border border-danger"
          }`}
          name="subject"
          required
        />
        <input
          type="date"
          placeholder="Next Follow-up Date"
          value={state.nxtfollowupdate}
          onChange={onInputChange}
          className={`message-input ${
            errors.nxtfollowupdate && "border border-danger"
          }`}
          name="nxtfollowupdate"
          required
        />
        <div className="form-group col px-0 pr-3">
          <label
            htmlFor="status"
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
              className={`message-input ${
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
