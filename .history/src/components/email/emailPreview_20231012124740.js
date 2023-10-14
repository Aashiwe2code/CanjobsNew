import React, { useState, useEffect } from "react";
import { ReadEmail } from "../../api/api";
import Loader from "../common/loader";
import quotedPrintable from "quoted-printable";

const PreviewEmail = ({ id }) => {
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [emailData, setemailData] = useState([]);

  const EmailData = async () => {
    setIsLoading(true);
    try {
      const Res = await ReadEmail(id);
      if (Res.data.length === 0) {
        setemailData([]);
        setIsLoading(false);
      } else {
        setemailData(Res.data);
        setIsLoading(false);
      }
      setIsLoading(false);
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
  }, [apiCall]);

  function decodeQuotedPrintable(encodedText) {
    return encodedText
      .replace(/=\r\n/g, "")
      .replace(/=([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      );
  }

  return (
    <div className="response_main_div">
      <div className="header">
        <img src="/image/00logo-main-black.png" alt="Your Logo" />
      </div>
      <div className="content">
        {isLoading ? (
          <div className="table-responsive main_table_div">
            <Loader />
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: decodeQuotedPrintable(emailData),
            }}
          />
        )}
        <a href="your_website.com" className="cta-button">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default PreviewEmail;
