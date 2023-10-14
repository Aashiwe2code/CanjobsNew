import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import {
  AdminDetails,
  AddAdmin /* AddChildPermission*/,
} from "../../../api//api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import filterjson from "../../json/filterjson";
// import Permissions from "../../json/emailPermisionJson";

function Addadmin(props) {
  let encoded;
  const [imgError, setImgError] = useState("");
  let [already, setAlready] = useState("");
  let [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /*Function to show hide password */
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const renderIcon = () => {
    if (state.password.length > 0) {
      return showPassword ? (
        <i className="fa fa-eye-slash"></i>
      ) : (
        <i className="fa fa-eye"></i>
      );
    }
    return null;
  };

  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormState);
    setErrors("");
    props.close();
    setLoading(false);
    setAlready("");
  };
  // USER ADMIN PROFILE UPDATE VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    name: "",
    email: "",
    password: "",
    admin_type: "",
    contact_no: "",
    profile_image: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    name: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Admin name is required"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Admin name can not have a number."
          : value.length < 2
          ? "Admin name should have 2 or more letters"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            "",
    ],
    email: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
    password: [
      (value) =>
        state.admin_id
          ? value === ""
          : value === ""
          ? "Password is required"
          : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
              value
            )
          ? null
          : "Password must contain digit, one uppercase letter, one special character, no space, and it must be 8-16 characters long",
    ],
    admin_type: [
      (value) =>
        value === "" || value.trim() === "" ? "Admin type is required" : null,
    ],
    contact_no: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Contact no is required"
          : value.length < 10
          ? "Contact no can not be less than 10 digit"
          : value.length > 13
          ? "Contact no can not be more than 13 digit"
          : "",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, setErrors, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);

  /*Function to convert file to base64 */
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        resolve({ base64: fileReader.result });
      });
      fileReader.readAsDataURL(file);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  /*Onchange function of profile */
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (/*file.size > 1024 * 100*/ (file.size > 100) * 1024 === true) {
          setImgError("Image size can't be more then 100 kb");
        } else {
          setImgError("");
          setState({ ...state, profile_image: event.target.result });
        }
      };
      img.src = event.target.result;
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
    encoded = await convertToBase64(file);
    let base64Name = encoded.base64;
    setState({ ...state, profile_image: base64Name });
  };
  /*Function to get admin detail */
  const AdminData = async () => {
    try {
      const userData = await AdminDetails(props.adminId);
      if (userData === undefined || userData.data.length === 0) {
        setState(initialFormState);
      } else {
        setState(userData.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (props.adminId === "0" || props.adminId === undefined) {
      setState(initialFormState);
    } else {
      AdminData();
    }
  }, [props]);

  // USER ADMIN PROFILE UPDATE SUBMIT BUTTON
  const onAminProfileUpdateClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const responseData = await AddAdmin(state);
        if (responseData.message === "admin added successfully") {
          // await AddChildPermission(Permissions);
          toast.success("Admin added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
        if (responseData.message === "admin updated successfully") {
          toast.success("Admin Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
        if (responseData.message === "Admin already exists") {
          setAlready("Admin already exists");
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  // END USER ADMIN PROFILE UPDATE VALIDATION
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
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
          data-dismiss="modal"
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
          {props.adminId === "0" ? (
            <h5 className="text-center pt-2 mb-7">Add Admin</h5>
          ) : (
            <h5 className="text-center pt-2 mb-7">Update Admin</h5>
          )}
          <form onSubmit={onAminProfileUpdateClick}>
            <div className="form-group mx-auto text-center">
              <div className="mb-4 position-relative">
                <input
                  type={"file"}
                  id="profile_image"
                  accept="image/png,image/jpeg,image/jpg,image/gif"
                  onChange={handleFileChange}
                  className="d-none"
                />
                <img
                  className="rounded-circle"
                  src={
                    state.profile_image
                      ? state.profile_image
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  }
                  alt=""
                  width={"100px"}
                  height={"100px"}
                />
                <label
                  className="mt-lg-20 mx-lg-31
                   bg-transparent edit_profile_icon"
                  htmlFor="profile_image"
                >
                  <span className="fas fa-pen text-white bg-gray p-1 rounded mx-lg-1 mt-lg-3 "></span>
                </label>
              </div>
              <small className="text-danger">{imgError}</small>
            </div>
            <div className="form-group">
              <label
                htmlFor="name"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Admin Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={
                  errors.name
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.name}
                onChange={onInputChange}
                id="name"
                name="name"
                placeholder="eg. Apple"
                maxLength={60}
              />
              {/*----ERROR MESSAGE FOR Admin Name----*/}
              {errors.name && (
                <span key={errors.name} className="text-danger font-size-3">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="contact_no"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Contact No <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className={
                  errors.contact_no
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.contact_no}
                onChange={onInputChange}
                id="contact_no"
                name="contact_no"
                min={0}
                placeholder="Enter contact no"
                maxLength={13}
              />
              {/*----ERROR MESSAGE FOR Admin Name----*/}
              {errors.contact_no && (
                <span
                  key={errors.contact_no}
                  className="text-danger font-size-3"
                >
                  {errors.contact_no}
                </span>
              )}
            </div>
            <div className="form-group ">
              <label
                htmlFor="email"
                className="font-size-4 text-black-2  line-height-reset"
              >
                E-mail Id<span className="text-danger">*</span> :
              </label>
              <input
                className={
                  errors.email
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.email}
                onChange={onInputChange}
                id="email"
                name="email"
                type={"email"}
                disabled={props.adminId === "0" ? false : true}
                maxLength={60}
              />
              {/*----ERROR MESSAGE FOR EMAIL----*/}
              {errors.email && (
                <span key={errors.email} className="text-danger font-size-3">
                  {errors.email}
                </span>
              )}
            </div>
            {state.admin_id ? null : (
              <div className="form-group ">
                <label
                  htmlFor="password"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Password <span className="text-danger">*</span> :
                </label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={
                      errors.password
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.password}
                    onChange={onInputChange}
                    id="password"
                    name="password"
                  />
                  <span className="password-icon" onClick={toggleShowPassword}>
                    {renderIcon()}
                  </span>
                </div>
                {/*----ERROR MESSAGE FOR ADMIN PASSWORD----*/}
                {errors.password && (
                  <span
                    key={errors.password}
                    className="text-danger font-size-3"
                  >
                    {errors.password}
                  </span>
                )}
              </div>
            )}
            <div className="form-group ">
              <label
                htmlFor="admin_type"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Admin Type <span className="text-danger">*</span> :
              </label>
              <select
                type={"text"}
                className={
                  errors.admin_type
                    ? "form-control border border-danger text-capitalize"
                    : "form-control"
                }
                value={state.admin_type}
                onChange={onInputChange}
                id="admin_type"
                name="admin_type"
                multiple={false}
              >
                <option value={""}>Select</option>
                {(filterjson.admintype || []).map((item, index) => {
                  return (
                    <option
                      value={item}
                      key={index}
                      className=" text-capitalize"
                    >
                      {item}
                    </option>
                  );
                })}
              </select>
              {/*----ERROR MESSAGE FOR ADMIN TYPE----*/}
              {errors.admin_type && (
                <span
                  key={errors.admin_type}
                  className="text-danger font-size-3"
                >
                  {errors.admin_type}
                </span>
              )}
            </div>
            <span className="text-danger font-size-3">{already}</span>
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
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default Addadmin;
