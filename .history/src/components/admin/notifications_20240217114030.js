import React, { useEffect, useState } from "react";
// import { Button, Form, InputGroup } from "react-bootstrap";
// import NotificationsCard from "./notificationsCard";
import {
  ReadNotification,
  getAllMentionNotification /*getAllAdminNotification*/,
} from "../../api/api";
import { Link } from "react-router-dom";

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
      let Response = await getAllMentionNotification(loginuserId, userId); //getAllAdminNotification();
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
          <div className="row global_search_result notofications_list py-2 px-5 ">
            {notification.length > 0 && (
              <ul className="w-100 col p-0 list-group">
                {notification.map((data) => (
                  <li
                    key={data.id}
                    title={data.message}
                    className={
                      data.is_read === "1"
                        ? "py-5 dropdown-item border-bottom  border-hit-gray font-size-3 text-wrap list-group-item d-flex justify-content-between align-items-start"
                        : "py-5 font-weight-bold bg-light dropdown-item border-bottom  border-hit-gray font-size-3 text-wrap list-group-item d-flex justify-content-between align-items-start"
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
                          setDocId(data.mention_id);
                          setshow(false);
                          ReadNotification(data.id);
                          setNotificationDoc(1);
                          setSelecttDocTypeName("");
                        } catch (err) {
                          console.log(err);
                        }
                        setApicall(true);
                        // Notiication();
                      }}
                      className="text-truncate-2 text-dark"
                    >
                      <div>
                        <div className="d-flex profile_box gx-2 mb-1">
                          <div className="media  align-items-center">
                            <div
                              className={`circle-24 mx-auto overflow-hidden text-capitalize text-white ${determineBackgroundColor(
                                data
                              )}`}
                              style={{ fontSize: "20px" }}
                            >
                              {data.task_creator_user_id
                                ? allAdmin.find(
                                    (item) =>
                                      item.admin_id ===
                                      data.task_creator_user_id
                                  )
                                  ? allAdmin
                                      .find(
                                        (item) =>
                                          item.admin_id ===
                                          data.task_creator_user_id
                                      )
                                      .name.charAt(0)
                                  : ""
                                : ""}
                            </div>
                          </div>
                          <div className=" mb-0">
                            <div className="font-size-3 font-weight-bold text-capitalize">
                              {data.reciver_name ? data.reciver_name : ""}
                            </div>
                            <div className="text-gray font-size-2 font-weight-normal m-0 text-capitalize">
                              {moment(data.created_on).format("HH:mm D MMM")}
                            </div>
                          </div>
                        </div>
                        <div className="message">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </div>
                      </div>
                      <div className="date">2024-02-08</div>
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
