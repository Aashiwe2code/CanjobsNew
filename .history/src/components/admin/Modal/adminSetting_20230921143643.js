import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";
import { GetAdminrSetting, AddAdminPermission } from "../../../api/api";
import { toast } from "react-toastify";
function AdminSetting(props) {
  const [apiCall, setApiCall] = useState(false);
  const [lmia, setLmia] = useState(0);
  const [visa, setVisa] = useState(0);
  const [interview, setInterview] = useState(0);
  const [job, setJob] = useState(0);

  /*Function to get the permision data */
  const GetPermissionData = async () => {
    try {
      let Response = await GetAdminrSetting();
      const permissions = JSON.parse(Response.data);
      console.log(Response);
      //   setLmia(permissions.lmia);
      //   setVisa(permissions.visa);
      //   setInterview(permissions.interview);
      //   setJob(permissions.job);
    } catch (err) {
      console.log(err);
    }
  };

  /*Render method */
  useEffect(() => {
    GetPermissionData();
    if (apiCall) {
      setApiCall(false);
    }
  }, [apiCall]);

  /*Function to grant the permission */
  const togglePermission = async (permissionName) => {
    //condition to switch the button accordingly
    const updatedPermissions = {
      lmia: permissionName === "lmia" ? (lmia === 0 ? 1 : 0) : lmia,
      visa: permissionName === "visa" ? (visa === 0 ? 1 : 0) : visa,
      interview:
        permissionName === "interview" ? (interview === 0 ? 1 : 0) : interview,
      job: permissionName === "job" ? (job === 0 ? 1 : 0) : job,
    };

    try {
      let Response = await AddAdminPermission(updatedPermissions);

      console.log(Response);
      // conditions for the reponse toaster message
      if (
        Response.message === "successfully" &&
        (permissionName === "lmia"
          ? updatedPermissions.lmia === 1
          : permissionName === "visa"
          ? updatedPermissions.visa === 1
          : permissionName === "interview"
          ? updatedPermissions.interview === 1
          : updatedPermissions.job === 1)
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
          ? updatedPermissions.lmia === 0
          : permissionName === "visa"
          ? updatedPermissions.visa === 0
          : permissionName === "interview"
          ? updatedPermissions.interview === 0
          : updatedPermissions.job === 0)
      ) {
        toast.error("Permission Denay successfully", {
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
                    checked={lmia === 0 ? false : true}
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
                    checked={visa === 0 ? false : true}
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
                    checked={interview === 0 ? false : true}
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
                    checked={job === 0 ? false : true}
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
                  Employee's notifcation
                </option>
                <option value={"notification_employer"}>
                  Employee's notifcation
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
