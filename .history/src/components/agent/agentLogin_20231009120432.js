import React, { useState } from "react";
import { LoginAgent } from "../../api/api";
import useValidation from "../common/useValidation";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../common/loader";
import AgentSignUp from "./agentSingup";
export default function AgentLogin() {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [singupApi, setSingupApi] = useState(false);

  /*----USER LOGIN VALIDATION----*/
  const initialFormState = {
    email: "",
    password: "",
    Credentials: "",
  };
  /*----VALIDATION CONTENT----*/
  const validators = {
    email: [
      (value) =>
        value === null || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
    password: [(value) => (value === "" ? "Password is required" : null)],
  };
  /*----LOGIN ONCHANGE FUNCTION----*/
  const { state, onInputChange, errors, setErrors, validate } = useValidation(
    initialFormState,
    validators
  );

  /*----LOGIN SUBMIT FUNCTION----*/
  const onAgentLoginClick = async (event) => {
    event.preventDefault();

    if (validate()) {
      setLoading(true);
      // handle form submission
      try {
        const updatedTodo = await LoginAgent(state);
        console.log(updatedTodo);
        setIsLoading(false);
        //     if (
        //       updatedTodo.status === true ||
        //       updatedTodo.message === "Successfully Logged "
        //     ) {
        //       setIsLoading(true);
        //       localStorage.setItem("token", updatedTodo.token);
        //       localStorage.setItem("userType", "agent");
        //       localStorage.setItem("admin", updatedTodo.name);
        //       localStorage.setItem("admin_id", updatedTodo.admin_id);
        //       localStorage.setItem("admin_type", updatedTodo.user_type);
        //       toast.success("Logged In Successfully", {
        //         position: toast.POSITION.TOP_RIGHT,
        //         autoClose: 1000,
        //       });
        //       setLoading(false);
        //       setIsLoading(false);
        //       navigate("/dashboard");
        //       window.location.reload();
        //     } else if (updatedTodo.message === "Invalid Credentials") {
        //       setLoading(false);
        //       setErrors({ ...errors, Credentials: ["Invalid Credentials"] });
        //     }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        // setErrors({ ...errors, Credentials: ["Please try again later."] });
        // toast.error("Something went wrong", {
        //   position: toast.POSITION.TOP_RIGHT,
        //   autoClose: 1000,
        // });
        setLoading(false);
      }
    }
  };

  // END USER LOGIN VALIDATION

  return (
    <>
      {/* <!-- Login --> */}
      <div className="d-flex justify-content-center pt-21">
        <ToastContainer />
        <div className="bg-white rounded-8 overflow-hidden pt-21">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="bg-white-2 h-100 px-11 pt-11 pb-7 login_Modal_box border">
              <div className="pb-5 mb-5 text-center">
                <h4> Agent </h4>
                <img
                  src="image/00logo-main-black.png"
                  className="img-fluid "
                  height={200}
                  width={200}
                  alt="logo"
                />
              </div>
              {/* user login form */}
              <form onSubmit={onAgentLoginClick}>
                <div className="form-group">
                  <label
                    htmlFor="email"
                    className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={onInputChange}
                    className={
                      errors.email
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="example@gmail.com"
                    id="email"
                  />
                  {/*----ERROR MESSAGE FOR EMAIL----*/}
                  {errors.email && (
                    <span>
                      {errors.email.map((error) => (
                        <span key={error} className="text-danger font-size-3">
                          {error}
                        </span>
                      ))}
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
                      type="password"
                      value={state.password}
                      onChange={onInputChange}
                      className={
                        errors.password
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      placeholder="Enter password"
                      id="password"
                    />
                    {/*----ERROR MESSAGE FOR PASSWORD----*/}
                    {errors.password && (
                      <span>
                        {errors.password.map((error) => (
                          <span key={error} className="text-danger font-size-3">
                            {error}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                  {errors.Credentials && (
                    <span>
                      {errors.Credentials.map((error) => (
                        <span key={error} className="text-danger font-size-3">
                          {error}
                        </span>
                      ))}
                    </span>
                  )}
                </div>

                {/* <div className="d-flex flex-wrap justify-content-between">
                <label
                  htmlFor="terms-check"
                  className="gr-check-input d-flex  mr-3"
                >
                  <input
                    type="checkbox"
                    id="tandr"
                    name="tandr"
                    onChange={onInputChange}
                    className="text-black-2 pt-5 mr-5"
                  />
                  <span className="font-size-3 mb-1 line-height-reset d-block">
                    Remember password
                  </span>
                </label> */}

                {/* <Link
                  to={""}
                  className="font-size-3 text-dodger line-height-reset mb-3"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forget Password
                </Link> */}
                {/*----ERROR MESSAGE FOR terms----*/}
                {/* {errors.tandr && (
                  <span key={errors.tandr} className="text-danger font-size-3">
                    {errors.tandr}
                  </span>
                )} */}
                {/* </div> */}

                <div className="form-group mb-8">
                  {loading === true ? (
                    <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase">
                      <span
                        className="spinner-border spinner-border-sm "
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Loading...</span>
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                      type="submit"
                    >
                      Log in
                    </button>
                  )}
                </div>
                <p className="font-size-4 text-center heading-default-color">
                  Don’t have an account?
                  <Link
                    className="text-primary"
                    to={""}
                    onClick={() => {
                      setSingupApi(true);
                      setErrors("");
                    }}
                  >
                    Create a free account
                  </Link>
                </p>
              </form>
              {singupApi && (
                <AgentSignUp AgentloginFromSignUp={() => setSingupApi(false)} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
