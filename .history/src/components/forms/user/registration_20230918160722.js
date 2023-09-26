import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import useValidation from "../../common/useValidation";

function Registration(props) {
  // USER CARRER PROFILE VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    companyname: "",
    designation: "",
    companylocation: "",
    industry: "",
    funarea: "",
    userdoj: "",
    userdol: "",
    worklevel: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    companyname: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Company name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    designation: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Designation is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    companylocation: [
      (value) =>
        value === "" || value.trim() === ""
          ? "location is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    industry: [(value) => (value ? null : "Industry is required")],
    funarea: [(value) => (value ? null : "Area is required")],
    userdoj: [
      (value) =>
        value === "" || value.trim() === "" ? "Start Date is required" : null,
    ],
    userdol: [(value) => (value === "" ? "End Date is required" : null)],
    worklevel: [
      (value) =>
        value === "" || value.trim() === "" ? "Work Level is required" : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );
  // USER CARRER PROFILE SUBMIT BUTTON
  const onCarrerProfileClick = (event) => {
    event.preventDefault();
    if (validate()) {
    }
  };
  // END USER CARRER PROFILE VALIDATION
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
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 px-11 pt-7">
          <form onSubmit={onCarrerProfileClick}>
            <h5 className="text-center pt-2 mb-7">Registration</h5>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Full_Name"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Full Name<span className="text-danger">*</span>:
                </label>
                <input
                  maxLength={20}
                  name="userfullname"
                  value={state.userfullname}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.userfullname
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Full Name"
                  id="userfullname"
                />
                {/*----ERROR MESSAGE FOR username----*/}
                {errors.userfullname && (
                  <span
                    key={errors.userfullname}
                    className="text-danger font-size-3"
                  >
                    {errors.userfullname}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="useremail"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Email Id <span className="text-danger">*</span>:
                </label>
                <input
                  maxLength={30}
                  type="email"
                  name="useremail"
                  value={state.useremail}
                  onChange={onInputChange}
                  className={
                    errors.useremail
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="useremail"
                  placeholder="email"
                />
                {/*----ERROR MESSAGE FOR EMAIL----*/}
                {errors.useremail && (
                  <span
                    key={errors.useremail}
                    className="text-danger font-size-3"
                  >
                    {errors.useremail}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Password"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Password <span className="text-danger">*</span>:
                </label>
                <input
                  name="userpassword"
                  value={state.userpassword}
                  onChange={onInputChange}
                  type="password"
                  className={
                    errors.userpassword
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="userpassword"
                  placeholder="Enter password"
                />
                {/*----ERROR MESSAGE FOR PASSWORD----*/}
                {errors.userpassword && (
                  <span
                    key={errors.userpassword}
                    className="text-danger font-size-3"
                  >
                    {errors.userpassword}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Mobile_Number"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Mobile Number<span className="text-danger">*</span> :
                </label>
                <input
                  type="number"
min={0}
                  placeholder="Mobile Number"
                  name="usermobileno"
                  value={state.usermobileno}
                  onChange={onInputChange}
                  className={
                    errors.usermobileno
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="usermobileno"
                />
                {/*----ERROR MESSAGE FOR MOBILENO----*/}
                {errors.usermobileno && (
                  <span
                    key={errors.usermobileno}
                    className="text-danger font-size-3"
                  >
                    {errors.usermobileno}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset "
                  htmlFor="experience"
                >
                  What is your experience level?
                  <span className="text-danger">*</span>
                </label>
                <div className="row font-size-3 mt-5">
                  <Link to={""}>
                    <span className="text-dark rounded-pill mb-1 border mx-2 p-3">
                      I have work experience
                    </span>
                  </Link>
                  <Link to={""}>
                    <span className="text-dark rounded-pill mb-1 border mx-2 p-3">
                      I am fresher
                    </span>
                  </Link>
                </div>
              </div>
              {/*----ERROR MESSAGE FOR EXPERIENCE----*/}
              {errors.experience && (
                <span
                  key={errors.experience}
                  className="text-danger font-size-3"
                >
                  {errors.experience}
                </span>
              )}
            </div>
            <div className="row">
              
              <div className="form-group col-md-6">
                <label
                  htmlFor="resume"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Resume <span className="text-danger">*</span>:
                </label>
                <input
                  type="file"
                  placeholder="Resume"
                  id="resume"
                  name="resume"
                  value={state.resume}
                  onChange={onInputChange}
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
              <div className="form-group col-md-6">
                <label
                  htmlFor="More_details"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  More detail can be add as input as per resume:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="More details"
                  id="More_details"
                />
              </div>
            </div>
            <div className="col-md-12">
              <input type="checkbox" id="tandr" className="text-black-2 pt-5" />
              <label
                htmlFor="tandr"
                className="font-size-3 
                line-height-reset text-black-2 mx-5 pt-3"
              >
                I agree to Terms And Conditions & Privacy Policy governing the
                use of Naukrigulf.com
              </label>
              {/*----ERROR MESSAGE FOR RESUME----*/}
              {errors.tandr && (
                <span key={errors.tandr} className="text-danger font-size-3">
                  {errors.tandr}
                </span>
              )}
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
          {/* </div> */}
        </div>
      </Modal>
    </>
  );
}

export default Registration;
