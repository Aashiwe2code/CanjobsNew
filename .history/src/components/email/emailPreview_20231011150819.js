// src/PreviewEmail.js
import React from "react";

const PreviewEmail = () => {
  return (
    <div className="preview-email">
      <div className="header">
        <img src="/image/00logo-main-black.png" alt="Your Logo" />
      </div>
      <div className="content">
        <h1>Exciting News!</h1>
        <p>Hello [Recipient's Name],</p>
        <p>We have some exciting news to share with you...</p>
        <p>Click the button below to learn more:</p>
        <a href="your_website.com" className="cta-button">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default PreviewEmail;
