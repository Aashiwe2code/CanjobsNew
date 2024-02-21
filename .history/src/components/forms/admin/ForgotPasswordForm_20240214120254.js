import React from "react";
import { Link } from "react-router-dom";
export default function ForgotPasswordForm({
  setShowForgotPassword,
  showForgotPassword,
  onForgoteClick,
  state,
  onInputChange,
  errors,
  loading,
  setErrors,
}) {
  return (
    <form
      className={showForgotPassword === true ? "" : "d-none"}
      onSubmit={onForgoteClick}
    >
      <div className="form-group">
        <label
          htmlFor="forget_email"
          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
        >
          E-mail
        </label>
        <input
          type="email"
          value={state.forget_email}
          onChange={onInputChange}
          className="form-control"
          placeholder="example@gmail.com"
          id="forget_email"
          name="forget_email"
        />
        {errors.forget_email && (
          <span>
            {errors.forget_email.map((error) => (
              <span key={error} className="text-danger font-size-3">
                {error}
              </span>
            ))}
          </span>
        )}
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
            send email
          </button>
        )}
      </div>
      <p className="font-size-4 text-center heading-default-color">
        Already have an account?
        <Link
          to=""
          className="text-primary"
          onClick={() => {
            setShowForgotPassword(false);
            setErrors("");
          }}
        >
          Login
        </Link>
      </p>
    </form>
  );
}
