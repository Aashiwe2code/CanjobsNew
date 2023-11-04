// src/PreviewEmail.js
import React, { useState, useEffect } from "react";
import { GetPreviewEmail } from "../../api/api";
import Loader from "../common/loader";
// import { FileViewer } from "react-file-viewer";
// import { ToastContainer } from "react-toastify";
// import AdminSidebar from "../admin/sidebar";
// import AdminHeader from "../admin/header";
// import { useNavigate, Link } from "react-router-dom";
const PreviewEmail = ({ id }) => {
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  /* data and id states */
  const [emailData, setemailData] = useState([]);
  /* Function to get Employee visa data*/
  const EmailData = async () => {
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
    return decodeURIComponent(
      encodedSubject
        .replace(/=\?UTF-8\?Q\?/g, "")
        .replace(/\?=/g, "")
        .replace(/=([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode(parseInt(p1, 16))
        )
    );
  }

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
    <div className="table-responsive main_table_div preview-email-container">
      {/* <h1>Exciting News!</h1>
                  <p>Hello [Recipient's Name],</p>
                  <p>We have some exciting news to share with you...</p> */}
      {
        isLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className="preview-email-container">
            <div className="email-content">
              <div className="email-header">
                <h2>{decodeEmailSubject(emailData.subject)}</h2>
                <p>From: {emailData.from}</p>
                <p>To: {emailData.to}</p>
              </div>
              <div className="email-body text-truncate">
                <p>{emailData.body_data}</p>
              </div>
              <div className="attachments">
                {(emailData.attachment[0] || []).map((item, index) => (
                  <img
                    key={index}
                    src={`data:image/${item.ext_type};base64,${item.file_data}`}
                    alt={`attachment-${index}`}
                    width={100}
                    height={100}
                  />
                ))}
              </div>
            </div>
          </div>
          // <div className="container">
          //   <div>
          //     <h5>From :</h5>
          //     <p>{emailData.from}</p>
          //   </div>
          //   <div>
          //     <h5>To :</h5>
          //     <p>{emailData.to}</p>
          //   </div>
          //   <div>
          //     <h5>Subject :</h5>
          //     <p>{emailData.subject}</p>
          //   </div>
          //   <div>
          //     <h5>body :</h5>
          //     <p>{emailData.body_data}</p>
          //   </div>
          //   <div>
          //     {(emailData.attachment[0] || []).map((item) => {
          //       return (
          //         <>
          //           {console.log(item.file_data)}
          //           <img
          //             // fileType={item.ext_type}
          //             src={`data:image/${item.ext_type};base64,${item.file_data}`}
          //             alt="attachment"
          //             width={100}
          //             height={100}
          //           />
          //         </>
          //       );
          //     })}
          //   </div>
          // </div>
          // emailData.includes("=?UTF-8?Q?") ? (
          // <div dangerouslySetInnerHTML={{ __html: emailData }} />
        ) //decodeEmailSubject(emailData)
        // ) : (
        //   <pre>{emailData}</pre>
        // )
      }
    </div>
  );
};

export default PreviewEmail;
