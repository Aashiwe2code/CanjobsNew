import React, { useEffect, useState } from "react";
// import { Button, Form, InputGroup } from "react-bootstrap";
// import NotificationsCard from "./notificationsCard";
import {
  ReadNotification,
  getAllMentionNotification /*getAllAdminNotification*/,
} from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
function Notifications({
  userId,
  setDocId,
  setNotificationDoc,
  setSelecttDocTypeName,
  notificationApiCall,
  setNotificationApiCall,
  user_type,
}) {
  const [show, setshow] = useState(false);
  let [totalNotif, setTotalNotif] = useState(true);
  let [notification, setNotiication] = useState([]);
  const [apicall, setApicall] = useState(false);
  let navigate = useNavigate();
  let loginuserId =
    user_type === "admin"
      ? localStorage.getItem("admin_id")
      : user_type === "user"
      ? localStorage.getItem("employee_id")
      : user_type === "agent"
      ? localStorage.getItem("agent_id")
      : "";
  /*notification API Call*/
  const Notiication = async () => {
    try {
      let Response = await getAllMentionNotification(loginuserId); //getAllAdminNotification();
      setNotiication(Response.Data.data);
      setTotalNotif(Response.Data.total_rows);
    } catch (err) {
      console.log(err);
    }
    setApicall(false);
  };
  useEffect(() => {
    Notiication();
    if (notificationApiCall === true) {
      setNotificationApiCall(false);
    }
  }, [apicall, notificationApiCall]);
  /*Function to set the color code to the background of the user name */
  const determineBackgroundColor = (commentItem) => {
    const colorClasses = [
      "bg-primary-opacity-7",
      "bg-warning-opacity-7",
      "bg-orange-opacity-6",
      "bg-info-opacity-7",
      "bg-secondary-opacity-7",
      "bg-danger-opacity-6",
      "bg-info-opacity-visible",
    ];

    const assignedUserId = commentItem.assigned_to_user_id;

    // Create a mapping dynamically based on assignedUserId
    const userColorMap = {};

    // Check if assignedUserId is present in the mapping
    if (assignedUserId && userColorMap.hasOwnProperty(assignedUserId)) {
      return userColorMap[assignedUserId];
    }

    // If not found in the mapping, use the colorClasses logic
    const id = commentItem.id;
    const hashCode = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
      }
      return hash;
    };

    const hash = Math.abs(hashCode(id.toString()));
    const index = hash % colorClasses.length;

    return colorClasses[index];
  };
  return (
    <div className="global_search_box  position-relative">
      <i
        style={{ cursor: "pointer" }}
        className="fas fa-regular fa-bell text-dark mx-5"
        onClick={() => setshow(true)}
      ></i>
      {totalNotif > 0 ? (
        <div className="bg-primary text-white notification_count">
          {totalNotif}
        </div>
      ) : (
        ""
      )}
      <div
        className={
          show
            ? " d-flex global_search_content notification_box position-fixed show"
            : " d-flex global_search_content notification_box position-fixed"
        }
      >
        <div className="left_side" onClick={() => setshow(false)}></div>
        <div className="right_side bg-white">
          <div className="global_search d-flex align-items-center p-3 px-5 justify-content-between">
            <h4 className="font-size-5 font-weight-bold m-0 border-bottom text-uppercase px-5">
              Notifications
            </h4>
            <i
              style={{ fontSize: "22px" }}
              className="fas fa-times text-dark ml-4"
              onClick={() => setshow(false)}
            ></i>
          </div>
          <div className="row global_search_result notofications_list  px-5 ">
            {notification.length > 0 && (
              <ul className="w-100 col p-0 ">
                {notification.map((data) => (
                  <li
                    key={data.id}
                    title={data.message}
                    className={
                      data.is_read === "1"
                        ? " dropdown-item border-bottom  border-hit-gray font-size-3 text-wrap "
                        : " font-weight-bold bg-light dropdown-item border-bottom  border-hit-gray font-size-3 text-wrap "
                    }
                  >
                    <Link
                      to={
                        data.subject === "added_new_job"
                          ? "/job"
                          : data.subject === "applied_on_job"
                          ? "/responses"
                          : data.subject === "interview_scheduled"
                          ? "/interview"
                          : ""
                      }
                      onClick={() => {
                        try {
                          // setDocId(data.mention_id);
                          setshow(false);
                          navigate(
                            `/${data.employee_id}?docId=${data.mention_id}`
                          );
                          ReadNotification(data.id);
                          // setNotificationDoc(1);
                          // setSelecttDocTypeName("");
                          navig;
                        } catch (err) {
                          console.log(err);
                        }
                        setApicall(true);
                        // Notiication();
                      }}
                      className="text-truncate-2 text-dark"
                    >
                      <div>
                        <div className="d-flex profile_box gx-2 mb-1 ">
                          <div className="col-8 flex-start text-start">
                            <div className="media  align-items-center">
                              <div
                                className={`col circle-24 mx-auto overflow-hidden text-capitalize text-white ${determineBackgroundColor(
                                  data
                                )}`}
                                style={{ fontSize: "20px" }}
                              >
                                {data.reciver_name
                                  ? data.reciver_name.charAt(0)
                                  : ""}
                              </div>
                              <div className="font-size-3 font-weight-bold text-capitalize col">
                                {data.reciver_name ? data.reciver_name : ""}
                              </div>
                            </div>
                          </div>
                          <div className="date flex-end text-end col-4">
                            {moment(data.created_at).format("HH:mm D MMM")}
                          </div>
                        </div>
                        <div className="message mt-3 mx-3">
                          {data.message.replace("a", "Hi")}
                        </div>
                      </div>
                      {/* {data.message.replace("a", "Hi")} */}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
