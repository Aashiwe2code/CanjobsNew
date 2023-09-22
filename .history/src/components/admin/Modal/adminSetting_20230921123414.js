import React, { useState } from "react";
import ChangePassword from "../../common/changepassword";

function AdminSetting(props) {
  const [showChangePass, setShowChangePass] = useState(false);

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
            <ul className="list-unstyled">
              <li className="mb-3">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch1"
                    // checked={lmia === 0 ? false : true}
                    // onChange={() => togglePermission("lmia")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch1"
                  >
                    Lmia notification
                  </label>
                </div>
              </li>
              <li className="mb-3">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch2"
                    // checked={visa === 0 ? false : true}
                    // onChange={() => togglePermission("visa")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch2"
                  >
                    Visa notification
                  </label>
                </div>
              </li>
              <li className="mb-3">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch3"
                    // checked={interview === 0 ? false : true}
                    // onChange={() => togglePermission("interview")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch3"
                  >
                    Interview notification
                  </label>
                </div>
              </li>
              <li>
                <Link
                  to=""
                  onClick={() => setShowChangePass(true)}
                  className="btn btn-primary  d-flex align-items-center"
                >
                  <RiLockPasswordFill className="mr-2" /> Change Password
                </Link>
                {/*<-- Change password Modal -->*/}
                {showChangePass ? (
                  <ChangePassword
                    show={showChangePass}
                    close={() => setShowChangePass(false)}
                  />
                ) : null}
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AdminSetting;
