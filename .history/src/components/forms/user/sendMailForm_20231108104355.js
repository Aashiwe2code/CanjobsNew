import React, { /*useEffect,*/ useState } from "react";
import useValidation from "../../common/useValidation";
import { SendEmail } from "../../../api/api";
import { toast } from "react-toastify";
function SendMailForm({ email }) {
  const [loading, setLoading] = useState(false);

  /*Render function to get the Response*/
  // useEffect(() => {
  // }, []);

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    subject: "",
    description: "",
    email: email,
  };

  /*Validation */
  let validators = {
    subject: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Subject is required"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Subject can not have a number."
          : value.length < 2
          ? "Subject should have 2 or more letters"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : "",
    ],
    description: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Description is required"
          : // : /[-]?\d+(\.\d+)?/.test(value)
          // ? "Description can not have a number."
          value.length < 5
          ? "Description should have 2 or more letters"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            "",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, setErrors, validate } =
    useValidation(initialFormState, validators);

  /*Function to sent email*/
  const onContactusClick = async () => {
    if (validate()) {
      try {
        setLoading(true);
        let Response = await SendEmail(state);
        if (Response.message === "email sent successfully") {
          toast.success("Email sent successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          setState(initialFormState);
          setErrors("");
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <form>
        <div className="row pt-7">
          <div className="form-group col-12 p-0">
            <label
              htmlFor="subject"
              className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
            >
              Subject: <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                maxLength={30}
                name="subject"
                value={state.subject || ""}
                onChange={onInputChange}
                type="text"
                className={
                  errors.subject
                    ? "form-control border border-danger"
                    : "form-control"
                }
                placeholder="subject"
                id="subject"
              />
            </div>
            {/*----ERROR MESSAGE FOR name----*/}
            {errors.subject && (
              <span key={errors.subject} className="text-danger font-size-3">
                {errors.subject}
              </span>
            )}
          </div>
          <div className="form-group col-12 p-0">
            <label
              htmlFor="description"
              className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
            >
              Description: <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <div
                className={
                  errors.description
                    ? "border border-danger rounded overflow-hidden"
                    : "border rounded overflow-hidden"
                }
              >
                <textarea
                  name="description"
                  value={state.description}
                  onChange={onInputChange}
                  rows={8}
                  style={{ height: "140px" }}
                  className={
                    errors.description
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="description"
                  placeholder="Add Note here"
                ></textarea>
              </div>
              {/*----ERROR MESSAGE FOR DESRIPTION----*/}
              {errors.description && (
                <span
                  key={errors.description}
                  className="text-danger font-size-3"
                >
                  {errors.description}
                </span>
              )}
            </div>
          </div>
          <div className="form-group col-12 text-center">
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
                onClick={(e) => onContactusClick(e)}
                className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                type="button"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SendMailForm;
