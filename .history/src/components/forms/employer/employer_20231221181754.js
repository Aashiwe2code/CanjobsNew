import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";

function AddEmployer(props) {
  // USER EMPLOYER VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    companyname: "",
    vacancies: "",
    location: "",
    infostatus: "",
    contactpersonname: "",
    contactpersonnumber: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    companyname: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Company name is required"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            null,
    ],
    vacancies: [
      (value) =>
        value === "" || value.trim() === ""
          ? "No of vacancies is required"
          : null,
    ],
    location: [
      (value) =>
        value === "" || value.trim() === ""
          ? "location is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    infostatus: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Information status Type is required"
          : null,
    ],
    contactpersonname: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Contact person's name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    contactpersonnumber: [
      (value) =>
        value === "" || value.trim() === ""
          ? "MobileNo. is required"
          : value.length !== 13
          ? "Mobile no should be of 13 digits"
          : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );
  // USER EMPLOYER SUBMIT BUTTON
  const onUserEmployerClick = (event) => {
    event.preventDefault();
    if (validate()) {
    } else {
    }
  };
  // END USER PERSONAL DETAIL VALIDATION

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
          onClick={props.close}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white rounded h-100 px-11 pt-7">
          <form onSubmit={onUserEmployerClick}>
            <h5 className="text-center pt-2 mb-7">Add Employer</h5>
            <div className="row ">
              <div className="form-group col-md-6">
                <label
                  htmlFor="companyname"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Company Name<span className="text-danger">*</span>:
                </label>
                <input
                  type="text"
                  className={
                    errors.companyname
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  value={state.companyname}
                  onChange={onInputChange}
                  name="companyname"
                  id="companyname"
                  placeholder="Company Name"
                  maxLength={60}
                />
                {/*----ERROR MESSAGE FOR COMPANY NAME----*/}
                {errors.companyname && (
                  <span
                    key={errors.companyname}
                    className="text-danger font-size-3"
                  >
                    {errors.companyname}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="vacancies"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  No. Of Vacancies <span className="text-danger">*</span> :
                </label>
                <input
                  type="number"
                  min={0}
                  className={
                    errors.vacancies
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="vacancy"
                  id="vacancies"
                  name="vacancies"
                  value={state.vacancies}
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR VACANCIES----*/}
                {errors.vacancies && (
                  <span
                    key={errors.vacancies}
                    className="text-danger font-size-3"
                  >
                    {errors.vacancies}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="location"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Location <span className="text-danger">*</span>:
                </label>
                <input
                  type="text"
                  className={
                    errors.location
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  value={state.location}
                  onChange={onInputChange}
                  placeholder="Location"
                  id="location"
                  name="location"
                  maxLength={60}
                />
                {errors.location && (
                  <span
                    key={errors.location}
                    className="text-danger font-size-3"
                  >
                    {errors.location}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="infostatus"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Information Status <span className="text-danger">*</span>:
                </label>
                <select
                  className={
                    errors.infostatus
                      ? "text-capitalize form-control border border-danger"
                      : "text-capitalize form-control"
                  }
                  value={state.infostatus}
                  onChange={onInputChange}
                  id="infostatus"
                  name="infostatus"
                >
                  <option value={""}>Select status</option>
                  <option value={"complete"}>Complete</option>
                  <option value={"incomplete"}>Incomplete</option>
                </select>
                {errors.infostatus && (
                  <span
                    key={errors.infostatus}
                    className="text-danger font-size-3"
                  >
                    {errors.infostatus}
                  </span>
                )}
              </div>
            </div>
            <h5> Contact Person</h5>
            <div className="row pt-5">
              <div className="form-group col-md-6">
                <label
                  htmlFor="contactpersonname"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Name<span className="text-danger">*</span> :
                </label>
                <input
                  type="text"
                  className={
                    errors.contactpersonname
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  value={state.contactpersonname}
                  onChange={onInputChange}
                  placeholder="Name"
                  id="contactpersonname"
                  name="contactpersonname"
                  maxLength={60}
                />
                {errors.contactpersonname && (
                  <span
                    key={errors.contactpersonname}
                    className="text-danger font-size-3"
                  >
                    {errors.contactpersonname}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="contactpersonnumber"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Number<span className="text-danger">*</span> :
                </label>
                <input
                  type="number"
                  min={0}
                  maxLength={13}
                  className={
                    errors.contactpersonnumber
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  value={state.contactpersonnumber}
                  onChange={onInputChange}
                  placeholder="Contact number"
                  id="contactpersonnumber"
                  name="contactpersonnumber"
                />
                {errors.contactpersonnumber && (
                  <span
                    key={errors.contactpersonnumber}
                    className="text-danger font-size-3"
                  >
                    {errors.contactpersonnumber}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group text-center">
              <button
                className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default AddEmployer;
