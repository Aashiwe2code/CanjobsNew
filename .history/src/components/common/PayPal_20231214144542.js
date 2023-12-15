import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { Link } from "react-router-dom";
const PayPalButton = ({ amount }) => {
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount, // Example amount (update with your actual amount)
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    // Capture the funds from the transaction
    return actions.order.capture().then(function (details) {
      console.log("details============================");
      console.log(details);
      getAccessToken()
        .then((accessToken) => {
          console.log("Access Token:", accessToken);
          // Use this access token in your API requests
        })
        .catch((error) => {
          console.error("Error getting access token:", error.message);
        }); // Send the payment details to your server for validation and database update
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
  const getTransactionDetails = async (orderId) => {
    try {
      const response = await axios.get(
        `https://api.sandbox.paypal.com/v2/checkout/orders/${orderId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer A21AALa2HVxhB-4SfFAX2qrrcquPZ69MxuRkWw-iT0d7AJcC-PPsXx9Y-z8GrFu6F2Vr3W_gflrdkh7GmkygrTsTp9dagBD4Q`, // Replace with your actual access token
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching transaction details:", error.message);
      throw error;
    }
  };
  const getAccessToken = async () => {
    const clientId =
      "AbYsUSCVrRqDtp4zlox3JSNxRHmmc-SRYVqaFc7GFQzfveGacibhiJCignxz418kGQgbjwwg_AAVvX6V";
    const clientSecret =
      "EAMlyb9e40LSR670f4g_1OQlg0_z_zZerOyMlQyi4WtYhCeYHlarf6yh75uVIkYRSrGni4Wd4eYZDkjf";

    const response = await axios.post(
      "https://api.sandbox.paypal.com/v1/oauth2/token",
      `grant_type=client_credentials`,
      {
        auth: {
          username: clientId,
          password: clientSecret,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  };
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
      <div className="d-none">
        <Link
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
          type="buttton"
        >
          get token
        </Link>

        <Link
          type="buttton"
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
        </Link>
      </div>
    </>
  );
};

export default PayPalButton;
