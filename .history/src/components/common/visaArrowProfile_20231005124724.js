import React from "react";

export default function VisaArrowProfile({
  visaStatus,
  visaStatusRejectComment,
}) {
  return (
    <div className="bg-white w-100 d-flex flex-wrap mb-1">
      <div className="arrow-wrapper custome_arrow_wrapper w-100 d-flex flex-wrap mb-0">
        {(visaStatus || []).map((item, i) => {
          return (
            // Check for empty or undefined visa_status and skip rendering if true
            item.visa_status === "" ||
              item.visa_status === null ||
              item.visa_status === undefined ||
              item.visa_status === "undefined" ? null : (
              <div
                className={
                  "arrow-steps p-1 px-7 col-md-12 d-flex border-right border-bottom "
                }
                key={i}
              >
                <div className="job_name text-dark">
                  <span className="m-2 font-size-2 d-block mb-1">VISA</span>
                </div>
                <div>
                  <div
                    key={i + 1}
                    className={` step text-capitalize ${
                      item.visa_status === "documentation" ||
                      item.visa_status === "file preparation" ||
                      item.visa_status === "file review" ||
                      item.visa_status === "file submission" ||
                      item.visa_status === "file decision"
                        ? "approved"
                        : item.visa_status === "onboard"
                        ? "pending"
                        : ""
                    }`}
                  >
                    <span>onboard</span>
                  </div>
                  <div
                    key={i + 2}
                    className={` step text-capitalize ${
                      item.visa_status === "file preparation" ||
                      item.visa_status === "file review" ||
                      item.visa_status === "file submission" ||
                      item.visa_status === "file decision"
                        ? "approved"
                        : item.visa_status === "documentation"
                        ? "pending"
                        : ""
                    }`}
                  >
                    <span>documentation</span>
                  </div>
                  <div
                    key={i + 3}
                    className={` step text-capitalize ${
                      item.visa_status === "file review" ||
                      item.visa_status === "file submission" ||
                      item.visa_status === "file decision"
                        ? "approved"
                        : item.visa_status === "file preparation"
                        ? "pending"
                        : ""
                    }`}
                  >
                    <span>file preparation</span>
                  </div>
                  <div
                    key={i + 4}
                    className={` step text-capitalize ${
                      item.visa_status === "file submission" ||
                      item.visa_status === "file decision"
                        ? "approved"
                        : item.visa_status === "file review"
                        ? "pending"
                        : ""
                    }`}
                  >
                    <span>file review</span>
                  </div>
                  <div
                    key={i + 5}
                    className={` step text-capitalize ${
                      item.visa_status === "file decision"
                        ? "approved"
                        : item.visa_status === "file submission"
                        ? "pending"
                        : ""
                    }`}
                  >
                    <span>file submission</span>
                  </div>
                  {/* <div
                    key={i + 6}
                    className={` step text-capitalize ${
                      item.visa_status === "file decision"
                        ? "approved"
                        : null
                    }`}
                  >
                    <span>file decision</span>
                  </div> */}
                  {/*Comment for the decision status of the visa*/}
                  {item.visa_status === "file decision" &&
                  visaStatusRejectComment[i] !== undefined ? (
                    (visaStatusRejectComment[i] || []).map((subitem, i) => {
                      return subitem.misc_id === item.visa_id ? (
                        <div
                          key={i}
                          className={` step text-capitalize ${
                            subitem.substage === "approved"
                              ? "approved"
                              : subitem.substage === "rejected"
                              ? "rejected"
                              : "pending"
                          }`}
                        >
                          <span>
                            {subitem.substage === "approved"
                              ? "Approved"
                              : subitem.substage === "rejected"
                              ? "Rejected"
                              : "awaiting decision"}
                          </span>
                        </div>
                      ) : // <small className="mx-10" key={i}>
                      // {subitem.substage === "approved"
                      //   ? "Congratulation your Visa is Approved"
                      //   : subitem.substage === "awaiting decision"
                      //   ? "Your Visa is in progress"
                      //   : subitem.substage === "rejected"
                      //   ? "Sorry to inform you your Visa got rejected."
                      //   : ""}
                      // </small>
                      null;
                    })
                  ) : (
                    <div
                      key={i + 6}
                      className={` step text-capitalize ${
                        item.visa_status === "file decision" ? "pending" : ""
                      }`}
                    >
                      <span>awaiting decision</span>
                    </div>
                  )}
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
