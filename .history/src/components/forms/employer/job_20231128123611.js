import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
// import { CKEditor } from "ckeditor4-react";
import useValidation from "../../common/useValidation";
import FilterJson from "./../../json/filterjson";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetJob, AddJob, getAllEmployer, GetFilter } from "../../../api/api";
import { useLocation } from "react-router-dom";
import states from "../../json/states";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
// import Select from "react-select";
function AddJobModal(props) {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  let token = localStorage.getItem("token");
  const company_id =
    props.jobdata === "0"
      ? ""
      : props.company_id
      ? props.company_id
      : localStorage.getItem("company_id");
  let location = useLocation();
  const user_type = localStorage.getItem("userType");
  let [Json, setJson] = useState([]);
  /*Function to get the jSon */
  const JsonData = async () => {
    try {
      let Json = await GetFilter();
      if (Json.data.message === "No data found") {
        setJson([]);
      } else {
        setJson(Json.data.data);
      }
      setJson(Json.data.data);
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
  // CKEDITOR
  // ClassicEditor.defaultConfig = {
  //   toolbar: {
  //     items: [
  //       "heading",
  //       "|",
  //       "bold",
  //       "italic",
  //       "|",
  //       "bulletedList",
  //       "numberedList",
  //       "|",
  //       "insertTable",
  //       "|",
  //       "undo",
  //       "redo",
  //     ],
  //   },
  //   table: {
  //     contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  //   },
  //   language: "en",
  // };
  // ADD JOBS VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    job_title: "",
    experience_required: "",
    salary: "",
    location: "",
    industry_type: "",
    apply_link: "",
    job_description: "",
    your_duties: "",
    requirement: "",
    department: "",
    job_type: "",
    role_category: "",
    education: "",
    language: "",
    keyskill: "",
    employement: "",
    job_category_id: "",
    is_featured: "",
    company_id: company_id ? company_id : "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    job_title: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Job Title is required"
          : value.length < 2
          ? "Job Title should have 2 or more letters"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Job Title can not have a number."
          : "",
    ],
    experience_required: [
      (value) => (value === "" ? "Experienceis required" : null),
    ],
    location: [
      (value) =>
        value === "" || value.trim() === "" ? "Location is required" : null,
    ],
    apply_link: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Apply link is required"
          : !/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)|([^\s@]+@[^\s@]+\.[^\s@]+)/gi.test(
              value
            )
          ? "Write the correct link or email"
          : value.length < 3
          ? "Apply link should have 3 or more letters"
          : null,
    ],
    job_type: [
      (value) =>
        value === "" || value.trim() === "" ? "Job Type is required" : null,
    ],
    role_category: [
      (value) =>
        value === "" || value.trim() === ""
          ? "No of vacancies is required"
          : null,
    ],
    job_category_id: [
      (value) =>
        value === "" || value.trim() === "" ? "Job category is required" : null,
    ],
    company_id: [(value) => (value === "" ? "Company is required" : null)],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setErrors, setState, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);
  // API CALL
  const JobData = async () => {
    try {
      let userData = await GetJob(props.jobdata);
      if (
        props.jobdata === undefined ||
        props.jobdata === "0" ||
        props.jobdata.length === 0 ||
        state === undefined ||
        userData.data.data.length === 0
      ) {
        setState(initialFormState);
      } else {
        setState(userData.data.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* Function to get Employer data*/
  const CompnayData = async () => {
    try {
      const userData = await getAllEmployer();
      if (userData.data.length === 0) {
        setCompany([]);
      } else {
        setCompany(userData.data);
        // if (Array.isArray(userData.data)) {
        //   console.log("object");
        //   const options = userData.data.map((option) => ({
        //     value: option.company_id,
        //     label: option.company_name,
        //   }));
        //   console.log(options);
        //   setCompany(options);
        // }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (user_type === "admin" && props.admin === "admin") {
      CompnayData();
    }
    if (token) {
      JsonData();
    }
    if (
      props.jobdata === "0" ||
      props.jobdata === undefined ||
      props.jobdata.length === 0 ||
      state === undefined
    ) {
      setState(initialFormState);
    } else {
      JobData();
    }
  }, [props]);
  // ADD JOBS SUBMIT BUTTON
  const onAddJobsClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        let responseData = await AddJob(state);
        if (responseData.message === "job data inserted successfully") {
          toast.success("Job Added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          if (props.job_page) {
            props.setDetailApiCall(true);
          }
          return close();
        }
        if (responseData.message === "Failed to insert job data") {
          toast.error("No Mangr found", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          if (props.job_page) {
            props.setDetailApiCall(true);
          }
          return close();
        }

        if (responseData.message === "job data updated successfully") {
          toast.success("Job Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          if (props.job_page) {
            props.setDetailApiCall(true);
          }
          return close();
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  // END ADD JOBS VALIDATION
  /*Company type array to filter*/
  const Company = company.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.company_name === thing.company_name)
  );
  /*Function to set data to the search job by country */
  // const onSelectChange = (option) => {
  //   setState({ ...state, company_id: option.value });
  //   console.log("option", option);
  // };
  return (
    <>
      <Modal
        show={props.show}
        size="xl"
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
        <div className="bg-white rounded h-100 px-md-11 px-6 pt-7 overflow-y-hidden">
          <form onSubmit={onAddJobsClick}>
            {props.jobdata === "0" || location.pathname === "/employer" ? (
              <h5 className="text-center pt-2 mb-7">Add Jobs</h5>
            ) : (
              <h5 className="text-center pt-2 mb-7">Update Jobs</h5>
            )}

            <div className="row ">
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="job_title"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Job Title:<span className="text-danger"> *</span>
                </label>
                <input
                  maxLength={300}
                  name="job_title"
                  value={state.job_title || ""}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.job_title
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Job Title"
                  id="job_title"
                />
                {/*----ERROR MESSAGE FOR job_title----*/}
                {errors.job_title && (
                  <span className="text-danger font-size-3">
                    {errors.job_title}
                  </span>
                )}
              </div>
              {user_type !== "admin" ||
              location.pathname === "/employer" ||
              location.pathname === "/dashboard" ? null : (
                <div className="form-group col-md-4 px-0 pr-3">
                  <label
                    htmlFor="job_category_id"
                    className="font-size-4 text-black-2  line-height-reset"
                  >
                    Company:<span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <select
                      name="company_id"
                      value={state.company_id || ""}
                      onChange={onInputChange}
                      className={
                        errors.company_id
                          ? "text-capitalize form-control border border-danger position-relative overflow-hidden"
                          : "text-capitalize form-control position-relative overflow-hidden"
                      }
                      placeholder="company name"
                      id="company_id"
                    >
                      <option value={""}>Select Company</option>
                      {(Company || []).map((com) =>
                        com.company_name === null ? null : (
                          <option key={com.company_id} value={com.company_id}>
                            {com.company_name}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  {/*----ERROR MESSAGE FOR COMPANY----*/}
                  {errors.company_id && (
                    <span
                      key={errors.company_id}
                      className="text-danger font-size-3"
                    >
                      {errors.company_id}
                    </span>
                  )}

                  {/* <div
                   className={"form-group col-md-4 d-flex"}
                   style={{ position: "relative" }}
                 >
                   <label
                     htmlFor="reffer_by"
                     className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                   >
                     Company:<span className="text-danger"> *</span>
                   </label>
                   <Select
                     options={"" || company}
                     name="company_id"
                     id="company_id"
                     onChange={onSelectChange}
                     className={
                       errors.company_id
                         ? "form-control border border-danger px-0 pt-4 "
                         : "form-control px-0 pt-4 border-0"
                     }
                   /> */}
                </div>
              )}
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="job_category_id"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Job Category:<span className="text-danger"> *</span>
                </label>
                <div className="position-relative">
                  <select
                    name="job_category_id"
                    value={state.job_category_id || ""}
                    onChange={onInputChange}
                    className={
                      errors.job_category_id
                        ? "text-capitalize form-control border border-danger position-relative overflow-hidden"
                        : "text-capitalize form-control position-relative overflow-hidden"
                    }
                    placeholder="Job category"
                    id="job_category_id"
                  >
                    <option value={""}>Select Category</option>
                    {(Json.Category || []).map((cat) =>
                      cat.value === null ? null : (
                        <option key={cat.id} value={cat.id}>
                          {cat.value}
                        </option>
                      )
                    )}
                  </select>
                </div>
                {/*----ERROR MESSAGE FOR job_category_id----*/}
                {errors.job_category_id && (
                  <span className="text-danger font-size-3">
                    {errors.job_category_id}
                  </span>
                )}
              </div>
              {/* <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="industry_type"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Industry Type:
                </label>
                <div className="position-relative">
                  <select
                    name="industry_type"
                    value={state.industry_type || ""}
                    onChange={onInputChange}
                    className={
                      errors.industry_type
                        ? "text-capitalize form-control border border-danger"
                        : "text-capitalize form-control"
                    }
                    id="industry_type"
                  >
                    <option value={""}>Select industry</option>
                    {(Json.Industry || []).map((industry) => (
                      <option key={industry.id} value={industry.value}>
                        {industry.value}
                      </option>
                    ))}
                  </select>
                  ----ERROR MESSAGE FOR industry_type----
                  {errors.industry_type && (
                    <span
                      key={errors.industry_type}
                      className="text-danger font-size-3"
                    >
                      {errors.industry_type}
                    </span>
                  )}
                </div>
              </div> */}
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="experience_required"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Experience Required:<span className="text-danger"> *</span>
                </label>
                <div className="position-relative">
                  <select
                    name="experience_required"
                    value={state.experience_required || ""}
                    onChange={onInputChange}
                    className={
                      errors.experience_required
                        ? "form-control text-capitalize border border-danger"
                        : "form-control text-capitalize"
                    }
                    placeholder="Experience"
                    id="experience_required"
                  >
                    <option value={""}>Select Experience</option>
                    {(FilterJson.experience || []).map((exp, i) => (
                      <option key={i} value={exp}>
                        {exp}
                        {exp === "fresher" || exp === "Other" ? "" : "Years"}
                      </option>
                    ))}
                  </select>
                  {/*----ERROR MESSAGE FOR experience_required----*/}
                  {errors.experience_required && (
                    <span
                      key={errors.experience_required}
                      className="text-danger font-size-3"
                    >
                      {errors.experience_required}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="salary"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Per hour wage ($CAD):
                </label>
                <input
                  maxLength={10}
                  name="salary"
                  value={state.salary || ""}
                  onChange={onInputChange}
                  type="number"
                  min={0}
                  className={
                    errors.salary
                      ? "form-control text-capitalize border border-danger"
                      : "form-control text-capitalize"
                  }
                  placeholder="$"
                  id="salary"
                />
                {/*----ERROR MESSAGE FOR salary----*/}
                {errors.salary && (
                  <span key={errors.salary} className="text-danger font-size-3">
                    {errors.salary}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="location"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  State:<span className="text-danger">*</span>
                </label>
                <select
                  name="location"
                  value={state.location || ""}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.location
                      ? "form-control text-capitalize border border-danger"
                      : "form-control text-capitalize"
                  }
                  placeholder="Location"
                  id="location"
                >
                  <option value={""}>Select State</option>
                  {(Object.keys(states) || []).map((state, i) => (
                    <option key={i} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {/* // *----ERROR MESSAGE FOR location---- */}
                {errors.location && (
                  <span
                    key={errors.location}
                    className="text-danger font-size-3"
                  >
                    {errors.location}
                  </span>
                )}
              </div>

              {state.location && (
                <div className="form-group col-md-4 px-0 pr-3">
                  <label
                    htmlFor="industry_type"
                    className="font-size-4 text-black-2  line-height-reset "
                  >
                    City:
                  </label>
                  <select
                    name="industry_type"
                    value={state.industry_type}
                    onChange={onInputChange}
                    type="text"
                    className="form-control text-capitalize"
                    placeholder="City"
                    id="industry_type"
                  >
                    <option value={""}>Select City</option>
                    {(states[state.location] || []).map((city, i) => (
                      <option key={i} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="job_description"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                  style={{ top: "-10px" }}
                >
                  Job Description:
                </label>
                <div>
                  <div
                    sm="12"
                    // className={
                    //   errors.job_description
                    //     ? "border border-danger rounded overflow-hidden"
                    //     : "border rounded overflow-hidden"
                    // }
                  >
                    {/* <CKEditor
                      type={"classic"}
                      name="job_description"
                      row={6}
                      id={"job_description"}
                      data={state.job_description}
                      value={state.job_description}
                   onChange={onInputChange}
                      initData="Job Description"
                    /> */}
                    {/* <textarea
                      maxLength={5000}
                      placeholder="Job Description"
                      name="job_description"
                      value={state.job_description || ""}
                      onChange={onInputChange}
                      className={
                        errors.job_description
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="job_description"
                    ></textarea> */}
                    <FroalaEditor
                      model={state.job_description}
                      onModelChange={(newContent) =>
                        setState({ ...state, job_description: newContent })
                      }
                      className={
                        errors.job_description
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                    />
                  </div>
                  {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                  {errors.job_description && (
                    <span
                      key={errors.job_description}
                      className="text-danger font-size-3"
                    >
                      {errors.job_description}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="your_duties"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  Full Address :
                </label>
                <div className="position-relative">
                  <div
                    sm="6"
                    className={
                      errors.your_duties
                        ? "border border-danger rounded overflow-hidden"
                        : "border rounded overflow-hidden"
                    }
                  >
                    {/* //    <CKEditor
                  //     type={"classic"}
                  //     name="your_duties"
                  //     id={"your_duties"}
                  //     data={state.your_duties}
                  //     value={state.your_duties}
                  //  onChange={onInputChange}
                  //     initData="your duties"
                  //   />  */}
                    <textarea
                      maxLength={5000}
                      placeholder="Full Address"
                      name="your_duties"
                      value={state.your_duties || ""}
                      onChange={onInputChange}
                      className={
                        errors.your_duties
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="your_duties"
                    ></textarea>
                  </div>
                  {/* //----ERROR MESSAGE FOR DESRIPTION----* */}
                  {errors.your_duties && (
                    <span
                      key={errors.your_duties}
                      className="text-danger font-size-3"
                    >
                      {errors.your_duties}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="requirement"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  Requirement:
                </label>
                <div className="position-relative">
                  <div
                    sm="6"
                    className={
                      errors.requirement
                        ? "border border-danger rounded overflow-hidden"
                        : "border rounded overflow-hidden"
                    }
                  >
                    {/* <CKEditor
                      type={"classic"}
                      name="requirement"
                      id={"requirement"}
                      data={state.requirement}
                      value={state.requirement}
                      onChange={onInputChange}
                      initData="Add Requirement"
                    /> */}
                    <textarea
                      maxLength={5000}
                      placeholder="Requirements"
                      name="requirement"
                      value={state.requirement || ""}
                      onChange={onInputChange}
                      className={
                        errors.requirement
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="requirement"
                    ></textarea>
                  </div>
                  {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                  {errors.requirement && (
                    <span
                      key={errors.requirement}
                      className="text-danger font-size-3"
                    >
                      {errors.requirement}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="apply_link"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Apply Link / Email:<span className="text-danger"> *</span>
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    maxLength={60}
                    name="apply_link"
                    value={state.apply_link || ""}
                    onChange={onInputChange}
                    className={
                      errors.apply_link
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Apply link"
                    id="apply_link"
                  />
                  {/*----ERROR MESSAGE FOR apply_link----*/}
                  {errors.apply_link && (
                    <span
                      key={errors.apply_link}
                      className="text-danger font-size-3"
                    >
                      {errors.apply_link}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="role_category"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  No. Of Vacancies:<span className="text-danger">*</span>
                </label>

                <div className="position-relative">
                  <input
                    type="number"
                    min={0}
                    name="role_category"
                    value={state.role_category || ""}
                    onChange={onInputChange}
                    className={
                      errors.role_category
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Vacancies"
                    id="role_category"
                  />
                  {/*----ERROR MESSAGE FOR role_category----*/}
                  {errors.role_category && (
                    <span
                      key={errors.role_category}
                      className="text-danger font-size-3"
                    >
                      {errors.role_category}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="department"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  NOC Code:
                </label>
                <div className="position-relative">
                  <input
                    type="number"
                    maxLength={20}
                    name="department"
                    value={state.department || ""}
                    onChange={onInputChange}
                    className={
                      errors.department
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="NOC Code"
                    id="department"
                    min={0}
                  />
                  {/*----ERROR MESSAGE FOR department----*/}
                  {errors.department && (
                    <span
                      key={errors.department}
                      className="text-danger font-size-3"
                    >
                      {errors.department}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="job_type"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Job Type:<span className="text-danger"> *</span>
                </label>
                <div className={" position-relative"}>
                  <select
                    placeholder="Apply job_type"
                    id="job_type"
                    name="job_type"
                    value={state.job_type || ""}
                    onChange={onInputChange}
                    className={
                      errors.job_type
                        ? "text-capitalize form-control border border-danger position-relative overflow-hidden"
                        : "text-capitalize form-control position-relative overflow-hidden"
                    }
                  >
                    <option value={""}>Select Job Type</option>
                    {(FilterJson.job_type || []).map((job_type) => (
                      <option key={job_type} value={job_type}>
                        {job_type}
                      </option>
                    ))}
                  </select>
                </div>
                {/*----ERROR MESSAGE FOR job_type----*/}
                {errors.job_type && (
                  <span
                    key={errors.job_type}
                    className="text-danger font-size-3"
                  >
                    {errors.job_type}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="education"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Education:
                </label>
                <div className="position-relative">
                  <select
                    name="education"
                    value={state.education || ""}
                    onChange={onInputChange}
                    className={
                      errors.education
                        ? "text-capitalize form-control border border-danger position-relative overflow-hidden"
                        : "text-capitalize form-control position-relative overflow-hidden"
                    }
                    placeholder="Apply education"
                    id="education"
                  >
                    <option value={""}>Select Education</option>
                    {(Json.Education || []).map((education) => (
                      <option key={education.id} value={education.value}>
                        {education.value}
                      </option>
                    ))}
                  </select>
                </div>
                {/*----ERROR MESSAGE FOR job_type----*/}
                {errors.Education && (
                  <span
                    key={errors.Education}
                    className="text-danger font-size-3"
                  >
                    {errors.Education}
                  </span>
                )}
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="language"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Language:
                </label>
                <div className="position-relative">
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
                    <option value={""}>Select Language</option>
                    {(Json.Language || []).map((Language) => (
                      <option key={Language.id} value={Language.value}>
                        {Language.value}
                      </option>
                    ))}
                  </select>
                  {/*----ERROR MESSAGE FOR language----*/}
                  {errors.language && (
                    <span
                      key={errors.language}
                      className="text-danger font-size-3"
                    >
                      {errors.language}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="keyskill"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Key Skill:
                </label>
                <div className="position-relative">
                  <select
                    name="keyskill"
                    value={state.keyskill || ""}
                    onChange={onInputChange}
                    className={
                      errors.keyskill
                        ? "text-capitalize form-control border border-danger"
                        : "text-capitalize form-control"
                    }
                    id="keyskill"
                  >
                    <option value={""}>Select Skill</option>
                    {(Json.Skill || []).map((data) => (
                      <option key={data.id} value={data.value}>
                        {data.value}
                      </option>
                    ))}
                  </select>
                  {/*----ERROR MESSAGE FOR keyskill----*/}
                  {errors.keyskill && (
                    <span
                      key={errors.keyskill}
                      className="text-danger font-size-3"
                    >
                      {errors.keyskill}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-4 px-0 pr-3">
                <label
                  htmlFor="employement"
                  className="font-size-4 text-black-2  line-height-reset"
                >
                  Employment:
                </label>
                <div className="position-relative">
                  <select
                    name="employement"
                    value={state.employement || ""}
                    onChange={onInputChange}
                    className={
                      errors.employement
                        ? "text-capitalize form-control border border-danger position-relative overflow-hidden"
                        : "text-capitalize form-control position-relative overflow-hidden"
                    }
                    placeholder="Apply Employment"
                    id="employement"
                  >
                    <option value={""}>Select Employment</option>
                    {(FilterJson.employement || []).map((employement, i) => (
                      <option key={i} value={employement}>
                        {employement}
                      </option>
                    ))}
                  </select>
                </div>
                {/*----ERROR MESSAGE FOR employement----*/}
                {errors.employement && (
                  <span
                    key={errors.employement}
                    className="text-danger font-size-3"
                  >
                    {errors.employement}
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
                <button className="btn btn-primary btn-small w-25 rounded-5 text-uppercase">
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

export default AddJobModal;
