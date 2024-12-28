import React from "react";

const ManagerTable = ({ data, totalJobs }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Email</th>
          <th>Contact No</th>
          <th>Total Jobs</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
            <div className="d-flex align-items-center">
              <div className="circle-40 overflow-hidden">
                {data.profile_image === null ? (
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    alt=""
                    className="w-100"
                  />
                ) : (
                  <img src={data.profile_image} alt="" className="w-100" />
                )}
              </div>
              <div className="ml-4">
                <h5 className="m-0 text-black-3 font-weight-bold text-capitalize">
                  {data.name}
                </h5>
                <p className="text-gray font-size-3 m-0 text-capitalize">
                  {data.admin_type}
                </p>
              </div>
            </div>
          </th>
          <th className="m-0 text-black-3 font-weight-bold text-capitalize">
            {data.admin_type}
          </th>
          <th className="m-0 text-black-3 font-weight-bold text-capitalize">
            {data.email}
          </th>
          <th className="m-0 text-black-3 font-weight-bold text-capitalize">
            {data.contact_no}
          </th>
          <th className="m-0 text-black-3 font-weight-bold text-capitalize">
            {totalJobs}
          </th>
        </tr>
      </tbody>
    </table>
  );
};

export default ManagerTable;
