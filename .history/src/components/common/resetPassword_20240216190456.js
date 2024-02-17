import React, { useState } from "react";
import {
  EmployeeResetPasswordApi,
  AdminResetPasswordApi,
  EmployerResetPasswordApi,
  ResetAgentPasswordApi,
} from "../../api/api";
import useValidation from "../common/useValidation";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const API_URL = "https://apnaorganicstore.in/canjobs/";
// New AWS backend
// const API_URL = "https://api.canpathwaysjobs.com/canjobs/";
export default function ResetPassword() {
  const location = useLocation();
  const path = location.pathname;
  let Token = path.split("/")[2].split(":")[1];
  let userType = path.split("/")[2].split(":")[0];
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  /*----USER RESET PASSWORD VALIDATION----*/
  const initialFormState = {
    password: "",
    conf_password: "",
    token: Token,
  };
  /*----VALIDATION CONTENT----*/
  const validators = {
    password: [(value) => (value === "" ? "Password is required" : null)],
    conf_password: [
      (value) =>
        value === ""
          ? "Confirm Password is required"
          : value !== state.password
          ? "Confirm Password must be Same as Password"
          : "",
    ],
  };
  /*----RESET PASSWORD ONCHANGE FUNCTION----*/
  const { state, onInputChange, setState, errors, validate } = useValidation(
    initialFormState,
    validators
  );
  /*----RESET PASSWORD SUBMIT FUNCTION----*/
  const onUserResetPasswordClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      // handle form submission
      if (userType === "user") {
        try {
          let updatedTodo = await EmployeeResetPasswordApi(state);
          if (
            updatedTodo.status === true ||
            updatedTodo.message === "Password updated successfully"
          ) {
            toast.success("Password updated successfully", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
            setLoading(false);
            setState(initialFormState);
            navigate("/");
            window.location.reload();
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
      if (userType === "company") {
        try {
          let updatedTodo = await EmployerResetPasswordApi(state);
          if (
            updatedTodo.status === true ||
            updatedTodo.message === "Password updated successfully"
          ) {
            toast.success("Password updated successfully", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
            setLoading(false);
            setState(initialFormState);
            navigate("/");
            window.location.reload();
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
      if (userType === "admin") {
        try {
          let updatedTodo = await AdminResetPasswordApi(state);
          if (
            updatedTodo.status === true ||
            updatedTodo.message === "Password updated successfully"
          ) {
            toast.success("Password updated successfully", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
            setLoading(false);
            setState(initialFormState);
            navigate("/");
            window.location.reload();
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
      if (userType === "agent") {
        try {
          let updatedTodo = await ResetAgentPasswordApi(state);
          if (
            updatedTodo.status === true ||
            updatedTodo.message === "Password updated successfully"
          ) {
            toast.success("Password updated successfully", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
            setLoading(false);
            setState(initialFormState);
            navigate("/");
            window.location.reload();
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
    }
  };

  // END USER RESET PASSWORD VALIDATION
  return (
    <>
      {/* <!-- RESET PASSWORD --> */}
      <link rel="stylesheet" href={`${API_URL}/css/bootstrap.css`} />
      <link
        rel="stylesheet"
        href={`${API_URL}/fonts/icon-font/css/style.css`}
      />
      <link
        rel="stylesheet"
        href={`${API_URL}/fonts/fontawesome-5/css/all.css`}
      />
      <link
        rel="stylesheet"
        href={`${API_URL}/fonts/fontawesome-5/css/main.css`}
      />
      <div className="d-flex justify-content-center pt-21">
        <ToastContainer />
        <div className="bg-white rounded-8 overflow-hidden pt-21">
          <div className="bg-white-2 h-100 px-11 pt-11 pb-7 login_Modal_box ">
            <div className="pb-5 mb-5 text-center">
              <img
                src={`${API_URL}/image/logo-main-black.png`}
                className="img-fluid "
                height={200}
                width={200}
                alt="logo"
              />
            </div>
            {/* user RESET PASSWORD form */}
            <form onSubmit={onUserResetPasswordClick}>
              <h5 className="text-center pb-8"> Reset Password</h5>
              <div className="form-group">
                <label
                  htmlFor="password"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={onInputChange}
                  className={
                    errors.password
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="example@gmail.com"
                  id="password"
                />
                {/*----ERROR MESSAGE FOR EMAIL----*/}
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
              <div className="form-group">
                <label
                  htmlFor="conf_password"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Confirm Password
                </label>
                <div className="position-relative">
                  <input
                    name="conf_password"
                    type="password"
                    value={state.conf_password}
                    onChange={onInputChange}
                    className={
                      errors.conf_password
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Enter confirm password"
                    id="conf_password"
                  />
                  {/*----ERROR MESSAGE FOR CONFIRM PASSWORD----*/}
                  {errors.conf_password && (
                    <span>
                      {errors.conf_password.map((error) => (
                        <span key={error} className="text-danger font-size-2">
                          {error}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
              </div>
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
                    SUBMIT
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
