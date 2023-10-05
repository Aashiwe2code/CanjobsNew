import moment from "moment";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { EmployerDetails, AddKyc } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function KycComplianceDetails(props) {
  const [loading, setLoading] = useState(false);

  /* Functionality to close the modal */

  const close = () => {
    setState(initialFormState);
    setErrors("");
    setLoading(false);
    props.close();
  };
  let encoded;
  // COMPANY KYC DETAIL VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    name: "",
    pincode: "",
    pan_no: "",
    pan_date: "",
    address: "",
    city: "",
    state: "",
    country: "",
    gstin: "",
    tan_number: "",
    document: "",
    fax_number: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    name: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "PAN card name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : value.length < 2
          ? "PAN name  be of 2  or more letters"
          : "",
    ],

    pincode: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Pincode is required"
          : value.length < 6
          ? "Pincode should be of 6 digits"
          : "",
    ],
    pan_no: [
      (value) =>
        value === "" || value === null
          ? "PAN no is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : value.length < 10 || value.length > 10
          ? "PAN no should be of 10 digits"
          : !/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/.test(value)
          ? "PAN no should be of 6 alphabte and 4 digits"
          : "",
    ],
    pan_date: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "PAN card date is required"
          : "",
    ],
    address: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Address is required"
          : value.length < 5
          ? "Address should be of 5  or more letters"
          : "",
    ],
    city: [
      (value) =>
        value === "" || value === null
          ? "City is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : "",
    ],
    state: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "State is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : "",
    ],
    gstin: [
      (value) =>
        value === "" || value === null
          ? ""
          : !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/.test(value)
          ? "Invalid GSTIN"
          : "",
    ],
    tan_number: [
      (value) =>
        value === "" || value === null
          ? ""
          : !/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/.test(value)
          ? "Invalid TAN"
          : "",
    ],
    country: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Country is required"
          : "",
    ],
    fax_number: [
      (value) =>
        value === "" || value === null
          ? ""
          : !/^\+?\d{1,3}[- ]?\d{3,4}[- ]?\d{4}$/i.test(value)
          ? "Invalid Fax"
          : "",
    ],
    document: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Document is required"
          : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setErrors, setState, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);
  // API CALL
  const EmployerData = async () => {
    try {
      let userData = await EmployerDetails(props.employerId);
      if (
        userData.data.kyc_detail.length === 0 ||
        userData.data.kyc_detail === undefined ||
        userData.data.kyc_detail === "0" ||
        userData.data.kyc_detail === null
      ) {
        setState(initialFormState);
      } else {
        setState(userData.data.kyc_detail[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    props.employerId === undefined
      ? setState(initialFormState)
      : EmployerData();
  }, [props]);

  // COMPANY KYC DETAIL SUBMIT BUTTON
  const onKycInfoClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(false);
      try {
        let responseData = await AddKyc(state, props.employerId);
        if (responseData.message === "Employee data inserted successfully") {
          toast.success("Kyc Added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
        if (responseData.message === "Employee data updated successfully") {
          toast.success("Kyc Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setLoading(false);
    }
  };
  // END COMPANY KYC DETAIL VALIDATION

  /*Function to convert file to base64 */
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        resolve({ base64: fileReader.result });
      });
      fileReader.readAsDataURL(file);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  /*Onchange function of Resume */
  const handleUploadFile = async (e) => {
    encoded = await convertToBase64(e.target.files[0]);
    let base64Name = encoded.base64;
    setState({ ...state, document: base64Name });
  };
  return (
    <>
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          data-dismiss="modal"
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white rounded h-100 px-11 pt-7">
          <form>
            <h5 className="text-center pt-2 mb-7">KYC Compliance Details</h5>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="pan_no"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  PAN Number<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  placeholder="PAN Number"
                  id="pan_no"
                  name="pan_no"
                  value={state.pan_no || ""}
                  onChange={onInputChange}
                  className={
                    errors.pan_no
                      ? "form-control border border-danger text-uppercase"
                      : "form-control text-uppercase"
                  }
                />
                {/*----ERROR MESSAGE FOR pan_no----*/}
                {errors.pan_no && (
                  <span key={errors.pan_no} className="text-danger font-size-3">
                    {errors.pan_no}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="name"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Name on PAN Card<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  placeholder="Name on PAN Card"
                  id="name"
                  name="name"
                  value={state.name || ""}
                  onChange={onInputChange}
                  className={
                    errors.name
                      ? "form-control border border-danger "
                      : "form-control "
                  }
                  maxLength={60}
                />
                {/*----ERROR MESSAGE FOR name----*/}
                {errors.name && (
                  <span key={errors.name} className="text-danger font-size-3">
                    {errors.name}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="pan_date"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Date on PAN Card<span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <input
                    type="date"
                    placeholder="Date_on_PAN_Card"
                    id="pan_date"
                    name="pan_date"
                    max={moment().format("DD-MM-YYYY")}
                    value={state.pan_date || ""}
                    onChange={onInputChange}
                    onKeyDownCapture={(e) => e.preventDefault()}
                    className={
                      errors.pan_date
                        ? "form-control coustam_datepicker border border-danger"
                        : "form-control coustam_datepicker"
                    }
                  />
                  {/*----ERROR MESSAGE FOR pan_date----*/}
                  {errors.pan_date && (
                    <span
                      key={errors.pan_date}
                      className="text-danger font-size-3"
                    >
                      {errors.pan_date}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="address"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Address<span className="text-danger">*</span> :
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  id="address"
                  name="address"
                  value={state.address || ""}
                  onChange={onInputChange}
                  className={
                    errors.address
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR address----*/}
                {errors.address && (
                  <span
                    key={errors.address}
                    className="text-danger font-size-3"
                  >
                    {errors.address}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="pincode"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Pincode<span className="text-danger"> *</span> :
                </label>
                <input
                  type="number"
                  min={0}
                  placeholder="Pincode"
                  id="pincode"
                  name="pincode"
                  value={state.pincode || ""}
                  onChange={onInputChange}
                  className={
                    errors.pincode
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR pincode----*/}
                {errors.pincode && (
                  <span
                    key={errors.pincode}
                    className="text-danger font-size-3"
                  >
                    {errors.pincode}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="city"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  City<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  placeholder="City"
                  id="city"
                  name="city"
                  value={state.city || ""}
                  onChange={onInputChange}
                  className={
                    errors.city
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  maxLength={60}
                />
                {/*----ERROR MESSAGE FOR city----*/}
                {errors.city && (
                  <span key={errors.city} className="text-danger font-size-3">
                    {errors.city}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="state"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  State<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  placeholder="State"
                  id="state"
                  name="state"
                  value={state.state || ""}
                  onChange={onInputChange}
                  className={
                    errors.state
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  maxLength={60}
                />
                {/*----ERROR MESSAGE FOR state----*/}
                {errors.state && (
                  <span key={errors.state} className="text-danger font-size-3">
                    {errors.state}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="country"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Country:<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  placeholder="State"
                  id="country"
                  name="country"
                  value={state.country || ""}
                  onChange={onInputChange}
                  className={
                    errors.country
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  maxLength={60}
                />
                {/*----ERROR MESSAGE FOR country----*/}
                {errors.country && (
                  <span
                    key={errors.country}
                    className="text-danger font-size-3"
                  >
                    {errors.country}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="gstin"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  GSTIN:
                </label>
                <input
                  type="text"
                  placeholder="GSTIN"
                  id="gstin"
                  name="gstin"
                  value={state.gstin || ""}
                  onChange={onInputChange}
                  className={
                    errors.gstin
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR gstin----*/}
                {errors.gstin && (
                  <span key={errors.gstin} className="text-danger font-size-3">
                    {errors.gstin}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="fax_number"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Fax Number:
                </label>
                <input
                  type="text"
                  placeholder="Fax Number"
                  id="fax_number"
                  name="fax_number"
                  value={state.fax_number || ""}
                  onChange={onInputChange}
                  className={
                    errors.fax_number
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR fax_number----*/}
                {errors.fax_number && (
                  <span
                    key={errors.fax_number}
                    className="text-danger font-size-3"
                  >
                    {errors.fax_number}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="tan_number"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  TAN Number:
                </label>
                <input
                  type="text"
                  placeholder="TAN Number"
                  id="tan_number"
                  name="tan_number"
                  value={state.tan_number || ""}
                  onChange={onInputChange}
                  className={
                    errors.tan_number
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR tan_number----*/}
                {errors.tan_number && (
                  <span
                    key={errors.tan_number}
                    className="text-danger font-size-3"
                  >
                    {errors.tan_number}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="document"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Document Upload: <span className="text-danger"> *</span>
                </label>
                <input
                  type="file"
                  id="document"
                  name="document"
                  // value={state.docume  || ""nt}
                  accept=".pdf,application/pdf"
                  onChange={handleUploadFile}
                  className={
                    errors.document
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
              </div>
            </div>
            <div className="form-group mb-8 text-center">
              {loading === true ? (
                <button
                  className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm "
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Loading...</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => onKycInfoClick(e)}
                  className="btn btn-primary btn-medium w-25 rounded-5 text-uppercase"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default KycComplianceDetails;
