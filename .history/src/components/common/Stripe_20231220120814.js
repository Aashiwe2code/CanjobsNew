// import { loadStripe } from "@stripe/stripe-js";
// import React, { useState } from "react";
// import {
//   PaymentElement,
//   Elements,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { AddStripePalpay } from "../../api/api.js";
// import { FaStripe } from "react-icons/fa";
// const CheckoutForm = ({
//   amount,
//   getAmt,
//   setErrors,
//   errors,
//   setApicall,
//   setState,
//   state,
// }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState(null);
//   const handleSubmit = async (event) => {
//     console.log(amount, state);
//     event.preventDefault();
//     if (elements == null) {
//       return;
//     }
//     // return false;
//     // Trigger form validation and wallet collection
//     const { error: submitError } = await elements.submit();
//     if (submitError) {
//       // Show error to your customer
//       setErrorMessage(submitError.message);
//       return;
//     }

//     if (amount === 0 || amount === "" || amount === "0") {
//       setErrors({
//         ...errors,
//         amount: "Please set the amount before payment",
//       });
//     } else {
//       let tokenData = await AddStripePalpay(amount);
//       let clientSecret = tokenData.data.message;
//       const res_data = await stripe.confirmPayment({
//         //`Elements` instance that was used to create the Payment Element
//         elements,
//         clientSecret,
//         confirmParams: {
//           return_url: "https://www.indiakinursery.com",
//         },
//       });
//       console.log("pop", res_data);

//       if (res_data.error) {
//         setErrorMessage(res_data.error);
//       } else {
//       }
//     }
//   };

//   return (
//     <div>
//       <PaymentElement />
//       <button
//         type="button"
//         onClick={handleSubmit}
//         className="btn btn-info btn-small w-100 mb-5 rounded-5 text-uppercase"
//         disabled={!stripe || !elements}
//         title="Stripe pay"
//       >
//         <FaStripe style={{ fontSize: "-webkit-xxx-large" }} />
//       </button>
//       {/* Show error message to your customers */}
//       {errorMessage && <div>{errorMessage}</div>}
//     </div>
//   );
// };

// const stripePromise = loadStripe(
//   "pk_test_51OOcaLA8p1T9ETlDszUVaF66gGesKprD6MVlSF2oecCY9P6qpcOZoZfb3dZ5QvlRPamQcDhwbz71sIVUzCfZe1YZ00XaboPbmY"
// );

// const options = {
//   mode: "payment",
//   amount: 80,
//   currency: "usd",
//   // Fully customizable with appearance API.
//   appearance: {
//     /*...*/
//   },
// };

// const StripePay = ({
//   amount,
//   getAmt,
//   setErrors,
//   errors,
//   setApicall,
//   setState,
//   state,
// }) => (
//   <Elements stripe={stripePromise} options={options}>
//     <CheckoutForm
//       amount={amount}
//       getAmt={getAmt}
//       setErrors={setErrors}
//       errors={errors}
//       setApicall={setApicall}
//       setState={setState}
//       state={state}
//     />
//   </Elements>
// );
// export default StripePay;
// StripePay.js
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { AddStripePalpay } from "../../api/api.js";
import { FaStripe } from "react-icons/fa";

const stripePromise = loadStripe(
  "pk_test_51OOcaLA8p1T9ETlDszUVaF66gGesKprD6MVlSF2oecCY9P6qpcOZoZfb3dZ5QvlRPamQcDhwbz71sIVUzCfZe1YZ00XaboPbmY"
);

const StripePay = ({ amount, setErrors }) => {
  const options = {
    mode: "payment",
    amount: Number(amount), // Default amount, you can pass it as a prop
    currency: "usd", // Default currency, you can pass it as a prop
    // Additional configuration options
  };
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    if (amount === 0 || amount === "" || amount === "0") {
      setErrors({
        amount: "Please set the amount before payment",
      });
    } else {
      try {
        const tokenData = await AddStripePalpay(amount);
        console.log(tokenData);
        const clientSecret = tokenData.data.message;

        const res_data = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: "https://www.indiakinursery.com",
          },
        });

        if (res_data.error) {
          setErrorMessage(res_data.error);
        } else {
          // Handle successful payment
        }
      } catch (error) {
        console.error("Error confirming payment:", error);
        setErrorMessage("An error occurred while processing your payment.");
      }
    }
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div>
        <PaymentElement />
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-info btn-small w-100 mb-5 rounded-5 text-uppercase"
          disabled={!stripe || !elements}
          title="Stripe pay"
        >
          <FaStripe style={{ fontSize: "2em" }} />
        </button>
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    </Elements>
  );
};

export default StripePay;
