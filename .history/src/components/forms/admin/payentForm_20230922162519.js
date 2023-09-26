import React, { useState, useEffect } from "react";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { GetPaymentList } from "../../../api/api"
import PayForm from "./PayForm";
import Loader from "../../common/loader";
export default function PayentForm() {
  const [apiCall, setApicall] = useState(true);
  const [loading, setLoading] = useState(true);
  const [paymentList, setPaytemList] = useState([]);
  
  let { eid } = useParams()

  // let user = localStorage.getItem("userType")

  /*Function to get Payment list data */
  const PaymentData = async () => {
    try {
      let Response = await GetPaymentList(eid, "employee")
      if (Response.data.data.length === 0) {
        setPaytemList([])
      } else {
        setLoading(false)
        setPaytemList(Response.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  /*Render method */
  useEffect(() => {
    PaymentData()
    if(apiCall ===true){
      setApicall(false)
    }
  }, [apiCall])



  return (
    <>
      <ToastContainer />
      <div className="bg-white rounded h-100 px-10 overflow-y-hidden">
        {/* <h5 className="text-center pt-2 mb-7">Follow Ups</h5> */}
        <div className="row">
          {loading ? (
            <Loader load={"yes"} />
          ) : (<div className="activity_container col-md-8 border-right">
            {paymentList.length === 0 ?
              <div className="single_note mb-5">
                <div className="d-flex justify-content-center">
                  <p className="text-italic font-size-3 m-0">
                    No Data Found
                  </p>
                </div>
              </div> :
              (paymentList || []).map((res, index) => (
                <div className="single_note mb-5" key={index}>
                  <div className="d-flex justify-content-between">
                    <p className="text-italic font-size-3 m-0">
                      Payment on: {moment(res.created_at).format("Do MM YYYY, h:mm:ss a")}
                    </p>
                  </div>
                  <div className="card rounded-3 py-2 px-5">
                    <p className="fw-bold m-0 row">
                      <span className="col-10 ">
                      <span><b >Payment mode</b>: {res.payment_mode}</span><br/>
                      <span><b >Payment Id</b>: {res.payment_id}</span><br/>
                      <span><b >order Id</b>: {res.order_id}</span><br/>
                      <span><b >Total Amount</b>: {res.amount}/-</span>
                      </span>
                      <span className="col-2">{res.status}</span>
                    </p>
                  </div>
                </div>
              ))}
          </div>)}
          <PayForm setApicall={setApicall}/>
        </div>
      </div>
      {/* </Modal> */}
    </>
  );
}
