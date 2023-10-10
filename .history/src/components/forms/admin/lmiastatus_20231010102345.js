import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import {
  AddLimia,
  AddJob,
  AddUpdateEmployeeLmiaSubStage,
  GetLimaSubStages,
  AddUpdateJobLmiaSubStage,
  GetJobLimaSubStages,
  deleteLmiaSubstageJob,
  deleteLmiaSubstageEmployee,
} from "../../../api//api";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import FilterJson from "../../json/filterjson";
import LmiaTime from "../../common/lmiaTime";
import LmiaSubStageSelector from "../../common/lmiaSubStage";
function LmiaStatus(props) {
  let [loading, setLoading] = useState(false);
  let [apiCall, setApiCall] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [expandedStatus, setExpandedStatus] = useState(
    props.resData.lmia_status
  );
  let employeeId =
    props.resData === undefined ? null : props.resData.employee_id;
  let lmia_status = props.resData.lmia_status;
  // let completion_time = props.resData.expected_time_of_completion
  let location = useLocation();
  let jobId = props.resData.job_id;
  // const [company] = useState([]);
  // eslint-disable-next-line
  let isExpanded = false;

  /*Function to get lima sub stage */
  const GetSubSTage = async () => {
    // console.log(props.resData)
    try {
      let Response;
      if (props.job === "yes") {
        Response = await GetJobLimaSubStages(jobId, lmia_status);
      } else {
        Response = await GetLimaSubStages(props.resData.id);
      }
      if (Response.data.data) {
        setSelectedStatus(Response.data.data);
      } else setSelectedStatus([]);
      // console.log(Response)
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle checkbox selection
  const handleSubStageSelection = async (status, subStage) => {
    const isSelected = selectedStatus.some(
      (item) => item.lmia_status === status && item.lmia_substage === subStage
    );
    let data;
    /*Condition to check the selected substages */
    if (isSelected) {
      setSelectedStatus(
        selectedStatus.filter(
          (item) =>
            !(item.lmia_status === status && item.lmia_substage === subStage)
        )
      );
      let id = selectedStatus.filter(
        (item) => item.lmia_status === status && item.lmia_substage === subStage
      )[0].id;
      if (props.job === "yes") {
        /*Job lima sub stages */
        let DeleteRes = await deleteLmiaSubstageJob(id);
        if (DeleteRes.message === "successfully deleted") {
          toast.success("Lmia Sub Stage Removed successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setApiCall(true);
          props.setApiCall(true);
        }
      } else {
        /*employee lima sub stages */
        let DeleteRes = await deleteLmiaSubstageEmployee(id);
        if (DeleteRes.message === "successfully deleted") {
          toast.success("Lmia Sub Stage Removed successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setApiCall(true);
          props.setApiCall(true);
        }
      }
    } else {
      setSelectedStatus([
        ...selectedStatus,
        { status: status, subStage: subStage },
      ]);
      if (props.job === "yes") {
        /*Job lima sub stages */
        data = {
          job_id: jobId,
          lmia_substage: subStage,
          lmia_status: status,
        };
      } else {
        /*Employee lima sub stages */
        data = {
          lmia_id: props.resData.id,
          lmia_substage: subStage,
          lmia_status: status,
        };
      }
    }
    try {
      let Response;
      /*APi called */
      if (props.job === "yes") {
        Response = await AddUpdateJobLmiaSubStage(data);
      } else {
        Response = await AddUpdateEmployeeLmiaSubStage(data);
      }
      /*Added sub stage response */
      if (
        Response.message === "insert successfully" ||
        Response.message === "updated successfully"
      ) {
        toast.success("Lmia Sub Stage Added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        props.setApiCall(true);
        if (props.page === "userprofile") {
          props.statusCall(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  // console.log("Sub Stages =>", selectedStatus)
  /* Functionality to close the modal */
  const close = () => {
    setState({ ...state, lmia_status: "" });
    setErrors("");
    setLoading(false);
    props.close();
  };
  // USER LIMIA UPDATE VALIDATION
  useEffect(() => {
    GetSubSTage();
    setState({
      ...state,
      lmia_status: lmia_status /*, completion_time: completion_time*/,
    });
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [apiCall, lmia_status]);

  useEffect(() => {}, []);
  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    lmia_status: "",
    apply_id: props.resData.apply_id,
    // completion_time: "",
  };
  console.log(props.resData.apply_id);
  // VALIDATION CONDITIONS
  const validators = {
    lmia_status: [
      (value) =>
        value === "" || value === null ? "Lmia status is required" : "",
    ],
    // completion_time: [
    //   (value) =>
    //     value === "" || value === null
    //       ? "Expected time of completion is required"
    //       : "",
    // ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, setErrors, /*onInputChange,*/ errors, validate } =
    useValidation(initialFormState, validators);

  // USER LIMIA UPDATE FILTER SUBMIT BUTTON
  const onLmiaUpdateClick = async (event) => {
    event.preventDefault();
    if (validate() && props.job === "yes") {
      let data = {
        // completion_time: state.completion_time,
        lmia_status: state.lmia_status,
        job_id: jobId,
      };
      try {
        let responseData = await AddJob(data);
        if (responseData.message === "job data updated successfully") {
          toast.success("Lmia Status Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          close();
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (validate()) {
      setLoading(true);
      try {
        const responseData = await AddLimia(state, employeeId, jobId);
        if (responseData.message === "Data added successfully") {
          toast.success("Lmia Status Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          close();
        }
        if (responseData.message === "Data updated successfully") {
          toast.success("Lmia Status Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          if (props.page === "userprofile") {
            props.statusCall(true);
          }
          close();
        }
        if (
          responseData.message ===
          "Please provide different status, already exist"
        ) {
          toast.error("Lmia already exist", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          close();
          props.setApiCall(true);
          if (props.page === "userprofile") {
            props.statusCall(true);
          }
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  // END LIMIA VALIDATION

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
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
          <h5 className="text-center pt-2 mb-7">LMIA status</h5>
          <LmiaTime
            lmia={state.lmia_status}
            job={props.job}
            location={location.pathname}
          />
          <form onSubmit={onLmiaUpdateClick}>
            {expandedStatus && (
              // <div className='bg-white text-dark p-2 sub-stages-container row'>
              //   {(FilterJson.lima_sub_stages[expandedStatus] || []).map((subStage, j) => (
              //     <div
              //       key={j}
              //       className={`sub-stage col-6 text-capitalize ${(selectedStatus || []).some(
              //         (item) =>
              //           item.lmia_substage === subStage
              //       )
              //         ? 'selected'
              //         : ''
              //         }`}
              //       onClick={() =>
              //         handleSubStageSelection(expandedStatus, subStage)
              //       }
              //     >

              //       <input
              //         type="checkbox"
              //         className='mx-2'
              //         checked={(selectedStatus || []).some(
              //           (item) =>
              //             // item.lmia_status === expandedStatus &&
              //             item.lmia_substage === subStage
              //         )}
              //         readOnly
              //       />{subStage}
              //     </div>
              //   ))}
              // </div>
              <LmiaSubStageSelector
                expandedStatus={expandedStatus}
                selectedStatus={selectedStatus}
                FilterJson={FilterJson}
                handleSubStageSelection={handleSubStageSelection}
              />
            )}
            <div className="form-group mt-5">
              <label
                htmlFor="lmia_status"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Lmia status <span className="text-danger">*</span>:
              </label>
              <select
                type={"text"}
                className={
                  errors.lmia_status
                    ? "form-control text-capitalize border border-danger"
                    : "form-control text-capitalize"
                }
                value={state.lmia_status || ""}
                onChange={(e) => {
                  setState({ ...state, lmia_status: e.target.value });
                  setExpandedStatus(e.target.value);
                }}
                id="lmia_status"
                name="lmia_status"
                multiple={false}
              >
                <option value={""}>Select lmia status</option>
                {(FilterJson.lmia_status || []).map((status, i) => {
                  isExpanded = expandedStatus === status;
                  return props.job === "yes" ? (
                    <option value={status} key={i}>
                      {status}
                    </option>
                  ) : (
                    i > 2 && (
                      <option value={status} key={i}>
                        {status}
                      </option>
                    )
                  );
                })}
              </select>
              {/*----ERROR MESSAGE FOR LIMA STATUS----*/}
              {errors.lmia_status && (
                <span
                  key={errors.lmia_status}
                  className="text-danger font-size-3"
                >
                  {errors.lmia_status}
                </span>
              )}
            </div>

            {/* <div className="form-group mt-5">
              <label
                htmlFor="completion_time"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Expected time of completion<span className="text-danger">*</span>:
              </label>
              <input
                type="date"
                className={
                  errors.completion_time
                    ? "form-control coustam_datepicker border border-danger"
                    : "form-control coustam_datepicker"
                }
                value={moment(state.completion_time).format("DD-MM-YYYY") || ""}
                onChange={onInputChange}
                id="completion_time"
                name="completion_time"
                onKeyDownCapture={(e) => e.preventDefault()}
                min={moment().format("DD-MM-YYYY")}
              />
              ----ERROR MESSAGE FOR Admin Name----
              {errors.completion_time && (
                <span
                  key={errors.completion_time}
                  className="text-danger font-size-3"
                >
                  {errors.completion_time}
                </span>
              )}
            </div> */}
            {/* {state.lmia_status === "complete" ? (
              <>
                <div className="form-group">
                  <label
                    htmlFor="posted"
                    className="font-size-4 text-black-2  line-height-reset"
                  >
                    Posted :
                  </label>
                  <select
                    type={"text"}
                    className={
                      errors.posted
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.posted}
                    onChange={onInputChange}
                    id="posted"
                    name="posted"
                    multiple={false}
                  >
                    <option value={""}>Select lmia status</option>
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </select>
                  ----ERROR MESSAGE FOR LIMA STATUS----
                  {errors.posted && (
                    <span
                      key={errors.posted}
                      className="text-danger font-size-3"
                    >
                      {errors.posted}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="job_category_id"
                    className="font-size-4 text-black-2  line-height-reset"
                  >
                    Company <span className="text-danger"> *</span> :
                  </label>
                  <div className="position-relative">
                    <select
                      name="posted_company_id"
                      value={state.posted_company_id}
                      onChange={onInputChange}
                      className={
                        errors.posted_company_id
                          ? " form-control border border-danger position-relative overflow-hidden"
                          : " form-control position-relative overflow-hidden"
                      }
                      placeholder="company name"
                      id="posted_company_id"
                    >
                      <option value={""}>Select Company</option>
                      {(company || []).map((com) => (
                        <option key={com.company_id} value={com.company_id}>
                          {com.company_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  ----ERROR MESSAGE FOR COMPANY----
                  {errors.posted_company_id && (
                    <span
                      key={errors.posted_company_id}
                      className="text-danger font-size-3"
                    >
                      {errors.posted_company_id}
                    </span>
                  )}
                </div>
                <div className="form-group ">
                  <label
                    htmlFor="date_of_posting"
                    className="font-size-4 text-black-2  line-height-reset"
                  >
                    Date of posting :
                  </label>
                  <input
                    type={"date"}
                    className={
                      errors.date_of_posting
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.date_of_posting}
                    onChange={onInputChange}
                    id="date_of_posting"
                    name="date_of_posting"
                  />
                  ----ERROR MESSAGE FOR COMPANY NAME----
                  {errors.date_of_posting && (
                    <span
                      key={errors.date_of_posting}
                      className="text-danger font-size-3"
                    >
                      {errors.date_of_posting}
                    </span>
                  )}
                </div>
                <div className="form-group ">
                  <label
                    htmlFor="date_of_posting"
                    className="font-size-4 text-black-2  line-height-reset"
                  >
                    Designation
                  </label>
                  <input
                    type={"text"}
                    className={
                      errors.designation
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.designation}
                    onChange={onInputChange}
                    id="designation"
                    name="designation"
                  />
                  ----ERROR MESSAGE FOR COMPANY NAME----
                  {errors.designation && (
                    <span
                      key={errors.designation}
                      className="text-danger font-size-3"
                    >
                      {errors.designation}
                    </span>
                  )}
                </div>
              </>
            ) : null} */}
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
                  onClick={onLmiaUpdateClick}
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

export default LmiaStatus;
