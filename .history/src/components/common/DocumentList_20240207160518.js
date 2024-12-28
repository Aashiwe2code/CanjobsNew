import React, { useState } from "react";
import { Accordion } from "react-bootstrap";

export default function DocumentList({
  user_type,
  docData,
  setSelectDocTypeName,
}) {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionToggle = (type) => {
    setActiveAccordion(activeAccordion === type ? null : type);
    setSelectDocTypeName(type);
  };

  const documentTypes = Object.keys(docData);

  return (
    <div
      className={`${
        user_type === "admin" ? "col-md-2" : "col-md-4"
      } p-0 border-right pb-7`}
    >
      <h5 className="pl-5 pt-5 d-flex justify-content-between align-items-center">
        Document List
      </h5>

      {/* Dropdown for selecting document type */}
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select Document Type
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {documentTypes.map((type, index) => (
            <li key={index} onClick={() => handleAccordionToggle(type)}>
              <span className="dropdown-item">{type}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Accordion for displaying documents */}
      <Accordion activeKey={activeAccordion}>
        {documentTypes.map((type, index) => (
          <Accordion.Item key={index} eventKey={type}>
            <Accordion.Header>{type}</Accordion.Header>
            <Accordion.Body>
              {docData[type].map((item) => (
                <div key={item.id} className="card mb-2">
                  <div className="card-body">
                    <h6 className="card-title">{item.document_name}</h6>
                    <p className="card-text">
                      Document URL: {item.document_url}
                    </p>
                    {/* Add more details as needed */}
                  </div>
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
