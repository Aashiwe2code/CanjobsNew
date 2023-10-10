import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function AddTransactionForm({ data }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // let name = localStorage.getItem("name")
  /*Initial state */
  const initialFormState = {
    amount: "",
    // method: "",
  };
  let location = useLocation();

  /*Validation */
  const validators = {
    amount: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "amount is required"
          : "",
    ],
    // method: [
    //   (value) =>
    //     value === "" || value === null || value.trim() === ""
    //       ? "method is required"
    //       : "",
    // ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, /* setErrors,*/ validate } =
    useValidation(initialFormState, validators);

  /*Function to made payment*/
  const onPayentClick = async (e) => {
    if (validate() && data.name) {
    }
  };
  return (
    <form className="col-md-4 p-10">
      <label className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0">
        Payment from: <span className="text-danger">*</span>
      </label>
      <div className="row">
        <div
          className={`col-6 text-capitalize`}
          //   onClick={() => handleSubStageSelection(expandedStatus, subStage)}
        >
          <input
            type="radio"
            className="mx-2"
            // checked={(selectedStatus || []).some(
            //   (item) => item.substage === subStage
            // )}
            readOnly
            name="nationality"
          />
          Canada & US
        </div>
        <div
          className={`col-6 text-capitalize`}
          //   onClick={() => handleSubStageSelection(expandedStatus, subStage)}
        >
          <input
            type="radio"
            className="mx-2"
            name="nationality"
            // checked={(selectedStatus || []).some(
            //   (item) => item.substage === subStage
            // )}
            readOnly
          />
          Outside Canada
        </div>
      </div>
      <label
        htmlFor="amount"
        className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
      >
        Payment method: <span className="text-danger">*</span>
      </label>
      <div className="row">
        <div
          className={`col-6 text-capitalize`}
          //   onClick={() => handleSubStageSelection(expandedStatus, subStage)}
        >
          <input
            type="radio"
            className="mx-2"
            // checked={(selectedStatus || []).some(
            //   (item) => item.substage === subStage
            // )}
            readOnly
            name="cash"
          />
          Cash
        </div>{" "}
      </div>

      <div className="m-3">
        <label
          htmlFor="amount"
          className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
        >
          Amount: <span className="text-danger">*</span>
        </label>
        <div className="position-relative">
          <div
            className={
              errors.amount
                ? "border border-danger rounded overflow-hidden"
                : "border rounded overflow-hidden"
            }
          >
            <input
              name="amount"
              value={state.amount}
              onChange={onInputChange}
              type="number"
              min={0}
              className={
                errors.amount
                  ? "form-control border border-danger"
                  : "form-control"
              }
              id="amount"
              maxLength={10}
            ></input>
          </div>
          {/*----ERROR MESSAGE FOR DESRIPTION----*/}
          {errors.amount && (
            <span key={errors.amount} className="text-danger font-size-3">
              {errors.amount}
            </span>
          )}
        </div>
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
            onClick={(e) => onPayentClick(e)}
            className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
            type="button"
          >
            Pay
          </button>
        )}
      </div>
    </form>
  );
}
