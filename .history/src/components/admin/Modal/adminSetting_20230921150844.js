import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";
import { GetAdminrSetting, AddAdminPermission } from "../../../api/api";
import { toast } from "react-toastify";

function AdminSetting(props) {
  const [apiCall, setApiCall] = useState(false);
  const [email, setEmail] = useState({
    lmia: 0,
    job: 0,
    interview: 0, // Corrected typo here (changed "inerview" to "interview")
    visa: 0,
  });
  const [notification, setNotification] = useState({
    // Corrected the state variable name to "notification"
    lmia: 0,
    job: 0,
    interview: 0, // Corrected typo here (changed "inerview" to "interview")
    visa: 0,
  });

  /* Function to get the permission data */
  // (Assuming GetAdminrSetting and AddAdminPermission are defined and working correctly)

  /* Render method */
  useEffect(() => {
    GetPermissionData();
    if (apiCall) {
      setApiCall(false);
    }
  }, [apiCall]);

  /* Function to grant the permission */
  const togglePermission = async (permissionName) => {
    // Condition to switch the button accordingly
    const updatedPermissions = {
      notification_permission: {
        lmia:
          permissionName === "lmia"
            ? notification.lmia === 0
              ? 1
              : 0
            : notification.lmia,
        visa:
          permissionName === "visa"
            ? notification.visa === 0
              ? 1
              : 0
            : notification.visa,
        interview:
          permissionName === "interview"
            ? notification.interview === 0
              ? 1
              : 0
            : notification.interview,
        job:
          permissionName === "job"
            ? notification.job === 0
              ? 1
              : 0
            : notification.job,
      },
      email_permission: {
        lmia:
          permissionName === "lmia" ? (email.lmia === 0 ? 1 : 0) : email.lmia,
        visa:
          permissionName === "visa" ? (email.visa === 0 ? 1 : 0) : email.visa,
        interview:
          permissionName === "interview"
            ? email.interview === 0
              ? 1
              : 0
            : email.interview,
        job: permissionName === "job" ? (email.job === 0 ? 1 : 0) : email.job,
      },
    };

    try {
      let Response = await AddAdminPermission(updatedPermissions);

      console.log(Response);
      // Conditions for the response toaster message
      if (
        Response.message === "successfully" &&
        (permissionName === "lmia"
          ? updatedPermissions.notification_permission.lmia === 1
          : permissionName === "visa"
          ? updatedPermissions.notification_permission.visa === 1
          : permissionName === "interview"
          ? updatedPermissions.notification_permission.interview === 1
          : updatedPermissions.notification_permission.job === 1)
      ) {
        toast.success("Permission granted successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
      }
      if (
        Response.message === "successfully" &&
        (permissionName === "lmia"
          ? updatedPermissions.notification_permission.lmia === 0
          : permissionName === "visa"
          ? updatedPermissions.notification_permission.visa === 0
          : permissionName === "interview"
          ? updatedPermissions.notification_permission.interview === 0
          : updatedPermissions.notification_permission.job === 0)
      ) {
        toast.error("Permission Denied successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        show={props.show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          data-dismiss="modal"
          onClick={props.close}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white rounded h-100 px-11 pt-10">
          <h3 className="text-center">Settings</h3>
          <div>
            <h6 className="text-start mt-4 text-grey">
              Admin's Email Preferences
            </h6>
            <ul className="list-unstyled row">
              <li className="mb-3 col-6">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch1"
                    checked={email.lmia === 0 ? false : true}
                    onChange={() => togglePermission("lmia")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch1"
                  >
                    Lmia
                  </label>
                </div>
              </li>
              <li className="mb-3 col-6">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch2"
                    checked={email.visa === 0 ? false : true}
                    onChange={() => togglePermission("visa")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch2"
                  >
                    Visa
                  </label>
                </div>
              </li>
              <li className="mb-3 col-6">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch3"
                    checked={email.interview === 0 ? false : true}
                    onChange={() => togglePermission("interview")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch3"
                  >
                    Interview
                  </label>
                </div>
              </li>
              <li className="mb-3 col-6">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch4"
                    checked={email.job === 0 ? false : true}
                    onChange={() => togglePermission("job")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch4"
                  >
                    Job
                  </label>
                </div>
              </li>
            </ul>
            <div className="mb-3">
              <select className="form-control">
                <option value={""}>Select Type</option>
                <option value={"email_employee"}>Employee's email</option>
                <option value={"email_employer"}>Employer's email</option>
                <option value={"notification_employee"}>
                  Employee's notification
                </option>
                <option value={"notification_employer"}>
                  Employer's notification
                </option>
              </select>
            </div>
            <Link
              to=""
              onClick={() => {
                props.setShowChangePass(true);
                props.close();
              }}
              className="btn btn-primary  d-flex align-items-center mb-3"
            >
              <RiLockPasswordFill className="mr-2" /> Change Password
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AdminSetting;
