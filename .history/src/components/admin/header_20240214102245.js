import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GenerateToken from "./generateToken";
import { getAllAdminNotification, ReadNotification } from "../../api/api";
import AdminSetting from "./Modal/adminSetting";
import ChangePassword from "../common/changepassword";
import Notifications from "./notifications";
// import GlobalSearch from "./globalSearch";

const AdminHeader = (props) => {
  /*States */
  const [showChangePass, setShowChangePass] = useState(false);
  const [showSettings, setSettings] = useState(false);
  const [showGeneratToken, setShowGenerateToken] = useState(false);
  const [notification, setNotiication] = useState("");
  const [apicall, setApicall] = useState(false);
  let Admin = localStorage.getItem("admin");
  let AdminType = localStorage.getItem("admin_type");
  let userType = localStorage.getItem("userType");

  let navigate = useNavigate();
  /*Function to Call Notification Api */
  const Notiication = async () => {
    try {
      let Response = await getAllAdminNotification();
      setNotiication(Response.Data.data);
    } catch (err) {
      console.log(err);
    }
  };
  /*Render Mewthod to get Notification */
  useEffect(() => {
    Notiication();
    if (apicall === true) {
      setApicall(false);
    }
    if (
      AdminType === undefined ||
      AdminType === "" ||
      AdminType === null ||
      AdminType === "undefined" ||
      AdminType === "company" ||
      AdminType === "user"
    ) {
      navigate("/");
    }
  }, [apicall]);
  return (
    <header className="site-header admin_header site-header--menu-right bg-default position-fixed border-left site-header--absolute">
      <div className="container-fluid-fluid px-7">
        <nav className="navbar site-navbar offcanvas-active navbar-expand-lg  px-0 py-0">
          {/* <!-- Page Heading--> */}
          <h3 className="font-size-6 mb-0 text-capitalize">{props.heading}</h3>
          <div className="collapse navbar-collapse" id="mobile-menu"></div>
          {/* <GlobalSearch />*/}
          <Notifications />
          <div className="header-btn-devider ml-auto ml-lg-5 pl-2 d-xs-flex align-items-center">
            <div>
              <div className="dropdown show-gr-dropdown py-5">
                <Link
                  to={""}
                  className="proile media ml-7 flex-y-center"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="text-white">
                    <h6 className="m-0 text-capitalize text-white">
                      Hi, {Admin}
                    </h6>
                  </div>
                  {/* <i className="fas fa-chevron-down heading-default-color px-3"></i> */}
                </Link>
                <div
                  className="dropdown-menu gr-menu-dropdown dropdown-right border-0 border-width-2 py-2 w-auto bg-default"
                  aria-labelledby="dropdownMenuLink"
                >
                  {userType === "agent" ? null : (
                    <Link
                      to={"/adminprofile"}
                      className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-capitalize"
                    >
                      Edit Profile
                    </Link>
                  )}
                  {AdminType === "super-admin" || AdminType === "admin" ? (
                    <Link
                      to={""}
                      onClick={() => setShowGenerateToken(true)}
                      className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-capitalize"
                    >
                      View as
                    </Link>
                  ) : null}
                  {userType === "agent" ? null : (
                    <Link
                      to={""}
                      onClick={() => setSettings(true)}
                      className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-capitalize"
                    >
                      Setting
                    </Link>
                  )}
                  {/*<--Logout Functionality-->*/}
                  <Link
                    to={"/adminlogin"}
                    onClick={() => {
                      localStorage.clear(); // clear the local storage
                      toast.error("Log Out Successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                      });
                    }}
                    className="dropdown-item py-2 text-red font-size-3 font-weight-semibold line-height-1p2 text-capitalize"
                  >
                    Log Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown show-gr-dropdown py-5">
            <Link
              to={""}
              role="button"
              id="dropdownMenuNotification"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              className="px-3 ml-7 font-size-4 notification-block flex-y-center position-relative text-white"
            >
              <i className="fas fa-bell "></i>
              {notification.length > 0 ? (
                <span className="font-size-1 count text-white bg-primary circle-18 border border-width-1 border border-white">
                  {notification.length >= 10
                    ? "9+"
                    : notification.length >= 100
                    ? "99+"
                    : notification.length}
                </span>
              ) : null}
            </Link>
            <ul
              className="dropdown-menu gr-menu-dropdown dropdown-right border-0 border-width-2 py-2 w-auto bg-default"
              aria-labelledby="dropdownMenuNotification"
            >
              {(notification || []).map((data, i) =>
                i >= 10 ? null : (
                  <React.Fragment key={data.id}>
                    <li
                      title={data.message}
                      className={
                        data.is_read === "1"
                          ? "dropdown-item border-bottom  border-hit-gray font-size-3 text-wrap text-capitalize"
                          : "font-weight-bold dropdown-item border-bottom  border-hit-gray font-size-3 text-wrap text-capitalize"
                      }
                    >
                      <Link
                        to={
                          data.subject === "added_new_job"
                            ? "/job"
                            : data.subject === "applied_on_job"
                            ? "/responses"
                            : data.subject === "interview_scheduled"
                            ? "/interview"
                            : ""
                        }
                        onClick={() => {
                          try {
                            ReadNotification(data.id);
                          } catch (err) {
                            console.log(err);
                          }
                          setApicall(true);
                        }}
                        className="text-truncate-2 text-dark"
                      >
                        {data.message}
                      </Link>
                    </li>
                  </React.Fragment>
                )
              )}
            </ul>
          </div>
        </nav>
      </div>
      {/* Setteings modal */}
      {showSettings ? (
        <AdminSetting
          setShowChangePass={setShowChangePass}
          close={() => setSettings(false)}
          show={showSettings}
        />
      ) : null}
      {/*<-- Change password Modal -->*/}
      {showChangePass ? (
        <ChangePassword
          show={showChangePass}
          close={() => setShowChangePass(false)}
        />
      ) : null}
      {/*<-- Generate Token Modal -->*/}
      {showGeneratToken ? (
        <GenerateToken
          show={showGeneratToken}
          close={() => setShowGenerateToken(false)}
        />
      ) : null}
    </header>
  );
};
export default AdminHeader;
