// import moment from "moment";
// import React, { useEffect, useRef } from "react";
// import { AiOutlineDownload } from "react-icons/ai";
// import { Link } from "react-router-dom";
// const MessageList = ({ data, loginuser, loginusertype }) => {
//   // Create a ref for the div element
//   const divRef = useRef(null);

//   // Function to scroll to the end of the div
//   const scrollToBottom = () => {
//     if (divRef.current) {
//       // Set scrollTop to the scrollHeight to scroll to the end
//       divRef.current.scrollTop = divRef.current.scrollHeight;
//     }
//   };
//   //   Render data
//   useEffect(() => {
//     scrollToBottom();
//   }, [data]);

//   return (
//     <div className="chat-messages bg-light" ref={divRef}>
//       {data.length === 0 ? (
//         <div className="message">
//           <div>No Data Found</div>
//         </div>
//       ) : (
//         data.map((message) => {
//           const fileExtension =
//             message.document_name &&
//             message.document_name.split(".").pop().toLowerCase();
//           const isImage =
//             message.document_url &&
//             (message.document_url.toLowerCase().endsWith(".png") ||
//               message.document_url.toLowerCase().endsWith(".jpg") ||
//               message.document_url.toLowerCase().endsWith(".jpeg"));
//           let iconSrc = isImage ? message.document_url : "";
//           let title = message.document_name || "";

//           if (!isImage) {
//             if (fileExtension === "pdf") {
//               iconSrc =
//                 "https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_3_pdf_x16.png";
//             } else if (fileExtension === "doc" || fileExtension === "docx") {
//               iconSrc =
//                 "https://e7.pngegg.com/pngimages/18/655/png-clipart-computer-icons-microsoft-word-document-file-format-word-icon-blue-angle.png";
//             } else if (fileExtension === "html" || fileExtension === "txt") {
//               iconSrc =
//                 "//ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_text_x16.png";
//             } else {
//               iconSrc =
//                 "https://icons.iconarchive.com/icons/thehoth/seo/256/seo-web-code-icon.png";
//             }
//           }

//           return (
//             <div
//               key={message.id}
//               className={`message ${
//                 message.task_creator_user_id === loginuser &&
//                 message.task_creator_user_type === loginusertype
//                   ? "received"
//                   : "sent"
//               }`}
//             >
//               <div className="message-content font-size-3">
//                 {title === "" || iconSrc === "" ? (
//                   message.subject_description === "" ||
//                   message.subject_description === undefined ||
//                   message.subject_description === null ||
//                   message.subject_description === "undefined" ||
//                   message.subject_description === "null" ? (
//                     ""
//                   ) : (
//                     <div className=" mr-3 mb-3  ">
//                       <div className="message-text">
//                         {message.task_creator_user_name && (
//                           <span className="message-sender font-size-3 text-capitalize">
//                             {message.task_creator_user_name}
//                           </span>
//                         )}
//                         <br /> {message.subject_description}
//                       </div>
//                     </div>
//                   )
//                 ) : (
//                   <div
//                     className="align-items-center mr-3 mb-3 rounded border bg-white position-relative htmlFileCls p-2 message-text"
//                     title={title}
//                   >
//                     {" "}
//                     {message.task_creator_user_name && (
//                       <span className="message-sender font-size-3 text-capitalize">
//                         {message.task_creator_user_name}
//                       </span>
//                     )}
//                     <br />
//                     <div className="text-center">
//                       <Link>
//                         <img
//                           src={iconSrc}
//                           alt={title}
//                           title={title}
//                           width={45}
//                           height={45}
//                           style={{ zIndex: "1" }}
//                         />
//                         <div>
//                           <small
//                             className="d-inline-block text-truncate text-decoration-none text-dark"
//                             style={{ maxWidth: "100%" }}
//                           >
//                             {title}
//                           </small>
//                         </div>
//                       </Link>
//                       <div className="download-icon">
//                         <Link
//                           to={message.document_url}
//                           download={title}
//                           className="text-dark"
//                           target="_blank"
//                           rel="noreferrer"
//                         >
//                           <AiOutlineDownload />
//                         </Link>
//                       </div>
//                     </div>
//                     {message.subject_description === "" ||
//                     message.subject_description === undefined ||
//                     message.subject_description === null ||
//                     message.subject_description === "undefined" ||
//                     message.subject_description === "null" ? (
//                       ""
//                     ) : (
//                       <div className="text-start">
//                         {message.subject_description}
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 <div className="message-info">
//                   <small className="text-muted">
//                     {moment(message.created_on).format("LLL")}
//                   </small>
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default MessageList;
import React, { useEffect, useRef } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { Link } from "react-router-dom";
// import moment from "moment";
import moment from "moment-timezone";

const MessageList = ({ data, loginuser, loginusertype }) => {
  const divRef = useRef(null);

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  // TimerTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // const LocalTime = (date) => {
  //   const utcDateString = date; // UTC date string (example)
  //   const utcDateWithoutMillis = utcDateString.slice(0, -5) + "Z";
  //   const utcDate = new Date(utcDateWithoutMillis);

  //   // Convert UTC date to local time using the user's time zone
  //   const localTimed = new Date(
  //     utcDate.toLocaleString("en-US", { timeZone: userTimeZone })
  //   );
  //   console.log("Local Time:", localTimed.toISOString());

  //   // Display Local Time
  //   const localTimedString = localTimed.toLocaleString();
  //   console.log(localTimedString);
  //   return localTimedString; // Return the local time string
  // };

  // const use
  // const LocalTime = (date, userTimeZone) => {
  //   const utcDateString = date; // UTC date string (example)
  //   const utcDateWithoutMillis = utcDateString.slice(0, -5) + "Z";
  //   const utcDate = new Date(utcDateWithoutMillis);

  //   // Get the UTC timestamp
  //   const utcTimestamp = utcDate.getTime();

  //   // Get the UTC offset for the user's timezone
  //   const userTimeZoneOffset = new Date().getTimezoneOffset() * 60000;

  //   // Calculate the local timestamp by adding the UTC offset for the user's timezone
  //   const localTimestamp = utcTimestamp + userTimeZoneOffset;

  //   // Create a new Date object for the local time
  //   const localTimed = new Date(localTimestamp);

  //   // Display Local Time
  //   const localTimedString = localTimed.toLocaleString("en-US", {
  //     timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //   });
  //   console.log(localTimedString);
  //   return localTimedString; // Return the local time string
  // };

  const _date = new Date();
  const result = moment.tz(_date, "Asia/Kolkata");
  console.log(result);

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

          // Convert UTC date to local time using Moment.js
          const localDateTime = moment
            .utc(message.created_on)
            .local()
            .format("LLL");

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
                  {/* Display local date and time */}
                  <small className="text-muted">
                    {/* {LocalTime(message.created_on)} */}
                    {/* {moment.tz(
                      message.created_on,
                      Intl.DateTimeFormat().resolvedOptions().timeZone
                    )} */}
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
