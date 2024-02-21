import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import moment from "moment";
export default function AddNotesConversation({
  handleMessageSubmit,
  state,
  onInputChange,
  errors,
  handleBulkFileChange,
  handleRemoveFile,
  fileNames,
}) {
  return (
    <div>
      <div className="mail-file-attachments">
        {fileNames.map((fileName) => (
          <div key={fileName} className="mail-file-attachment">
            <p>{fileName}</p>
            <button
              type="button"
              className="mail-remove-file"
              onClick={() => handleRemoveFile(fileName)}
            >
              X
            </button>
          </div>
        ))}
      </div>
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
            disabled={state.DocUrl}
          ></textarea>
        </div>

        <div className="text_msg_control">
          <input
            type="text"
            placeholder="Subject"
            value={state.subject}
            onChange={onInputChange}
            className={`message_input d-none ${
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
            min={moment().format("DD-MM-YYYY")}
            onKeyDownCapture={(e) => e.preventDefault()}
            className={`message_input d-none coustam_datepicker ${
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
            disabled={state.DocUrl}
            id="status"
          >
            <option value={"normal"}>Normal</option>
            <option value={"private"}>Private</option>
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
            Send files or images
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
