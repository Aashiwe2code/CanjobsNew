import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
// import useValidation from "../../common/useValidation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAllJobs, ApplyJob } from "../../../api/api";
// import SelectBox from "../../common/select";
// import { Select, Button } from "antd"; // "3.26.7" worked
import Select from "react-select";
function ChangeJob(props) {
  let [apiCall, setApiCall] = useState(props.apiCall);
  let [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  let employeeId = props.resData.employee_id;
  let applyId = props.resData.apply_id;
  let [allJobData, setAllJobData] = useState([]);
  let [JobId, setJobId] = useState("");
  let [alredyApplied, setAlredyApplied] = useState("");
  /* Functionality to close the modal */
  const close = () => {
    setLoading(false);
    props.close();
  };

  // USER CHANGE JOB VALIDATION
  // INITIAL STATE ASSIGNMENT

  const JobData = async () => {
    try {
      const userData = await GetAllJobs();
      if (userData.data.data.length === 0) {
        setAllJobData([]);
      } else {
        setAllJobData(
          userData.data.data.filter((item) => item.job_id !== props.job_id)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    JobData();
  }, [props, apiCall]);
  // USER CHANGE JOB SUBMIT BUTTON
  const onSelectChange = (option) => {
    setJobId(option.value);
  };
  /*Function to change job */
  const onChangeJobClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const responseData = await ApplyJob(
        JobId,
        employeeId,
        props.status,
        applyId
      );
      if (responseData.message === "Job switched successfully") {
        toast.success("Job Changed successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
        return close();
      }
      if (responseData.message === "already applied on this job") {
        setAlredyApplied("Already applied on this job");
        setLoading(false);
        setApiCall(true);
      }
      if (responseData.message === "Job applied successfully") {
        toast.success("Applied successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        props.setChangeJob(true);
        props.setApiCall(true);
        return close();
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  // END USER CHANGE JOB VALIDATION
  /*FUnction to redender the data in the option of the select box*/
  useEffect(() => {
    const options = allJobData.map((option) => ({
      value: option.job_id,
      label: option.job_title + " - " + option.company_name,
    }));
    setState(options);
  }, [allJobData]);
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
          <h5 className="text-center pt-2 mb-7">
            {props.apply === "apply" ? "Apply for Job" : "Change Jobs"}
          </h5>

          <form onSubmit={onChangeJobClick}>
            <div className="form-group ">
              <label
                htmlFor="job_id"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Jobs <span className="text-danger">*</span> :
              </label>
              <Select
                options={state || ""}
                onChange={onSelectChange}
                id="job_id"
              />
              <small className="text-danger">{alredyApplied}</small>
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
                  onClick={onChangeJobClick}
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

export default ChangeJob;
