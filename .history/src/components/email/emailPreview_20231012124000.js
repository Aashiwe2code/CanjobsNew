import React, { useState, useEffect } from "react";
import { ReadEmail } from "../../api/api";
import Loader from "../common/loader";

const PreviewEmail = ({ id }) => {
  // ... (existing code)

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

  function decodeQuotedPrintable(encodedText) {
    const decodedText = document.createElement("textarea");
    decodedText.innerHTML = encodedText;
    return decodedText.value;
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
          <pre>
            {emailData.includes("=?UTF-8?Q?")
              ? decodeEmailSubject(emailData)
              : decodeQuotedPrintable(emailData)}
          </pre>
        )}
        <a href="your_website.com" className="cta-button">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default PreviewEmail;
