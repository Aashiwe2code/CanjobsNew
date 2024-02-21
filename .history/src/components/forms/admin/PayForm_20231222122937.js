import React, { useState, useEffect } from "react";
import useValidation from "../../common/useValidation";
import { toast } from "react-toastify";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  CreateRazorpay,
  AddRazorpay,
  GetStripePaymentDetails,
} from "../../../api/api";
import PayPalButton from "../../common/PayPal";
import { SiRazorpay } from "react-icons/si";
import StripePay from "../../common/Stripe";
import { FaStripe } from "react-icons/fa";
import BraintreeDropIn from "../../common/braintreepayment";
export default function PayForm({ setApicall, data, user }) {
  const [loading, setLoading] = useState(false);
  const [stripePayment, setStripePayment] = useState(false);
  const [braintreePayment, setBraintreePayment] = useState(false);
  let user_id = localStorage.getItem("employee_id");

  const navigate = useNavigate();
  let location = useLocation();
  // let name = localStorage.getItem("name")
  /*Initial state */
  const initialFormState = {
    amount: "",
    // method: "",
  };

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
  const { state, setState, onInputChange, errors, setErrors, validate } =
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

  /*Function to send the amount to paypal component */
  function getAmt() {
    return new Promise((resolve, reject) => {
      var amount_value = document.getElementById("amount").value;

      resolve(amount_value);
    });
  }
  /*COde to set the sripe payment details to the database */
  let params = new URLSearchParams(window.location.search);
  let piId;
  useEffect(() => {
    params = new URLSearchParams(window.location.search);
    if (piId) {
      GetStripeDetails();
    }
    piId = params.get("payment_intent");
  }, []);
  /*Function to get strie payment details */
  const GetStripeDetails = async () => {
    try {
      let res = await GetStripePaymentDetails(
        piId,
        user_id,
        user_id,
        "employee",
        "success"
      );
      if (res.status === (200 || "200")) {
        setApicall(true);
        /*code to remove the url params from url */
        const paramsToRemove = [
          "payment_intent",
          "payment_intent_client_secret",
          "redirect_status",
        ];
        const url = new URL(window.location.href);

        paramsToRemove.forEach((param) => url.searchParams.delete(param));

        window.history.replaceState({}, document.title, url.toString());
      }
    } catch (err) {
      console.log(err);
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
                  ? "form-control border border-danger hide-spin-buttons"
                  : "form-control hide-spin-buttons"
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
      <div className="text-center">
        {stripePayment && state.amount ? (
          <StripePay
            amount={state.amount}
            getAmt={getAmt}
            setErrors={setErrors}
            errors={errors}
            setApicall={setApicall}
            setState={setState}
            state={state}
            setStripePayment={setStripePayment}
          />
        ) : braintreePayment && state.amount ? (
          <BraintreeDropIn
            amount={state.amount}
            getAmt={getAmt}
            setErrors={setErrors}
            errors={errors}
            setApicall={setApicall}
            setState={setState}
            state={state}
            setBraintreePayment={setBraintreePayment}
            show={braintreePayment}
            user_id={user_id}
          />
        ) : (
          <>
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
                className="btn btn-secondary btn-small w-100 mb-5 rounded-5 text-uppercase"
                type="button"
                title="Razor pay"
              >
                <SiRazorpay />
              </button>
            )}
            <button
              type="button"
              onClick={() =>
                state.amount
                  ? setStripePayment(true)
                  : setErrors({
                      ...errors,
                      amount: "Please set the amount before payment",
                    })
              }
              className="btn btn-info btn-small w-100 mb-5 rounded-5 text-uppercase"
              title="Stripe pay"
            >
              <FaStripe style={{ fontSize: "-webkit-xxx-large" }} />
            </button>

            <Link
              type="button"
              onClick={() =>
                state.amount
                  ? setBraintreePayment(true)
                  : setErrors({
                      ...errors,
                      amount: "Please set the amount before payment",
                    })
              }
              className="w-100 mb-5 rounded-5 text-uppercase"
              title="Braintree pay"
            >
              <img
                src="https://s3.amazonaws.com/braintree-badges/braintree-badge-wide-dark.png"
                width="100%"
                height="50px"
                alt="Braintree"
              />
            </Link>

            <PayPalButton
              amount={Number(state.amount)}
              getAmt={getAmt}
              setErrors={setErrors}
              error={errors}
              setApicall={setApicall}
              setState={setState}
              state={state}
              user_id={user_id}
            />
          </>
        )}
      </div>
    </form>
  );
}
