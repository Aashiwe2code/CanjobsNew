import moment from "moment";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import {
  EmployeeDetails,
  AddEmployeement,
  DeleteEmployeeCareer,
  GetFilter,
} from "../../../api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import SAlert from "../../common/sweetAlert";

function EmployementDetails(props) {
  /*Data state */
  let [apiCall, setApiCall] = useState(false);
  let [employementData, setEmployementData] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  const [loading, setLoading] = useState(false);
  let [IndustryList, setIndustryList] = useState([]);

  /*Function to get the jSon */
  const JsonData = async () => {
    try {
      let Json = await GetFilter();
      if (Json.data.message === "No data found") {
        setIndustryList([]);
      } else {
        setIndustryList(Json.data.data.Industry);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormState);
    setErrors("");
    setLoading(false);
    props.close();
  };

  // USER CARRER PROFILE VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    company: "",
    designation: "",
    company_location: "",
    industry: "",
    functional_area: "",
    start_date: "",
    end_date: "",
    work_level: "",
    currently_work_here: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    company: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Company name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : // : /[-]?\d+(\.\d+)?/.test(value)
          // ? "Company name can not have a number."
          value.length < 2
          ? "Company name should have 2 or more letters"
          : "",
    ],
    designation: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Designation is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Designation can not have a number."
          : value.length < 2
          ? "Designation should have 2 or more letters"
          : "",
    ],
    // company_location: [
    //   (value) =>
    //     value === "" || value.trim() === ""
    //       ? "location is required"
    //       : /[^A-Za-z 0-9]/g.test(value)
    //       ? "Cannot use special character "
    //       : /[-]?\d+(\.\d+)?/.test(value)
    //       ? "location can not have a number."
    //       : value.length < 2
    //       ? "location should have 2 or more letters"
    //       : "",
    // ],
    // industry: [(value) => (value ? null : "Industry is required")],
    // functional_area: [(value) => (value ? null : "Area is required")],
    start_date: [
      (value) =>
        value === "" || value.trim() === "" ? "Start Date is required" : null,
    ],
    end_date: [
      (value) =>
        state.currently_work_here === 1 || state.currently_work_here === "1"
          ? null
          : (state.currently_work_here === 0 &&
              (value === "" || value === null)) ||
            (state.currently_work_here === "0" &&
              (value === "" || value === null)) ||
            value === "" ||
            value === null ||
            value === undefined
          ? "End Date is required"
          : null,
    ],
    // work_level: [
    //   (value) =>
    //     value === "" || value.trim() === "" ? "Work Level is required" : null,
    // ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, setErrors, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);
  // API CALL
  const EmployeementData = async (data) => {
    try {
      let Employment = await EmployeeDetails(props.employeeId);
      // setEmployementData(Employment.data.career);
      if (Employment.data.career.length === 0) {
        setEmployementData([]);
      } else {
        setEmployementData(Employment.data.career);
      }
      if (data !== undefined || data) {
        setState(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (props.employeeId === undefined || deleteAlert === true) {
      setState(initialFormState);
    } else {
      EmployeementData();
    }
    JsonData();
    if (apiCall === true) {
      setApiCall(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, apiCall]);

  // USER CARRER PROFILE SUBMIT BUTTON
  const onCarrerProfileClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        let responseData = await AddEmployeement(state, props.employeeId);
        if (responseData.message === "Employee data inserted successfully") {
          toast.success("Career Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          setApiCall(true);
          setState(initialFormState);
          setErrors("");
          setLoading(false);
        }
        if (responseData.message === "Employee data updated successfully") {
          toast.success("Career Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          setApiCall(true);
          setState(initialFormState);
          setErrors("");
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
  // END USER CARRER PROFILE VALIDATION
  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.career_id);
    setDeleteName(e.designation);
    setDeleteAlert(true);
  };
  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };
  /*To call Api to delete Skill */
  async function deleteEducation(e) {
    try {
      const responseData = await DeleteEmployeeCareer(e);
      if (responseData.message === "career details has been deleted") {
        toast.error("Career deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        props.setApiCall(true);
        setApiCall(true);
        setDeleteAlert(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
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
          <form onSubmit={onCarrerProfileClick}>
            <h5 className="text-center pt-2 mb-7">Add Employment</h5>
            {(employementData || []).map((CareerDetails) => (
              <div
                className="w-100 border mb-3 rounded-5 text-capitalize"
                key={CareerDetails.career_id}
              >
                <div className="d-flex align-items-center pr-11 mb-1 flex-wrap flex-sm-nowrap justify-content-md-between p-2">
                  <div className="media align-items-center company_box col-md-6 p-0">
                    <div className="text_box text-left w-100 mt-n2">
                      <h3 className="mb-0">
                        <div className="font-size-6 text-black-2 font-weight-semibold">
                          {CareerDetails.designation} -
                          <span className="font-size-4">
                            {CareerDetails.functional_area}
                          </span>
                        </div>
                      </h3>
                      <span className="font-size-4 text-default-color line-height-2">
                        {CareerDetails.company}{" "}
                        {CareerDetails.industry
                          ? `(${CareerDetails.industry})`
                          : null}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-right flex-wrap text-right">
                    <span className="font-size-4 text-gray w-100">
                      {moment(CareerDetails.start_date).format("DD-MM-YYYY")} -
                      {CareerDetails.currently_work_here === ("1" || 1)
                        ? "Currently working"
                        : moment(CareerDetails.end_date).format("DD-MM-YYYY")}
                    </span>
                    <span
                      className={`${
                        CareerDetails.company_location === null ? "d-none" : ""
                      } font-size-3 text-gray w-100`}
                    >
                      <span className="mr-4" style={{ marginTop: "-2px" }}>
                        <img
                          src="image/svg/icon-loaction-pin-black.svg"
                          alt=""
                        />
                      </span>
                      {CareerDetails.company_location}
                    </span>
                  </div>
                  <Link to="" onClick={() => ShowDeleteAlert(CareerDetails)}>
                    <i className="fa fa-times-circle" aria-hidden="true"></i>
                  </Link>
                  <Link to="" onClick={() => EmployeementData(CareerDetails)}>
                    <i className="fa fa-edit text-gray" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            ))}
            <div className="row pt-5">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Company"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company: <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={30}
                  type="text"
                  placeholder="Tell us your company name"
                  name="company"
                  value={state.company || ""}
                  onChange={onInputChange}
                  className={
                    errors.company
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="company"
                />
                {/*----ERROR MESSAGE FOR NAME----*/}
                {errors.company && (
                  <span
                    key={errors.company}
                    className="text-danger font-size-3"
                  >
                    {errors.company}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="designation"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Designation: <span className="text-danger">*</span>
                </label>
                <input
                  maxLength={30}
                  type="text"
                  placeholder="Tell us your designation / job role"
                  name="designation"
                  value={state.designation || ""}
                  onChange={onInputChange}
                  className={
                    errors.designation
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="designation"
                />
                {/*----ERROR MESSAGE FOR DESIGNATION----*/}
                {errors.designation && (
                  <span
                    key={errors.designation}
                    className="text-danger font-size-3"
                  >
                    {errors.designation}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="company_location"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company location:
                </label>
                <input
                  type="text"
                  maxLength={30}
                  placeholder="Tell us your employer location"
                  name="company_location"
                  value={state.company_location || ""}
                  onChange={onInputChange}
                  className={
                    errors.company_location
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="company_location"
                />
                {/*----ERROR MESSAGE FOR LOCATION----*/}
                {errors.company_location && (
                  <span
                    key={errors.company_location}
                    className="text-danger font-size-3"
                  >
                    {errors.company_location}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="industry"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Industry:
                </label>
                <div className="position-relative">
                  <select
                    name="industry"
                    value={state.industry || ""}
                    onChange={onInputChange}
                    className={
                      errors.industry
                        ? "text-capitalize form-control border border-danger"
                        : "form-control text-capitalize"
                    }
                    id="industry"
                  >
                    <option value={""}>Industry user company belongs to</option>
                    {(IndustryList || []).map((course) => (
                      <option value={course.value} key={course.id}>
                        {course.value}
                      </option>
                    ))}
                  </select>
                  {/*----ERROR MESSAGE FOR INDUSTRY----*/}
                  {errors.industry && (
                    <span
                      key={errors.industry}
                      className="text-danger font-size-3"
                    >
                      {errors.industry}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                  htmlFor="functional_area"
                >
                  Functional Area:
                </label>
                <div className="position-relative">
                  <input
                    name="functional_area"
                    value={state.functional_area || ""}
                    onChange={onInputChange}
                    className={
                      errors.functional_area
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    id="functional_area"
                    placeholder="Area"
                  />
                  {/*----ERROR MESSAGE FOR AREA----*/}
                  {errors.functional_area && (
                    <span
                      key={errors.functional_area}
                      className="text-danger font-size-3"
                    >
                      {errors.functional_area}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                  htmlFor="work_level"
                >
                  Work level:
                </label>
                <input
                  name="work_level"
                  value={state.work_level || ""}
                  onChange={onInputChange}
                  className={
                    errors.work_level
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="work_level"
                  placeholder="Work Level"
                />

                {/*----ERROR MESSAGE FOR LEVEL----*/}
                {errors.work_level && (
                  <span
                    key={errors.work_level}
                    className="text-danger font-size-3"
                  >
                    {errors.work_level}
                  </span>
                )}
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="start_date"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Start Date: <span className="text-danger">*</span>
                </label>
                <input
                  max={moment().format("DD-MM-YYYY")}
                  type="date"
                  placeholder="Date Of Joining "
                  name="start_date"
                  value={state.start_date || ""}
                  onChange={onInputChange}
                  onKeyDownCapture={(e) => e.preventDefault()}
                  className={
                    errors.start_date
                      ? "form-control coustam_datepicker border border-danger"
                      : "form-control coustam_datepicker"
                  }
                  id="start_date"
                />
                {/*----ERROR MESSAGE FOR START DATE----*/}
                {errors.start_date && (
                  <span
                    key={errors.start_date}
                    className="text-danger font-size-3"
                  >
                    {errors.start_date}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="end_date"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  End Date:{" "}
                  {state.currently_work_here ? null : (
                    <span className="text-danger">*</span>
                  )}
                </label>
                <input
                  min={state.start_date}
                  type="date"
                  placeholder="Date Of Leaving "
                  name="end_date"
                  max={moment().date(new Date())}
                  disabled={
                    state.currently_work_here === 1 ||
                    state.currently_work_here === "1"
                  }
                  value={state.end_date || ""}
                  onChange={onInputChange}
                  nKeyDownCapture={(e) => e.preventDefault()}
                  className={
                    errors.end_date
                      ? "form-control coustam_datepicker border border-danger"
                      : "form-control coustam_datepicker"
                  }
                  id="end_date"
                />
                {/*----ERROR MESSAGE FOR ENDDATE----*/}
                {errors.end_date && (
                  <span
                    key={errors.end_date}
                    className="text-danger font-size-3"
                  >
                    {errors.end_date}
                  </span>
                )}
              </div>
              <div className="col-md-6 my-auto ">
                <input
                  type="checkbox"
                  name="currently_work_here"
                  checked={state.currently_work_here === "1"}
                  onChange={(e) =>
                    setState({
                      ...state,
                      currently_work_here:
                        state.currently_work_here === "" ||
                        state.currently_work_here === "0"
                          ? "1"
                          : "0",
                    })
                  }
                  id="currently_work_here"
                />
                <label
                  htmlFor="currently_work_here"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset mx-4"
                >
                  I Currently work here
                </label>
                {/*----ERROR MESSAGE FOR ENDDATE----*/}
                {/* {errors.currently_work_here && (
                  <span
                    key={errors.currently_work_here}
                    className="text-danger font-size-3"
                  ></span>
                )} */}
              </div>
            </div>
            <SAlert
              show={deleteAlert}
              title={deleteName}
              text="Are you Sure you want to delete !"
              onConfirm={() => deleteEducation(deleteId)}
              showCancelButton={true}
              onCancel={CancelDelete}
            />
            <div className="form-group text-center d-flex justify-content-center">
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
              <button
                type="button"
                className="btn btn-primary mx-5"
                data-dismiss="modal"
                onClick={close}
              >
                Close
              </button>
            </div>
          </form>
          {/* </div> */}
        </div>
      </Modal>
    </>
  );
}

export default EmployementDetails;
