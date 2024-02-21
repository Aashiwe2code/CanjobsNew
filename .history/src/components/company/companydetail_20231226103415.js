import React, { useState, useEffect } from "react";
import CustomButton from "../common/button";
import ContactInfo from "../forms/employer/contactInfo";
import { EmployerDetails } from "../../api/api";
import { Link } from "react-router-dom";
import { PiPencilDuotone } from "react-icons/pi";
function CompanyDetailPage(props) {
  /*Show modal and data state */
  const [apiCall, setApiCall] = useState(false);
  const [ContactDetails, setContactDetails] = useState(false);
  const [employerData, setEmployerData] = useState("");
  let user_type = localStorage.getItem("userType");
  /*Render method to get employer data */
  useEffect(() => {
    const EmployerData = async () => {
      try {
        let userData = await EmployerDetails(props.employerId);
        if (
          userData === undefined ||
          userData.data.company_detail.length === 0
        ) {
          setEmployerData([]);
        } else {
          setEmployerData(userData.data.company_detail[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (props.employerId !== "0" || props.employerId !== undefined) {
      EmployerData();
    }
  }, [props.employerId, apiCall]);
  return (
    <>
      <div
        className={
          props.page === "company_profile"
            ? "company_info d-flex align-items-center justify-content-left flex-wrap"
            : "company_info"
        }
      >
        {employerData.contact_person_name === null ||
        employerData.contact_person_name === undefined ||
        employerData.contact_person_name === "undefined" ? (
          <div className="text-left row m-0">
            <div className="font-size-3 text-default-color line-height-2 m-0 text-break mr-7">
              No Data Found
            </div>
          </div>
        ) : (
          <div className="text-left row m-0">
            {employerData.contact_person_name ? (
              <div
                className="font-size-3 text-default-color line-height-2 m-0 text-break mr-7"
                title="Contact Person Name"
              >
                <i className="fas fa-user mr-2"></i>
                {employerData.contact_person_name}
              </div>
            ) : null}
            {employerData.designation ? (
              <div
                className="font-size-3 text-default-color line-height-2 m-0 text-break mr-7"
                title="Designation"
              >
                <i className="fas fa-portrait mr-2"></i>
                {employerData.designation}
              </div>
            ) : null}
            {employerData.email && props.page !== "company_profile" ? (
              <div
                className="font-size-3 text-default-color line-height-2 m-0 text-break mr-7"
                title="Email"
              >
                <i className="fas fa-envelope mr-2"></i>
                <Link className="text-dark" to={`mailto:${employerData.email}`}>
                  {employerData.email}
                </Link>
              </div>
            ) : null}
            {employerData.contact_no && props.page !== "company_profile" ? (
              <div
                className="font-size-3 text-default-color line-height-2 m-0 text-break mr-7"
                title="Contact No"
              >
                <i className="fas fa-phone-alt mr-2"></i>
                <Link
                  className="text-dark"
                  to={`tel:${employerData.contact_no}`}
                >
                  {employerData.contact_no}
                </Link>
              </div>
            ) : null}
            {employerData.contact_no_other &&
            props.page !== "company_profile" ? (
              <div
                className="font-size-3 text-default-color line-height-2 m-0 text-break mr-7"
                title="Contact No"
              >
                <i className="fas fa-phone-alt mr-2"></i>
                <Link
                  className="text-dark"
                  to={`tel:${employerData.contact_no_other}`}
                >
                  {employerData.contact_no_other}
                </Link>
              </div>
            ) : null}
            {employerData.address ? (
              <div
                className="font-size-3 text-default-color line-height-2 m-0 text-break mr-7"
                title="Address"
              >
                <i className="fas fa-map-marker-alt mr-2"></i>
                {employerData.address}
              </div>
            ) : null}{" "}
            {props.page === "company_profile" ? null : (
              <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                <span>Contact Info</span>
                <CustomButton
                  className={" font-size-3 rounded-3 btn-primary border-0"}
                  onClick={() => setContactDetails(true)}
                >
                  <PiPencilDuotone />
                </CustomButton>
              </h4>
            )}
          </div>
        )}
        {props.page === "company_profile" ? (
          <CustomButton
            className={
              user_type === "user"
                ? "d-none"
                : " font-size-3 rounded-3 btn-primary border-0"
            }
            onClick={() => setContactDetails(true)}
          >
            <PiPencilDuotone />
          </CustomButton>
        ) : null}
      </div>

      {ContactDetails ? (
        <ContactInfo
          employerId={props.employerId}
          show={ContactDetails}
          apiCall={apiCall}
          setApiCall={setApiCall}
          homeCall={props.setApiCall}
          close={() => setContactDetails(false)}
        />
      ) : null}
    </>
  );
}

export default CompanyDetailPage;
