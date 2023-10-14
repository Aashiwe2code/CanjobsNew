import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { AddInterviewSchedule, getInterview } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
function AddInterview(props) {
  let [loading, setLoading] = useState(false);
  let employeeId = props.resData.employee_id;
  let jobId = props.job_id;

  /* Functionality to close the modal */
  const close = () => {
    setState({ ...state, interview_date: "", interview_status: "" });
    setErrors("");
    setLoading(false);
    props.close();
  };
  // USER INTERVIEW UPDATE VALIDATION
  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    interview_date: "",
    interview_status:
      props.resData.status === "pending" || props.resData.status === ""
        ? "pending"
        : "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    interview_date: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Interview date is required"
          : null,
    ],
    interview_status: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Interview status is required"
          : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, setErrors, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);

  const InterviewData = async () => {
    try {
      const userData = await getInterview(jobId, employeeId);
      if (userData.data.length === 0) {
        setState({ state, interview_date: "" });
      } else {
        if (props.Interview === "interview") {
          setState({ state, interview_date: props.resData.interview_date });
        } else {
          setState({
            state,
            interview_date: userData.data[0].interview_date,
            interview_status: userData.data[0].status,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
    // console.log("state =>", state , "date =>" , props.resData.interview_date ,userData)
  };

  /*Render function to get the interview*/
  useEffect(() => {
    InterviewData();
  }, [props]);

  // USER INTERVIEW UPDATE SUBMIT BUTTON
  const onAddInterviewClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const responseData = await AddInterviewSchedule(
          state,
          employeeId,
          jobId
        );
        if (responseData.message === "data inserted successfully") {
          toast.success("Interview Scheduled successfully", {
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
          <h5 className="text-center pt-2 mb-7">Schedule Interview</h5>

          <form onSubmit={onAddInterviewClick}>
            <div className="form-group row mb-0">
              <label
                htmlFor="interview_status"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Interview Status <span className="text-danger">*</span> :
              </label>
              <select
                name="interview_status"
                className={
                  errors.interview_status
                    ? "form-control mx-5 col border border-danger"
                    : "form-control col mx-5"
                }
                value={state.interview_status}
                onChange={onInputChange}
                id="interview_status"
              >
                <option value={""}>Select Status</option>
                <option value={"pending"}>Schedule / Reschedule</option>
                <option value={"complete"}>Complete</option>
              </select>
            </div>
            {/*----ERROR MESSAGE FOR EMAIL----*/}
            {errors.interview_status && (
              <span
                key={errors.interview_status}
                className="text-danger font-size-3 px-5"
              >
                {errors.interview_status}
              </span>
            )}
            <div className="form-group mt-5">
              <label
                htmlFor="interview_date"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Interview Date <span className="text-danger">*</span> :
              </label>
              <input
                className={
                  errors.interview_date
                    ? "form-control coustam_datepicker border border-danger"
                    : "form-control coustam_datepicker"
                }
                value={state.interview_date}
                onChange={onInputChange}
                id="interview_date"
                name="interview_date"
                type={"date"}
                placeholder="Interview date"
                onKeyDownCapture={(e) => e.preventDefault()}
                min={moment().format("DD-MM-YYYY")}
              />
              {/*----ERROR MESSAGE FOR EMAIL----*/}
              {errors.interview_date && (
                <span
                  key={errors.interview_date}
                  className="text-danger font-size-3"
                >
                  {errors.interview_date}
                </span>
              )}
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
                  onClick={onAddInterviewClick}
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

export default AddInterview;
