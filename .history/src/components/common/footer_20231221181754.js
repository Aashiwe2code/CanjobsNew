import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmployeeLoginModal from "../user/login";
import EmployeeSignupModal from "../user/signup";

function EmployeeFooter() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSingUp, setShowSingUp] = useState(false);
  return (
    <footer className="footer bg-ebony-clay dark-mode-texts">
      <div className="container">
        {/* <!-- Cta section --> */}
        <div className="pt-11 pt-lg-11 pb-11 pb-lg-11 border-bottom border-width-1 border-default-color-2">
          <div className="row justify-content-center ">
            <div
              className="col-xl-7 col-lg-12"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-once="true"
            >
              {/* <!-- cta-content start --> */}
              <div className="pb-xl-0 pb-9 text-xl-left text-center">
                <h2 className="text-white font-size-8 mb-4">
                  Most comprehensive job portal
                </h2>
                <p className="text-hit-gray font-size-5 mb-0">
                  We must explain to you how all this mistaken idea of
                  denouncing
                </p>
              </div>
              {/* <!-- cta-content end --> */}
            </div>
            <div
              className="col-xl-5 col-lg-12"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-once="true"
            >
              {/* <!-- cta-btns start --> */}
              <div className="btns d-flex justify-content-xl-end justify-content-center align-items-xl-center flex-wrap h-100  mx-n4">
                {/* <!-- Modal for Login--> */}
                <Link
                  className="btn btn-outline-gallery btn-xl mx-4 mt-6 text-uppercase"
                  to={""}
                  onClick={() => setShowLogin(true)}
                >
                  Log in
                </Link>
                <EmployeeLoginModal
                  show={showLogin}
                  close={() => setShowLogin(false)}
                />
                {/* <!-- Modal for SingUp--> */}
                <button
                  className="btn btn-green btn-h-60 btn-xl mx-4 mt-6 text-uppercase"
                  to={""}
                  onClick={() => setShowSingUp(true)}
                >
                  Sign up
                </button>
                <EmployeeSignupModal
                  show={showSingUp}
                  close={() => setShowSingUp(false)}
                />
              </div>
              {/* <!-- cta-btns end --> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container  pt-12 pt-lg-12 pb-10 pb-lg-12">
        <div className="row text-left">
          <div className="col-lg-4 col-sm-6 mb-lg-0 mb-9">
            {/* <!-- footer logo start --> */}
            <img
              src="image/logo-main-black.png"
              alt=""
              className="footer-logo mb-6"
              style={{ maxHeight: "unset", maxWidth: "250px" }}
            />

            <div className="social-icons">
              <ul className="pl-0 list-unstyled d-flex align-items-end ">
                <li className="d-flex flex-column justify-content-center px-3 mr-3 font-size-4 heading-default-color">
                  Follow us on:
                </li>
                <li className="d-flex flex-column justify-content-center px-3 mr-3">
                  <Link
                    to={""}
                    className="hover-color-primary heading-default-color"
                  >
                    <i className="fab fa-facebook-f font-size-3 pt-2"></i>
                  </Link>
                </li>
                <li className="d-flex flex-column justify-content-center px-3 mr-3">
                  <Link
                    to={""}
                    className="hover-color-primary heading-default-color"
                  >
                    <i className="fab fa-twitter font-size-3 pt-2"></i>
                  </Link>
                </li>
                <li className="d-flex flex-column justify-content-center px-3 mr-3">
                  <Link
                    to={""}
                    className="hover-color-primary heading-default-color"
                  >
                    <i className="fab fa-linkedin-in font-size-3 pt-2"></i>
                  </Link>
                </li>
              </ul>
            </div>
            {/* <!-- widget social icon end --> */}
          </div>
          <div className="col-lg-8 col-md-6 ">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">
                <div className="footer-widget widget2 mb-md-0 mb-13">
                  {/* <!-- footer widget title start --> */}
                  <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                    Links
                  </p>
                  {/* <!-- footer widget title end --> */}
                  {/* <!-- widget social menu start --> */}
                  <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                    <li className="mb-3">
                      <Link
                        to={"/"}
                        className="heading-default-color font-size-4 font-weight-normal"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to={"/jobs"}
                        className="heading-default-color font-size-4 font-weight-normal"
                      >
                        Jobs
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to={""}
                        onClick={() => setShowLogin(true)}
                        className="heading-default-color font-size-4 font-weight-normal"
                      >
                        User Login
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to={""}
                        onClick={() => setShowSingUp(true)}
                        className="heading-default-color font-size-4 font-weight-normal"
                      >
                        Company Login
                      </Link>
                    </li>
                  </ul>
                  {/* <!-- widget social menu end --> */}
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6 d-none">
                <div className="footer-widget widget3 mb-sm-0 mb-13">
                  {/* <!-- footer widget title start --> */}
                  <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                    Product
                  </p>
                  {/* <!-- footer widget title end --> */}
                  {/* <!-- widget social menu start --> */}
                  <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                    <li className="mb-3">
                      <Link
                        to={""}
                        className="heading-default-color font-size-4 font-weight-normal"
                      >
                        Features
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to={""}
                        className="heading-default-color font-size-4 font-weight-normal"
                      >
                        Pricing
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to={""}
                        className="heading-default-color font-size-4 font-weight-normal"
                      >
                        News
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to={""}
                        className="heading-default-color font-size-4 font-weight-normal"
                      >
                        Help desk
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to={""}
                        className="heading-default-color font-size-4 font-weight-normal"
                      >
                        Support
                      </Link>
                    </li>
                  </ul>
                  {/* <!-- widget social menu end --> */}
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6 d-none">
                <div className="footer-widget widget4 mb-sm-0 mb-13">
                  {/* <!-- footer widget title start --> */}
                  <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                    Services
                  </p>
                  {/* <!-- footer widget title end --> */}
                  {/* <!-- widget social menu start --> */}
                  <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                    <li className="mb-3">
                      <Link
                        to={""}
                        className="heading-default-color font-size-4 font-weight-normal"
                      >
                        Digital Marketing
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to={""}
                        className="heading-default-color font-size-4 font-weight-normal"
                      >
                        SEO for Business
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to={""}
                        className="heading-default-color font-size-4 font-weight-normal"
                      >
                        Avasta Dash
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to={""}
                        className="heading-default-color font-size-4 font-weight-normal"
                      >
                        UI Design
                      </Link>
                    </li>
                  </ul>
                  {/* <!-- widget social menu end --> */}
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">
                <div className="footer-widget widget4">
                  {/* <!-- footer widget title start --> */}
                  <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                    Legal
                  </p>
                  {/* <!-- footer widget title end --> */}
                  <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                    <li className="mb-3">
                      <Link
                        to={""}
                        className="heading-default-color font-size-4 font-weight-normal"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to={""}
                        className="heading-default-color font-size-4 font-weight-normal"
                      >
                        Terms & Conditions
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default EmployeeFooter;
