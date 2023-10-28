import React from "react";
import EmployeeFooter from "../common/footer";
import EmployeeHeader from "../common/header";
import DashboardLMIA from "../common/lmia_dashboard";
function EmployerLMIA() {
  return (
    <>
      <EmployeeHeader />
      <div
        className={`container${
          user_type === "admin" ? "-fluid" : ""
        } lmia_dashboard mt-25`}
      >
        <DashboardLMIA />
      </div>
      <EmployeeFooter />
    </>
  );
}

export default EmployerLMIA;
