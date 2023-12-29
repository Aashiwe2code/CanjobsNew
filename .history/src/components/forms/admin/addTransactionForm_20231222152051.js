import React, { useState } from "react";
import useValidation from "../../common/useValidation";
import { toast } from "react-toastify";
import { AddCashpayment } from "../../../api/api";
export default function AddTransactionForm({
  data,
  setApicall,
  user_id,
  user,
}) {
  const [loading, setLoading] = useState(false);
  // let name = localStorage.getItem("name")
  /*Initial state */
  const initialFormState = {
    amount: "",
    payment_mode: "",
    payment_id: "",
    id: user_id,
    user_type: user,
  };

  /*Validation */
  const validators = {
    payment_id: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Payment id is required"
          : "",
    ],
    amount: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Amount is required"
          : "",
    ],
    payment_mode: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Payment Method is required"
          : "",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, /* setErrors,*/ validate } =
    useValidation(initialFormState, validators);

  /*Function to made payment*/
  const onPayentClick = async (e) => {
    if (validate()) {
      try {
        let Response = await AddCashpayment(state);
        if (Response.status === 1) {
          toast.success("Payment Successful.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          });
          setState(initialFormState);
          setApicall(true);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
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
      <div className="m-3">
        <label
          htmlFor="payment_id"
          className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
        >
          Payment Id: <span className="text-danger">*</span>
        </label>
        <div className="position-relative">
          <div
            className={
              errors.payment_id
                ? "border border-danger rounded overflow-hidden"
                : "border rounded overflow-hidden"
            }
          >
            <input
              name="payment_id"
              value={state.payment_id}
              onChange={onInputChange}
              type="text"
              min={0}
              className={
                errors.payment_id
                  ? "form-control border border-danger"
                  : "form-control"
              }
              id="payment_id"
              maxLength={10}
            ></input>
          </div>
          {/*----ERROR MESSAGE FOR DESRIPTION----*/}
          {errors.payment_id && (
            <span key={errors.payment_id} className="text-danger font-size-3">
              {errors.payment_id}
            </span>
          )}
        </div>
      </div>
      <label
        htmlFor="amount"
        className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
      >
        Payment Method: <span className="text-danger">*</span>
      </label>
      <div className="row">
        <div
          className={`col-6 text-capitalize`}
          //   onClick={() => handleSubStageSelection(expandedStatus, subStage)}
        >
          <input
            type="radio"
            className="mx-2"
            value="cash"
            checked={state.payment_mode === "cash"}
            onChange={onInputChange}
            readOnly
            name="payment_mode"
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
