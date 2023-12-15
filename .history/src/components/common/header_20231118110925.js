import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import CompanyLogin from "../company/loginModal";
// import CompanySignUp from "../company/signupModal";
// import EmployeeLoginModal from "../user/login";
// import EmployeeSignupModal from "../user/signup";
import { toast } from "react-toastify";
import Setting from "./setting";

function EmployeeHeader() {
  const userType = localStorage.getItem("userType");
  const employee_id = localStorage.getItem("employee_id");
  const company_id = localStorage.getItem("company_id");
  let profile_photo = localStorage.getItem("profile_photo");
  // let name = localStorage.getItem("name");
  let navigate = useNavigate();
  // ADD CLASS FOR MOBILE SCREEN IN SIDEBAR
  // state:-
  // const [addClass, setAddClass] = useState(false);
  //function :-
  // const addClassOnClick = () => {
  //   setAddClass(!addClass);
  // };
  // EMPLOYEEE LOGIN AND SIGNUP
  // Employee signup and login modal
  // const [showLogin, setShowLogin] = useState(false);
  // const [showSingUp, setShowSingUsp] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /*-- Function to show menu on toggle button --*/
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  /*-- Function to switch login to singup --*/
  // const SignUpClick = () => {
  //   setShowSingUp(true);
  //   setShowLogin(false);
  // };
  /*-- Function to switch singup to login--*/
  // const LoginClick = () => {
  //   setShowLogin(true);
  //   setShowSingUp(false);
  // };
  // END EMPLOYEE LOGIN AND SIGNUP

  // COMPANY LOGIN AND SIGNUP
  // Company signup and login state
  // const [showCompanyLogin, setShowCompanyLogin] = useState(false);
  // const [showCompanySignUp, setShowCompanySignUp] = useState(false);
  /*-- Function to switch login to signup --*/
  // const CompanySignUpClick = () => {
  //   setShowCompanySignUp(true);
  //   setShowCompanyLogin(false);
  // };
  /*-- Function to switch signup to login--*/
  // const CompanyLoginClick = () => {
  //   setShowCompanyLogin(true);
  //   setShowCompanySignUp(false);
  // };

  useEffect(() => {
    profile_photo = localStorage.getItem("profile_photo");
    // name = localStorage.getItem("name");
    // condition to remove the className from the body when we are not at the admin modual
    // eslint-disable-next-line
    if (
      window.location.pathname === "/" ||
      (window.location.pathname === "/jobs" &&
        localStorage.getItem("userType") === "admin")
    ) {
      document.body.classList.remove("admin_body");
    }
  }, [localStorage.getItem("profile_photo")]);

  return (
    <header className="site-header site-header--menu-right bg-default py-7 py-lg-0 site-header--absolute site-header--sticky">
      <div className="container">
        <nav className="navbar site-navbar offcanvas-active navbar-expand-lg  px-0 py-0">
          {/* <!-- Brand Logo--> */}
          <div className="brand-logo">
            <Link to="/">
              {/* <!-- light version logo (logo must be black // eslint-disable-next-line)--> */}
              <img
                src="image/00logo-main-black.png"
                alt=""
                className="light-version-logo default-logo"
                style={{ maxWidth: "160px" }}
              />
              {/* <!-- Dark version logo (logo must be White)--> */}
              <img
                src="image/logo-main-white.png"
                alt=""
                className="dark-version-logo"
              />
            </Link>
          </div>
          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="mobile-menu"
          >
            <div className="navbar-nav-wrapper">
              {userType === "company" ? (
                <ul className="navbar-nav main-menu">
                  {/* EMPLOYER MENU ITEMS */}

                  <li className="nav-item nav-item">
                    <Link className="nav-link" to="/company">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/managejobs">
                      Manage Jobs
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/response">
                      Responses
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/lmia">
                      LMIA
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link className="nav-link" to="/visa">
                      Visa
                    </Link>
                  </li> */}
                </ul>
              ) : null}

              {/* EMPLOYEE MENU ITEMS */}
              {userType === "company" ? null : (
                <ul className="navbar-nav main-menu">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/jobs">
                      Jobs
                    </Link>
                  </li>
                  <li className="drop-menu-item">
                    <Link
                      className="nav-link"
                      to={"/company_login"}
                      // onClick={() => setShowCompanyLogin(true)}
                    >
                      Employer Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/adminlogin">
                      Admin
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setShowSetting(true)}
                      className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                      to=""
                    >
                      Settings
                    </Link>
                    {showSetting && (
                      <Setting
                        show={showSetting}
                        close={() => setShowSetting(false)}
                      />
                    )}
                  </li>
                  <li>
                    <Link
                      className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                      to={
                        userType === "user"
                          ? `/${employee_id}`
                          : userType === "company"
                          ? "/company_detail"
                          : null
                      }
                      onClick={
                        userType === "company"
                          ? () => localStorage.setItem("company_id", company_id)
                          : null
                      }
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="dropdown-item py-2 text-red font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                      to=""
                      onClick={() => {
                        localStorage.clear(); // clear the local storage
                        toast.error("Log Out Successfully", {
                          position: toast.POSITION.TOP_RIGHT,
                          autoClose: 1000,
                        });
                        navigate("/");
                        window.location.reload();
                      }}
                    >
                      {" "}
                      Log out
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            {/* <CompanyLogin
              show={showCompanyLogin}
              CompanySignUpClick={CompanySignUpClick}
              close={() => setShowCompanyLogin(false)}
            /> */}
            {/* <CompanySignUp
              show={showCompanySignUp}
              CompanyLoginClick={CompanyLoginClick}
              close={() => setShowCompanySignUp(false)}
            /> */}
            <button
              className="d-block d-lg-none offcanvas-btn-close focus-reset"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-menu"
              aria-controls="mobile-menu"
              aria-expanded="true"
              aria-label="Toggle navigation"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="gr-cross-icon"></i>
            </button>
          </div>
          {userType === "company" || userType === "user" ? null : (
            <div className="header-btns header-btn-devider ml-auto pr-2 ml-lg-6 d-none d-xs-flex">
              {/* <!-- Modal for Login--> */}
              <Link
                className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset"
                to={"/candidate_login"}
                // onClick={() => setShowLogin(true)}
              >
                Log in
              </Link>
              {/* <EmployeeLoginModal
                show={showLogin}
                signUpClick={SignUpClick}
                close={() => setShowLogin(false)}
              /> */}

              {/* <!-- Modal for SingUp--> */}
              <Link
                className="btn btn-primary"
                to={"/candidate_signup"}
                // onClick={() => setShowSingUp(true)}
              >
                Sign up
              </Link>
              {/* <EmployeeSignupModal
                show={showSingUp}
                loginClick={LoginClick}
                close={() => setShowSingUp(false)}
          />*/}
            </div>
          )}
          {userType === "company" || userType === "user" ? (
            <div>
              <div className="dropdown show-gr-dropdown py-5">
                <Link
                  className="proile media ml-7 flex-y-center"
                  to="/"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div>
                    <img
                      className="rounded-circle"
                      src={
                        profile_photo === null ||
                        profile_photo === "" ||
                        profile_photo === "null" ||
                        profile_photo === undefined ||
                        profile_photo === "undefined"
                          ? "image/user.png"
                          : profile_photo
                      }
                      width={50}
                      height={50}
                      alt={""}
                    />
                  </div>
                  <i className="fas fa-chevron-down heading-default-color ml-6"></i>
                </Link>
                <div
                  className="dropdown-menu gr-menu-dropdown dropdown-right border-0 border-width-2 py-2 w-auto bg-default"
                  aria-labelledby="dropdownMenuLink"
                >
                  <Link
                    onClick={() => setShowSetting(true)}
                    className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                    to=""
                  >
                    Settings
                  </Link>
                  {showSetting && (
                    <Setting
                      show={showSetting}
                      close={() => setShowSetting(false)}
                    />
                  )}
                  <Link
                    className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                    to={
                      userType === "user"
                        ? `/${employee_id}`
                        : userType === "company"
                        ? "/company_detail"
                        : null
                    }
                    onClick={
                      userType === "company"
                        ? () => localStorage.setItem("company_id", company_id)
                        : null
                    }
                  >
                    Profile
                  </Link>
                  <Link
                    className="dropdown-item py-2 text-red font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                    to=""
                    onClick={() => {
                      localStorage.clear(); // clear the local storage
                      toast.error("Log Out Successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                      });
                      navigate("/");
                      window.location.reload();
                    }}
                  >
                    Log Out
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
          {/* <!-- Mobile Menu Hamburger--> */}
          <button
            className="navbar-toggler btn-close-off-canvas  hamburger-icon border-0"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-menu"
            aria-controls="mobile-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            {/* <!-- <i className="icon icon-simple-remove icon-close"></i> --> */}
            <span className="hamburger hamburger--squeeze js-hamburger">
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </span>
          </button>
          {/* <!--/.Mobile Menu Hamburger Ends--> */}
        </nav>
      </div>
    </header>
  );
}
export default EmployeeHeader;
