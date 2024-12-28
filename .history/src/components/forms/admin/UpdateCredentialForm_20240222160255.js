import React from "react";

export default function UpdateCredentialForm({ show, close, data }) {
  // function submit the form
  const SubmitCredForm = () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };
  // Condition for form as per protocol
  const renderFormFields = () => {
    const protocol = data.protocol;
    switch (protocol) {
      case "smtp":
        return (
          <>
            <input
              type="text"
              placeholder="Host"
              name="host"
              value={state.host || ""}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Port"
              name="port"
              value={state.port || ""}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={state.username || ""}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={state.password || ""}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Encryption"
              name="encryption"
              value={state.encryption || ""}
              onChange={handleInputChange}
            />
          </>
        );
      case "outlook":
        return (
          <>
            <input
              type="text"
              placeholder="Client ID"
              name="client_id"
              value={state.client_id || ""}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Client Secret"
              name="client_secret"
              value={state.client_secret || ""}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Tenant ID"
              name="tenant_id"
              value={state.tenant_id || ""}
              onChange={handleInputChange}
            />
          </>
        );
      case "paypal":
        return (
          <>
            <input
              type="text"
              placeholder="Client ID"
              name="client_id"
              value={state.client_id || ""}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Client Secret"
              name="client_secret"
              value={state.client_secret || ""}
              onChange={handleInputChange}
            />
          </>
        );
      case "razorpay":
        return (
          <>
            <input
              type="text"
              placeholder="Client ID"
              name="client_id"
              value={state.client_id || ""}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Client Secret"
              name="client_secret"
              value={state.client_secret || ""}
              onChange={handleInputChange}
            />
          </>
        );
      case "stripe":
        return (
          <>
            <input
              type="text"
              placeholder="Client ID"
              name="client_id"
              value={state.client_id || ""}
              onChange={handleInputChange}
            />
          </>
        );
      case "braintree":
        return (
          <>
            <input
              type="text"
              placeholder="Client ID"
              name="client_id"
              value={state.client_id || ""}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Client Secret"
              name="client_secret"
              value={state.client_secret || ""}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Tenant ID"
              name="tenant_id"
              value={state.tenant_id || ""}
              onChange={handleInputChange}
            />
          </>
        );
      default:
        return null;
    }
  };
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <>
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          data-dismiss="modal"
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white rounded h-100 px-11 pt-7">
          <form onSubmit={handleSubmit}>
            <h5 className="text-center pt-2 mb-7">Configure Protocol</h5>
            {renderFormFields()}
            <div className="form-group text-center">
              {loading ? (
                <button
                  className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                  type="button"
                  disabled
                >
                  Loading...
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
          </form>
        </div>
      </>
    </Modal>
  );
}
