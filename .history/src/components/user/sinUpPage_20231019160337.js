import React from "react";

function SinUpPage() {
  return (
    <div className="login-modal-main bg-white rounded-8 overflow-hidden">
      <div className="row no-gutters">
        <div className="col-lg-7 col-md-6">
          {SingUpSuccess === "success" ? (
            <div className="bg-white-2 h-100 px-11 pt-11 pb-7 login_Modal_box">
              Congratulations! <br />
              You have successfully registered your account. Please login to
              continue
              <br />
              <Link
                to=""
                className="btn btn-primary mt-12"
                onClick={props.loginClick}
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="bg-white-2 h-100 px-11 pt-11 pb-7 login_Modal_box">
              {/* SOCIAL MEDIA LINK BUTTONS */}
              <div className="row">
                <div className="col-4 col-xs-12">
                  <button
                    onClick={handleLinkedInLogin}
                    className="font-size-4 font-weight-semibold position-relative text-white bg-allports h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4 border-0"
                  >
                    <i className="fab fa-linkedin pos-xs-abs-cl font-size-7 ml-xs-4"></i>
                    <span className="d-none d-xs-block mx-5 px-3">
                      Import from LinkedIn
                    </span>
                  </button>
                </div>
                {/* <div className="col-4 col-xs-12">
                        <Link
                          to="" onClick={GoogleLogin}
                          className="font-size-4 font-weight-semibold position-relative text-white bg-poppy h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                        >
                          <i className="fab fa-google pos-xs-abs-cl font-size-7 ml-xs-4"></i>
                          <span className="d-none d-xs-block mx-5 px-3">
                            Import from Google
                          </span>
                        </Link>
                      </div>
                      <div className="col-4 col-xs-12">
                        <Link
                          to="" onClick={() => setFacebook(true)}
                          className="font-size-4 font-weight-semibold position-relative text-white bg-marino h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                        >
                          <i className="fab fa-facebook-square pos-xs-abs-cl font-size-7 ml-xs-4"></i>
                          <span className="d-none d-xs-block mx-5 px-3">
                            Import from Facebook
                          </span>
                        </Link>
                        {facebook ?
                          <FacebookLogin
                            appId="2170088543184291"
                            autoLoad
                            callback={responseFacebook}
                            fields="name,email,picture"
                            scope="public_profile,user_friends,email,user_actions.books"
                            className="font-size-4 font-weight-semibold position-relative text-white bg-marino h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                            render={renderProps => (
                              <button onClick={renderProps.onClick} className="d-none">
                              </button>
                            )}
                          />
                          : null}
                      </div> */}
              </div>
              {/* END SOCIAL MEDIA LINK BUTTONS */}
              <div className="or-devider">
                <span className="font-size-3 line-height-reset">Or</span>
              </div>

              {/* SIGNUP FORM */}
              <form onSubmit={onUserSignUpClick}>
                {/* FORM FIELDS */}
                <div className="form-group">
                  <label
                    htmlFor="email"
                    className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                  >
                    E-mail<span className="text-danger"> *</span>:
                  </label>
                  <input
                    name="email"
                    value={state.email || ""}
                    onChange={onInputChange}
                    type="email"
                    className={
                      errors.email
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="example@gmail.com"
                    id="email"
                  />
                  {/* ERROR MSG FOR email */}
                  {errors.email && (
                    <span
                      key={errors.email}
                      className="text-danger font-size-3"
                    >
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="password"
                    className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                  >
                    Password<span className="text-danger"> *</span> :
                  </label>
                  <div className="position-relative">
                    <input
                      name="password"
                      value={state.password || ""}
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
                      <span
                        key={errors.password}
                        className="text-danger font-size-3"
                      >
                        {errors.password}
                      </span>
                    )}
                    {/* <Link
                          to="/"
                          className="show-password pos-abs-cr fas mr-6 text-black-2"
                          data-show-pass="password2"
                        ></Link> */}
                  </div>
                </div>
                {/* <div className={"form-group "}>
                        <label
                          htmlFor="reffer_by"
                          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        >
                          Reffered by:<span className="text-danger">*</span>
                        </label>
                        <Select
                          options={"" || agentList}
                          name="reffer_by"
                          id="reffer_by"
                          onChange={onSelectChange}
                          className={
                            errors.reffer_by
                              ? "form-control border border-danger"
                              : "form-control px-0 pt-4 border-0"
                          }
                        />
                        ERROR MSG FOR REFFER BY
                        {errors.reffer_by && (
                          <span
                            key={errors.reffer_by}
                            className="text-danger font-size-3"
                          >
                            {errors.reffer_by}
                          </span>
                        )}
                      </div> */}
                <div className="form-group">
                  <label
                    htmlFor="resume"
                    className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                  >
                    Upload Resume
                    {/*<span className="text-danger"> *</span>:*/}
                  </label>
                  <div className="position-relative">
                    <input
                      name="resume"
                      onChange={handleUploadFile}
                      type="file"
                      accept=".pdf,application/pdf"
                      className={
                        errors.resume
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="resume"
                      placeholder="Enter password"
                    />
                    {/* {errors.resume && (
                            <span
                              key={errors.resume}
                              className="text-danger font-size-3"
                            >
                              {errors.resume}
                            </span>
                          )} */}
                    {/* <Link
                          to="/"
                          className="show-password pos-abs-cr fas mr-6 text-black-2"
                          data-show-pass="password23"
                        ></Link> */}
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
                        min={0}
                        value={state.otp || ""}
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
                      />
                      {errors.otp && (
                        <span
                          key={errors.otp}
                          className="text-danger font-size-3"
                        >
                          {errors.otp}
                        </span>
                      )}
                    </div>
                  </div>
                ) : null}
                {/* END FORM FIELDS  */}
                <div className=" d-flex flex-wrap justify-content-between mb-1 col-md-12 ">
                  <label
                    htmlFor="tandr"
                    className="gr-check-input d-flex  mr-3"
                  >
                    <input
                      type="checkbox"
                      id="tandr"
                      name="tandr"
                      onChange={(event) => {
                        setIsChecked(event.target.checked);
                      }}
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
                  <span key={termsErr} className="text-danger font-size-3">
                    {termsErr}
                  </span>
                </div>
                {errors.Credentials && (
                  <span
                    key={errors.Credentials}
                    className="text-danger font-size-3"
                  >
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
                  <Link
                    to=""
                    className="text-primary"
                    onClick={() => {
                      props.loginClick();
                      setSingUpSuccess();
                    }}
                  >
                    Login
                  </Link>
                </p>
              </form>
              {/* END SIGNUP FORM */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SinUpPage;
