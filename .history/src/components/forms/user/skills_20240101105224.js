import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import {
  EmployeeSkillDetails,
  AddEmployeeSkill,
  DeleteEmployeeSkill,
  GetFilter,
} from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import SAlert from "../../common/sweetAlert";
import Select from "react-select";

function Skills(props) {
  let [skillData, SetSkillData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiCall, setApiCall] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  let [SkillList, setSkillList] = useState([]);
  let [SkillOption, setSkillOption] = useState([]);
  /* Functionality to close the modal */

  const close = () => {
    setState(initialFormState);
    setErrors("");
    setLoading(false);
    props.close();
  };

  // USER SKILLS VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    skill: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    skill: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Skills / Software Name is required"
          : value.length < 3
          ? "Skills / Software Name should have 3 or more letter"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Skills / Software Name can not have a number."
          : "",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, errors, setErrors, validate } = useValidation(
    initialFormState,
    validators
  );
  // API CALL
  const SkillData = async () => {
    try {
      let SkillDetails = await EmployeeSkillDetails(props.employeeId);
      try {
        let SkillList = await GetFilter();
        if (SkillList.data.message === "Successful") {
          // setSkillList(SkillList.data.data.Skill);
        }
      } catch (err) {
        console.log(err);
      }
      if (SkillDetails.data.skill.length === 0) {
        SetSkillData([]);
      } else {
        SetSkillData(SkillDetails.data.skill);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*Render method to get the skill data */
  useEffect(() => {
    if (props.employeeId !== undefined) {
      SkillData();
    }
    if (apiCall === true) {
      setApiCall(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, apiCall]);

  /*Function to set data to the search job by country */
  const onSelectChange = (option) => {
    setState({ ...state, skill: option.value });
  };

  /*Function to redender the data in the option of the select box*/
  useEffect(() => {
    const options = (SkillList || []).map((option) => ({
      value: option.value,
      label: option.value,
    }));

    setSkillOption({ ...state, skill: options });
  }, [SkillList]);

  // USER SKILLS SUBMIT BUTTON
  const onUserSkillsClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        let responseData = await AddEmployeeSkill(state, props.employeeId);
        if (responseData.message === "Employee data updated successfully") {
          toast.success("Skill Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setState({ ...state, skill: "" });
          setSkillOption({ ...state, skill: "" });
          setErrors("");
          setLoading(false);
          props.setApiCall(true);
          setApiCall(true);
        } else if (responseData.message === "already exist !") {
          toast.error("Skill Already added", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setState({ ...state, skill: "" });
          setSkillOption({ ...state, skill: "" });
          setErrors("");
          setLoading(false);
          props.setApiCall(true);
          setApiCall(true);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  // END USER PERSONAL DETAIL VALIDATION
  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.skill_id);
    setDeleteName(e.skill);
    setDeleteAlert(true);
  };

  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };

  /*To call Api to delete Skill */
  async function deleteSkill(e) {
    try {
      const responseData = await DeleteEmployeeSkill(e);
      if (responseData.message === "skill has been deleted") {
        toast.error("Skill deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        props.setApiCall(true);
        setApiCall(true);
        setDeleteAlert(false);
      }
    } catch (err) {
      console.log(err);
    }
  }
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
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          data-dismiss="modal"
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 p-7">
          <form onSubmit={onUserSkillsClick}>
            <h5 className="text-center mb-7">Add It Skills </h5>
            <div className="form-group d-flex mb-3 p-0">
              <label
                htmlFor="skill"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Skill<span className="text-danger">*</span> :
              </label>
              {/* <input
                maxLength={30}
                type="text"
                placeholder="Skill / Software Name"
                className={
                  errors.skill
                    ? "form-control border border-danger"
                    : "form-control"
                }
                id="skill"
                name="skill"
                value={state.skill}
                onChange={onInputChange}
              /> */}
              <Select
                options={"" || SkillOption.skill}
                name="skill"
                id="skill"
                onChange={onSelectChange}
                className={
                  errors.skill
                    ? "border border-danger w-100 text-capitalize"
                    : "text-capitalize w-100"
                }
                isClearable={""}
              />
              {loading === true ? (
                <button
                  className=" btn-primary btn-small mx-2 rounded-5 text-uppercase"
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
                  className=" btn-primary px-5  mx-2  rounded-5 text-uppercase"
                  type="submit"
                >
                  +
                </button>
              )}
            </div>
            {/*----ERROR MESSAGE FOR SKILLS----*/}
            {errors.skill && (
              <span key={errors.skill} className="text-danger font-size-3 mx-5">
                {errors.skill}
              </span>
            )}
            <div className="form-group">
              <ul className="list-unstyled d-flex align-items-center flex-wrap">
                {(skillData || []).map((skill) => (
                  <li
                    className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                    key={skill.skill_id}
                  >
                    {skill.skill}
                    <Link
                      className="p-0 ms-1"
                      onClick={() => ShowDeleteAlert(skill)}
                    >
                      <i
                        className="px-3 fa fa-times-circle"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="form-group text-center mb-0">
              <button
                type="button"
                className="btn btn-primary ml-auto mr-auto"
                data-dismiss="modal"
                onClick={close}
              >
                Close
              </button>
            </div>
          </form>
          {/* </div> */}
        </div>
        <SAlert
          show={deleteAlert}
          title={deleteName}
          text="Are you Sure you want to delete !"
          onConfirm={() => deleteSkill(deleteId)}
          showCancelButton={true}
          onCancel={CancelDelete}
        />
      </Modal>
    </>
  );
}

export default Skills;
