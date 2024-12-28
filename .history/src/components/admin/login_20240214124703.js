import React, { useState } from "react";
import { AdminForgotPasswordApi, AdminLogin } from "../../api/api";
import useValidation from "../common/useValidation";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../common/loader";
export default function AdminLoginFrom({ setAdminLoggedIn }) {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [showForgotPassword, setShowForgotPassword] = useState(false);

  /*----USER LOGIN VALIDATION----*/
  const initialFormState = {
    email: "",
    password: "",
    Credentials: "",
    forget_email: "",
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
    forget_email: [
      (value) =>
        state.email
          ? ""
          : value === null || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
  };
  /*----LOGIN ONCHANGE FUNCTION----*/
  const { state, onInputChange, errors, setErrors, validate } = useValidation(
    initialFormState,
    validators
  );

  /*----LOGIN SUBMIT FUNCTION----*/
  const onUserLoginClick = async (event) => {
    event.preventDefault();

    if (validate()) {
      setLoading(true);
      // handle form submission
      try {
        const updatedTodo = await AdminLogin(state);
        if (
          updatedTodo.status === true ||
          updatedTodo.message === "Successfully Logged "
        ) {
          setIsLoading(true);
          localStorage.setItem("token", updatedTodo.token);
          localStorage.setItem("userType", "admin");
          localStorage.setItem("admin", updatedTodo.name);
          localStorage.setItem("admin_id", updatedTodo.admin_id);
          localStorage.setItem("admin_type", updatedTodo.user_type);
          localStorage.setItem("admin_email", updatedTodo.email);
          toast.success("Logged In Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          setIsLoading(false);
          navigate("/dashboard");
          // console.log(updatedTodo);
          window.location.reload();
        } else if (updatedTodo.message === "Invalid Credentials") {
          setLoading(false);
          setErrors({ ...errors, Credentials: ["Invalid Credentials"] });
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

  // END USER LOGIN VALIDATION
  //Function to forgot password
  const onForgoteClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const Response = await AdminForgotPasswordApi(state);
        if (Response.status === 1 || Response.message === "Sent you a mail") {
          toast.success("Email sent Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          setShowForgotPassword(false);
        } else if (Response.message === "No user found") {
          setLoading(false);
          setErrors({ ...errors, Credentials: ["No user found"] });
          //   handle form submission
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setErrors({ ...errors, Credentials: ["Please try again later."] });
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    }
  };
  return (
    <>
      {/* <!-- Login --> */}

      <div className="d-flex justify-content-center admin_login_page hv-100 overflow-auto align-items-center">
        <ToastContainer />
        <div
          className="bg-white rounded"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <div className="bg-white-2 h-100 p-9 login_Modal_box border shadow">
              <Link className="pb-5  text-center w-100" to={"/"}>
                <img
                  src="image/00logo-main-black.png"
                  className="img-fluid "
                  // height={200}
                  width={200}
                  alt="logo"
                />
              </Link>
              {/* user login form */}
              <h5 className="text-center mb-7 font-size-4">
                {showForgotPassword === true ? "Fogot Password" : "Admin Login"}
              </h5>
              <form
                onSubmit={onUserLoginClick}
                className={showForgotPassword === true ? "d-none" : ""}
              >
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

                <div className="form-group mb-1">
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
                  <p className="text-center mt-7 font-size-4 mb-1">
                    Are you a partner?
                  </p>
                  <Link
                    to={"/partnerlogin"}
                    className="font-size-4 text-anger line-height-reset mb-3 text-center w-100"
                  >
                    Partner Login
                  </Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
