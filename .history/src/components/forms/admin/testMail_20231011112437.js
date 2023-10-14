import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { TestEmail } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TestMail(props) {
  let [loading, setLoading] = useState(false);

  /* Functionality to close the modal */
  const close = () => {
    setState({ ...state, email_id: "", email_template_id: "" });
    setErrors("");
    setLoading(false);
    props.close();
  };
  // USER CATEGORY TYPE VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    email_id: "",
    email_template_id: props.data,
  };
  // VALIDATION CONDITIONS
  const validators = {
    email_id: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, setErrors, validate } =
    useValidation(initialFormState, validators);

  // API CALL
  // USER Test Email SUBMIT BUTTON
  async function onTestMailClick(event) {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const responseData = await TestEmail(state);
        if (responseData.message === "email sent successfully") {
          toast.success("Email sent successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
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
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
          data-dismiss="modal"
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
          <form onSubmit={onTestMailClick}>
            <h5 className="text-center mb-7 pt-2">Test</h5>
            <div className="form-group row mb-0 ">
              <label
                htmlFor="category_type"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Email Id <span className="text-danger">*</span> :
              </label>
              <input
                type="text"
                className={
                  errors.email_id
                    ? "form-control mx-5 border border-danger col"
                    : "form-control col mx-5"
                }
                value={state.email_id || ""}
                onChange={onInputChange}
                placeholder="Email Address"
                id="email_id"
                name="email_id"
                maxLength={60}
              />
            </div>
            {/*----ERROR MESSAGE FOR CATEGORY TYPE----*/}
            {errors.email_id && (
              <span
                key={errors.email_id}
                className="text-danger font-size-3 mx-5"
              >
                {errors.email_id}
              </span>
            )}

            <div className="form-group text-center">
              {loading === true ? (
                <button
                  className="btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase"
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
                  className="btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase"
                  type="submit"
                >
                  Send
                </button>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default TestMail;
