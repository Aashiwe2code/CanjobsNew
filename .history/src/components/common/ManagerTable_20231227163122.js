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
          <td>
            <div className="d-flex executive_box gx-2 w-100 justify-content-between align-items-center">
              <div className="d-flex w-100">
                <div className="media d-flex align-items-center">
                  <div className="circle-40 mx-auto overflow-hidden">
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
                </div>

                <div className="text-left mb-0 d-flex profile_name_box">
                  <h5 className="m-0 text-black-3 font-weight-bold d-block text-capitalize ml-4">
                    {data.name}
                  </h5>
                </div>
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div className="d-flex executive_box gx-2 w-100 justify-content-between align-items-center">
              <div className="d-flex w-100">
                <div className="text-left mb-0 d-flex profile_name_box">
                  <p className="text-gray font-size-3 m-0 text-capitalize ml-4">
                    {data.admin_type}
                  </p>
                </div>
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div className="ml-4">
              <p className="text-gray font-size-3 m-0 mb-3">{data.email}</p>
              <p className="text-gray font-size-3 m-0 ">{data.contact_no}</p>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            {totalJobs && (
              <p className="text-right w-100 m-0">Total Jobs: {totalJobs}</p>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ManagerTable;
