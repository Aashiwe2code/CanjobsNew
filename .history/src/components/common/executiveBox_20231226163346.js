import React, { useState } from "react";
// import { MdOutlineAddTask, MdPersonRemove } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RemoveExecutiveTeam } from "../../api/api";
export default function ExecutiveBox({
  data,
  index,
  setExecutiveApiCall,
  selected,
}) {
  // const [activeIndex, setActiveIndex] = useState(null);

  /*Function to SHow hide the Tasks to assigned */
  // const handleToggle = (index) => {
  //   setActiveIndex(index === activeIndex ? null : index);
  // };
  /*Functo to remove assigned executive */
  // const RemoveAssined = async () => {
  // };
  const [selectedStatus, setSelectedStatus] = useState(selected);

  /*Function to remove asign memeber to the manager */
  const HandleRemoveexecutive = async (Eid) => {
    try {
      let Response = await RemoveExecutiveTeam(Eid);
      if (Response.message === "successfully") {
        toast.success("Executive unassigned successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setSelectedStatus(
          selectedStatus.filter((item) => item.admin_id !== Eid)
        );
        setExecutiveApiCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
                      </p>
                      <p className="text-gray font-size-3 m-0 text-capitalize">
                        ({data.admin_type})
                      </p>
                    </div>
                    <div className="text-right">
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
                    </div>
                  </div>
                  <div
                    className="comment_status_update text-end"
                    style={{
                      cursor: "pointer",
                      // color: commentItem.status === "0" ? "blue" : "white",
                      // border: commentItem.status === "0" ? "solid 1px blue" : "",
                      // backgroundColor: commentItem.status === "1" && "green",
                    }}
                    onClick={(e) => {
                      HandleRemoveexecutive(data.admin_id);
                    }}
                  >
                    &times; {/* Chross symbol */}
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
        </div>
      </div>
    </div>
  );
}
