// src/PreviewEmail.js
import React, { useState, useEffect } from "react";
import { GetPreviewEmail } from "../../api/api";
import Loader from "../common/loader";
// import { FileViewer } from "react-file-viewer";
// import { ToastContainer } from "react-toastify";
// import AdminSidebar from "../admin/sidebar";
// import AdminHeader from "../admin/header";
import { /*useNavigate,*/ Link } from "react-router-dom";
const PreviewEmail = ({ id }) => {
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  /* data and id states */
  const [emailData, setemailData] = useState([]);
  /* Function to get Employee visa data*/
  const EmailData = async () => {
    setIsLoading(true);
    try {
      const Res = await GetPreviewEmail(id);
      console.log(Res.data);
      if (
        Res.messsage === "No data found" ||
        Res.status === "0" ||
        Res.status === 0 ||
        Res.data === undefined ||
        Res.data.length === 0
      ) {
        setemailData([]);
        setIsLoading(false);
      } else {
        setemailData(Res.data);
        // setTotalData(Res.data.total_rows);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  /*Render function to get the employee data*/
  useEffect(() => {
    EmailData();
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [apiCall, id]);

  // function decodeEmailSubject(encodedSubject) {
  //   return decodeURIComponent(
  //     encodedSubject
  //       .replace(/=\?UTF-8\?Q\?/g, "")
  //       .replace(/\?=/g, "")
  //       .replace(/=([0-9A-F]{2})/g, (_, p1) =>
  //         String.fromCharCode(parseInt(p1, 16))
  //       )
  //   );
  // }
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
  const openPDFInNewTab = (base64PDFData) => {
    const dataUri = `data:application/pdf;base64,${base64PDFData}`;
    window.open(dataUri, "_blank");
  };
  return (
    /*---- Employee Profile Details Page ----*/
    // <div className="site-wrapper overflow-hidden bg-default-2">
    //   {/* <!-- Header Area --> */}

    //   <AdminHeader
    //     heading={
    //       <Link
    //         className="d-flex align-items-center "
    //         onClick={() => navigate(-1)}
    //       >
    //         <i className="icon icon-small-left bg-white circle-30 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
    //         <span className="text-uppercase font-size-3 font-weight-bold text-gray">
    //           <h3 className="font-size-6 mb-0 text-capitalize">
    //             Email preview
    //           </h3>
    //         </span>
    //       </Link>
    //     }
    //   />
    //   {/* <!-- navbar- --> */}
    //   <AdminSidebar heading={"Email preview"} />

    //   <div
    //     className={"dashboard-main-container mt-12 mt-lg-12"}
    //     id="dashboard-body"
    //   >
    //     <ToastContainer />
    //     <div className="container-fluid">
    //   {isLoading ? (
    //     <div className="table-responsive main_table_div">
    //       <Loader />
    //     </div>
    //   ) : (
    //         <div className="row text-left mt-5 pt-0">
    //           <div className="preview-email">
    //             <div className="header">
    //               <img src="/image/00logo-main-black.png" alt="Your Logo" />
    //             </div>
    //             <div className="content">{emailData}</div>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div>
      {/* <h1>Exciting News!</h1>
                  <p>Hello [Recipient's Name],</p>
                  <p>We have some exciting news to share with you...</p> */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="preview-email-container ">
          <div className="email-content">
            <div className="email-header">
              <h2>{decodeEmailSubject(emailData.subject)}</h2>
              <p>From: {emailData.from}</p>
              <p>To: {emailData.to}</p>
            </div>
            <div className="email-body">
              <p>{emailData.body_data}</p>
            </div>
            <div className="attachments">
              {emailData.attachment &&
                (emailData.attachment[0] || []).map((item, index) => (
                  <>
                    {item.ext_type === "pdf" ? (
                      <Link
                        onClick={() => {
                          openPDFInNewTab(item.file_data);
                        }}
                      >
                        <img
                          key={index}
                          src={`https://s.yimg.com/fz/api/res/1.2/O0oW0TRMJLWcDOyAgUZScg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTEzMDtxPTgwO3c9MTA1/https://s.yimg.com/zb/imgv1/9a8b4cb8-aba2-3b23-b911-7b50ca0139d2/t_500x300`}
                          alt="pdf"
                        />
                      </Link>
                    ) : item.ext_type === "html" ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: item.file_data }}
                      />
                    ) : (
                      <img
                        key={index}
                        src={`data:image/${item.ext_type};base64,${item.file_data}`}
                        alt={`attachment-${index}`}
                        width={500}
                        height={500}
                      />
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
