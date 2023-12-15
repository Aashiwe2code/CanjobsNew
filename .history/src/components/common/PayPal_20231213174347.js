import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { getAccessToken } from "./paypalAuthTokeGet.js";
// import { getTransactionDetails } from "./paymentDetail.js";
const PayPalButton = () => {
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "10.00", // Example amount (update with your actual amount)
          },
        },
      ],
    });
  };

  //   const onApprove = (data, actions) => {
  //     // Capture the funds from the transaction
  //     return actions.order.capture().then(function (details) {
  //       console.log("details============================");
  //       console.log(details);
  //       getAccessToken()
  //         .then((accessToken) => {
  //           console.log("Access Token:", accessToken);
  //           // Use this access token in your API requests
  //         })
  //         .catch((error) => {
  //           console.error("Error getting access token:", error.message);
  //         }); // Send the payment details to your server for validation and database update
  //       // fetch('/api/paypal/capture', {
  //       //   method: 'POST',
  //       //   headers: {
  //       //     'Content-Type': 'application/json',
  //       //   },
  //       //   body: JSON.stringify({
  //       //     orderID: data.orderID,
  //       //     payerID: data.payerID,
  //       //     paymentID: details.id,
  //       //   }),
  //       // })
  //       // .then((response) => response.json())
  //       // .then((data) => {
  //       //   // Handle the response from your server
  //       //   console.log('Server response:', data);
  //       // })
  //       // .catch((error) => {
  //       //   console.error('Error:', error);
  //       // });
  //     });
  //   };

  return (
    <>
      {/* payment-------------------------- */}
      <PayPalScriptProvider
        options={{
          "client-id":
            "AbYsUSCVrRqDtp4zlox3JSNxRHmmc-SRYVqaFc7GFQzfveGacibhiJCignxz418kGQgbjwwg_AAVvX6V",
        }}
      >
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      </PayPalScriptProvider>
      <br />

      {/* token get ---------------------- */}
      {/* <button
        onClick={() => {
          getAccessToken()
            .then((accessToken) => {
              console.log("Access Token:", accessToken);
              // Use this access token in your API requests
            })
            .catch((error) => {
              console.error("Error getting access token:", error.message);
            });
        }}
      >
        get token
      </button>

      <button
        onClick={() => {
          getTransactionDetails("0WN30938H97935617")
            .then((transactionDetails) => {
              console.log("Transaction Details:", transactionDetails);
              // Process and display the details as needed
            })
            .catch((error) => {
              // Handle errors
            });
        }}
      >
        get payment detaile
      </button> */}
    </>
  );
};

export default PayPalButton;
