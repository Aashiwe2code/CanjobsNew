import React from "react";
// import { MdOutlineAddTask, MdPersonRemove } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiPhoneCall } from "react-icons/bi";
import { BsEnvelope } from "react-icons/bs";
import CustomButton from "./button";
export default function ExecutiveBox({ data, index }) {
  // const [activeIndex, setActiveIndex] = useState(null);

  /*Function to SHow hide the Tasks to assigned */
  // const handleToggle = (index) => {
  //   setActiveIndex(index === activeIndex ? null : index);
  // };
  /*Functo to remove assigned executive */
  // const RemoveAssined = async () => {
  // };
  return (
    <div>
      <div className="accordion mt-2">
        <div className="card">
          <div className="card-header bg-white" id={`headingOne${index}`}>
            <div className=" d-flex justify-content-between flex-row">
              <div className=" d-flex flex-column w-100">
                <div className="d-flex executive_box gx-2  align-items-center">
                  <div className="circle-48 mx-auto overflow-hidden">
                    {/* {empdata.profile_photo === null ? ( */}
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      alt=""
                      className="w-100"
                    />
                    {/* ) : (
                                  <img
                                    src={empdata.profile_photo}
                                    alt=""
                                    className="w-100"
                                  />
                                )} */}
                  </div>

                  <div className="mb-0 d-flex justify-content-between w-100">
                    {/* {empdata.name === null ||
                              empdata.name === undefined ||
                              empdata.name === "undefined" ||
                              empdata.name === "" ? (
                                <p className="font-size-3  mb-0">N/A</p>
                              ) : ( */}
                    <div>
                      <p className="m-0 text-black-2 font-weight-bold text-capitalize">
                        {data.name}{" "}
                        <span className="text-gray font-size-3 m-0 text-capitalize">
                          ({data.admin_type})
                        </span>
                      </p>
                      <div className="col-md-3 col-sm-6 px-5 pt-5 pb-5 border-right">
                        <div className="d-flex justify-content-between align-items-center">
                          <Link
                            className="text-dark font-size-5 w-100 text-break"
                            to={`mailto:${data.email}`}
                          >
                            <BsEnvelope className="text-primary font-size-5 " />
                            {data.email}
                          </Link>
                          <CustomButton
                            title={"Send Custom Email"}
                            className="font-size-4 rounded-3 btn-primary py-0 d-none"
                            /*Functionalities have to be done. */
                          >
                            {/*Take off "d-none" when you Send Custom Email API or when you're told to remove it*/}
                            <RiMailSendLine />
                          </CustomButton>
                        </div>
                        {data.contact_no && (
                          <Link
                            className="text-dark font-size-5 w-100"
                            to={`tel:${data.contact_no}`}
                          >
                            <BiPhoneCall className="text-primary font-size-5" />
                            {data.contact_no}
                          </Link>
                        )}
                      </div>
                    </div>
                    {/* <div className="text-right">
                      <p className="text-gray font-size-3 mb-1">
                        <Link to={""} className="text-gray">
                          {data.email}
                        </Link>
                      </p>
                      <p className="text-gray font-size-3 m-0 text-capitalize">
                        <Link to={""} className="text-gray">
                          {data.contact_no}
                        </Link>
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <div className="btn-group button_group flex-shrink-1">
                <button
                  // onClick={() => AddTask()}
                  title="Add task"
                  className={`btn btn-outline-info action_btn ${
                    index === activeIndex ? "" : "collapsed"
                  }`}
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  onClick={() => handleToggle(index)}
                >
                  <span className="text-gray">
                    <MdOutlineAddTask />
                  </span>
                </button>
                <button
                  className="btn btn-outline-info action_btn"
                  onClick={() => RemoveAssined()}
                  title="Remove Assigned"
                >
                  <span className=" text-danger">
                    <MdPersonRemove />
                  </span>
                </button>
              </div> */}
            </div>
          </div>

          <div
            id={`collapseOne${index}`}
            className={`collapse d-none`}
            // {/*index === activeIndex ? "show" : ""*/}
            aria-labelledby={`headingOne${index}`}
            data-parent="#accordion"
          >
            <div className="card-body d-flex justify-content-between">
              <div className="card-text row">
                <div
                  className={`sub-stage text-capitalize col-md-6`}
                  // onClick={() => handleSubStageSelection(expandedStatus, subStage)}
                >
                  <input
                    type="checkbox"
                    className="mx-2"
                    // checked={(selectedStatus || []).some(
                    //   (data) => data.substage === subStage
                    // )}
                    // readOnly
                  />
                  Lmia
                </div>
                <div
                  className={`sub-stage text-capitalize col-md-6`}
                  // onClick={() => handleSubStageSelection(expandedStatus, subStage)}
                >
                  <input
                    type="checkbox"
                    className="mx-2"
                    // checked={(selectedStatus || []).some(
                    //   (data) => data.substage === subStage
                    // )}
                    // readOnly
                  />
                  Visa
                </div>
                <div
                  className={`sub-stage text-capitalize col-md-6`}
                  // onClick={() => handleSubStageSelection(expandedStatus, subStage)}
                >
                  <input
                    type="checkbox"
                    className="mx-2"
                    // checked={(selectedStatus || []).some(
                    //   (data) => data.substage === subStage
                    // )}
                    // readOnly
                  />
                  Job
                </div>
                <div
                  className={`sub-stage text-capitalize col-md-6`}
                  // onClick={() => handleSubStageSelection(expandedStatus, subStage)}
                >
                  <input
                    type="checkbox"
                    className="mx-2"
                    // checked={(selectedStatus || []).some(
                    //   (data) => data.substage === subStage
                    // )}
                    // readOnly
                  />
                  Interview
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
