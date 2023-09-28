import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { EmployerDetails, AddContact } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactInfo(props) {
  const [loading, setLoading] = useState(false);

  // COMPANY PERSONAL INFO VALIDATION
  /* Functionality to close the modal */

  const close = () => {
    setState(initialFormState);
    setErrors("");
    setLoading(false);
    props.close();
  };
  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    contact_person_name: "",
    email: "",
    contact_no: "",
    contact_no_other: "",
    address: "",
    pin_code: "",
    city: "",
    state: "",
    country: "",
    designation: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    contact_person_name: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Comapny name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : value.length < 2
          ? "Comapny name should have 2 or more letter"
          : "",
    ],
    email: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
    contact_no: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Phone no is required"
          : value.length < 13
          ? "Mobile no should be of 10 digits"
          : "",
    ],
    designation: [
      (value) =>
        value === "" || value === null
          ? "Designation is required"
          : value.length < 2
          ? "Designation should have 2 or more letter"
          : "",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, setErrors, validate } =
    useValidation(initialFormState, validators);
  // API CALL
  const EmployerData = async () => {
    try {
      let userData = await EmployerDetails(props.employerId);
      if (
        userData.data.company_detail === undefined ||
        userData.data.company_detail === [] ||
        userData.data.company_detail === 0
      ) {
        setState(initialFormState);
      } else {
        setState(userData.data.company_detail[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    props.employerId === undefined || props.employerId === "0"
      ? setState(initialFormState)
      : EmployerData();
  }, [props]);

  // COMPANY PERSONAL INFO SUBMIT BUTTON
  const onCompanyContactClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        let responseData = await AddContact(state);
        if (responseData.message === "contact data updated successfully") {
          toast.success("Contact Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  // END COMPANY PERSONAL INFO VALIDATION
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
          <form onSubmit={onCompanyContactClick}>
            <h5 className="text-center pt-2 mb-7">Contact Detail</h5>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="contact_person_name"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Contact Person Name: <span className="text-danger"> *</span>
                </label>
                <input
                  maxLength={20}
                  name="contact_person_name"
                  value={state.contact_person_name || ""}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.contact_person_name
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Contact person Name"
                  id="contact_person_name"
                />
                {/*----ERROR MESSAGE FOR contact_person_name----*/}
                {errors.contact_person_name && (
                  <span
                    key={errors.contact_person_name}
                    className="text-danger font-size-3"
                  >
                    {errors.contact_person_name}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="email"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Email: <span className="text-danger"> *</span>
                </label>
                <input
                  maxLength={30}
                  name="email"
                  value={state.email || ""}
                  onChange={onInputChange}
                  type="email"
                  className={
                    errors.email
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="example@gmail.com"
                  id="email"
                />
                {/*----ERROR MESSAGE FOR email----*/}
                {errors.email && (
                  <span key={errors.email} className="text-danger font-size-3">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="contact_no"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Contact No: <span className="text-danger">*</span>
                  <small>Add mobile no. with country code without +</small>
                </label>
                <input
                  maxLength={30}
                  name="contact_no"
                  value={state.contact_no || ""}
                  onChange={onInputChange}
                  type="number"
                  min={0}
                  className={
                    errors.contact_no
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Contact No"
                  id="contact_no"
                />
                {/*----ERROR MESSAGE FOR Contact No----*/}
                {errors.contact_no && (
                  <span
                    key={errors.contact_no}
                    className="text-danger font-size-3"
                  >
                    {errors.contact_no}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="contact_no_other"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Other Contact No:
                </label>
                <input
                  maxLength={30}
                  name="contact_no_other"
                  value={state.contact_no_other || ""}
                  onChange={onInputChange}
                  type="number"
                  min={0}
                  className={"form-control"}
                  placeholder="Other Contact No"
                  id="contact_no_other"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="address"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Address:
                </label>
                <input
                  maxLength={60}
                  type="text"
                  name="address"
                  value={state.address || ""}
                  onChange={onInputChange}
                  className={
                    errors.address
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Address"
                  id="address"
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
              <div className="form-group col-md-6">
                <label
                  htmlFor="pin_code"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Pincode:
                </label>
                <input
                  name="pin_code"
                  value={state.pin_code || ""}
                  onChange={onInputChange}
                  type="number"
                  min={0}
                  className={
                    errors.pin_code
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Pincode"
                  id="pin_code"
                />
                {/*----ERROR MESSAGE FOR pin_code----*/}
                {errors.pin_code && (
                  <span
                    key={errors.pin_code}
                    className="text-danger font-size-3"
                  >
                    {errors.pin_code}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="city"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  City:
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
                />
                {/*----ERROR MESSAGE FOR city----*/}
                {errors.city && (
                  <span key={errors.city} className="text-danger font-size-3">
                    {errors.city}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="state"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  State:
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
                />
                {/*----ERROR MESSAGE FOR state----*/}
                {errors.state && (
                  <span key={errors.state} className="text-danger font-size-3">
                    {errors.state}
                  </span>
                )}
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="country"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Country:
                </label>
                <input
                  type="text"
                  placeholder="Country"
                  id="country"
                  name="country"
                  value={state.country || ""}
                  onChange={onInputChange}
                  className={
                    errors.country
                      ? "form-control border border-danger"
                      : "form-control"
                  }
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
              <div className="form-group col-md-6">
                <label
                  htmlFor="designation"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Your Designation: <span className="text-danger"> *</span>
                </label>
                <div className="position-relative">
                  <input
                    maxLength={30}
                    name="designation"
                    value={state.designation || ""}
                    onChange={onInputChange}
                    type="text"
                    className={
                      errors.designation
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Designation"
                    id="designation"
                  />
                  {/*----ERROR MESSAGE FOR designation----*/}
                  {errors.designation && (
                    <span
                      key={errors.designation}
                      className="text-danger font-size-3"
                    >
                      {errors.designation}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group text-center">
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
                  className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                  type="submit"
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

export default ContactInfo;
