import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { AddPayPalpay } from "../../api/api";

const PayPalButton = (props) => {
  let user_id = localStorage.getItem("employee_id");
  /*Function to create a order for the payment */
  const createOrder = async (data, actions) => {
    let amt = await props.getAmt();
    if (amt === 0) {
      props.setErrors({
        ...errors,
        amount: "Please set the amount before payment",
      });
    } else {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: amt,
            },
          },
        ],
      });
    }
  };

  /*Approved function */
  const onApprove = (data, actions) => {
    // Capture the funds from the transaction
    return actions.order.capture().then(async function (details) {
      let amt = await props.getAmt();
      if (details.status === "COMPLETED") {
        try {
          let res = await AddPayPalpay(data, user_id, amt);
          if (res.status === 1 || "1") {
            toast.success("Payment Successful.", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 5000,
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
      // getAccessToken()
      //   .then((accessToken) => {
      //     console.log("Access Token:", accessToken);
      //     // Use this access token in your API requests
      //   })
      //   .catch((error) => {
      //     console.error("Error getting access token:", error.message);
      //   });

      // Send the payment details to your server for validation and database update
      // fetch('/api/paypal/capture', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     orderID: data.orderID,
      //     payerID: data.payerID,
      //     paymentID: details.id,
      //   }),
      // })
      // .then((response) => response.json())
      // .then((data) => {
      //   // Handle the response from your server
      //   console.log('Server response:', data);
      // })
      // .catch((error) => {
      //   console.error('Error:', error);
      // });
    });
  };

  return (
    <>
      {/* payment */}
      <PayPalScriptProvider
        options={{
          "client-id":
            "AbYsUSCVrRqDtp4zlox3JSNxRHmmc-SRYVqaFc7GFQzfveGacibhiJCignxz418kGQgbjwwg_AAVvX6V",
        }}
      >
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      </PayPalScriptProvider>
    </>
  );
};

export default PayPalButton;
