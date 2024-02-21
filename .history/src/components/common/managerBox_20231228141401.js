import React, { useState } from "react";
import AssignedJobTable from "./assignedJobTable";
import { Accordion } from "react-bootstrap";
export default function ManegerBox({
  data,
  isLoading,
  handleSort,
  nPages,
  currentPage,
  setCurrentPage,
  totalData,
  allData,
  setApiCall,
}) {
  const [totalJobs, setTotalJobs] = useState();
  return (
    // <Accordion.Item
    //   className="card w-100 rounded-6 overflow-hidden border-0 mb-5"
    //   eventKey={data.admin_id}
    // >
    //   <Accordion.Header className="w-100 m-0 border-0 bg-white accordian_btn_design">
    //     <div className="d-flex executive_box gx-2 w-100 justify-content-between  align-items-center">
    //       <div className="d-flex w-100">
    //         <div className="media d-flex align-items-center">
    //           <div className="circle-40 mx-auto overflow-hidden">
    //             {data.profile_image === null ? (
    //               <img
    //                 src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    //                 alt=""
    //                 className="w-100"
    //               />
    //             ) : (
    //               <img src={data.profile_image} alt="" className="w-100" />
    //             )}
    //           </div>
    //         </div>

    //         <div className="text-left mb-0 d-flex profile_name_box ">
    //           {/* {empdata.name === null ||
    //                               empdata.name === undefined ||
    //                               empdata.name === "undefined" ||
    //                               empdata.name === "" ? (
    //                                 <p className="font-size-3  mb-0">N/A</p>
    //                               ) : ( */}
    //           <h5 className="m-0 text-black-3 font-weight-bold d-block text-capitalize ml-4">
    //             {data.name}
    //             {/*-({data.admin_id}) */}
    //             <p className="text-gray font-size-3 m-0 text-capitalize">
    //               ({data.admin_type})
    //             </p>
    //           </h5>
    //           {/* )} */}
    //           {/* {empdata.email || empdata.contact_no ? ( */}
    //           <div className="ml-4">
    //             <p className="text-gray font-size-3 m-0 mb-3">{data.email}</p>
    //             <p className="text-gray font-size-3 m-0 ">{data.contact_no}</p>
    //           </div>
    //           {/* ) : null} */}
    //         </div>
    //       </div>
    //       {totalJobs && (
    //         <p className="text-right w-100 m-0">Total Jobs: {totalJobs}</p>
    //       )}
    //     </div>
    //   </Accordion.Header>
    //   <Accordion.Body>
    //     {/* <!--Assigned Job Table --> */}
    //     <AssignedJobTable
    //       heading={"Assigned Job's"}
    //       data={allData}
    //       isLoading={isLoading}
    //       handleSort={handleSort}
    //       nPages={nPages}
    //       currentPage={currentPage}
    //       setCurrentPage={setCurrentPage}
    //       totalData={totalData}
    //       manager_id={data.admin_id}
    //       setTotalJobs={setTotalJobs}
    //       setApiCall={setApiCall}
    //     />
    //   </Accordion.Body>
    // </Accordion.Item>
    <table className="table table-striped main_data_table">
      <thead>
        <tr>
          <th scope="col" className="border-0 font-size-4 font-weight-normal">
            Name
          </th>
          <th scope="col" className="border-0 font-size-4 font-weight-normal">
            Contact
          </th>
          <th scope="col" className="border-0 font-size-4 font-weight-normal">
            Total Jobs
          </th>
        </tr>
      </thead>
      <tbody>
        {(allData || []).map((item, index) => (
          <tr key={index}>
            <td className="border-0">
              <Accordion
                className="w-100 p-0 m-0 border-0"
                defaultActiveKey={index}
                flush
              >
                <Accordion.Item
                  eventKey={item.admin_id}
                  className="card w-100 rounded-6 overflow-hidden border-0"
                >
                  <Accordion.Header className="w-100 m-0 border-0 bg-white accordian_btn_design">
                    <div className="d-flex executive_box gx-2 w-100 justify-content-between align-items-center">
                      <div className="d-flex w-100">
                        <div className="media d-flex align-items-center">
                          <div className="circle-40 mx-auto overflow-hidden">
                            {item.profile_image === null ? (
                              <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                alt=""
                                className="w-100"
                              />
                            ) : (
                              <img
                                src={item.profile_image}
                                alt=""
                                className="w-100"
                              />
                            )}
                          </div>
                        </div>
                        <div className="text-left mb-0 d-flex profile_name_box ">
                          <h5 className="m-0 text-black-3 font-weight-bold d-block text-capitalize ml-4">
                            {item.name}
                            <p className="text-gray font-size-3 m-0 text-capitalize">
                              ({item.admin_type})
                            </p>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    {/* Assigned Job Table */}
                    <AssignedJobTable
                      heading={"Assigned Job's"}
                      data={allData}
                      isLoading={isLoading}
                      handleSort={handleSort}
                      nPages={nPages}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      totalData={totalData}
                      manager_id={item.admin_id}
                      setTotalJobs={setTotalJobs}
                      setApiCall={setApiCall}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </td>
            <td className="border-0 align-baseline">
              <div className="ml-4">
                <p className="text-gray font-size-3 m-0 mb-3">{item.email}</p>
                <p className="text-gray font-size-3 m-0 ">{item.contact_no}</p>
              </div>
            </td>
            <td className="border-0 align-baseline">
              <div className="ml-4">
                <p>
                  {index}
                  {totalJobs}
                  {item.admin_id}
                </p>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
