import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";
import { GetAdminrSetting, AddAdminPermission } from "../../../api/api";
import { toast } from "react-toastify";
import ParentSetting from "../../common/parentSetting";

function AdminSetting(props) {
  const [apiCall, setApiCall] = useState(false);
  const [email, setEmail] = useState({
    lmia: 0,
    job: 0,
    interview: 0,
    visa: 0,
  });
  const [notification, setNotification] = useState({
    lmia: 0,
    job: 0,
    interview: 0,
    visa: 0,
  });

  const GetPermissionData = async () => {
    try {
      const Response = await GetAdminrSetting();
      const email_permissions = JSON.parse(Response.data.email_permission);
      const notification_permission = JSON.parse(
        Response.data.notification_permission
      );
      setEmail(email_permissions);
      setNotification(notification_permission);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetPermissionData();
    if (apiCall) setApiCall(false);
  }, [apiCall]);

  const togglePermission = async (permissionName) => {
    const updatedPermissions = {
      notification_permission: {
        ...notification,
        [permissionName]: notification[permissionName] === 0 ? 1 : 0,
      },
      email_permission: {
        ...email,
        [permissionName]: email[permissionName] === 0 ? 1 : 0,
      },
    };

    try {
      const Response = await AddAdminPermission(updatedPermissions);
      const permissionValue =
        updatedPermissions.notification_permission[permissionName] ||
        updatedPermissions.email_permission[permissionName];
      const successMessage = `Permission ${
        permissionValue === 1 ? "granted" : "denied"
      } successfully`;
      toast[Response.message === "successfully" ? "success" : "error"](
        successMessage,
        { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 }
      );
      if (permissionValue === 1) setApiCall(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
          {["lmia", "visa", "interview", "job"].map((type) => (
            <React.Fragment key={type}>
              <h6 className="text-start mt-4 text-grey">
                Admin's{" "}
                {type === "lmia" || type === "visa" ? "Email" : "Notification"}{" "}
                Preferences
              </h6>
              <ul className="list-unstyled row">
                {[type, `notification_${type}`].map((item) => (
                  <li className="mb-3 col-6" key={item}>
                    <div className="custom-control custom-switch">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={`customSwitch_${item}`}
                        checked={
                          item.startsWith("notification")
                            ? notification[type]
                            : email[type]
                        }
                        onChange={() => togglePermission(item)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`customSwitch_${item}`}
                      >
                        {item.startsWith("notification") ? "Notification " : ""}
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ))}
          <div className="mb-3">
            <ParentSetting />
          </div>
          <button
            onClick={() => {
              props.setShowChangePass(true);
              props.close();
            }}
            className="btn btn-primary  d-flex align-items-center mb-3"
          >
            <RiLockPasswordFill className="mr-2" /> Change Password
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AdminSetting;
