import React, { useState, useEffect } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { GetCredentialData } from "../../api/api";
import CredentialTable from "../common/CredentialTable";
export default function Credentional() {
  const [credentialData, setCredentialData] = useState([]);

  // Function to get credential data
  let GetData = async () => {
    try {
      let res = await GetCredentialData();
      setCredentialData(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GetData();
  }, []);
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Credentials"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Credentials"} />
        <div className="dashboard-main-container mt-16" id="dashboard-body">
          <div className="container-fluid">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Credentials</h3>
                </div>
                {/*<-- Search credentials -->*/}
                {/* <div className="row m-0 align-items-center">
              <div className="col p-1 form_group mb-3">
                <p className="input_label">Search by Applicant's Name:</p>
                <input
                  required
                  type="text"
                  className="form-control "
                  placeholder={"Search Applicant"}
                  value={search}
                  name={"Interview"}
                  onChange={(e) => onSearch(e)}
                  maxLength={30}
                />
              </div>
              <div className="col p-1 form_group mb-3">
                <p className="input_label">Filter by Status:</p>
                <div className="select_div">
                  <select
                    name="type"
                    value={statusFilterValue}
                    id="type"
                    onChange={(e) => {setStatusFilterValue(e.target.value)
                      setpageNo(1)}}
                    className=" form-control"
                  >
                    <option value="">Select Interview Status</option>
                    <option value="pending">Schedule</option>
                    <option value="complete">Complete</option>
                  </select>
                </div>
              </div>
            </div> */}
                {/* <small className="text-danger">{searcherror}</small> */}
              </div>
              {/*<-- visitor credentials -->*/}
              <CredentialTable data={credentialData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
