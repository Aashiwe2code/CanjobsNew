import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import useValidation from "../common/useValidation";
import { SignupAgent, SendOtp } from "../../api/api";
import Permissions from "../json/emailPermisionJson";
import { toast } from "react-toastify";

function AgentSingup({ login }) {
  let [loading, setLoading] = useState(false);
  let [otpBox, setOtpBox] = useState(false);
  const [SingUpSuccess, setSingUpSuccess] = useState("");
  const [otpErr, setotperr] = useState("");
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    email: "",
    password: "",
    contact_no: "",
    term_and_condition: "",
    otp: "",
    Credentials: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    email: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
    password: [
      (value) =>
        value === ""
          ? "Password is required"
          : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
              value
            )
          ? null
          : "Password must contain digit, one uppercase letter, one special character, no space, and it must be 8-16 characters long",
    ],
    contact_no: [
      (value) =>
        value.trim() === "" || value === "" || value === null
          ? "Contact no is required"
          : value.length < 10 || value.length > 11
          ? "Contact no should be of 10 digits"
          : "",
    ],
    term_and_condition: [
      (value) =>
        otpBox === false
          ? ""
          : value === null || value === "" || value === false
          ? "Please accept terms and conditions continue"
          : "",
    ],
    otp: [
      (value) =>
        otpBox
          ? value === null || value === ""
            ? "Otp is requried"
            : otpErr === "Invalid Otp"
            ? "Invalid Otp"
            : ""
          : "",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, setErrors, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);

  // USER SIGNUP SUBMIT BUTTON
  const onAgentSignUpClick = async (event) => {
    event.preventDefault();
    if (validate() && state.otp && state.term_and_condition) {
      /*Api to signup */
      try {
        let Response = await SignupAgent(state, Permissions);
        console.log(Response);
        // if (Response.message === "Employer has been registered") {
        //   setErrors("");
        //   setState(initialFormState);
        //   setOtpBox(false);
        //   setSingUpSuccess("success");
        // } else if (Response.message === " incorrect otp ") {
        //   setLoading(false);
        //   setotperr("Invalid Otp");
        //   setErrors({ ...errors, term_and_condition: "" });
        //   setErrors({ ...errors, contact_no: "" });
        // } else if (Response.message === "Email already exists") {
        //   setErrors({ ...errors, email: ["Email already exists"] });
        //   setState(initialFormState);
        //   setOtpBox(false);
        // }
      } catch (err) {
        console.log(err);
        // setErrors({ ...errors, Credentials: ["Please try again later."] });
        // toast.error("Something went wrong", {
        //   position: toast.POSITION.TOP_RIGHT,
        //   autoClose: 1000,
        // });
      }
    } else if (otpBox === false && validate()) {
      /*Api to get otp */
      setLoading(true);
      try {
        const updatedTodo = await SendOtp(state);
        if (updatedTodo.message === "successful") {
          toast.success("Otp sent Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setOtpBox(true);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setErrors({ ...errors, Credentials: ["Please try again later."] });
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <form onSubmit={onAgentSignUpClick}>
        {/* FORM FIELDS */}
        <div className="form-group">
          <label
            htmlFor="email2"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            E-mail
          </label>
          <input
            type="email"
            name="email"
            value={"" || state.email}
            onChange={onInputChange}
            className={
              errors.email
                ? "form-control border border-danger"
                : "form-control"
            }
            placeholder="example@gmail.com"
            id="email"
          />
          {/* ERROR MSG FOR Company EMAIL */}
          {errors.email && (
            <span key={errors.email} className="text-danger font-size-3">
              {errors.email}
            </span>
          )}
        </div>
        <div className="form-group">
          <label
            htmlFor="contact_no"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Contact Number
          </label>
          <input
            type="number"
            name="contact_no"
            value={"" || state.contact_no}
            onChange={onInputChange}
            className={
              errors.contact_no
                ? "form-control border border-danger"
                : "form-control"
            }
            placeholder="Contact Number"
            id="contact_no"
            min={0}
          />
          {/* ERROR MSG FOR Company no */}
          {errors.contact_no && (
            <span key={errors.contact_no} className="text-danger font-size-3">
              {errors.contact_no}
            </span>
          )}
        </div>
        <div className="form-group">
          <label
            htmlFor="password"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Password
          </label>
          <div className="position-relative">
            <input
              name="password"
              value={"" || state.password}
              onChange={onInputChange}
              type="password"
              className={
                errors.password
                  ? "form-control border border-danger"
                  : "form-control"
              }
              id="password"
              placeholder="Enter password"
            />
            {/* ERROR MSG FOR PASSWORD */}
            {errors.password && (
              <span key={errors.password} className="text-danger font-size-3">
                {errors.password}
              </span>
            )}
          </div>
        </div>
        {otpBox ? (
          <div className="form-group">
            <label
              htmlFor="otp"
              className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
            >
              Enter Otp
            </label>
            <div className="position-relative">
              <input
                type="number"
                value={"" || state.otp}
                onChange={onInputChange}
                maxLength={6}
                name="otp"
                id="otp"
                className={
                  errors.otp
                    ? "form-control border border-danger"
                    : "form-control"
                }
                placeholder="Otp"
                min={0}
              />
              {errors.otp && (
                <span key={errors.otp} className="text-danger font-size-3">
                  {errors.otp}
                </span>
              )}
            </div>
          </div>
        ) : null}
        {/* END FORM FIELDS  */}
        <div className=" d-flex flex-wrap justify-content-between mb-1 col-md-12 ">
          <label
            htmlFor="term_and_condition"
            className="gr-check-input d-flex  mr-3"
          >
            <input
              type="checkbox"
              id="term_and_condition"
              name="term_and_condition"
              onChange={(event) =>
                setState({
                  ...state,
                  term_and_condition: event.target.checked,
                })
              }
              className="text-black-2 pt-5 mr-5"
            />
            <span className="font-size-3 mb-0 line-height-reset d-block">
              Agree to the
              <Link to="" className="text-primary">
                Terms & Conditions
              </Link>
            </span>
          </label>
          {/*----ERROR MESSAGE FOR terms----*/}
          {errors.term_and_condition && (
            <span
              key={errors.term_and_condition}
              className="text-danger font-size-3"
            >
              {errors.term_and_condition}
            </span>
          )}
        </div>
        {errors.Credentials && (
          <span key={errors.Credentials} className="text-danger font-size-3">
            {errors.Credentials}
          </span>
        )}
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
          ) : otpBox ? (
            <button
              className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
              type="submit"
            >
              Sign Up
            </button>
          ) : (
            <button
              className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
              type="submit"
            >
              Send otp
            </button>
          )}
        </div>
        <p className="font-size-4 text-center heading-default-color">
          Already have an account?
          <Link to="" className="text-primary" onClick={login()}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default AgentSingup;
