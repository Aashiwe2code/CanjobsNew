import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../common/pagination";
import Loader from "../common/loader";
import { GetAgent, getActivityLog } from "../../api/api";
import { Link } from "react-router-dom";
import moment from "moment";
export default function ActivityTable(props) {
  /*Show modal states */
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  const [hide, sethide] = useState(props.hide || false);
  const [user_id, setuser_id] = useState(props.user_id);
  const [user_type, setuser_type] = useState(props.user_type);
  const [action_id, setaction_id] = useState(props.action_id);
  const [action_type, setaction_type] = useState(props.action_type);
  const [activityData, setactivityData] = useState([]);
  /*Pagination states */
  // const [status, setStatus] = useState(props.self === "yes" ? -1 : 4);
  const [page, setpage] = useState(1);
  const [totalData, setTotalData] = useState("");
  const [recordsPerPage] = useState(10);
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  let activity_json = {
    1: "Employee updated",
    2: "Employee inserted",
    3: "Employee skill inserted",
    4: "Employee education details inserted",
    5: "Employee education details updated",
    6: "Employee career details inserted",
    7: "Employee career details updated",
    8: "Employee document inserted",
    9: "Employee document updated",
    10: "Employee visa inserted",
    11: "Employee visa updated",
    12: "Employer details updated",
    13: "Employer details inserted",
    14: "Employer contact details updated",
    15: "Employer kyc details inserted",
    16: "Employer kyc details updated",
    17: "Job details updated",
    18: "Job details inserted",
    19: "Job switch",
    20: "Apply on job",
    21: "Interview schedule",
    22: "Lmia updated",
    23: "Lmia inserted",
    24: "Employer document inserted",
    25: "Employer document updated",
    26: "Employee lmia substage added",
    27: "Employee lmia substage updated",
    28: "Job lmia substage inserted",
    29: "Job lmia substage updated",
    30: "Category inserted",
    31: "Category updated",
    32: "Category type inserted",
    33: "Category type updated",
  };
  //   let activityData;
  /* Function to get Activity data*/
  const ActivityLog = async () => {
    // const params = useParams();
    setIsLoading(true);
    try {
      let adata = await getActivityLog(
        page, // Page no.
        user_id,
        user_type,
        action_id,
        action_type,
        recordsPerPage //data  per page
      );
      setactivityData(adata.data.data);
      setTotalData(adata.data.total_rows);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  //   const SetHtml = async (htmll) => {
  //     const markup = { __html: htmll };
  //     return { markup };
  //   };
  /*Render function to get the employer*/
  useEffect(() => {
    ActivityLog();
  }, [page]);
  // console.log("DATATATA" + activity_json["1"]);
  return (
    <>
      <div className="table-responsive main_table_div">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="table table-striped main_data_table">
            <thead>
              <tr className="">
                {hide ? null : <th>User ID</th>}
                {hide ? null : <th>User Type</th>}
                {hide ? null : <th>User Name</th>}
                <th>Log</th>
                <th>Date Time</th>
              </tr>
            </thead>
            <tbody>
              {(activityData || []).map((data) => (
                <tr key={data.id} className="font-size-3">
                  {hide ? null : <td>{data.user_id}</td>}
                  {hide ? null : <td>{data.user_type}</td>}
                  {hide ? null : <td>{data.created_by}</td>}
                  <td>
                    {/* {data.msg} */}
                    {activity_json[`${data.status}`]}
                    {" for "}
                    <Link to={"/" + data.action_id}>
                      {data.employee_name === ("" || undefined || null)
                        ? "Candidate"
                        : data.employee_name}
                    </Link>
                    {" by "}
                    {data.user_type + " " + data.created_by}
                  </td>
                  <td>{moment(data.created_at).format("lll")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="pt-2">
        <Pagination
          nPages={nPages}
          currentPage={page}
          setCurrentPage={setpage}
          total={totalData}
          count={activityData.length}
        />
      </div>
    </>
  );
}
