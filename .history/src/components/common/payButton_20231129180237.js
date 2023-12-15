import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // You might need to import the appropriate toast library

function RazorPay() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [userData, setUserData*/] = useState({
  //   cart: [], // Initialize with your cart structure
  // });

  useEffect(() => {
    // Fetch user data when the component mounts
    // Replace this with your actual fetchUserData function
    // fetchUserData()
    // .then((data) => {
    //   setUserData(data);
    // })
    // .catch((error) => {
    //   console.error(error.message);
    // });
  }, []);

  // const fetchUserData = async () => {
  //   try {
  //     // Replace this with your actual API endpoint
  //     const response = await axios.get("http://localhost:8080/user/data");
  //     return response.data; // Modify this based on your API response structure
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // };

  const handlePay = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("RazorPay SDK failed to load");
    };
    script.onload = async () => {
      try {
        setLoading(true);
        // const total = userData.cart.reduce((a, b) => a + +b.price, 0).toFixed(0);
        const result = await axios.post(
          "http://192.168.29.92/canjobs_razorpay/common/creatOrder",
          {
            price: 90,
          }
        );

        const { amount, id: orderId, currency } = result.data.data;

        // const getkey = await axios.get("http://localhost:8080/payment/get-razorpay-key");
        const key = "rzp_test_m5J59Uvpq9YHDx";
        const options = {
          key: key,
          amount: amount.toString(),
          currency: currency,
          name: "We2code PVT LTD",
          description: "FIRST RAZOR PAY",
          order_id: orderId,
          handler: async function (response) {
            await axios.put(
              "http://192.168.29.92/canjobs_razorpay/common/addPaymentReceipt",
              {
                amount: amount,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpay0rderId: response.razorpay_order_id,
                razorpaysighature: response.razorpay_signature,
              }
            );
            // Perform any additional actions on successful payment here
            toast.success("Payment Successful.", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 5000,
            });

            navigate("/");
          },
          prefill: {
            name: "We2code PVT LTD",
            email: "ashish.we2code@gmail.com",
            contact: "9754869920",
          },
        };
        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        alert(error);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  };

  return (
    <div>
      <Button className="btn btn-primary" onClick={handlePay}>
        PAY
      </Button>{" "}
      {loading && <h3>...Loading please wait</h3>}
    </div>
  );
}

export default RazorPay;
