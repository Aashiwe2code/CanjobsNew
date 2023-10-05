import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { AddJobCategory, getAllJobsCategory } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCategory(props) {
  const [catType, setCatType] = useState([]);
  let [loading, setLoading] = useState(false);

  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormState);
    setErrors("");
    setLoading(false);
    props.close();
  };
  // USER CATEGORY VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    category_name: "",
    category_type: "",
    parent_id: "",
    job_category_id: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    category_name: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Category Name  is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Category Name can not have a number."
          : value.length < 2
          ? "Category Name should have 2 or more letters"
          : "",
    ],
    category_type: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Category Type is required"
          : null,
    ],
  };

  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, setErrors, validate } =
    useValidation(initialFormState, validators);
  /*Onchange function to get the Value of parent id and category type */
  const onSelectChange = (event) => {
    const value = event.target.value;
    const category_type = CategoryType.find(
      (data) => data.job_category_id === value
    )
      ? CategoryType.find((data) => data.job_category_id === value)
          .category_type
      : "";
    setState({
      category_type: category_type,
      parent_id: value,
      category_name: state.category_name,
      job_category_id: state.job_category_id,
    });
  };

  // API CALL
  const CatData = async () => {
    try {
      let categoryType = await getAllJobsCategory();
      setCatType(categoryType.data);
      if (props.jobCategoryData === "0" || props.jobCategoryData.length === 0) {
        setState(initialFormState);
      } else {
        setState(props.jobCategoryData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    CatData();
  }, [props]);

  // USER CATEGORY SUBMIT BUTTON
  async function onAdminCategoryClick(event) {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const responseData = await AddJobCategory(state);
        if (responseData.message === "Category added successfully") {
          toast.success("Category added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
        if (responseData.message === "Category updated successfully") {
          toast.success("Category Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
        if (responseData.message === "already exist !") {
          setErrors({ ...errors, category_name: "Category Alredy Exists." });
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
  /*Category type array to filter*/
  const CategoryType = catType.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.category_type === thing.category_type)
  );

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
              <h5 className="text-center pt-2 mb-7">Add Category</h5>
            ) : (
              <h5 className="text-center pt-2 mb-7">Update Category</h5>
            )}
            <div className="form-group row mb-0 ">
              <label
                htmlFor="category_type"
                className="font-size-4 text-black-2 mx-6 line-height-reset"
              >
                Category Type <span className="text-danger">*</span> :
              </label>
              <select
                name="category_type"
                className={
                  errors.category_type
                    ? "form-control mx-6 border border-danger"
                    : "form-control mx-6"
                }
                value={state.parent_id}
                onChange={onSelectChange}
                id="category_type"
              >
                <option>Select category</option>
                {(catType || []).map((data) => {
                  return data.parent_id === "0" ? (
                    <option
                      value={data.job_category_id}
                      key={data.job_category_id}
                    >
                      {data.category_type}
                    </option>
                  ) : null;
                })}
              </select>
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
            <div className="form-group mt-5">
              <label
                htmlFor="category_name"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Category Name <span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                className={
                  errors.category_name
                    ? "form-control border border-danger"
                    : "form-control"
                }
                value={state.category_name}
                onChange={onInputChange}
                placeholder="Category Name"
                id="category_name"
                name="category_name"
                maxLength={60}
              />
              {/*----ERROR MESSAGE FOR CATEGORY----*/}
              {errors.category_name && (
                <span
                  key={errors.category_name}
                  className="text-danger font-size-3"
                >
                  {errors.category_name}
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

export default AddCategory;
