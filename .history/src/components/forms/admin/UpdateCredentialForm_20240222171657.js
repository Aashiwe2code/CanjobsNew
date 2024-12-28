// import React, { useState } from "react";
// import { UpdateCredentialApi } from "../../../api/api";
// import useValidation from "../../common/useValidation";
// import { Modal } from "react-bootstrap";
// export default function UpdateCredentialForm({ show, close, data }) {
//   const [loading, setLoading] = useState(false);
//   console.log(data.protocol);
//   // INITIAL STATE ASSIGNMENT
//   const initialFormStateuser = {
//     id: data.id || "",
//     protocol: data.protocol || "",
//     host: data.host || "",
//     port: data.port || "",
//     username: data.username || "",
//     password: data.password || "",
//     encryptoion: data.encryptoion || "",
//     client_id: data.client_id || "",
//     client_secret: data.client_secret || "",
//     tenantId: data.tenantId || "",
//   };

//   /* Functionality to close the modal */
//   const closeModal = () => {
//     setState(initialFormStateuser);
//     setErrors("");
//     setLoading(false);
//     close();
//   };

//   const validators = {};
//   // CUSTOM VALIDATIONS IMPORT
//   const { state, setState, onInputChange, errors, validate, setErrors } =
//     useValidation(initialFormStateuser, validators);
//   // function submit the form
//   const SubmitCredForm = async () => {
//     try {
//       setLoading(true);
//       let res = await UpdateCredentialApi(state);
//       console.log(res);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };
//   return (
//     <Modal
//       show={show}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <>
//         <button
//           type="button"
//           className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
//           data-dismiss="modal"
//           onClick={closeModal}
//         >
//           <i className="fas fa-times"></i>
//         </button>
//         <div className="bg-white rounded h-100 px-11 pt-7">
//           <form onSubmit={SubmitCredForm}>
//             <h5 className="text-center pt-2 mb-7">Update Credential's</h5>
//             <div className="row pt-5">
//               {/* New fields */}
//               <div
//                 className={`form-group col-md-4 ${
//                   data.protocol === "outlook" ||
//                   data.protocol === "paypal" ||
//                   data.protocol === "razorpay" ||
//                   data.protocol === "stripe" ||
//                   data.protocol === "braintree"
//                     ? "done"
//                     : ""
//                 }`}
//               >
//                 <label
//                   htmlFor="username"
//                   className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
//                 >
//                   User Name :
//                 </label>
//                 <input
//                   placeholder="Enter User Name"
//                   type="text"
//                   name="usernamee"
//                   value={state.username}
//                   onChange={onInputChange}
//                   className="form-control"
//                   id="username"
//                 />
//               </div>
//               <div
//                 className={`form-group col-md-4 ${
//                   data.protocol === "outlook" ||
//                   data.protocol === "paypal" ||
//                   data.protocol === "razorpay" ||
//                   data.protocol === "stripe" ||
//                   data.protocol === "braintree"
//                     ? "done"
//                     : ""
//                 }`}
//               >
//                 <label
//                   htmlFor="host"
//                   className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
//                 >
//                   Host:
//                 </label>
//                 <input
//                   placeholder="Enter Host"
//                   type="text"
//                   name="host"
//                   value={state.host}
//                   onChange={onInputChange}
//                   className="form-control"
//                   id="host"
//                 />
//               </div>
//               <div
//                 className={`form-group col-md-4 ${
//                   data.protocol === "outlook" ||
//                   data.protocol === "paypal" ||
//                   data.protocol === "razorpay" ||
//                   data.protocol === "stripe" ||
//                   data.protocol === "braintree"
//                     ? "done"
//                     : ""
//                 }`}
//               >
//                 <label
//                   htmlFor="port"
//                   className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
//                 >
//                   Port:
//                 </label>
//                 <input
//                   placeholder="Enter Port"
//                   type="text"
//                   name="port"
//                   value={state.port}
//                   onChange={onInputChange}
//                   className="form-control"
//                   id="port"
//                 />
//               </div>
//               <div
//                 className={`form-group col-md-4 ${
//                   data.protocol === "outlook" ||
//                   data.protocol === "paypal" ||
//                   data.protocol === "razorpay" ||
//                   data.protocol === "stripe" ||
//                   data.protocol === "braintree"
//                     ? "done"
//                     : ""
//                 }`}
//               >
//                 <label
//                   htmlFor="encryptoion"
//                   className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
//                 >
//                   Encryption:
//                 </label>
//                 <input
//                   placeholder="Enter Encryption"
//                   type="text"
//                   name="encryptoion"
//                   value={state.encryptoion}
//                   onChange={onInputChange}
//                   className="form-control"
//                   id="encryptoion"
//                 />
//               </div>
//               <div
//                 className={`form-group col-md-4 ${
//                   data.protocol === "smtp" ? "done" : ""
//                 }`}
//               >
//                 <label
//                   htmlFor="client_id"
//                   className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
//                 >
//                   Client Id:
//                 </label>
//                 <input
//                   placeholder="Enter Client Id"
//                   type="text"
//                   name="client_id"
//                   value={state.client_id}
//                   onChange={onInputChange}
//                   className="form-control"
//                   id="client_id"
//                 />
//               </div>
//               <div
//                 className={`form-group col-md-4 ${
//                   data.protocol === "smtp" || data.protocol === "stripe"
//                     ? "done"
//                     : ""
//                 }`}
//               >
//                 <label
//                   htmlFor="client_secret"
//                   className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
//                 >
//                   Client secret:
//                 </label>
//                 <input
//                   placeholder="Enter Client secret"
//                   type="text"
//                   name="client_secret"
//                   value={state.client_secret}
//                   onChange={onInputChange}
//                   className="form-control"
//                   id="client_secret"
//                 />
//               </div>
//               <div
//                 className={`form-group col-md-4 ${
//                   data.protocol === "smtp" ||
//                   data.protocol === "paypal" ||
//                   data.protocol === "razorpay" ||
//                   data.protocol === "stripe"
//                     ? "done"
//                     : ""
//                 }`}
//               >
//                 <label
//                   htmlFor="tenantId"
//                   className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
//                 >
//                   Tenant Id:
//                 </label>
//                 <input
//                   placeholder="Enter Tenant Id"
//                   type="text"
//                   name="tenantId"
//                   value={state.tenantId}
//                   onChange={onInputChange}
//                   className="form-control"
//                   id="tenantId"
//                 />
//               </div>
//               <div
//                 className={`form-group col-md-4 ${
//                   data.protocol === "outlook" ||
//                   data.protocol === "paypal" ||
//                   data.protocol === "razorpay" ||
//                   data.protocol === "stripe" ||
//                   data.protocol === "braintree"
//                     ? "done"
//                     : ""
//                 }`}
//               >
//                 <label
//                   htmlFor="password"
//                   className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
//                 >
//                   Password:
//                 </label>
//                 <input
//                   placeholder="Enter Password"
//                   type="password"
//                   name="password"
//                   value={state.tenantId}
//                   onChange={onInputChange}
//                   className="form-control"
//                   id="password"
//                 />
//               </div>

//               {/* Submit button */}
//               <div className="form-group text-center">
//                 {loading === true ? (
//                   <button
//                     className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
//                     type="button"
//                   >
//                     <span
//                       className="spinner-border spinner-border-sm "
//                       role="status"
//                       aria-hidden="true"
//                     ></span>
//                     <span className="sr-only">Loading...</span>
//                   </button>
//                 ) : (
//                   <button
//                     className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
//                     type="submit"
//                   >
//                     Submit
//                   </button>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>
//       </>
//     </Modal>
//   );
// }
import React, { useState } from "react";
import { UpdateCredentialApi } from "../../../api/api";
import useValidation from "../../common/useValidation";
import { Modal } from "react-bootstrap";

export default function UpdateCredentialForm({ show, close, data }) {
  const [loading, setLoading] = useState(false);

  // Initial form state
  const initialFormState = {
    id: data.id || "",
    protocol: data.protocol || "",
    host: data.host || "",
    port: data.port || "",
    username: data.username || "",
    password: data.password || "",
    encryption: data.encryption || "",
    client_id: data.client_id || "",
    client_secret: data.client_secret || "",
    tenantId: data.tenantId || "",
  };

  // Function to close the modal
  const closeModal = () => {
    setState(initialFormState);
    setErrors("");
    setLoading(false);
    close();
  };

  // Validation logic
  const validators = {};
  const { state, setState, onInputChange, errors, validate, setErrors } =
    useValidation(initialFormState, validators);

  // Submit form function
  const SubmitCredForm = async () => {
    try {
      setLoading(true);
      let res = await UpdateCredentialApi(state);
      console.log(res);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={show ? "" : "d-none"} // Apply d-none class when show is false
    >
      <>
        {/* Modal close button */}
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          data-dismiss="modal"
          onClick={closeModal}
        >
          <i className="fas fa-times"></i>
        </button>
        {/* Modal content */}
        <div className="bg-white rounded h-100 px-11 pt-7">
          <form onSubmit={SubmitCredForm}>
            <h5 className="text-center pt-2 mb-7">Update Credentials</h5>
            <div className="row pt-5">
              {/* Conditionally render input fields based on protocol */}
              {data.protocol === "outlook" ||
              data.protocol === "paypal" ||
              data.protocol === "razorpay" ||
              data.protocol === "stripe" ||
              data.protocol === "braintree" ? (
                <>
                  <div className="form-group col-md-4">
                    <label htmlFor="username">User Name :</label>
                    <input
                      placeholder="Enter User Name"
                      type="text"
                      name="username"
                      value={state.username}
                      onChange={onInputChange}
                      className="form-control"
                      id="username"
                    />
                  </div>
                  {/* Add other input fields for specific protocols */}
                </>
              ) : null}
              {data.protocol === "smtp" ? (
                <>
                  <div className="form-group col-md-4">
                    <label htmlFor="client_id">Client Id:</label>
                    <input
                      placeholder="Enter Client Id"
                      type="text"
                      name="client_id"
                      value={state.client_id}
                      onChange={onInputChange}
                      className="form-control"
                      id="client_id"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="client_secret">Client secret:</label>
                    <input
                      placeholder="Enter Client secret"
                      type="text"
                      name="client_secret"
                      value={state.client_secret}
                      onChange={onInputChange}
                      className="form-control"
                      id="client_secret"
                    />
                  </div>
                  {/* Add other input fields for specific protocols */}
                </>
              ) : null}
              {/* Add more conditions for other protocols */}
              {/* Common input field for password */}
              <div className="form-group col-md-4">
                <label htmlFor="password">Password:</label>
                <input
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={onInputChange}
                  className="form-control"
                  id="password"
                />
              </div>
              {/* Submit button */}
              <div className="form-group text-center col-md-12">
                {loading ? (
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
                    className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                    type="submit"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </>
    </Modal>
  );
}
