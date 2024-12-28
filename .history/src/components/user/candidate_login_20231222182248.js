import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  EmployeeLogin,
  EmployeeForgotPassword,
  LinkedInLogin,
  SocialLogin,
} from "../../api/api";
import useValidation from "../common/useValidation";
import { toast } from "react-toastify";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { useLinkedIn , LinkedIn} from "react-linkedin-login-oauth2";
// import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
export default function CandidateLoginForm(props) {
  let [showForgotPassword, setShowForgotPassword] = useState(false);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  // let [facebook, setFacebook] = useState(false);
  let i = 0;
  const [searchParams] = useSearchParams();
  let code = searchParams.get("code");
  if (props.show === true) {
    localStorage.setItem("linkedin", "employeeLogin");
  }
  /*Function to close the modal */
  const Close = () => {
    setShowForgotPassword(false);
    setLoading(false);
    setErrors("");
    // props.close();
  };
  const type = localStorage.getItem("linkedin");
  // let code = dataa[1].split("&")[0]
  /*----USER LOGIN VALIDATION----*/
  const initialFormState = {
    email: "",
    password: "",
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
  const { state, onInputChange, setErrors, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  /*----LOGIN SUBMIT FUNCTION----*/
  const onUserLoginClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      // handle form submission
      setLoading(true);
      try {
        const updatedTodo = await EmployeeLogin(state);
        if (updatedTodo.message === "Successfully Logged In") {
          localStorage.setItem("token", updatedTodo.token);
          localStorage.setItem("email", updatedTodo.email);
          localStorage.setItem("userType", "user");
          localStorage.setItem("employee_id", updatedTodo.employee_id);
          localStorage.setItem("name", updatedTodo.name);
          localStorage.setItem("skill", updatedTodo.skill);
          localStorage.setItem("profile_photo", updatedTodo.profile_photo);
          toast.success("Logged In Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          Close();
          navigate(`/${updatedTodo.employee_id}`);
          window.location.reload();
        }
        if (updatedTodo.message === "Invalid credentials !") {
          setLoading(false);
          setErrors({ ...errors, email: "Invalid credentials !" });
        }
      } catch (err) {
        setLoading(false);
        setErrors({ ...errors, email: ["Please try again later."] });
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    }
  };
  // END USER LOGIN VALIDATION
  const onForgoteClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      // setLoading(true)
      setLoading(true);
      try {
        const Response = await EmployeeForgotPassword(state);
        if (Response.status === 1 || Response.message === "Sent you a mail") {
          toast.success("Email sent Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          Close();
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
  /*Function to login with google */
  // const GoogleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     try {
  //       let data = await axios(
  //         "https://www.googleapis.com/oauth2/v3/userinfo",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${tokenResponse.access_token}`,
  //           },
  //         }
  //       );
  //       try {
  //         if (data.data.email_verified === true) {
  //           let res = await SocialLogin(
  //             data.data.sub,
  //             data.data.email,
  //             data.data.name,
  //             data.data.picture,
  //             "Google"
  //           );
  //           localStorage.setItem("token", res.token);
  //           localStorage.setItem("email", res.email);
  //           localStorage.setItem("userType", "user");
  //           localStorage.setItem("employee_id", res.employee_id);
  //           localStorage.setItem("profile_photo", res.profile_photo);
  //           localStorage.setItem("skill", res.skill);
  //           toast.success("Logged In Successfully", {
  //             position: toast.POSITION.TOP_RIGHT,
  //             autoClose: 1000,
  //           });
  //           Close();
  //           navigate(`/${}`);
  //           window.location.reload();
  //         }
  //       } catch (err) {
  //         setLoading(false);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  // });

  /*Function to login in with Linked in */
  /*Code to get access token */
  // axios.post(`https://www.linkedin.com/oauth/v2/accessToken?code=${code}&grant_type=authorization_code&client_id=78mhwjaumkvtbm&client_secret=ZoZKbJgORl0vYJFr&redirect_uri=${window.location.origin}`)
  // .then(response => {
  // })
  // .catch(error => {
  //   console.error('Error:', error.message);
  // });
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
    i = i + 1;
    if (
      (code !== "" ||
        code !== undefined ||
        code !== "undefined" ||
        code !== null) &&
      i === 1 &&
      type === "employeeLogin"
    ) {
      const response = LinkedInLogin(code, type);
      response
        .then((res) => {
          let decode = JSON.parse(res.data);
          if (res.data.email_verified === true) {
            let data = SocialLogin(
              res.data.sub,
              res.data.email,
              res.data.name,
              res.data.picture,
              "Linkedin"
            );
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.email);
            localStorage.setItem("userType", "user");
            localStorage.setItem("employee_id", data.employee_id);
            localStorage.setItem("profile_photo", data.profile_photo);
            localStorage.setItem("skill", data.skill);
            toast.success("Logged In Successfully", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
            Close();
            navigate(`/${data.employee_id}`);
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
            navigate(`/`);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  /*Functiom to login with facebook */
  // const responseFacebook = async (response) => {
  //   if (response.graphDomain === "facebook") {
  //     try {
  //       let data = await SocialLogin(
  //         response.userID,
  //         response.email,
  //         response.name,
  //         response.picture.data.url,
  //         "Facebook"
  //       );
  //       localStorage.setItem("token", data.token);
  //       localStorage.setItem("email", data.email);
  //       localStorage.setItem("userType", "user");
  //       localStorage.setItem("employee_id", data.employee_id);
  //       localStorage.setItem("profile_photo", data.profile_photo);
  //       localStorage.setItem("skill", data.skill);
  //       toast.success("Logged In Successfully", {
  //         position: toast.POSITION.TOP_RIGHT,
  //         autoClose: 1000,
  //       });
  //       Close();
  //       navigate(`/${}`);
  //       window.location.reload();
  //     } catch (err) {
  //       setLoading(false);
  //     }
  //   }
  // };
  return (
    <div
      className="row no-gutters justify-content-center"
      style={{ overflow: "auto", margin: "7% auto" }}
    >
      <div className="col-lg-4 col-md-6 card">
        <div className="bg-white-2 h-100 px-11 pt-11  pb-7 login_Modal_box">
          <div
            className={showForgotPassword === false ? "row d-none" : "d-none"}
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
          <div className="brand-logo mb-10 text-center">
            <Link to="/">
              <img
                src="image/00logo-main-black.png"
                alt=""
                className="light-version-logo default-logo"
                style={{ maxWidth: "250px", maxHeight: "80px" }}
              />
            </Link>
          </div>
          <div
            className={
              showForgotPassword === false ? "or-devider d-none" : "d-none"
            }
          >
            <span className="font-size-3 line-height-reset ">Or</span>
          </div>
          {/* user login form */}
          <form
            onSubmit={onUserLoginClick}
            className={showForgotPassword === false ? "" : "d-none"}
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
                  setShowForgotPassword(true);
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
                to="/candidate_login"
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
        </div>
      </div>
    </div>
  );
}
