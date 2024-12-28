import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

export default function AddNotesConversation({
  handleMessageSubmit,
  state,
  onInputChange,
  errors,
  handleBulkFileChange,
}) {
  return (
    <div>
      <form onSubmit={handleMessageSubmit} className="chat-input px-3 py-3">
        <div className="text_msg_box w-100">
          <textarea
            placeholder="Type your message..."
            value={state.message}
            onChange={onInputChange}
            name="message"
            className={`message_input_box ${
              errors.message && "border border-danger"
            }`}
            required
          ></textarea>
        </div>

        <div className="text_msg_control">
          <input
            type="text"
            placeholder="Subject"
            value={state.subject}
            onChange={onInputChange}
            className={`message_input ${
              errors.Subject && "border border-danger"
            }`}
            name="subject"
            title="Add Subject in Message"
          />
          <input
            type="date"
            placeholder="Next Follow-up Date"
            value={state.nxtfollowupdate}
            onChange={onInputChange}
            className={`message_input ${
              errors.nxtfollowupdate && "border border-danger"
            }`}
            title="Next Followup Date"
            name="nxtfollowupdate"
          />

          <select
            name="status"
            value={state.status || ""}
            onChange={onInputChange}
            type="text"
            title="Select status"
            className={`message_input ${
              errors.status && "border border-danger"
            }`}
            placeholder="status"
            id="status"
          >
            <option value={0}>Normal</option>
            <option value={1}>Private</option>
          </select>
        </div>
        <div className="">
          <label className="btn btn-light doc_btn">
            <AiOutlineCloudUpload className="font-size-3 mr-2" />
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => {
                handleBulkFileChange(e);
              }}
            />
            Update Current Document
          </label>
        </div>
        {errors.general && <p className="error-message">{errors.general}</p>}
        <button type="submit" className="send-button btn btn-primary">
          <i class="fas fa-angle-double-right"></i>
        </button>
      </form>
    </div>
  );
}
