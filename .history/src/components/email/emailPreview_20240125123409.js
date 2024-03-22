// src/PreviewEmail.js
import React, { useState, useEffect } from "react";
import { /*GetPreviewEmail*/ GetPreviewAttchmentEmail } from "../../api/api";
import Loader from "../common/loader";
// import { FileViewer } from "react-file-viewer";
// import { ToastContainer } from "react-toastify";
// import AdminSidebar from "../admin/sidebar";
// import AdminHeader from "../admin/header";
import { /*useNavigate,*/ Link } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";
const PreviewEmail = ({ id, emailType, singleEmailData }) => {
  /* states */
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [emailData, setemailData] = useState([]);
  /* Function to get Employee visa data */
  const EmailData = async () => {
    setIsLoading(true);
    try {
      const Res = await GetPreviewAttchmentEmail(emailType, id);
      if (
        // Res.messsage === "No data found" ||
        // Res.status === "0" ||
        // Res.status === 0 ||
        Res.data.value === undefined ||
        Res.data.value.length === 0 // && JSON.parse(Res.data)[0])
      ) {
        setemailData([]);
        setIsLoading(false);
      } else {
        setemailData(Res.data.value);
        // setTotalData(Res.data.total_rows);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setemailData([]);
    }
  };

  /*Render function to get the employee data*/
  useEffect(() => {
    EmailData();
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [apiCall, id]);

  /*Function to decode the email subject */
  function decodeEmailSubject(encodedSubject) {
    if (!encodedSubject) {
      return "";
    } else {
      return decodeURIComponent(
        encodedSubject
          .replace(/=\?UTF-8\?Q\?/g, "")
          .replace(/\?=/g, "")
          .replace(/=([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt(p1, 16))
          )
      );
    }
  }
  /*Funcion to open pdf n new window */
  // const openPDFInNewTab = (base64PDFData) => {
  //   const dataUri = `data:application/pdf;base64,${base64PDFData}`;
  //   const newWindow = window.open();
  //   newWindow.document.write(
  //     `<iframe src="${dataUri}" style="width:100%;height:100%;" frameborder="0"></iframe>`
  //   );
  // };

  // const openBase64HtmlInNewWindow = (base64Html) => {
  // const decodedHtml = atob(base64Html);
  // const newWindow = window.open("", "_blank");
  // if (newWindow) {
  //   newWindow.document.write(decodedHtml);
  //   newWindow.document.close();
  // }
  // };
  return (
    /*---- Email preview Page ----*/
    <div>
      {isLoading ? (
        <Loader />
      ) : singleEmailData === "" ? null : (
        <div className="gmail-preview-container ">
          <div className="email-content">
            <div className="email-header">
              <p>
                <b>From:</b> {singleEmailData.Sender.EmailAddress.Address}
              </p>
              <p>
                <b>To:</b>
                {singleEmailData.ToRecipients[0].EmailAddress.Address}
              </p>
              <h2>{decodeEmailSubject(singleEmailData.Subject)}</h2>
            </div>
            <div className="email-body text-break">
              {singleEmailData.Body.Content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: singleEmailData.Body.Content,
                  }}
                />
              )}
            </div>
            <div className="attachments row">
              {/* {emailData &&
                emailData.map((item, index) => (
                  <div
                    key={index}
                    className="col align-items-center p-3 m-3 rounded shadow bg-white position-relative htmlFileCls"
                  >
                    {item.Name && (
                      <FileViewer
                        fileType={item.Name.split(".")[1]}
                        filePath={`data:${item.ContentType};base64,${item.ContentBytes}`}
                        errorComponent={() => <div>Error loading document</div>}
                        onError={(e) => console.error("Error occurred:", e)}
                      />
                    )}
                  </div>
                ))} */}
              {emailData.length === 0 ? (
                <div className="col align-items-center p-3 m-3 rounded shadow bg-white position-relative htmlFileCls">
                  <div className="text-center">No Attachments Founds</div>
                </div>
              ) : (
                (emailData || []).map((item, index) => {
                  let iconSrc = "";
                  let title = "";

                  if (
                    item.ContentType === "APPLICATION/PDF" ||
                    item.ContentType === "application/pdf"
                  ) {
                    iconSrc =
                      "https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_3_pdf_x16.png";
                    title = item.Name;
                  } else if (
                    item.ContentType === "TEXT/HTML" ||
                    item.ContentType === "text/plain" ||
                    item.ContentType === "text/html"
                  ) {
                    iconSrc =
                      "//ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_text_x16.png";
                    title = item.Name;
                  } else if (
                    item.ContentType.startsWith("IMAGE/") ||
                    item.ContentType.startsWith("image/")
                  ) {
                    iconSrc = `data:${item.ContentType};base64,${item.ContentBytes}`;
                    title = item.Name;
                  } else if (
                    item.ContentType ===
                      "APPLICATION/VND.OPENXMLFORMATS-OFFICEDOCUMENT.WORDPROCESSINGML.DOCUMENT" ||
                    item.ContentType ===
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  ) {
                    iconSrc =
                      "https://e7.pngegg.com/pngimages/18/655/png-clipart-computer-icons-microsoft-word-document-file-format-word-icon-blue-angle.png";
                    title = item.Name;
                  } else {
                    iconSrc =
                      "https://icons.iconarchive.com/icons/thehoth/seo/256/seo-web-code-icon.png";
                    title = item.Name;
                  }

                  return (
                    <div
                      key={index}
                      className="col align-items-center p-3 m-3 rounded shadow bg-white position-relative htmlFileCls"
                      title={item.Name}
                    >
                      <Link
                      // onClick={() =>
                      //   openBase64FileInNewWindow(item.data, item.ContentType)
                      // }
                      >
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
                            className="d-inline-block text-truncate font-weight-bold text-decoration-none text-dark"
                            style={{ maxWidth: "60px" }}
                          >
                            {item.Name}
                          </small>
                        </div>
                      </Link>
                      <div className="download-icon">
                        <Link
                          to={`data:${item.ContentType};base64,${item.ContentBytes}`}
                          download={item.Name}
                          className="text-dark"
                        >
                          <AiOutlineDownload />
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewEmail;
