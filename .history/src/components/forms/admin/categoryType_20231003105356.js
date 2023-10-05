import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { AddJobCategory } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCategoryType(props) {
  let [loading, setLoading] = useState(false);

  /* Functionality to close the modal */
  const close = () => {
    setState({
      ...state,
      category_type: "",
      parent_id: "",
      job_category_id: "",
    });
    setErrors("");
    setLoading(false);
    props.close();
  };
  // USER CATEGORY TYPE VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    category_type: "",
    parent_id: "",
    job_category_id: "",
  };
  /*Function to get the selected Catgeory type which you want to edit*/
  useEffect(() => {
    setState({
      ...state,
      category_type: props.jobCategoryData.category_type,
      job_category_id: props.jobCategoryData.job_category_id,
    });
  }, [props]);
  // VALIDATION CONDITIONS
  const validators = {
    category_type: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Category Type  is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Category Type can not have a number."
          : value.length < 2
          ? "Category Type should have 2 or more letters"
          : "",
    ],
  };

  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, setErrors, validate } =
    useValidation(initialFormState, validators);
  // API CALL

  // USER CATEGORY TYPE SUBMIT BUTTON
  async function onAdminCategoryClick(event) {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const responseData = await AddJobCategory(state);
        if (responseData.message === "Category added successfully") {
          toast.success("Category Type successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
        if (responseData.message === "Category updated successfully") {
          toast.success("Category Type updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
        if (responseData.message === "already exist !") {
          setErrors({
            ...errors,
            category_type: "Category Type Alredy Exists.",
          });
          setLoading(false);
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
          <form onSubmit={onAdminCategoryClick}>
            {props.jobCategoryData === "0" ? (
              <h5 className="text-center mb-7 pt-2">Add Category Type</h5>
            ) : (
              <h5 className="text-center mb-7 pt-2">Update Category Type</h5>
            )}
            <div className="form-group row mb-0 ">
              <label
                htmlFor="category_type"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Add Category Type <span className="text-danger">*</span> :
              </label>
              <input
                type="text"
                className={
                  errors.category_type
                    ? "form-control mx-5 border border-danger col"
                    : "form-control col mx-5"
                }
                value={state.category_type || ""}
                onChange={onInputChange}
                placeholder="Category Type"
                id="category_type"
                name="category_type"
                maxLength={60}
              />
            </div>
            {/*----ERROR MESSAGE FOR CATEGORY TYPE----*/}
            {errors.category_type && (
              <span
                key={errors.category_type}
                className="text-danger font-size-3 mx-5"
              >
                {errors.category_type}
              </span>
            )}

            <div className="form-group text-center">
              {loading === true ? (
                <button
                  className="btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase"
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
                  className="btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase"
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

export default AddCategoryType;
