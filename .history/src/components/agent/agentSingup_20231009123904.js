import React, { useState, useEffect } from "react";
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
  return <div>Hello</div>;
}

export default AgentSingup;
