import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
// import { CKEditor } from "ckeditor4-react";
import { AddEmployeeDetails } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ApplyBeforeform(props) {
  const [loading, setLoading] = useState(false);
  const user_id = localStorage.getItem("employee_id");
  const email = localStorage.getItem("email");
  // USER PERSONAL DETAIL VALIDATION
  // INITIAL STATE ASSIGNMENT
  const initialFormStateuser = {
    name: "",
    email:
      email === "undefined" ||
      email === null ||
      email === "" ||
      email === undefined
        ? ""
        : email,
    contact_no: "",
    employee_id: user_id,
  };
  /* Functionality to close the modal */

  const close = () => {
    setState(initialFormStateuser);
    setErrors("");
    setLoading(false);
    props.close();
  };

  // VALIDATION CONDITIONS

  const validators = {
    name: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : value.length < 2
          ? "Name should have 2 or more letter"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Name can not have a number."
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
          ? "Mobile number is required"
          : value.length < 10
          ? "Mobile number should be more than 10 digits"
          : value.length > 13
          ? "Mobile no should be of 13 digits"
          : "",
    ],
  };

  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, validate, setErrors } =
    useValidation(initialFormStateuser, validators);

  // USER PERSONAL DETAIL SUBMIT BUTTON
  async function onUserPersonalDetailClick(event) {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const responseData = await AddEmployeeDetails(state);
        if (responseData.message === "Employee data inserted successfully") {
          toast.success("Employee added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          localStorage.setItem("name", state.name);
          props.setApiCall(true);
          return close();
        }
        if (responseData.message === "Employee data updated successfully") {
          toast.success("Employee Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          localStorage.setItem("name", state.name);
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
  }
  // END USER PERSONAL DETAIL VALIDATION

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
          <form onSubmit={onUserPersonalDetailClick}>
            <h5 className="text-center pt-2 mb-7">Add Personal Details</h5>

            <div className="row pt-5">
              <input
                maxLength={20}
                name="employee_id"
                value={state.id || ""}
                type="hidden"
                id="employee_id"
              />
              <div className="form-group col-md-4">
                <label
                  htmlFor="name"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Full Name: <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={60}
                  name="name"
                  value={state.name || ""}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.name
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Full Name"
                  id="name"
                />
                {/*----ERROR MESSAGE FOR name----*/}
                {errors.name && (
                  <span key={errors.name} className="text-danger font-size-3">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="email"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Email Id: <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={60}
                  type="email"
                  name="email"
                  value={state.email || ""}
                  onChange={onInputChange}
                  disabled={
                    email === "undefined" ||
                    email === null ||
                    email === "" ||
                    email === undefined
                      ? false
                      : true
                  }
                  className={
                    errors.email
                      ? "form-control border border-danger"
                      : "form-control "
                  }
                  id="email"
                  placeholder="email"
                />
                {/*----ERROR MESSAGE FOR EMAIL----*/}
                {errors.email && (
                  <span key={errors.email} className="text-danger font-size-3">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="contact_no"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Mobile Number: <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  placeholder="Mobile Number"
                  name="contact_no"
                  value={state.contact_no || ""}
                  onChange={onInputChange}
                  className={
                    errors.contact_no
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="contact_no"
                  maxLength={13}
                />
                {/*----ERROR MESSAGE FOR MOBILENO----*/}
                {errors.contact_no && (
                  <span
                    key={errors.contact_no}
                    className="text-danger font-size-3"
                  >
                    {errors.contact_no}
                  </span>
                )}
              </div>
            </div>

            {/* <div className="form-group col-md-4">
                <label
                  htmlFor="resume"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Resume: <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  placeholder="Resume"
                  id="resume"
                  name="resume"
                  accept=".pdf,application/pdf"
                  onChange={handleUploadFile}
                  className={
                    errors.resume
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                ----ERROR MESSAGE FOR RESUME----
                {errors.resume && (
                  <span key={errors.resume} className="text-danger font-size-3">
                    {errors.resume}
                  </span>
                )}
              </div> */}
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

export default ApplyBeforeform;
