import React, { useState } from "react";
import useValidation from "../../common/useValidation";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateRazorpay, AddRazorpay } from "../../../api/api";
import PayPalButton from "../../common/PayPal";
export default function PayForm({ setApicall, data }) {
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
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onerror = () => {
        alert("RazorPay SDK failed to load");
      };
      script.onload = async () => {
        try {
          setLoading(true);
          // const total = userData.cart.reduce((a, b) => a + +b.price, 0).toFixed(0);
          const result = await CreateRazorpay(state.amount, "INR");
          const { amount, id: orderId, currency } = result.data.data;
          // const getkey = await axios.get("http://localhost:8080/payment/get-razorpay-key");
          const key = "rzp_test_m5J59Uvpq9YHDx";
          const options = {
            key: key,
            amount: amount.toString(),
            currency: currency,
            name: data.name,
            description: "FIRST RAZOR PAY",
            order_id: orderId,
            handler: async function (response) {
              await AddRazorpay(amount, response);
              // Perform any additional actions on successful payment here
              toast.success("Payment Successful.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
              });
              setState(initialFormState);
              setApicall(true);
              navigate(location.pathname);
            },
            prefill: {
              name: data.name,
              email: data.email,
              contact: data.contact_contact_no,
            },
          };
          setLoading(false);
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
      document.body.appendChild(script);
    } else {
      toast.error("Please complete your profile first", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 6000,
      });
      setLoading(false);
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
      {/* <label
        htmlFor="amount"
        className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
      >
        Payment method: <span className="text-danger">*</span>
      </label>
      <div className="row">
        <div></div>
      </div>
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
        name="upi"
      />
     UPI
    </div>
    <div
      className={`col-6 text-capitalize`}
      //   onClick={() => handleSubStageSelection(expandedStatus, subStage)}
    >
      <input
        type="radio"
        className="mx-2"
        name="paypal"
        // checked={(selectedStatus || []).some(
        //   (item) => item.substage === subStage
        // )}
        readOnly
      />
      Paypal
    </div>
    <div
      className={`col-6 text-capitalize`}
      //   onClick={() => handleSubStageSelection(expandedStatus, subStage)}
    >
      <input
        type="radio"
        className="mx-2"
        name="banking"
        // checked={(selectedStatus || []).some(
        //   (item) => item.substage === subStage
        // )}
        readOnly
      />
      Net bankink
    </div>
    </div> */}
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
        {/* <PayPalButton amount={state.amount} /> */}
      </div>
    </form>
  );
}
