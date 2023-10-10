import React, { useState } from "react";
import { LoginAgent } from "../../api/api"; // Assuming this is correctly imported
import useValidation from "../common/useValidation"; // Assuming this is correctly imported
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../common/loader"; // Assuming this is correctly imported
import AgentSignUp from "./agentSingup";

export default function AgentLogin() {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [signupApi, setSignupApi] = useState(false);

  const initialFormState = {
    email: "",
    password: "",
    Credentials: "",
  };

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

  const { state, onInputChange, errors, setErrors, validate } = useValidation(
    initialFormState,
    validators
  );

  const onAgentLoginClick = async (event) => {
    event.preventDefault();

    if (validate()) {
      setLoading(true);

      try {
        const updatedTodo = await LoginAgent(state);
        console.log(updatedTodo);

        // Handle login logic here
      } catch (err) {
        console.log(err);

        // Handle error logic here
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
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

              {signupApi ? (
                <AgentSignUp login={() => setSignupApi(false)} />
              ) : (
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
                      {errors.password && (
                        <span>
                          {errors.password.map((error) => (
                            <span
                              key={error}
                              className="text-danger font-size-3"
                            >
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

                  <div className="form-group mb-8">
                    {loading ? (
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
                        setSignupApi(true);
                        setErrors("");
                      }}
                    >
                      Create a free account
                    </Link>
                  </p>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
