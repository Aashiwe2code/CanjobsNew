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
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <th colSpan={6} className="bg-white text-center">
                No Data Found
              </th>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <th scope="row" className="pl-5 py-5 pr-0">
                  {item.username}
                </th>
                <td className="py-5 pr-0">{item.protocol}</td>
                <td className="py-5 pr-0">{item.host}</td>
                <td className="py-5 pr-0">{item.port}</td>
                <td className="py-5 pr-0">{item.encryption}</td>
                <td className="py-5">
                  {/* You can place your action buttons here */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
