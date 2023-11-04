// src/PreviewEmail.js
import React, { useState, useEffect } from "react";
import { GetPreviewEmail } from "../../api/api";
import Loader from "../common/loader";
import "./PreviewEmail.css"; // Import CSS for styling

const PreviewEmail = ({ id }) => {
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [emailData, setemailData] = useState([]);

  const EmailData = async () => {
    setIsLoading(true);
    try {
      const Res = await GetPreviewEmail(id);
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
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    EmailData();
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [apiCall, id]);

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
    <div className="preview-email-container">
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="email-content">
          <div className="email-header">
            <img src="/image/00logo-main-black.png" alt="Your Logo" />
          </div>
          <div className="email-details">
            <div>
              <h5>From :</h5>
              <p>{emailData.from}</p>
            </div>
            <div>
              <h5>To :</h5>
              <p>{emailData.to}</p>
            </div>
            <div>
              <h5>Subject :</h5>
              <p>{decodeEmailSubject(emailData.subject)}</p>
            </div>
            <div>
              <h5>Body :</h5>
              <p>{emailData.body_data}</p>
            </div>
            <div className="attachments">
              {emailData.attachment[0]?.map((item, index) => (
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
      )}
    </div>
  );
};

export default PreviewEmail;
