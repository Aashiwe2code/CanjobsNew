import React, { useState } from "react";
import { UpdateCredentialApi } from "../../../api/api";
import useValidation from "../../common/useValidation";
import { Modal } from "react-bootstrap";
export default function UpdateCredentialForm({ show, close, data }) {
  const [loading, setLoading] = useState(false);
  // INITIAL STATE ASSIGNMENT
  const initialFormStateuser = {
    id: data.id,
    protocol: data.protocol,
    host: data.host,
    port: data.port,
    username: data.username,
    password: data.password,
    encryptoion: data.encryptoion,
    client_id: data.client_id,
    client_secret: data.client_secret,
    tenantId: data.tenantId,
  };

  /* Functionality to close the modal */
  const closeModal = () => {
    setState(initialFormStateuser);
    setErrors("");
    setLoading(false);
    close();
  };

  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, validate, setErrors } =
    useValidation(initialFormStateuser, validators);
  // function submit the form
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
    >
      <>
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          data-dismiss="modal"
          onClick={closeModal}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white rounded h-100 px-11 pt-7">
          <form onSubmit={SubmitCredForm}>
            <h5 className="text-center pt-2 mb-7">Update Caredential's </h5>
            <div className="row pt-5">
              {/* New fields */}
              <div className="form-group col-md-4">
                <label
                  htmlFor="username"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Client Name :
                </label>
                <input
                  type="text"
                  name="usernamee"
                  value={state.username}
                  onChange={onInputChange}
                  className="form-control"
                  id="username"
                />
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="host"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Host:
                </label>
                <input
                  type="text"
                  name="host"
                  value={state.host}
                  onChange={onInputChange}
                  className="form-control"
                  id="host"
                />
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="port"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Port:
                </label>
                <input
                  type="text"
                  name="port"
                  value={state.port}
                  onChange={onInputChange}
                  className="form-control"
                  id="port"
                />
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="encryptoion"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Encryptoion:
                </label>
                <input
                  type="text"
                  name="encryptoion"
                  value={state.encryptoion}
                  onChange={onInputChange}
                  className="form-control"
                  id="encryptoion"
                />
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="client_id"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Client Id:
                </label>
                <input
                  type="text"
                  name="client_id"
                  value={state.client_id}
                  onChange={onInputChange}
                  className="form-control"
                  id="client_id"
                />
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="client_secret"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Client secret:
                </label>
                <input
                  type="text"
                  name="client_secret"
                  value={state.client_secret}
                  onChange={onInputChange}
                  className="form-control"
                  id="client_secret"
                />
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="tenantId"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Tenant Id:
                </label>
                <input
                  type="text"
                  name="tenantId"
                  value={state.tenantId}
                  onChange={onInputChange}
                  className="form-control"
                  id="tenantId"
                />
              </div>

              {/* Submit button */}
              <div className="form-group text-center">
                {loading === true ? (
                  <button
                    className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                    type="button"
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
