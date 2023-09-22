import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  GetAdminrSetting,
  AddAdminPermission,
  GetParentSetting,
} from "../../../api/api";
import { toast } from "react-toastify";
function AdminSetting(props) {
  const [apiCall, setApiCall] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [checkboxes, setCheckboxes] = useState([]);
  const [child, setChild] = useState({
    lmia: 0,
    job: 0,
    interview: 0,
    visa: 0,
  });
  const [email, setEmail] = useState({
    lmia: 0,
    job: 0,
    interview: 0,
    visa: 0,
  });
  const [notification, setNotiication] = useState({
    lmia: 0,
    job: 0,
    interview: 0,
    visa: 0,
  });

  /*Function to get the permision data */
  const GetPermissionData = async () => {
    try {
      let Response = await GetAdminrSetting();
      const email_permissions = JSON.parse(Response.data.email_permission);
      const notification_permission = JSON.parse(
        Response.data.notification_permission
      );
      setEmail(email_permissions);
      setNotiication(notification_permission);
    } catch (err) {
      console.log(err);
    }
  };
  /*Render method */
  useEffect(() => {
    GetPermissionData();
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [apiCall]);

  /*Function to grant the permission */
  const togglePermission = async (permissionName) => {
    //condition to switch the button accordingly
    const updatedPermissions = {
      notification_permission: {
        lmia:
          permissionName === "notification_lmia"
            ? notification.lmia === 0
              ? 1
              : 0
            : notification.lmia,
        visa:
          permissionName === "notification_visa"
            ? notification.visa === 0
              ? 1
              : 0
            : notification.visa,
        interview:
          permissionName === "notification_interview"
            ? notification.interview === 0
              ? 1
              : 0
            : notification.interview,
        job:
          permissionName === "notification_job"
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
      // conditions for the reponse toaster message
      if (
        Response.message === "successfully" &&
        (permissionName === "lmia"
          ? (updatedPermissions.notification_permission.lmia ||
              updatedPermissions.email_permission.lmia) === 1
          : permissionName === "visa"
          ? (updatedPermissions.notification_permission.visa ||
              updatedPermissions.email_permission.visa) === 1
          : permissionName === "interview"
          ? (updatedPermissions.notification_permission.interview ||
              updatedPermissions.email_permission.interview) === 1
          : (updatedPermissions.notification_permission.job ||
              updatedPermissions.email_permission.job) === 1)
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
          ? (updatedPermissions.notification_permission.lmia ||
              updatedPermissions.email_permission.lmia) === 0
          : permissionName === "visa"
          ? (updatedPermissions.notification_permission.visa ||
              updatedPermissions.email_permission.visa) === 0
          : permissionName === "interview"
          ? (updatedPermissions.notification_permission.interview ||
              updatedPermissions.email_permission.interview) === 0
          : (updatedPermissions.notification_permission.job ||
              updatedPermissions.email_permission.job) === 0)
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
  /*Function to get the child type to made chanages to there permissio */
  const handleSelectChange = async (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    try {
      let Response = await GetParentSetting(selectedValue);
      const permissions = JSON.parse(Response.data[0].permission);
      setCheckboxes(permissions);
    } catch (err) {
      console.log(err);
      setCheckboxes([]);
    }
  };
  /*Funcion to select the permission opions */
  const onChildChange = (permissionName) => {
    const updatedCheckboxes = {
      type: selectedOption,
      permission: {
        job:
          permissionName === "child_job"
            ? child.job === 0
              ? 1
              : 0
            : child.job,
        lmia:
          permissionName === "child_lmia"
            ? child.lmia === 0
              ? 1
              : 0
            : child.lmia,
        interview:
          permissionName === "child_interview"
            ? child.interview === 0
              ? 1
              : 0
            : child.interview,
        visa:
          permissionName === "child_visa"
            ? child.visa === 0
              ? 1
              : 0
            : child.visa,
      },
    };
    const checkboxIndex = updatedCheckboxes.indexOf(checkboxName);
    if (checkboxIndex === -1) {
      updatedCheckboxes.push(checkboxName);
    } else {
      updatedCheckboxes.splice(checkboxIndex, 1);
    }
    setCheckboxes(updatedCheckboxes);
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
            <h6 className="text-start mt-4 text-grey">
              Admin's Notification Preferences
            </h6>
            <ul className="list-unstyled row">
              <li className="mb-3 col-6">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch6"
                    checked={notification.lmia === 0 ? false : true}
                    onChange={() => togglePermission("notification_lmia")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch6"
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
                    id="customSwitch7"
                    checked={notification.visa === 0 ? false : true}
                    onChange={() => togglePermission("notification_visa")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch7"
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
                    id="customSwitch8"
                    checked={notification.interview === 0 ? false : true}
                    onChange={() => togglePermission("notification_interview")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch8"
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
                    id="customSwitch9"
                    checked={notification.job === 0 ? false : true}
                    onChange={() => togglePermission("notification_job")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch9"
                  >
                    Job
                  </label>
                </div>
              </li>
            </ul>
            <div className="mb-3">
              <select
                className="form-control"
                value={selectedOption}
                onChange={handleSelectChange}
              >
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
              {selectedOption && (
                <h6 className="text-start mt-4 text-grey text-capitalize">{`Admin's ${selectedOption.replaceAll(
                  "_",
                  " "
                )} Preferences`}</h6>
              )}
              <ul className="list-unstyled row">
                <ul className="list-unstyled row">
                  <li className="mb-3 col-6">
                    <div className="custom-control custom-switch">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customSwitch6"
                        checked={child.lmia === 0 ? false : true}
                        onChange={() => onChildChange("child_lmia")}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customSwitch6"
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
                        id="customSwitch7"
                        checked={child.visa === 0 ? false : true}
                        onChange={() => onChildChange("child_visa")}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customSwitch7"
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
                        id="customSwitch8"
                        checked={child.interview === 0 ? false : true}
                        onChange={() => onChildChange("child_interview")}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customSwitch8"
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
                        id="customSwitch9"
                        checked={child.job === 0 ? false : true}
                        onChange={() => onChildChange("child_job")}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customSwitch9"
                      >
                        Job
                      </label>
                    </div>
                  </li>
                </ul>
              </ul>
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
