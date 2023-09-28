import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineDashboardCustomize,
  MdOutlinePhotoFilter,
  MdAssignmentAdd,
  MdRealEstateAgent,
} from "react-icons/md";
import { LiaUsersSolid, LiaAddressCardSolid, LiaCcVisa } from "react-icons/lia";
import { BsBuildings, BsQrCodeScan } from "react-icons/bs";
import { PiApplePodcastsLogoThin } from "react-icons/pi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { TbFilterPlus } from "react-icons/tb";
const AdminSidebar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // let view_as_admin_type = localStorage.getItem("view_as_token_admin_type");
  let admin_type = localStorage.getItem("admin_type");
  /*-- Function to open sidebar --*/
  function sideBar() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <>
      <Link
        to={""}
        onClick={sideBar}
        className="sidebar-mobile-button"
        data-toggle="collapse"
        role="button"
        aria-expanded="false"
        aria-controls="sidebar"
      >
        <i className="icon icon-sidebar-2"></i>
      </Link>
      <div
        className={`dashboard-sidebar-wrapper pt-5 ${isMenuOpen ? "show" : ""}`}
        id="sidebar"
      >
        <div className="brand-logo px-2 mb-5">
          <Link to="/dashboard">
            <img src="image/logo-main-black.png" alt="" />
          </Link>
        </div>
        <ul className="list-unstyled dashboard-layout-sidebar">
          <li className={props.heading === "Dashboard" ? "active" : ""}>
            <Link
              to="/dashboard"
              className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            >
              <MdOutlineDashboardCustomize className="sidebar_icon" />
              Dashboard
              {/* <i className="fab fa-blackberry mr-5"></i>Dashboard */}
            </Link>
          </li>
          <li
            className={`${
              props.heading === "Manage Applicants" ? "active" : ""
            }`}
          >
            <Link
              to="/employee"
              className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            >
              <LiaUsersSolid className="sidebar_icon" />
              Manage Applicants
              {/* <i className="far fa-user mr-5"></i>Manage Applicants */}
            </Link>
          </li>
          <li
            className={`${
              props.heading === "Manage Self Applicants" ? "active" : ""
            }`}
          >
            <Link
              to="/selfemployee"
              className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            >
              {/* <i className="far fa-user mr-5"></i> */}
              <LiaUsersSolid className="sidebar_icon" />
              New Applicants
            </Link>
          </li>
          <li
            className={`${admin_type === "executive" ? "d-none" : ""} ${
              props.heading === "Manage Companies" ? "active" : ""
            }`}
          >
            <Link
              to="/employer"
              className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            >
              {/* <i className="far fa-building mr-5"></i> */}
              <BsBuildings className="sidebar_icon" />
              Manage Companies
            </Link>
          </li>
          <li className={props.heading === "Manage Jobs" ? "active" : ""}>
            <Link
              to="/job"
              className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            >
              {/* <i className="far fa-address-card mr-5"></i> */}
              <LiaAddressCardSolid className="sidebar_icon" />
              Manage Jobs
            </Link>
          </li>
          <li className={props.heading === "Manage Self Jobs" ? "active" : ""}>
            <Link
              to="/selfjob"
              className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            >
              {/* <i className="far fa-address-card mr-5"></i> */}
              <LiaAddressCardSolid className="sidebar_icon" />
              Other Jobs
            </Link>
          </li>
          <li className={props.heading === "Visa status" ? "active" : ""}>
            <Link
              to="/visa"
              className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            >
              {/* <i className="fab fa-cc-visa mr-5"></i> */}
              <LiaCcVisa className="sidebar_icon" />
              Manage Visa
            </Link>
          </li>
          {/* <li className={props.heading === "Document Upload & Verification" ? "active" : ""}>
            <Link
              to="/document"
              className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            >
              <i className="fas fa-file mr-5"></i>Manage Documents
            </Link>
          </li> */}
          <li className={props.heading === "LIMIA status" ? "active" : ""}>
            <Link
              to="/lmia"
              className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            >
              {/* <i className="fas fa-filter mr-5"></i> */}
              <MdOutlinePhotoFilter className="sidebar_icon" />
              Manage LMIA
            </Link>
          </li>
          {/* <li className={props.heading === "Response" ? "active" : ""}>
            <Link
              to="/responses"
              className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            >
              <i className="fas fa-reply mr-5"></i>Manage Response
            </Link>
          </li> */}
          {/* <li className={props.heading === "Manage Follow-ups" ? "active" : ""}>
            <Link
              to="/followup"
              className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            >
              <i className="far fa-comments mr-5"></i>Manage Follow-ups
            </Link>
          </li> */}
          <li className={props.heading === "Interview" ? "active" : ""}>
            <Link
              to="/interview"
              className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            >
              {/* <i className="fas fa-podcast mr-5"></i> */}
              <PiApplePodcastsLogoThin className="sidebar_icon" />
              Manage Interview
            </Link>
          </li>
          <li className={props.heading === "Assigned Job's" ? "active" : ""}>
            <Link
              to="/assignedjobs"
              className={
                "px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
              }
            >
              <MdAssignmentAdd className="sidebar_icon" />
              Manager's Dashboard
            </Link>
          </li>

          <li className={props.heading === "Manage Admin" ? "active" : ""}>
            <Link
              to="/adminprofile"
              className={
                "px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
              }
            >
              {/* <i className="fas fa-user mr-5"></i> */}
              <AiOutlineUserAdd className="sidebar_icon" />
              Manage Admin
            </Link>
          </li>
          <li className={props.heading === "Manage Agent" ? "active" : ""}>
            <Link
              to="/agent"
              className={
                "px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
              }
            >
              <MdRealEstateAgent className="sidebar_icon" />
              Manage Agent
            </Link>
          </li>

          <li
            className={props.heading === "Manage Job Category" ? "active" : ""}
          >
            <Link
              to="/category"
              className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            >
              {/* <i className="fas fa-qrcode mr-5"></i> */}
              <BsQrCodeScan className="sidebar_icon" />
              Job Category
            </Link>
          </li>
          <li className={props.heading === "Filter List" ? "active" : ""}>
            <Link
              to="/filter"
              className="px-2 py-3 border-top font-size-4 font-weight-light flex-y-center"
            >
              {/* <i className="fas fa-filter mr-5"></i> */}
              <TbFilterPlus className="sidebar_icon" />
              Filter List
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default AdminSidebar;
