import React from "react";
// import { Link } from 'react-router-dom'
export default function CredentialTable({ data }) {
  return (
    <div className="table-responsive main_table_div">
      <table className="table table-striped main_data_table">
        <thead>
          <tr>
            <th scope="col" className="border-0 font-size-4 font-weight-normal">
              Client Name
            </th>
            <th
              scope="col"
              className=" border-0 font-size-4 font-weight-normal"
            >
              Protocol
            </th>
            <th scope="col" className="border-0 font-size-4 font-weight-normal">
              Host
            </th>
            <th scope="col" className="border-0 font-size-4 font-weight-normal">
              Port
            </th>
            <th scope="col" className="border-0 font-size-4 font-weight-normal">
              Encryption
            </th>
            <th scope="col" className="border-0 font-size-4 font-weight-normal">
              Client ID
            </th>
            <th scope="col" className="border-0 font-size-4 font-weight-normal">
              Client Secret
            </th>
            <th scope="col" className="border-0 font-size-4 font-weight-normal">
              Tenant ID
            </th>
            <th scope="col" className="border-0 font-size-4 font-weight-normal">
              Created On
            </th>
            <th scope="col" className="border-0 font-size-4 font-weight-normal">
              Updated On
            </th>
            {/* Add more columns here if needed */}
            <th scope="col" className="border-0 font-size-4 font-weight-normal">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <th colSpan={11} className="bg-white text-center">
                No Data Found
              </th>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <th scope="row" className="pl-5 py-5 pr-0">
                  {item.username || "N/A"}
                </th>
                <td className="py-5 pr-0">{item.protocol || "N/A"}</td>
                <td className="py-5 pr-0">{item.host || "N/A"}</td>
                <td className="py-5 pr-0">{item.port || "N/A"}</td>
                <td className="py-5 pr-0">{item.encryption || "N/A"}</td>
                <td className="py-5 pr-0">{item.client_id || "N/A"}</td>
                <td className="py-5 pr-0">{item.client_secret || "N/A"}</td>
                <td className="py-5 pr-0">{item.tenantId || "N/A"}</td>
                <td className="py-5 pr-0">{item.created_on || "N/A"}</td>
                <td className="py-5 pr-0">{item.updated_on || "N/A"}</td>
                {/* Add more table cells for additional fields if needed */}
                <td className="py-5">{/* Action buttons or links */}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
