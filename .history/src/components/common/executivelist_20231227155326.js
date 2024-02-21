import React, { useState } from "react";
import { AddExecutiveTeam, RemoveExecutiveTeam } from "../../api/api";
import { toast } from "react-toastify";
export default function Executivelist({
  executiveData,
  selected,
  manager_id,
  setExecutiveApiCall,
}) {
  const [selectedStatus, setSelectedStatus] = useState(selected);

  /*Function to asign memeber to the manager */
  const HandleAddexecutive = async (Eid, MId) => {
    const isSelected = executiveData.some((item) => item.admin_id === Eid);
    if (isSelected) {
      try {
        let Response = await AddExecutiveTeam(MId, Eid);
        if (Response.message === "successfully") {
          toast.success("Executive asigned successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setSelectedStatus([...selectedStatus, { admin_id: Eid }]);
          setExecutiveApiCall(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  /*Function to remove asign memeber to the manager */
  // const HandleRemoveexecutive = async (Eid) => {
  //   try {
  //     let Response = await RemoveExecutiveTeam(Eid);
  //     if (Response.message === "successfully") {
  //       toast.success("Executive unassigned successfully", {
  //         position: toast.POSITION.TOP_RIGHT,
  //         autoClose: 1000,
  //       });
  //       setSelectedStatus(
  //         selectedStatus.filter((item) => item.admin_id !== Eid)
  //       );
  //       setExecutiveApiCall(true);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <div className="card-text row">
      {executiveData.length === 0 ||
      executiveData.every((item) => item.parent_id !== ("0" || 0)) ? (
        //
        <div className="sub-stage col-md-12">
          <p className="text-center">No Executive Avaliable</p>
        </div>
      ) : (
        (executiveData || []).map((data, index) => {
          return (selectedStatus || []).some(
            (item) => item.admin_id === data.admin_id
          ) ? null : (
            <div
              className={`sub-stage text-capitalize col-md-6`}
              onClick={() =>
                // (selectedStatus || []).some(
                //   (item) => item.admin_id === data.admin_id
                // )
                //   ? HandleRemoveexecutive(data.admin_id)
                //   :
                HandleAddexecutive(data.admin_id, manager_id)
              }
              key={index}
            >
              <input
                type="checkbox"
                className="mx-2"
                checked={(selectedStatus || []).some(
                  (item) => item.admin_id === data.admin_id
                )}
                readOnly
              />
              {data.name}
            </div>
          );
        })
      )}
    </div>
  );
}
