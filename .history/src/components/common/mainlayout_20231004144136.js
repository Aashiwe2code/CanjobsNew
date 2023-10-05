import React from "react";
import {
  Route,
  BrowserRouter,
  Routes /*, useLocation */,
} from "react-router-dom";
import EmployerHome from "../company/home";
import CompanyProfile from "../company/profile";
import ManageJobs from "../company/manageJob";
import Response from "../company/response";
import EmployeeHomePage from "../user/home";
import JobDetail from "../user/jobdetail";
import JobSearch from "../user/jobs";
import UserProfile from "../user/profile";
import AdminDashboard from "../admin/dashboard";
import Job from "../admin/job";
import Category from "../admin/category";
import Employee from "../admin/employee";
import Employer from "../admin/employer";
import EmployeeSearch from "../company/employeeSearch";
import ManageAdmin from "../admin/manageadmin";
import Followup from "../admin/followup";
import AdminLoginFrom from "../admin/login";
import FilterList from "../admin/filterList";
import ResumeGrerator from "../admin/Resume";
import ManageInterview from "../admin/interview";
import JobResponse from "../admin/response";
import NotFound from "./notfound";
import ResetPassword from "./resetPassword";
import EmailTemplate from "../admin/email";
import Loader from "../common/loader";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import Visa from "../admin/visa";
import Document from "../admin/document";
import EmployerLMIA from "../company/lmia";
import SelfApplicat from "../admin/selfApplicat";
import SelfJob from "../admin/selfJob";
import LimaContainer from "../admin/lmiaContainer";
import NewUserProfile from "../user/user_profile";
import CompanyProfileDetail from "../company/company_profile";
import JobDetailpageAdmim from "../admin/job_Detail_page";
import PDFViewer from "../user/user_pdf";
import JobAssignedDashboard from "../admin/jobAssignedDashboard";
import RazorPay from "./payButton";
import Agent from "../admin/agent";
// function CurrentRoute() {
//   const location = useLocation();
//   const path = location.pathname;

//   // Use the path variable in your component
//   return path;
// }

function MainLayout() {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  return (
    <BrowserRouter>
      {/* <CurrentRoute /> */}
      <Routes>
        {/* Employee */}
        <Route path="/" element={<EmployeeHomePage />} />
        <Route path="/rozarepay" element={<RazorPay />} />
        <Route path="/jobs" element={<JobSearch />} />
        <Route path="/jobdetail" element={<JobDetail />} />
        <Route path="/resetpassword/:id" element={<ResetPassword />} />
        <Route exact path="/linkedin" component={LinkedInCallback} />
        {userType === "user" && token !== ("" || null || undefined) ? (
          <>
            <Route path="/" element={<EmployeeHomePage />} />
            <Route path="/jobs" element={<JobSearch />} />
            <Route path="/jobdetail" element={<JobDetail />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/" element={<EmployeeHomePage />} />
            <Route path="/jobs" element={<JobSearch />} />
            <Route path="/jobdetail" element={<JobDetail />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
        {/* Employer */}
        {userType === "company" && token !== ("" || null || undefined) ? (
          <>
            <Route path="/company" element={<EmployerHome />} />
            <Route path="/companyprofile" element={<CompanyProfile />} />
            <Route path="/managejobs" element={<ManageJobs />} />
            <Route path="/response" element={<Response />} />
            <Route path="/empsearch" element={<EmployeeSearch />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/lmia_dashboard" element={<EmployerLMIA />} />
            <Route path="/resume/:id" element={<ResumeGrerator />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/" element={<EmployeeHomePage />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
        {/* Admin */}
        <Route path="/adminlogin" element={<AdminLoginFrom />} />
        {userType === ("company" || "user" || "") &&
        token === ("" || null || undefined) ? (
          <>
            <Route path="/" element={<EmployeeHomePage />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/job" element={<Job />} />
            <Route path="/selfjob" element={<SelfJob />} />
            <Route path="/category" element={<Category />} />
            <Route path="/lmia" element={<LimaContainer />} />
            <Route path="/visa" element={<Visa />} />
            <Route path="/document" element={<Document />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/selfemployee" element={<SelfApplicat />} />
            <Route path="/employer" element={<Employer />} />
            <Route path="/adminprofile" element={<ManageAdmin />} />
            <Route path="/assignedjobs" element={<JobAssignedDashboard />} />
            <Route path="/:eid" element={<NewUserProfile />} />
            <Route path="/userpdf" element={<PDFViewer />} />
            <Route path="/job_detail" element={<JobDetailpageAdmim />} />
            <Route path="/company_detail" element={<CompanyProfileDetail />} />
            <Route path="/followup" element={<Followup />} />
            <Route path="/agent" element={<Agent />} />
            <Route path="/filter" element={<FilterList />} />
            <Route path="/interview" element={<ManageInterview />} />
            <Route path="/responses" element={<JobResponse />} />
            <Route path="/lmia_dashboard" element={<EmployerLMIA />} />
            <Route path="/emailtemplate" element={<EmailTemplate />} />
            <Route path="/resume/:id" element={<ResumeGrerator />} />
            {/* <Route path="*" element={<NotFound />} /> */}
            <Route path="*" element={<Loader load={"yes"} />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainLayout;
