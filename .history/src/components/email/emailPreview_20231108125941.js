// src/PreviewEmail.js
import React, { useState, useEffect } from "react";
import { GetPreviewEmail } from "../../api/api";
import Loader from "../common/loader";
// import { FileViewer } from "react-file-viewer";
// import { ToastContainer } from "react-toastify";
// import AdminSidebar from "../admin/sidebar";
// import AdminHeader from "../admin/header";
import { /*useNavigate,*/ Link } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";
const PreviewEmail = ({ id, emailType }) => {
  /* states */
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [emailData, setemailData] = useState({});
  /* Function to get Employee visa data*/
  const EmailData = async () => {
    setIsLoading(true);
    try {
      const Res = await GetPreviewEmail(emailType, id);
      // console.log(Res.data);

      if (
        Res.messsage === "No data found" ||
        Res.status === "0" ||
        Res.status === 0 ||
        Res.data === undefined ||
        (Res.data.length === 0 && JSON.parse(Res.data)[0])
      ) {
        setemailData({});
        setIsLoading(false);
      } else {
        setemailData(JSON.parse(Res.data)[0]);
        // console.log(JSON.parse(Res.data));
        // setTotalData(Res.data.total_rows);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setemailData({});
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
  const openPDFInNewTab = (base64PDFData) => {
    const dataUri = `data:application/pdf;base64,${base64PDFData}`;
    const newWindow = window.open();
    newWindow.document.write(
      `<iframe src="${dataUri}" style="width:100%;height:100%;" frameborder="0"></iframe>`
    );
  };

  const openBase64HtmlInNewWindow = (base64Html) => {
    console.log("object", atob(base64Html));
    // const decodedHtml = atob(base64Html);
    // console.log(decodedHtml);
    // const newWindow = window.open("", "_blank");
    // if (newWindow) {
    //   newWindow.document.write(decodedHtml);
    //   newWindow.document.close();
    // }
  };
  return (
    /*---- Email preview Page ----*/
    <div>
      {isLoading ? (
        <Loader />
      ) : emailData === "" ? (
        <div className="gmail-preview-container ">
          <div className="email-content">
            <div className="email-header">No Email found</div>
          </div>
        </div>
      ) : (
        <div className="gmail-preview-container ">
          <div className="email-content">
            <div className="email-header">
              <h2>{decodeEmailSubject(emailData.subject)}</h2>
              <p>From: {emailData.from}</p>
              <p>To: {emailData.to}</p>
            </div>

            <div className="email-body">
              {emailData.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: emailData.content[1].data,
                  }}
                />
              )}
            </div>
            {console.log(emailData)}
            <div className="attachments row ">
              {emailData.attachments &&
                (emailData.attachments || []).map((item, index) => (
                  <>
                    {item.mime === "APPLICATION/PDF" ? (
                      <div
                        key={index}
                        className="col align-items-center p-3 m-3 rounded shadow bg-white position-relative htmlFileCls"
                      >
                        <Link
                          onClick={() => {
                            openPDFInNewTab(item.data);
                          }}
                        >
                          <img
                            key={index}
                            src={`https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_3_pdf_x16.png`}
                            alt={item.name}
                            title={item.name}
                            width={45}
                            height={45}
                            style={{ zIndex: "1" }}
                          />
                        </Link>
                        <div className="download-icon">
                          <Link
                            to={`data:${item.mime};base64,${item.data}`}
                            download={item.name}
                            className="text-dark"
                          >
                            <AiOutlineDownload />
                          </Link>
                        </div>
                      </div>
                    ) : item.mime === "TEXT/HTML" ? (
                      <div
                        key={index}
                        // onClick={() => openBase64HtmlInNewWindow(item.data)}
                        className="col align-items-center p-3 m-3 rounded shadow bg-white position-relative htmlFileCls"
                      >
                        <Link
                          to=""
                          onClick={() => openBase64HtmlInNewWindow(item.data)}
                          className="m-auto"
                        >
                          <div className="mr-3">
                            <img
                              src="//ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_text_x16.png"
                              width={45}
                              height={45}
                              alt={item.name}
                              style={{ zIndex: "1" }}
                            />
                          </div>
                          <div>
                            <small className="font-weight-bold text-decoration-none text-dark">
                              {item.name}
                            </small>
                          </div>
                        </Link>
                        <div className="download-icon">
                          <Link
                            to={`data:text/html;base64,${item.data}`}
                            download={item.name}
                            className="text-dark"
                          >
                            <AiOutlineDownload />
                          </Link>
                        </div>
                      </div>
                    ) : item.mime === `IMAGE/${item.mime.split("/")}` ? (
                      <div
                        key={index}
                        className="border border-dark col align-items-center p-3 m-3 rounded shadow bg-white position-relative htmlFileCls"
                      >
                        <img
                          key={index}
                          src={`data:${item.mime};base64,${item.data}`}
                          alt={item.name}
                          title={item.name}
                          width={45}
                          height={45}
                          style={{ zIndex: "1" }}
                        />
                        <div className="download-icon">
                          <Link
                            to={`data:${item.mime};base64,${item.data}`}
                            download={item.name}
                            className="text-dark"
                          >
                            <AiOutlineDownload />
                          </Link>
                        </div>
                      </div>
                    ) : item.mime ===
                      "APPLICATION/VND.OPENXMLFORMATS-OFFICEDOCUMENT.WORDPROCESSINGML.DOCUMENT" ? (
                      <div
                        key={index}
                        className="border border-dark col align-items-center p-3 m-3 rounded shadow bg-white position-relative htmlFileCls"
                      >
                        <img
                          src="https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_word_x16.png"
                          title={item.name}
                          alt={item.name}
                          width={45}
                          height={45}
                          style={{ zIndex: "1" }}
                        />
                        <div className="download-icon">
                          <Link
                            to={`data:${item.mime};base64,${item.data}`}
                            download={item.name}
                            className="text-dark"
                          >
                            <AiOutlineDownload />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="border border-dark col align-items-center p-3 m-3 rounded shadow bg-white position-relative htmlFileCls"
                      >
                        <img
                          key={index}
                          src={`https://drive-thirdparty.googleusercontent.com/16/type/application/x-php`}
                          title={item.name}
                          alt={item.name}
                          width={45}
                          height={45}
                          style={{ zIndex: "1" }}
                          className="text-danger"
                        />
                        <div className="download-icon">
                          <Link
                            to={`data:${item.mime};base64,${item.data}`}
                            download={`${item.name}`}
                            className="text-dark"
                          >
                            <AiOutlineDownload />
                          </Link>
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewEmail;
