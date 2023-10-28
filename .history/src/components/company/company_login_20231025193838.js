import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useValidation from "../common/useValidation";
import {
  EmployerLogin,
  EmployerForgotPassword,
  LinkedInLoginEmployer,
  SocialCompanyLogin,
} from "../../api/api";
import { toast } from "react-toastify";
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from "axios";
// import { useLinkedIn , LinkedIn} from "react-linkedin-login-oauth2";
// import linkedin from 'react--login-oauth2/assets/linkedin.png';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
function Company_login() {
  let [showCompanyForgotPassword, setShowCompanyForgotPassword] =
    useState(false);
  let [loading, setLoading] = useState(false);
  let Navigate = useNavigate();
  // let [facebook, setFacebook] = useState(false);
  let i = 0;
  const [searchParams] = useSearchParams();
  let code = searchParams.get("code");
  if (props.show === true) {
    localStorage.setItem("linkedin", "employerLogin");
  }
  const type = localStorage.getItem("linkedin");
  /* Functionality to close the modal */
  const close = () => {
    setErrors("");
    setState("");
    setLoading(false);
    setShowCompanyForgotPassword(false);
    props.close();
  };
  /*----USER LOGIN VALIDATION----*/
  const initialFormState = {
    email: "",
    password: "",
    remember: "",
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
  const { state, setErrors, setState, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);

  /*----LOGIN SUBMIT FUNCTION----*/
  const onCompanyLoginClick = async (event) => {
    event.preventDefault();
    // console.log(errors);

    if (validate()) {
      setLoading(true);
      try {
        let Response = await EmployerLogin(state);
        console.log("Response =>", Response);
        if (
          Response.status === true ||
          Response.message === "Successfully Logged In"
        ) {
          localStorage.setItem("token", Response.token);
          localStorage.setItem("userType", "company");
          localStorage.setItem("company_id", Response.company_id);
          localStorage.setItem("profile_photo", Response.company_logo);
          localStorage.setItem("name", Response.company_name);

          toast.success("Log in Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          close();
          Navigate("/company");
          window.location.reload();
        } else if (Response.message === "Invalid Credentials !") {
          setLoading(false);
          setErrors({ ...errors, Credentials: ["Invalid Credentials"] });
          // handle form submission
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  const onCompanyForgotPasswordClick = async (event) => {
    event.preventDefault();

    // console.log(state, "working", errors);
    if (validate()) {
      setLoading(true);
      try {
        let Response = await EmployerForgotPassword(state);
        if (Response.status === 1 || Response.message === "Sent you a mail") {
          toast.success("Email sent Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          close();
        } else if (Response.message === "No user found") {
          setLoading(false);
          setErrors({ ...errors, Credentials: ["No user found"] });
          //   handle form submission
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
  /*Function to login with google */
  // const GoogleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     try {
  //       let data = await axios("https://www.googleapis.com/oauth2/v3/userinfo", {
  //         headers: {
  //           "Authorization": `Bearer ${tokenResponse.access_token}`
  //         }
  //       });
  //       console.log("response =>", data.data);
  //       if (data.data.email_verified === true) {
  //         let res = await SocialCompanyLogin(data.data.sub, data.data.email, data.data.name, data.data.picture, "Google");
  //         console.log(res);
  //         localStorage.setItem("token", res.token);
  //         localStorage.setItem("userType", "company");
  //         localStorage.setItem("company_id", res.company_id);
  //         localStorage.setItem("profile_photo", res.company_logo);
  //         toast.success("Logged In Successfully", {
  //           position: toast.POSITION.TOP_RIGHT,
  //           autoClose: 1000,
  //         });
  //         props.close();
  //         Navigate("/company");
  //         window.location.reload();
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // });

  /*Function to login in with Linked in */
  /*Code to get access token */
  // axios.post(`https://www.linkedin.com/oauth/v2/accessToken?code=${code}&grant_type=authorization_code&client_id=78mhwjaumkvtbm&client_secret=ZoZKbJgORl0vYJFr&redirect_uri=${window.location.origin}`)
  // .then(response => {
  //   console.log('data', response.data);
  // })
  // .catch(error => {
  //   console.error('Error:', error.message);
  // });
  // console.log(i , "code =>" , code);
  // console.log(type , (code !== '' || code !== undefined || code !== "undefined" || code !== null) && i === 4 && type === "employerLogin");
  const handleLinkedInLogin = () => {
    const clientId = "78mhwjaumkvtbm";
    const redirectUri = "http://3.6.36.125:3000/";
    const scope =
      "r_liteprofile r_emailaddress w_member_social profile email openid";

    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}`;
  };
  useEffect(() => {
    i = i + 4;
    if (
      (code !== "" ||
        code !== undefined ||
        code !== "undefined" ||
        code !== null) &&
      i === 4 &&
      type === "employerLogin"
    ) {
      const response = LinkedInLoginEmployer(code, type);
      response
        .then((res) => {
          let decode = JSON.parse(res.data);
          if (res.data.email_verified === true) {
            let data = SocialCompanyLogin(
              res.data.sub,
              res.data.email,
              res.data.name,
              res.data.picture,
              "Linkedin"
            );
            // console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userType", "company");
            localStorage.setItem("company_id", data.company_id);
            localStorage.setItem("profile_photo", data.company_logo);
            toast.success("Logged In Successfully", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
            props.close();
            Navigate("/company");
            window.location.reload();
          }
          if (
            res.data.message ===
              "The token used in the request has been revoked by the user" ||
            decode.error_description ===
              "Unable to retrieve access token: appid/redirect uri/code verifier does not match authorization code. Or authorization code expired. Or external member binding exists"
          ) {
            toast.error("Token Expired", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
            Navigate("/company");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  /*FUnctiom to login with facebook */
  // const responseFacebook = async (response) => {
  //   // console.log(response);
  //   if (response.graphDomain === "facebook") {
  //     let data = await SocialCompanyLogin(response.userID, response.email, response.name, response.picture.data.url, "Facebook");
  //     // console.log(data);
  //     localStorage.setItem("token", data.token);
  //     localStorage.setItem("userType", "company");
  //     localStorage.setItem("company_id", data.company_id);
  //     localStorage.setItem("profile_photo", data.company_logo);
  //     toast.success("Logged In Successfully", {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 1000,
  //     });
  //     props.close();
  //     Navigate("/company");
  //     window.location.reload();
  //   }
  // }
  return (
    <div>
      <div
        className="row no-gutters justify-content-center"
        style={{ overflow: "auto", margin: "7% auto" }}
      >
        <div className="col-lg-4 col-md-6 card">
          <div className="bg-white-2 h-100 px-11 pt-11  pb-7 login_Modal_box">
            <div
              className={showCompanyForgotPassword === false ? "row" : "d-none"}
            >
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
                        to=""
                        onClick={GoogleLogin}
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
                        to=""
                        onClick={() => setFacebook(true)}
                        className="font-size-4 font-weight-semibold position-relative text-white bg-marino h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                      >
                        <i className="fab fa-facebook-square pos-xs-abs-cl font-size-7 ml-xs-4"></i>
                        <span className="d-none d-xs-block mx-5 px-3">
                          Import from Facebook
                        </span>
                      </Link>
                      {facebook ? (
                        <FacebookLogin
                          appId="2170088543184291"
                          autoLoad
                          callback={responseFacebook}
                          fields="name,email,picture"
                          scope="public_profile,user_friends,email,user_actions.books"
                          className="font-size-4 font-weight-semibold position-relative text-white bg-marino h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                          render={(renderProps) => (
                            <button
                              onClick={renderProps.onClick}
                              className="d-none"
                            ></button>
                          )}
                        />
                      ) : null}
                    </div> */}
            </div>
            <div
              className={
                showCompanyForgotPassword === false ? "or-devider" : "d-none"
              }
            >
              <span className="font-size-3 line-height-reset ">Or</span>
            </div>
            {/* user login form */}
            <form
              onSubmit={onCompanyLoginClick}
              className={showCompanyForgotPassword === false ? "" : "d-none"}
            >
              <div className="form-group p-0">
                <label
                  htmlFor="useremail"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={state.useremail}
                  onChange={onInputChange}
                  className={
                    errors.useremail
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="example@gmail.com"
                  id="useremail"
                />
                {/*----ERROR MESSAGE FOR EMAIL----*/}
                {errors.useremail && (
                  <span>
                    {errors.useremail.map((error) => (
                      <span key={error} className="text-danger font-size-3">
                        {error}
                      </span>
                    ))}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label
                  htmlFor="userpassword"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Password
                </label>
                <div className="position-relative">
                  <input
                    name="password"
                    type="password"
                    value={state.userpassword}
                    onChange={onInputChange}
                    className={
                      errors.userpassword
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Enter password"
                    id="userpassword"
                  />
                  {/*----ERROR MESSAGE FOR PASSWORD----*/}
                  {errors.userpassword && (
                    <span>
                      {errors.userpassword.map((error) => (
                        <span key={error} className="text-danger font-size-3">
                          {error}
                        </span>
                      ))}
                    </span>
                  )}
                  {/* <a
                          href="http://localhost:3000/"
                          className="show-password pos-abs-cr fas mr-6 text-black-2"
                          data-show-pass="password"
                        ></a> */}
                </div>
                <small className="text-danger">{errors.email}</small>
              </div>
              <div className="d-flex flex-wrap justify-content-between">
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
                </label>

                <Link
                  to={""}
                  className="font-size-3 text-dodger line-height-reset mb-3"
                  onClick={() => {
                    setShowCompanyForgotPassword(true);
                    setErrors("");
                  }}
                >
                  Forget Password
                </Link>
                {/*----ERROR MESSAGE FOR terms----*/}
                {errors.tandr && (
                  <span key={errors.tandr} className="text-danger font-size-3">
                    {errors.tandr}
                  </span>
                )}
              </div>

              <div className="form-group mb-8">
                {loading === true ? (
                  <button
                    className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
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
                    className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                    type="submit"
                  >
                    Log in
                  </button>
                )}
              </div>
              <p className="font-size-4 text-center heading-default-color">
                Don’t have an account?
                <Link className="text-primary ml-2" to={"/candidate_signup"}>
                  Create a free account
                </Link>
              </p>
            </form>

            <form
              className={showCompanyForgotPassword === true ? "" : "d-none"}
              onSubmit={onCompanyForgotPasswordClick}
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
                    setShowCompanyForgotPassword(false);
                    setErrors("");
                  }}
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Company_login;
