import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import FilterJson from "../../json/filterjson";
import { AddEmployeeDetails, AddUpdateVisa } from "../../../api/api";
import { toast } from "react-toastify";
export default function ApplicantsStatusModal(props) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  /*function to change applicants status */
  const OnStatusChangesClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = {
      employee_id: props.data.employee_id,
      status: status,
    };
    try {
      let response = await AddEmployeeDetails(data);
      if (response.message === "Employee data updated successfully") {
        toast.success("Employee status changes successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        console.log(data, !props.data.visa_status);
        if (data.status === "retained" && !props.data.visa_status) {
          let state = { status: "onboard" };
          try {
            let VisaResponse = await AddUpdateVisa(
              props.data.employee_id,
              state
            );
            if (VisaResponse.data.message === "visa inserted successfully") {
              props.setApiCall(true);
              setLoading(false);
              props.close();
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  /*Function to start visa */
  //  const visaStatus =async()=>{
  //   let state = { status: "onboard", country: props.data.location }
  //  try{
  //    let VisaResponse = await AddUpdateVisa(props.data.employee_id, state);
  //   if (VisaResponse.data.message === "visa inserted successfully") {}
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  // useEffect(() => {
  // if(status === "retained" &&  !props.data.visa_status ){
  //   visaStatus()
  // }
  // }, [status])
  return (
    <Modal
      show={props.show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <button
        type="button"
        className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
        data-dismiss="modal"
        onClick={props.close}
      >
        <i className="fas fa-times"></i>
      </button>
      {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
      <div className="bg-white rounded h-100 p-7">
        <form onSubmit={OnStatusChangesClick}>
          <h5 className="text-center mb-7">Change Applicants Status</h5>
          <div className="form-group d-flex mb-3 p-0">
            <label
              htmlFor="skill"
              className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
            >
              Status <span className="text-danger">*</span> :
            </label>
            <select
              value={status || props.data.status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              className={
                // !isTimeWithin24Hours(empdata.created_at) && empdata.status === "1" ? "bg-danger form-control text-white" :
                "text-capitalize form-control"
              }
            >
              {/* <option value={""}>Select Applicants status</option>
              {
              props.self === "yes" ? (
                <option value={1}>Approve</option>
              ) : (
                
              )} */}
              {(FilterJson.employee_status || []).map((item, index) => {
                return (
                  <option value={index + 1} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group text-center d-flex justify-content-center">
            {loading === true ? (
              <button
                className="btn-primary px-5  mx-2  rounded-5 text-uppercase"
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
                className=" btn-primary px-5  mx-2  rounded-5 text-uppercase"
                type="submit"
              >
                submit
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}
