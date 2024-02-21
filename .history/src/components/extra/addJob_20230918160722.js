import React from "react";
import { Modal } from "react-bootstrap";
import { CKEditor } from "ckeditor4-react";

function AddJobsModal(props) {
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
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
          data-dismiss="modal"
          onClick={props.close}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
          <form>
            <h5 className="text-center pt-2">Add Jobs</h5>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Job_title"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Job title :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Job title Name"
                  id="Job_title"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Experience_required"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Experience required :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Experience required"
                  id="Experience_required"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Salary"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Salary :
                </label>
                <input
                  type="number"
min={0}
                  className="form-control"
                  placeholder="Salary "
                  id="Salary"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Location"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Location:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  id="Location"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Job_Highlights"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Job Highlights :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="Job_Highlights"
                    placeholder=" Job Highlights "
                  />
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Apply_Link"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Apply Link :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="Apply_Link"
                    placeholder=" Apply Link "
                  />
                </div>
              </div>
            </div>
            <h4 className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
              Your Job Match Score :
            </h4>
            <div className="row d-flex">
              <div className="form-group col-3">
                <input
                  type="checkbox"
                  id="Early_Applicant"
                  placeholder=" Early Applicant "
                />
                <label
                  htmlFor="Early_Applicant"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset mx-2"
                >
                  Early Applicant
                </label>
              </div>
              <div className="form-group col-3">
                <input
                  type="checkbox"
                  id="Keyskills"
                  placeholder=" Keyskillse "
                />
                <label
                  htmlFor="Keyskills"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset mx-2"
                >
                  Keyskillse
                </label>
              </div>
              <div className="form-group col-3">
                <input type="checkbox" id="Location" placeholder=" Location " />
                <label
                  htmlFor="Location"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset mx-2"
                >
                  Location
                </label>
              </div>
              <div className="form-group col-3">
                <input
                  type="checkbox"
                  id="Work_Experienc"
                  placeholder=" Work Experienc "
                />
                <label
                  htmlFor="Work_Experienc"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset mx-2"
                >
                  Work Experienc
                </label>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="YOUR_DUTIES"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  YOUR DUTIES :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="YOUR_DUTIES"
                    placeholder=" YOUR DUTIES "
                  />
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Role_Back_End_Developer"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Role Back End Developer :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="Role_Back_End_Developer"
                    placeholder=" Role Back End Developer "
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Industry_type"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Industry Type :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="Industry_type"
                    placeholder=" Industry Type "
                  />
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Department"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Department :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="Department"
                    placeholder=" Department "
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Role_Category"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Role Category :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="Role_Category"
                    placeholder=" Role Category "
                  />
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Education"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Education :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="Education"
                    placeholder=" Education "
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="ug"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  UG :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="ug"
                    placeholder="UG "
                  />
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Key_skills"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Key skills :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="Key_skills"
                    placeholder=" Key skills "
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="About_Company"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  About Company :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="About_Company"
                    placeholder="About Company "
                  />
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="company_info"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company Info :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="company_info"
                    placeholder=" Key skills "
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-group col">
                <label
                  htmlFor="job_description"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Job description :
                </label>
                <div className="position-relative">
                  <div sm="12" className="mt-3">
                    <CKEditor
                      // data={emailText}
                      // initData={emailText}
                      type={"classic"}
                      name={"email_text"}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group mb-8">
              <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase">
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

export default AddJobsModal;
