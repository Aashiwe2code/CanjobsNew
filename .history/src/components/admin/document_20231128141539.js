import React from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import DocumrentContainer from "../common/employeeDocumrentContainer";
function Document() {
  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   // Do something with the selected file, like uploading or processing it
  // }
  // const files = [
  //   { path: Doc1, type: "jpg" },
  //   { path: Doc2, type: "pdf" },
  //   { path: Doc4, type: "docx" },
  // ];
  return (
    <div className="site-wrapper overflow-hidden bg-default-2">
      {/* <!-- Header Area --> */}
      <AdminHeader heading={"Document Upload & Verification"} />
      {/* <!-- navbar- --> */}
      <AdminSidebar heading={"Document Upload & Verification"} />
      <div
        className={"dashboard-main-container mt-25 mt-lg-22"}
        id="documentBody"
      >
        <DocumrentContainer />
      </div>
    </div>
  );
}

export default Document;
