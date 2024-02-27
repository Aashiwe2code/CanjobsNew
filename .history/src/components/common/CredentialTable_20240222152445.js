import React from "react";
// import { Link } from 'react-router-dom'
export default function CredentialTable({ data }) {
  return (
    <div className="table-responsive main_table_div">
      <table className="table table-striped main_data_table">
        <thead>
          <tr>
            <th scope="col" className="border-0 font-size-4 font-weight-normal">
              Protocol
            </th>
            <th
              scope="col"
              className=" border-0 font-size-4 font-weight-normal"
            >
              Client Name
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
                  {item.protocol || "Not needed for this protocol"}
                </th>
                <td className="py-5 pr-0 text-truncate">
                  {item.username || "Not needed for this protocol"}
                </td>
                <td className="py-5 pr-0 text-truncate">
                  {item.host || "Not needed for this protocol"}
                </td>
                <td className="py-5 pr-0 text-truncate">
                  {item.port || "Not needed for this protocol"}
                </td>
                <td className="py-5 pr-0 text-truncate">
                  {item.encryption || "Not needed for this protocol"}
                </td>
                <td className="py-5 pr-0 text-truncate">
                  {item.client_id || "Not needed for this protocol"}
                </td>
                <td className="py-5 pr-0 text-truncate">
                  {item.client_secret || "Not needed for this protocol"}
                </td>
                <td className="py-5 pr-0 text-truncate">
                  {item.tenantId || "Not needed for this protocol"}
                </td>
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
