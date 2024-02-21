import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import filterjson from "../../json/filterjson";
import { AddUpdateAgent, GetAgent } from "../../../api/api";

function AddAgent(props) {
  let encoded;
  const [imgError, setImgError] = useState("");
  //   let [already, setAlready] = useState("");
  let [loading, setLoading] = useState(false);
  //   const [showPassword, setShowPassword] = useState(false);

  /*Function to show hide password */
  //   const toggleShowPassword = () => setShowPassword((prev) => !prev);

  //   const renderIcon = () => {
  //     if (state.password.length > 0) {
  //       return showPassword ? (
  //         <i className="fa fa-eye-slash"></i>
  //       ) : (
  //         <i className="fa fa-eye"></i>
  //       );
  //     }
  //     return null;
  //   };

  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormState);
    setErrors("");
    props.close();
    setLoading(false);
    // setAlready("");
  };
  // USER agent PROFILE UPDATE VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    name: "",
    email: "",
    password: "",
    type: "",
    contact_no: "",
    profile_image: "",
    address: "",
    country: "",
    state: "",
    city: "",
    id: props.agentId === "0" ? "" : props.agentId,
  };
  // VALIDATION CONDITIONS
  const validators = {
    name: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Name is required"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Name can not have a number."
          : value.length < 2
          ? "Name should have 2 or more letters"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : "",
    ],
    // email: [
    //   (value) =>
    //     value === "" || value.trim() === ""
    //       ? "Email is required"
    //       : /\S+@\S+\.\S+/.test(value)
    //       ? null
    //       : "Email is invalid",
    // ],
    password: [
      (value) =>
        state.agent_id
          ? value === ""
          : value === ""
          ? "Password is required"
          : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
              value
            )
          ? null
          : "Password must contain digit, one uppercase letter, one special character, no space, and it must be 8-16 characters long",
    ],
    // type: [(value) => (value === "" ? "Type is required" : null)],
    // contact_no: [
    //   (value) =>
    //     value === "" || value === null || value.trim() === ""
    //       ? "Contact no is required"
    // : value.length < 10
    // ? "Contact no can not be less than 10 digit"
    // : value.length > 130
    // ? "Contact no can not be more than 13 digit"
    //       : "",
    // ],
    // address: [
    //   (value) =>
    //     value === "" || value.trim() === ""
    //       ? "Address is required"
    //       : value.length < 2
    //       ? "Address should have 2 or more letters"
    //       : "",
    // ],
    // country: [
    //   (value) =>
    //     value === "" || value.trim() === ""
    //       ? "Country is required"
    //       : /[-]?\d+(\.\d+)?/.test(value)
    //       ? "Country can not have a number."
    //       : value.length < 2
    //       ? "Country should have 2 or more letters"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : "",
    // ],
    // state: [
    //   (value) =>
    //     value === "" || value.trim() === ""
    //       ? "State is required"
    //       : /[-]?\d+(\.\d+)?/.test(value)
    //       ? "State can not have a number."
    //       : value.length < 2
    //       ? "State should have 2 or more letters"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : "",
    // ],
    // city: [
    //   (value) =>
    //     value === "" || value.trim() === ""
    //       ? "City is required"
    //       : /[-]?\d+(\.\d+)?/.test(value)
    //       ? "City can not have a number."
    //       : value.length < 2
    //       ? "City should have 2 or more letters"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : "",
    // ],
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
  /*Function to get agent detail */
  const AgentData = async () => {
    try {
      const userData = await GetAgent(props.agentId);
      if (userData) {
        setState(userData.data.data[0]);
      } else {
        setState(initialFormState);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (props.agentId === "0" || props.agentId === undefined) {
      setState(initialFormState);
    } else {
      AgentData();
    }
  }, [props.agentId]);

  // USER agent PROFILE UPDATE SUBMIT BUTTON
  const onAgentProfileUpdateClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const responseData = await AddUpdateAgent(state);
        if (responseData.message === "created successfully") {
          toast.success("Agent added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
        if (responseData.message === "updated successfully") {
          toast.success("Agent Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
        // if (responseData.message === "agent already exists") {
        //   setAlready("agent already exists");
        //   setLoading(false);
        // }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  // END USER agent PROFILE UPDATE VALIDATION
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
          {props.agentId === "0" ? (
            <h5 className="text-center pt-2 mb-7">Add Partner</h5>
          ) : (
            <h5 className="text-center pt-2 mb-7">Update Partner</h5>
          )}
          <form onSubmit={onAgentProfileUpdateClick}>
            <div className="form-group mx-auto text-center">
              <div className="mb-4 position-relative">
                <input
                  type={"file"}
                  id="profile_image"
                  accept="image/png,image/jpeg,image/jpg,image/gif"
                  onChange={handleFileChange}
                  className="d-none"
                  maxLength={60}
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
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="name"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Partner's Name <span className="text-danger">*</span>
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
                {/*----ERROR MESSAGE FOR agent Name----*/}
                {errors.name && (
                  <span key={errors.name} className="text-danger font-size-3">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
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
                {/*----ERROR MESSAGE FOR agent Name----*/}
                {errors.contact_no && (
                  <span
                    key={errors.contact_no}
                    className="text-danger font-size-3"
                  >
                    {errors.contact_no}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6 ">
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
                  maxLength={60}
                  // disabled={props.agentId === "0" ? false : true}
                  placeholder="Enter email address"
                />
                {/*----ERROR MESSAGE FOR EMAIL----*/}
                {errors.email && (
                  <span key={errors.email} className="text-danger font-size-3">
                    {errors.email}
                  </span>
                )}
              </div>
              {state.agent_id ? null : (
                <div className="form-group col-md-6 ">
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
                    <span
                      className="password-icon"
                      onClick={toggleShowPassword}
                    >
                      {renderIcon()}
                    </span>
                  </div>
                  {/*----ERROR MESSAGE FOR agent PASSWORD----*/}
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
              {/* <div className="form-group col-md-6 ">
                <label
                  htmlFor="type"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Type <span className="text-danger">*</span> :
                </label>
                <select
                  type={"text"}
                  className={
                    errors.type
                      ? "form-control border border-danger text-capitalize"
                      : "form-control"
                  }
                  value={state.type}
                  onChange={onInputChange}
                  id="type"
                  name="type"
                  multiple={false}
                >
                  <option value={""}>Select</option>
                  <option value={"agent"}>Agent</option>
                  {/* {(filterjson.agenttype || []).map((item, index) => {
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
                {/*----ERROR MESSAGE FOR agent TYPE----
                {errors.type && (
                  <span key={errors.type} className="text-danger font-size-3">
                    {errors.type}
                  </span>
                )}
              </div> */}
              <div className="form-group col-md-6 ">
                <label
                  htmlFor="type"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Address <span className="text-danger">*</span> :
                </label>
                <input
                  type={"text"}
                  className={
                    errors.address
                      ? "form-control border border-danger text-capitalize"
                      : "form-control"
                  }
                  value={state.address}
                  onChange={onInputChange}
                  id="address"
                  name="address"
                  placeholder="Current Address"
                />

                {/*----ERROR MESSAGE FOR ADDRESS----*/}
                {errors.address && (
                  <span
                    key={errors.address}
                    className="text-danger font-size-3"
                  >
                    {errors.address}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6 ">
                <label
                  htmlFor="type"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Country <span className="text-danger">*</span> :
                </label>
                <input
                  type={"text"}
                  className={
                    errors.country
                      ? "form-control border border-danger text-capitalize"
                      : "form-control"
                  }
                  value={state.country}
                  onChange={onInputChange}
                  id="country"
                  name="country"
                  placeholder="Current Country"
                  maxLength={60}
                />

                {/*----ERROR MESSAGE FOR COUNTRY----*/}
                {errors.country && (
                  <span
                    key={errors.country}
                    className="text-danger font-size-3"
                  >
                    {errors.country}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6 ">
                <label
                  htmlFor="type"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  State <span className="text-danger">*</span> :
                </label>
                <input
                  type={"text"}
                  className={
                    errors.state
                      ? "form-control border border-danger text-capitalize"
                      : "form-control"
                  }
                  value={state.state}
                  onChange={onInputChange}
                  id="state"
                  name="state"
                  placeholder="Current state"
                  maxLength={60}
                />

                {/*----ERROR MESSAGE FOR STATE----*/}
                {errors.state && (
                  <span key={errors.state} className="text-danger font-size-3">
                    {errors.state}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6 ">
                <label
                  htmlFor="type"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  City <span className="text-danger">*</span> :
                </label>
                <input
                  type={"text"}
                  className={
                    errors.city
                      ? "form-control border border-danger text-capitalize"
                      : "form-control"
                  }
                  value={state.city}
                  onChange={onInputChange}
                  id="city"
                  name="city"
                  placeholder="Current city"
                  maxLength={60}
                />

                {/*----ERROR MESSAGE FOR City----*/}
                {errors.city && (
                  <span key={errors.city} className="text-danger font-size-3">
                    {errors.city}
                  </span>
                )}
              </div>
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

export default AddAgent;
