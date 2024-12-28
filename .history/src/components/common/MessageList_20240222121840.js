import moment from "moment-timezone";
import React, { useEffect, useRef } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { Link } from "react-router-dom";
const MessageList = ({ data, loginuser, loginusertype }) => {
  // Create a ref for the div element
  const divRef = useRef(null);

  // Function to scroll to the end of the div
  const scrollToBottom = () => {
    if (divRef.current) {
      // Set scrollTop to the scrollHeight to scroll to the end
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  };
  //   Render data
  useEffect(() => {
    scrollToBottom();
  }, [data]);
  /*Local Time */
  const LocalTime = (_date) => {
    const result = moment.tz(
      _date,
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    console.log(
      moment.tz(_date, Intl.DateTimeFormat().resolvedOptions().timeZone)
    );
    console.log(result.tz());
    return result.format("LLL");
  };
  console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
  return (
    <div className="chat-messages bg-light" ref={divRef}>
      {data.length === 0 ? (
        <div className="message">
          <div>No Data Found</div>
        </div>
      ) : (
        data.map((message) => {
          const fileExtension =
            message.document_name &&
            message.document_name.split(".").pop().toLowerCase();
          const isImage =
            message.document_url &&
            (message.document_url.toLowerCase().endsWith(".png") ||
              message.document_url.toLowerCase().endsWith(".jpg") ||
              message.document_url.toLowerCase().endsWith(".jpeg"));
          let iconSrc = isImage ? message.document_url : "";
          let title = message.document_name || "";

          if (!isImage) {
            if (fileExtension === "pdf") {
              iconSrc =
                "https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_3_pdf_x16.png";
            } else if (fileExtension === "doc" || fileExtension === "docx") {
              iconSrc =
                "https://e7.pngegg.com/pngimages/18/655/png-clipart-computer-icons-microsoft-word-document-file-format-word-icon-blue-angle.png";
            } else if (fileExtension === "html" || fileExtension === "txt") {
              iconSrc =
                "//ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_text_x16.png";
            } else {
              iconSrc =
                "https://icons.iconarchive.com/icons/thehoth/seo/256/seo-web-code-icon.png";
            }
          }

          return (
            <div
              key={message.id}
              className={`message ${
                message.task_creator_user_id === loginuser &&
                message.task_creator_user_type === loginusertype
                  ? "received"
                  : "sent"
              }`}
            >
              <div className="message-content font-size-3">
                {title === "" || iconSrc === "" ? (
                  message.subject_description === "" ||
                  message.subject_description === undefined ||
                  message.subject_description === null ||
                  message.subject_description === "undefined" ||
                  message.subject_description === "null" ? (
                    ""
                  ) : (
                    <div className=" mr-3 mb-3  ">
                      <div className="message-text">
                        {message.task_creator_user_name && (
                          <span className="message-sender font-size-3 text-capitalize">
                            {message.task_creator_user_name}
                          </span>
                        )}
                        <br /> {message.subject_description}
                      </div>
                    </div>
                  )
                ) : (
                  <div
                    className="align-items-center mr-3 mb-3 rounded border bg-white position-relative htmlFileCls p-2 message-text"
                    title={title}
                  >
                    {" "}
                    {message.task_creator_user_name && (
                      <span className="message-sender font-size-3 text-capitalize">
                        {message.task_creator_user_name}
                      </span>
                    )}
                    <br />
                    <div className="text-center">
                      <Link>
                        <img
                          src={iconSrc}
                          alt={title}
                          title={title}
                          width={45}
                          height={45}
                          style={{ zIndex: "1" }}
                        />
                        <div>
                          <small
                            className="d-inline-block text-truncate text-decoration-none text-dark"
                            style={{ maxWidth: "100%" }}
                          >
                            {title}
                          </small>
                        </div>
                      </Link>
                      <div className="download-icon">
                        <Link
                          to={message.document_url}
                          download={title}
                          className="text-dark"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <AiOutlineDownload />
                        </Link>
                      </div>
                    </div>
                    {message.subject_description === "" ||
                    message.subject_description === undefined ||
                    message.subject_description === null ||
                    message.subject_description === "undefined" ||
                    message.subject_description === "null" ? (
                      ""
                    ) : (
                      <div className="text-start">
                        {message.subject_description}
                      </div>
                    )}
                  </div>
                )}

                <div className="message-info">
                  <small className="text-muted">
                    <b>{message.created_on}</b>
                    {LocalTime(message.created_on)}
                  </small>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MessageList;
