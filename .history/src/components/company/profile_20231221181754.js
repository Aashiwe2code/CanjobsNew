import React, { useState, useEffect } from "react";
import KycComplianceDetails from "../forms/employer/kyc";
import EmployeeHeader from "../common/header";
import EmployeeFooter from "../common/footer";
import CustomButton from "../common/button";
import CompanyDetailPage from "./companydetail";
import CompanyDetails from "../forms/employer/companyDetail";
import { EmployerDetails } from "../../api/api";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import Loader from "../common/loader";
import { Link } from "react-router-dom";
import EmployerDocumentModal from "../forms/admin/EmployerDocumetModal";
import { PiPencilDuotone } from "react-icons/pi";
function CompanyProfile(props) {
  const user_type = localStorage.getItem("userType");
  const company_id = localStorage.getItem("company_id");
  /*Show modal and data state */
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [showDoc, setShowDoc] = useState(false);
  const [showCompanyInfoModal, setShowCompanyInfoModal] = useState(false);
  const [showKycComplainDetailsModal, setShowKycComplainDetailsModal] =
    useState(false);
  const [employerData, setEmployerData] = useState("");
  const [employerKycData, setEmployerKycData] = useState("");

  /*Function to get employer data */
  const EmployerData = async () => {
    try {
      let userData = await EmployerDetails(props.employerId);
      localStorage.setItem(
        "profile_photo",
        userData.data.company_detail[0].logo
      );
      if (userData === undefined) {
        setEmployerData("");
        setEmployerKycData("");
      } else if (
        userData.data.kyc_detail.length === 0 ||
        userData.data.kyc_detail === undefined ||
        userData.data.kyc_detail === "0" ||
        userData.data.kyc_detail === null
      ) {
        setEmployerKycData("");
        setEmployerData(userData.data.company_detail[0]);
        setIsLoading(false);
      } else {
        setEmployerData(userData.data.company_detail[0]);
        setEmployerKycData(userData.data.kyc_detail[0]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*Render method to get employer data */
  useEffect(() => {
    EmployerData();
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [apiCall]);

  return (
    <div>
      <ToastContainer />
      {user_type !== "admin" ? <EmployeeHeader /> : null}
      <div
        className={
          user_type === "admin"
            ? "bg-default-2 mt-5"
            : "bg-default-2 pt-30 pt-lg-22 pb-lg-27"
        }
      >
        <div className="container">
          {/* <!-- back Button --> */}
          {/* <!-- back Button End --> */}
          {isLoading ? (
            <div className="table-responsive main_table_div">
              <Loader />
            </div>
          ) : (
            <div
              className={
                user_type === "admin"
                  ? "row bg-white rounded-4 pt-12 shadow-9"
                  : "row bg-white rounded-4 pt-11 shadow-9"
              }
            >
              {/* <!-- Company Profile --> */}
              
              <div className="w-100 row m-0 align-items-center px-12 mb-8 text-center text-xs-left">
                <div>aaaaaaaaaaaaa</div>
                <div className="media align-items-center company_box col-10 p-0">
                  <div className="text_box text-left">
                    <img
                      className="company_logo"
                      src={
                        employerData.logo === null
                          ? "https://macsnh.org/wp-content/uploads/2019/08/demo-logo-black.png"
                          : employerData.logo
                      }
                      alt=""
                    />
                  </div>
                  <div className="text_box text-left w-100 text-capitalize">
                    <h3 className="mb-0 font-size-6 heading-dark-color">
                      {employerData.company_name}
                    </h3>
                    <p className="font-size-3 text-default-color line-height-2 m-0">
                      {employerData.industry}
                    </p>
                  </div>
                </div>
                <div className="d-flex  justify-content-between">
                  <div
                    className="company_info_box text-md-right fd-column col-2 m-0 p-0 px-3"
                    title="Edit KYC Details"
                  >
                    <CustomButton
                      className="font-size-3 rounded-3 btn-primary border-0"
                      onClick={() => setShowKycComplainDetailsModal(true)}
                    >
                      <PiPencilDuotone />
                    </CustomButton>
                  </div>
                  <CustomButton
                    className=" font-size-4 rounded-3 btn-primary border-0"
                    onClick={() => setShowDoc(true)}
                  >
                    Add Document
                  </CustomButton>
                </div>
              </div>
              <div className="text-capitalize company_detail_box w-100 row m-0 pl-12 pt-5 pb-7 pr-12 pr-xxl-12">
                {employerData.industry ? (
                  <div className="font-size-3 mb-4 mr-10" title="Industry">
                    <i className="far fa-building mr-2"></i>
                    {employerData.industry}
                  </div>
                ) : null}
                {employerData.corporation ? (
                  <div className="font-size-3 mb-4 mr-10" title="Business Type">
                    <i className="fas fa-briefcase mr-2"></i>
                    {employerData.corporation}
                  </div>
                ) : null}
                {employerData.company_size ? (
                  <div className="font-size-3 mb-4 mr-10" title="Company size">
                    <i className="fas fa-user-friends mr-2"></i>
                    {employerData.company_size}
                  </div>
                ) : null}
                {employerData.company_start_date ? (
                  <div className="font-size-3 mb-4 mr-10" title="Est. Since">
                    <i className="fas fa-business-time mr-2"></i>
                    {moment(employerData.company_start_date).format("YYYY")}
                  </div>
                ) : null}
                {employerData.email ? (
                  <div className="font-size-3 mb-4 mr-10" title="Website URL">
                    <i className="fas fa-globe mr-2"></i>
                    <Link
                      className="text-dark"
                      to={`mailto:${employerData.email}`}
                    >
                      {employerData.email}
                    </Link>
                  </div>
                ) : null}
                {employerData.vacancy_for_post ? (
                  <div className="font-size-3 mb-4 mr-10" title="Hiring for">
                    <i className="fas fa-bullhorn mr-2"></i>
                    {employerData.vacancy_for_post}
                  </div>
                ) : null}
                {employerKycData === "" ? null : (
                  <>
                    {employerKycData.pan_no ? (
                      <div className="font-size-3 mb-4 mr-10" title="PAN">
                        <span className="mr-2 font-weight-bold">PAN</span>
                        {employerKycData.pan_no}
                      </div>
                    ) : null}
                    {employerKycData.tan_number ? (
                      <div className="font-size-3 mb-4 mr-10" title="TAN">
                        <span className="mr-2 font-weight-bold">TAN</span>
                        {employerKycData.tan_number}
                      </div>
                    ) : null}
                    {employerKycData.gstin ? (
                      <div className="font-size-3 mb-4 mr-10" title="GSTIN">
                        <span className="mr-2 font-weight-bold">GSTIN</span>
                        {employerKycData.gstin}
                      </div>
                    ) : null}
                  </>
                )}
              </div>
              {/* <!-- Middle Body Start --> */}
              <div className="w-100 row m-0 pl-12 pt-10 pb-7 pr-12 pr-xxl-12 border-top">
                <CompanyDetailPage
                  employerId={
                    user_type === "company" ? company_id : props.employerId
                  }
                />

                <div className="col-md-8 col-xl-9 col-lg-8 col-12 ">
                  <div>
                    <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
                      <span>About {employerData.company_name}</span>
                      <CustomButton
                        className="font-size-3 rounded-3 btn-primary border-0"
                        onClick={() => setShowCompanyInfoModal(true)}
                      >
                        <PiPencilDuotone />
                      </CustomButton>
                    </h4>
                    <div className="pt-5 text-left">
                      {employerData.about ? (
                        <p className="font-size-4 mb-8">{employerData.about}</p>
                      ) : (
                        <p className="font-size-4 mb-8 text-center">
                          No data Found
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {user_type !== "admin" ? <EmployeeFooter /> : null}
      {showCompanyInfoModal ? (
        <CompanyDetails
          employerId={user_type === "company" ? company_id : props.employerId}
          show={showCompanyInfoModal}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowCompanyInfoModal(false)}
        />
      ) : null}
      {showKycComplainDetailsModal ? (
        <KycComplianceDetails
          employerId={user_type === "company" ? company_id : props.employerId}
          show={showKycComplainDetailsModal}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setShowKycComplainDetailsModal(false)}
        />
      ) : null}
      {showDoc ? (
        <EmployerDocumentModal
          show={showDoc}
          close={() => setShowDoc(false)}
          employer_id={user_type === "company" ? company_id : props.employerId}
        />
      ) : null}
    </div>
  );
}

export default CompanyProfile;
