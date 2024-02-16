import React, { useEffect, useState } from "react";
// import { Button, Form, InputGroup } from "react-bootstrap";
// import NotificationsCard from "./notificationsCard";
import { ReadNotification, getAllAdminNotification } from "../../api/api";
import { Link } from "react-router-dom";

function Notifications() {
  const [show, setshow] = useState(false);
  let [totalNotif, setTotalNotif] = useState(true);
  let [notification, setNotiication] = useState([]);
  const [apicall, setApicall] = useState(false);

  /*notification API Call*/
  const Notiication = async () => {
    try {
      let Response = await getAllAdminNotification();
      setNotiication(Response.Data.data);
      setTotalNotif(Response.Data.total_rows);
    } catch (err) {
      console.log(err);
    }
    setApicall(false);
  };
  useEffect(() => {
    Notiication();
  }, [apicall]);
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
              <div className="w-100 col p-0 ">
                {notification.map((data) => (
                  <li
                    key={data.id}
                    title={data.message}
                    className={
                      data.is_read === "1"
                        ? "py-5 dropdown-item border-bottom  border-hit-gray font-size-3 text-wrap"
                        : "py-5 font-weight-bold bg-light dropdown-item border-bottom  border-hit-gray font-size-3 text-wrap"
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
                          ReadNotification(data.id);
                        } catch (err) {
                          console.log(err);
                        }
                        setApicall(true);
                        // Notiication();
                      }}
                      className="text-truncate-2 text-dark"
                    >
                      {data.message.replace("a", "Hi")}
                    </Link>
                  </li>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
