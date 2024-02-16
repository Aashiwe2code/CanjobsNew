import React, { useState } from "react";
import CustomButton from "../common/button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAgent from "../forms/admin/addAgent";
// import { GetFilter } from "../../api/api";
import AgentTable from "../common/agentTable";
import AdminSidebar from "../admin/sidebar";
import AdminHeader from "../admin/header";
import PartnerPage from "./partner_page";
import ActivityTable from "./activity_table";
// import FilterJson from "../json/filterjson";
function ActivityLog(props) {
  let user_type = localStorage.getItem("userType");

  return (
    <>
      <div className={"site-wrapper overflow-hidden bg-default-2"}>
        {/* <!-- Header Area --> */}
        <AdminHeader heading="Activity Log" />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading="Activity Log" />
        <ToastContainer />
        {/* <!--Add Adgent Details Modal --> */}

        <div className={"dashboard-main-container mt-16"} id="dashboard-body">
          <div className="container-fluid">
            <div className="mb-18">
              <ActivityTable
                user_type={props.user_type}
                user_id={props.user_id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityLog;
