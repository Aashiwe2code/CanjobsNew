import React, { /*useEffect,*/ useState } from "react";
import useValidation from "../../common/useValidation";
import { SendEmail } from "../../../api/api";
import { toast } from "react-toastify";
import { AiOutlineCloudUpload } from "react-icons/ai";
function SendMailForm({ email, setApiCall }) {
  const [loading, setLoading] = useState(false);
  const [fileBase, setFileBase] = useState(false);
  let AdminEmail = localStorage.getItem("admin_email");
  /*Render function to get the Response*/
  // useEffect(() => {
  // }, []);

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    subject: "",
    description: "",
    email: email,
    adminemail: AdminEmail,
  };

  /*Validation */
  let validators = {
    subject: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Subject is required"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Subject can not have a number."
          : value.length < 2
          ? "Subject should have 2 or more letters"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : "",
    ],
    description: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Description is required"
          : // : /[-]?\d+(\.\d+)?/.test(value)
          // ? "Description can not have a number."
          value.length < 5
          ? "Description should have 2 or more letters"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            "",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, setErrors, validate } =
    useValidation(initialFormState, validators);

  /*Function to convert file to base64 */
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        resolve({ base64: fileReader.result });
      });
      fileReader.readAsDataURL(file);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  /*On change fnction to upload bulk document in 1 array*/
  const handleBulkFileChange = async (event, id) => {
    const files = event.target.files;

    // Check the number of files selected
    if (files.length > 10) {
      toast.error("You can only upload a maximum of 15 files at a time", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    // Continue with file validation and processing
    const allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
    const maxSize = 1024 * 10000; // 10 MB

    const fileList = {};
    let DocRealName;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check file type
      const fileType = `.${file.name.split(".").pop()}`;
      if (!allowedTypes.includes(fileType.toLowerCase())) {
        toast.error(
          `Invalid document type for file '${file.name}'. Allowed types: PDF, DOC, DOCX, JPG, JPEG, PNG`,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          }
        );
        return;
      }

      // Check file size
      if (file.size > maxSize) {
        toast.error(
          `Document size can't be more than 8 MB for file '${file.name}'`,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          }
        );
        return;
      }

      // Read file as data URL
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const encoded = await convertToBase64(file);
      const base64Name = encoded.base64;

      // Construct file object with base64 data
      const DocFile = `data:/${base64Name.split(";")[0].split("/")[1]};${
        base64Name.split(";")[1]
      }`;

      // Use DocRealName as the key for DocFile
      DocRealName = file.name.split(".")[0].replace(/ /g, "_");
      fileList[DocRealName] = DocFile;
    }

    // Store the object of files
    setFileBase(fileList);
  };

  /*Function to sent email*/
  const onContactusClick = async () => {
    if (validate()) {
      try {
        setLoading(true);
        let Response = await SendEmail(state, fileBase);
        if (Response.message === "email sent successfully") {
          toast.success("Email sent successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          setState(initialFormState);
          setErrors("");
          setApiCall(true);
        }
        if (Response.message === "Failed !") {
          toast.error("Something went wrong", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          setState(initialFormState);
          setErrors("");
        }
        if (Response.message === "Fields must not be empty!") {
          toast.error("Something went wrong", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          setState(initialFormState);
          setErrors("");
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <form>
        <div className="row pt-7">
          <div className="form-group col-12 p-0">
            <label
              htmlFor="subject"
              className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
            >
              Subject: <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                maxLength={30}
                name="subject"
                value={state.subject || ""}
                onChange={onInputChange}
                type="text"
                className={
                  errors.subject
                    ? "form-control border border-danger"
                    : "form-control"
                }
                placeholder="subject"
                id="subject"
              />
            </div>
            {/*----ERROR MESSAGE FOR name----*/}
            {errors.subject && (
              <span key={errors.subject} className="text-danger font-size-3">
                {errors.subject}
              </span>
            )}
          </div>
          <div className="form-group col-12 p-0">
            <label
              htmlFor="description"
              className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
            >
              Description: <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <div
                className={
                  errors.description
                    ? "border border-danger rounded overflow-hidden"
                    : "border rounded overflow-hidden"
                }
              >
                <textarea
                  name="description"
                  value={state.description}
                  onChange={onInputChange}
                  rows={8}
                  style={{ height: "140px" }}
                  className={
                    errors.description
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="description"
                  placeholder="Add Note here"
                ></textarea>
              </div>
              {/*----ERROR MESSAGE FOR DESRIPTION----*/}
              {errors.description && (
                <span
                  key={errors.description}
                  className="text-danger font-size-3"
                >
                  {errors.description}
                </span>
              )}
            </div>
          </div>
          <div className="">
            <label className="btn btn-secondary doc_btn">
              <AiOutlineCloudUpload className="font-size-3 mr-2" />
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                style={{ display: "none" }}
                onChange={(e) => {
                  handleBulkFileChange(e);
                }}
                multiple
              />
              Attach Files
            </label>
          </div>
          <div className="form-group col-12 text-center">
            {loading === true ? (
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
                onClick={(e) => onContactusClick(e)}
                className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                type="button"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SendMailForm;
