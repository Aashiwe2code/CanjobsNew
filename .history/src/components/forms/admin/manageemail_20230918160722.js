import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import {
  AddUpdateEmailTemplate,
} from "../../../api//api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManageEmail(props) {
  let [loading, setLoading] = useState(false);

  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormState);
    setErrors("");
    props.close();
    setLoading(false);
  };
  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    id: "",
    email_type: "",
    subject: "",
    message: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    email_type: [
      (value) =>
        value === "" || value.trim() === "" ? "Email type is required" : "",
    ],
    subject: [
      (value) =>
        value === "" || value.trim() === "" ? "Subject is required" : "",
    ],
    message: [
      (value) =>
        value === "" || value.trim() === "" ? "Message is required" : "",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, setErrors, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);

  useEffect(() => {
    if (props.data === ("" || undefined || null)) {
      setState(initialFormState);
    } else {
      setState(props.data);
    }
  }, [props.data]);
  const onAddUpdateTemplate = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const responseData = await AddUpdateEmailTemplate(state);
        if (responseData.message === "data inserted successfully") {
          toast.success("Data inserted successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          return close();
        }
        if (responseData.message === "data updated successfully") {
          toast.success("Data updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          return close();
        }
      } catch (err) {
       console.log(err) 
        setLoading(false)
      }
    } else {
      setLoading(false);
    }
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
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
          data-dismiss="modal"
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
          {props.id === "" ? (
            <h5 className="text-center pt-2 mb-9">Add Email Template</h5>
          ) : (
            <h5 className="text-center pt-2 mb-9">Update Email Template</h5>
          )}
          <form onSubmit={onAddUpdateTemplate}>
            <div className="row">
              <input type="hidden" value={state.id} />
              <div className="col-sm-6 p-1 form-group">
                <label
                  htmlFor="email_type"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Email Type: <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={
                    errors.email_type
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  value={state.email_type || ""}
                  onChange={onInputChange}
                  id="email_type"
                  name="email_type"
                  disabled={props.data === "" ? false : true}
                  placeholder="Email type"
                />
                {/*----ERROR MESSAGE FOR Admin Name----*/}
                {errors.name && (
                  <span
                    key={errors.email_type}
                    className="text-danger font-size-3"
                  >
                    {errors.email_type}
                  </span>
                )}
              </div>
              <div className="col-sm-6 p-1 form-group ">
                <label
                  htmlFor="subject"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Subject: <span className="text-danger">*</span>
                </label>
                <input
                  className={
                    errors.subject
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  value={state.subject || ""}
                  onChange={onInputChange}
                  id="subject"
                  name="subject"
                  type={"subject"}
                  placeholder="Subject"
                />
                {/*----ERROR MESSAGE FOR subject----*/}
                {errors.subject && (
                  <span
                    key={errors.subject}
                    className="text-danger font-size-3"
                  >
                    {errors.subject}
                  </span>
                )}
              </div>

              <div className="col-sm-12 p-1 form-group ">
                <label
                  htmlFor="message"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Template: <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <textarea
                    type={"text"}
                    className={
                      errors.message
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.message || ""}
                    onChange={onInputChange}
                    id="message"
                    name="message"
                    placeholder="Meaasge"
                  ></textarea>
                </div>
                {/*----ERROR MESSAGE FOR ADMIN message----*/}
                {errors.message && (
                  <span
                    key={errors.message}
                    className="text-danger font-size-3"
                  >
                    {errors.message}
                  </span>
                )}
              </div>

              <div className="col-sm-12 form-group text-center">
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
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ManageEmail;
