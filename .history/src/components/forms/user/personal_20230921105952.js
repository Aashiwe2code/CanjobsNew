import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
// import { CKEditor } from "ckeditor4-react";
import {
  AddEmployeeDetails,
  EmployeeDetails,
  GetAgentJson,
} from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterJson from "../../json/filterjson";
import Select from "react-select";
function PersonalDetails(props) {
  let encoded;
  const [imgError, setImgError] = useState("");
  const [loading, setLoading] = useState(false);
  let user_type = localStorage.getItem("userType");
  // USER PERSONAL DETAIL VALIDATION
  // INITIAL STATE ASSIGNMENT
  const initialFormStateuser = {
    name: "",
    email: "",
    contact_no: "",
    description: "",
    date_of_birth: "",
    gender: "",
    marital_status: "",
    nationality: "",
    current_location: "",
    currently_located_country: "",
    language: "",
    religion: "",
    interested_in: "",
    experience: "",
    work_permit_canada: "",
    work_permit_other_country: "",
    resume: "",
    profile_photo: "",
    is_featured: "",
    status: props.employeeId === "0" ? "1" : "",
    reffer_by: "",
  };

  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormStateuser);
    setErrors("");
    setLoading(false);
    props.close();
  };

  // VALIDATION CONDITIONS

  const validators = {
    name: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : value.length < 2
          ? "Name should have 2 or more letter"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Name can not have a number."
          : "",
    ],
    email: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
    contact_no: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Mobile number is required"
          : value.length < 10
          ? "Mobile number should be of 10 digits"
          : value.length > 11
          ? "Mobile number should not be more than 11 digits"
          : "",
    ],
    // description: [
    //   (value) =>
    //     value === "" || value === null || value.trim() === ""
    //       ? "Description is required"
    //       : value.length < 5
    //       ? "Description should have 5 or more letter"
    //       : null,
    // ],
    date_of_birth: [
      (value) => (value === "" || value === null ? "Dob is required" : ""),
    ],
    gender: [
      (value) => (value === "" || value === null ? "Gender is required" : null),
    ],
    marital_status: [
      (value) => (value === "" || value === null ? "Status is required" : null),
    ],
    nationality: [
      (value) =>
        value === "" || value === null
          ? "Nationality is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : value.length < 3
          ? "Nationality should have 3 or more letter"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Nationality can not have a number."
          : "",
    ],
    current_location: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Location is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : value.length < 3
          ? "Location should have 3 or more letter"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Location can not have a number."
          : "",
    ],
    // currently_located_country: [
    //   (value) =>
    //     value === "" || value === null || value.trim() === ""
    //       ? "Country is required"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : value.length < 3
    //       ? "Country should have 3 or more letter"
    //       : /[-]?\d+(\.\d+)?/.test(value)
    //       ? "Country can not have a number."
    //       : "",
    // ],
    language: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Language is required"
          : "",
    ],
    // religion: [
    //   (value) =>
    //     value === "" || value === null || value.trim() === ""
    //       ? "Religion is required"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : value.length < 3
    //       ? "Religion should have 3 or more letter"
    //       : /[-]?\d+(\.\d+)?/.test(value)
    //       ? "Religion can not have a number."
    //       : "",
    // ],
    interested_in: [
      (value) => (value === "" ? "Interested in is required" : null),
    ],
    experience: [
      (value) =>
        value === "" || value === null ? "Experience is required" : null,
    ],
    resume: [
      (value) => (value === "" || value === null ? "Resume is required" : null),
    ],
    work_permit_canada: [
      (value) =>
        value === "" || value === null ? "Work Permit is required" : null,
    ],
    // work_permit_other_country: [
    //   (value) =>
    //     value === "" || value === null || value.trim() === ""
    //       ? "Other Permit is required"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : value.length < 2
    //       ? "Other permit sholud have 2 or more letters"
    //       : "",
    // ],
    reffer_by: [
      props.employeeId === "0"
        ? null
        : (value) =>
            value === "" ||
            value === null ||
            typeof state.reffer_by === "object"
              ? "Refferer is required"
              : null,
    ],
  };

  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, validate, setErrors } =
    useValidation(initialFormStateuser, validators);
  // API CALL
  const UserData = async () => {
    try {
      const userData = await EmployeeDetails(props.employeeId);
      if (userData.data.employee.length === 0) {
        setState([]);
      } else {
        setState(userData.data.employee[0]);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  /*Function to get agent json list */
  const AgentJson = async () => {
    try {
      let response = await GetAgentJson();
      console.log(response);
      if (Array.isArray(response)) {
        const options = response.map((option) => ({
          value: option.id,
          label: option.u_id + "  " + option.name,
        }));
        setState({ ...state, reffer_by: options });
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*Function to set data to the search job by country */
  const onSelectChange = (option) => {
    setState({ ...state, reffer_by: option.value });
  };
  useEffect(() => {
    if (props.employeeId === "0" || props.employeeId === undefined) {
      AgentJson();
      setState(initialFormStateuser);
    } else {
      UserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  // USER PERSONAL DETAIL SUBMIT BUTTON
  async function onUserPersonalDetailClick(event) {
    event.preventDefault();
    // console.log(state)
    if (validate() && imgError === "") {
      setLoading(true);
      try {
        const responseData = await AddEmployeeDetails(state);
        if (responseData.message === "Employee data inserted successfully") {
          toast.success("Employee added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
        if (responseData.message === "Employee data updated successfully") {
          toast.success("Employee Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }
  // END USER PERSONAL DETAIL VALIDATION
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
  /*Onchange function of Resume */
  const handleUploadFile = async (e) => {
    encoded = await convertToBase64(e.target.files[0]);
    let base64Name = encoded.base64;
    let finalBase = base64Name;
    console.log(finalBase);
    setState({ ...state, resume: finalBase });
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
          setState({ ...state, profile_photo: event.target.result });
        }
      };
      img.src = event.target.result;
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
    encoded = await convertToBase64(file);
    let base64Name = encoded.base64;
    setState({ ...state, profile_photo: base64Name });
  };
  // console.log(state.profile_photo);

  return (
    <>
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          data-dismiss="modal"
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 px-11 pt-7">
          <form onSubmit={onUserPersonalDetailClick}>
            {props.employeeId === "0" ? (
              <h5 className="text-center pt-2 mb-7"> Add Employee Details</h5>
            ) : (
              <h5 className="text-center pt-2 mb-7">Update Employee Details</h5>
            )}
            {/* FIRST LINE */}
            <div className="form-group mx-auto text-center">
              <div className="mb-4 position-relative">
                <input
                  type={"file"}
                  id="profile_photo"
                  accept="image/png,image/jpeg,image/jpg,image/gif"
                  onChange={handleFileChange}
                  className="d-none"
                />
                <img
                  className="rounded-circle"
                  src={
                    state.profile_photo
                      ? state.profile_photo
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  }
                  alt=""
                  width={"100px"}
                  height={"100px"}
                />
                <label
                  className="mt-lg-20 mx-lg-35 bg-transparent edit_profile_icon"
                  htmlFor="profile_photo"
                >
                  <span className="fas fa-pen text-white bg-gray p-1 rounded mx-lg-14 mt-lg-3 "></span>
                </label>
              </div>
              <small className="text-danger">{imgError}</small>
            </div>
            <div className="row pt-5">
              <input
                maxLength={20}
                name="employee_id"
                value={state.id || ""}
                type="hidden"
                id="employee_id"
              />
              <div className="form-group col-md-4">
                <label
                  htmlFor="name"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Full Name: <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
                  name="name"
                  value={state.name || ""}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.name
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Full Name"
                  id="name"
                />
                {/*----ERROR MESSAGE FOR name----*/}
                {errors.name && (
                  <span key={errors.name} className="text-danger font-size-3">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="email"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Email Id: <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={30}
                  type="email"
                  name="email"
                  value={state.email || ""}
                  onChange={onInputChange}
                  className={
                    errors.email
                      ? "form-control border border-danger"
                      : "form-control "
                  }
                  id="email"
                  placeholder="email"
                  disabled={props.employeeId === "0" ? false : true}
                />
                {/*----ERROR MESSAGE FOR EMAIL----*/}
                {errors.email && (
                  <span key={errors.email} className="text-danger font-size-3">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="contact_no"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Mobile Number: <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  placeholder="Mobile Number"
                  name="contact_no"
                  value={state.contact_no || ""}
                  onChange={onInputChange}
                  className={
                    errors.contact_no
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="contact_no"
                  maxLength={10}
                />
                {/*----ERROR MESSAGE FOR MOBILENO----*/}
                {errors.contact_no && (
                  <span
                    key={errors.contact_no}
                    className="text-danger font-size-3"
                  >
                    {errors.contact_no}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12">
                <label
                  htmlFor="description"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  About:
                </label>
                <textarea
                  name="description"
                  value={state.description || ""}
                  onChange={onInputChange}
                  className={
                    errors.description
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="description"
                  placeholder="Description"
                ></textarea>
                {/*----ERROR MESSAGE FOR GENDER----*/}
                {errors.description && (
                  <span
                    key={errors.description}
                    className="text-danger font-size-3"
                  >
                    {errors.description}
                  </span>
                )}
              </div>
            </div>

            {/* SECOND LINE */}
            <div className="row">
              <div className="form-group col-md-4">
                <label
                  htmlFor="date_of_birth"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Date Of Birth: <span className="text-danger">*</span>
                </label>
                <input
                  max={moment().format("DD-MM-YYYY")}
                  type="date"
                  placeholder="Date Of Birth "
                  name="date_of_birth"
                  value={state.date_of_birth || ""}
                  onChange={onInputChange}
                  onKeyDownCapture={(e) => e.preventDefault()}
                  className={
                    errors.date_of_birth
                      ? "form-control coustam_datepicker border border-danger"
                      : "form-control coustam_datepicker"
                  }
                  id="date_of_birth"
                />
                {/*----ERROR MESSAGE FOR DOB----*/}
                {errors.date_of_birth && (
                  <span
                    key={errors.date_of_birth}
                    className="text-danger font-size-3"
                  >
                    {errors.date_of_birth}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="gender"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Gender: <span className="text-danger">*</span>
                </label>
                <select
                  name="gender"
                  value={state.gender || ""}
                  onChange={onInputChange}
                  className={
                    errors.gender
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="gender"
                >
                  <option value={""}>User Gender</option>
                  <option value={"male"}>Male</option>
                  <option value={"female"}>Female</option>
                  <option value={"other"}>Other</option>
                </select>
                {/*----ERROR MESSAGE FOR GENDER----*/}
                {errors.gender && (
                  <span key={errors.gender} className="text-danger font-size-3">
                    {errors.gender}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="marital_status"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Maritial status: <span className="text-danger">*</span>
                </label>
                <select
                  name="marital_status"
                  value={state.marital_status || ""}
                  onChange={onInputChange}
                  className={
                    errors.marital_status
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="marital_status"
                >
                  <option value={""}>Maritial Status</option>
                  <option value={"single"}>Single</option>
                  <option value={"married"}>Married</option>
                </select>
                {/*----ERROR MESSAGE FOR MARITAL STATUS----*/}
                {errors.marital_status && (
                  <span
                    key={errors.marital_status}
                    className="text-danger font-size-3"
                  >
                    {errors.marital_status}
                  </span>
                )}
              </div>
            </div>
            {/* THIRD LINE */}
            <div className="row">
              <div className="form-group col-md-4">
                <label
                  htmlFor="nationality"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Nationality / Citizenship:
                  <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
                  type="text"
                  placeholder="nationality / Citizenship"
                  name="nationality"
                  value={state.nationality || ""}
                  onChange={onInputChange}
                  className={
                    errors.nationality
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="nationality"
                />
                {/*----ERROR MESSAGE FOR nationality----*/}
                {errors.nationality && (
                  <span
                    key={errors.nationality}
                    className="text-danger font-size-3"
                  >
                    {errors.nationality}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="current_location"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Current Location: <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
                  type="text"
                  placeholder="Current Location"
                  name="current_location"
                  value={state.current_location || ""}
                  onChange={onInputChange}
                  className={
                    errors.current_location
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="current_location"
                />
                {/*----ERROR MESSAGE FOR LOCATION----*/}
                {errors.current_location && (
                  <span
                    key={errors.current_location}
                    className="text-danger font-size-3"
                  >
                    {errors.current_location}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="currently_located_country"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Currently Located Country:
                </label>
                <input
                  maxLength={20}
                  type="text"
                  className={
                    errors.currently_located_country
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Currently Located Country"
                  id="currently_located_country"
                  name="currently_located_country"
                  value={state.currently_located_country || ""}
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR COUNTRY----*/}
                {errors.currently_located_country && (
                  <span
                    key={errors.currently_located_country}
                    className="text-danger font-size-3"
                  >
                    {errors.currently_located_country}
                  </span>
                )}
              </div>
            </div>

            {/* FOURTH LINE */}
            <div className="row">
              <div className="form-group col-md-4">
                <label
                  htmlFor="language"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Languages Known {/*(Max 3)*/}:
                  <span className="text-danger">*</span>
                </label>
                <select
                  name="language"
                  value={state.language || ""}
                  onChange={onInputChange}
                  className={
                    errors.language
                      ? "text-capitalize form-control border border-danger position-relative overflow-hidden"
                      : "text-capitalize form-control position-relative overflow-hidden"
                  }
                  placeholder="Language"
                  id="language"
                >
                  <option value={""}>Known Language</option>
                  {(FilterJson.language || []).map((Language) => (
                    <option key={Language} value={Language}>
                      {Language}
                    </option>
                  ))}
                </select>
                {/*----ERROR MESSAGE FOR LANGUAGE----*/}
                {errors.language && (
                  <span
                    key={errors.language}
                    className="text-danger font-size-3"
                  >
                    {errors.language}
                  </span>
                )}
              </div>
              {/* <div className="form-group col-md-4">
                <label
                  htmlFor="religion"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Religion: <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={20}
                  type="text"
                  className={
                    errors.religion
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="religion"
                  id="religion"
                  name="religion"
                  value={state.religion || ""}
                  onChange={onInputChange}
                />
                {errors.religion && (
                  <span
                    key={errors.religion}
                    className="text-danger font-size-3"
                  >
                    {errors.religion}
                  </span>
                )}
              </div> */}
              <div className="form-group col-md-4">
                <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                  Interested In: <span className="text-danger">*</span>
                </label>
                <select
                  className={
                    errors.language
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="interested_in"
                  name="interested_in"
                  value={state.interested_in || ""}
                  onChange={onInputChange}
                >
                  <option value={""}>Select</option>
                  {(FilterJson.interested || []).map((interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ))}
                  {/* <option value={"swap"}>SWEP</option>
                  <option value={"parttime"}>Part-time</option>
                  <option value={"all"}>All</option> */}
                </select>
                {/*----ERROR MESSAGE FOR interested_in----*/}
                {errors.interested_in && (
                  <span
                    key={errors.interested_in}
                    className="text-danger font-size-3"
                  >
                    {errors.interested_in}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="experience"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Experience: <span className="text-danger">*</span>
                </label>
                <select
                  name="experience"
                  value={state.experience || ""}
                  onChange={onInputChange}
                  className={
                    errors.experience
                      ? "form-control text-capitalize border border-danger"
                      : "form-control text-capitalize"
                  }
                  id="experience"
                >
                  <option value={""}>User Experience</option>
                  {(FilterJson.experience || []).map((ex, i) => (
                    <option value={ex} key={i}>
                      {ex}
                      {ex === "fresher" || ex === "Other" ? "" : "Years"}
                    </option>
                  ))}
                </select>
                {/*----ERROR MESSAGE FOR experience----*/}
                {errors.experience && (
                  <span
                    key={errors.experience}
                    className="text-danger font-size-3"
                  >
                    {errors.experience}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="work_permit_canada"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Work Permit of Canada: <span className="text-danger">*</span>
                </label>
                <select
                  name="work_permit_canada"
                  value={state.work_permit_canada || ""}
                  onChange={onInputChange}
                  className={
                    errors.work_permit_canada
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="work_permit_canada"
                >
                  <option value={""}>Permit </option>
                  <option value={"no"}>No</option>
                  <option value={"yes"}>Yes</option>
                </select>
                {/*----ERROR MESSAGE FOR WORK PERMIT----*/}
                {errors.work_permit_canada && (
                  <span
                    key={errors.work_permit_canada}
                    className="text-danger font-size-3"
                  >
                    {errors.work_permit_canada}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="otherpermit"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Work Permit of Other Country:
                </label>
                <input
                  maxLength={20}
                  type="text"
                  className={
                    errors.work_permit_other_country
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Permit of Other Country"
                  id="work_permit_other_country"
                  name="work_permit_other_country"
                  value={state.work_permit_other_country || ""}
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR OTHER COUNTRY PERMIT----*/}
                {errors.work_permit_other_country && (
                  <span
                    key={errors.work_permit_other_country}
                    className="text-danger font-size-3"
                  >
                    {errors.work_permit_other_country}
                  </span>
                )}
              </div>
              <div
                className={
                  props.employeeId === "0" ? "form-group col-md-4" : "d-none"
                }
              >
                <label
                  htmlFor="reffer_by"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Reffered by:<span className="text-danger">*</span>
                </label>
                <Select
                  options={"" || state.reffer_by}
                  name="reffer_by"
                  id="reffer_by"
                  onChange={onSelectChange}
                  className={
                    errors.work_permit_other_country
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/* ERROR MSG FOR REFFER BY */}
                {errors.reffer_by && (
                  <span
                    key={errors.reffer_by}
                    className="text-danger font-size-3"
                  >
                    {errors.reffer_by}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="resume"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Resume: <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  placeholder="Resume"
                  id="resume"
                  name="resume"
                  accept=".pdf,application/pdf"
                  onChange={handleUploadFile}
                  className={
                    errors.resume
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR RESUME----*/}
                {errors.resume && (
                  <span key={errors.resume} className="text-danger font-size-3">
                    {errors.resume}
                  </span>
                )}
              </div>
              {user_type === "admin" ? (
                <div className="form-group col-md-4">
                  <label
                    htmlFor="fetured"
                    className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                  >
                    Featured:{" "}
                    <input
                      type="checkbox"
                      id="fetured"
                      name="fetured"
                      checked={state.is_featured === "1"}
                      value={state.is_featured}
                      onChange={(e) =>
                        setState({
                          ...state,
                          is_featured:
                            state.is_featured === "" ||
                            state.is_featured === "0"
                              ? "1"
                              : "0",
                        })
                      }
                    />
                  </label>
                </div>
              ) : null}
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
          {/* </div> */}
        </div>
      </Modal>
    </>
  );
}

export default PersonalDetails;
