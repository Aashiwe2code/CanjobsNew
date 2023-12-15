import React, { useEffect, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import Card from "react-bootstrap/Card";
import { getLMIAstatus } from "../../api/api";
import { Table } from "react-bootstrap";
import moment from "moment";
const DashboardCard = (props) => {
  const [open, setOpen] = useState(false);
  const [LMIAdata, setLMIAdata] = useState([]);
  const [totalData, settotalData] = useState([]);
  const getLMIAdata = async () => {
    try {
      let lmiaData = await getLMIAstatus(props.lmia_status);
      settotalData(lmiaData.total_rows);
      setLMIAdata(lmiaData.data);
    } catch (err) {
      console.log(err)
    }
  };
  /*Render function to get the job */
  useEffect(() => {
    getLMIAdata();
  }, []);
  console.log(JSON.stringify(LMIAdata));

  return (
    <Card className="mb-7 dash_card">
      <Card.Body>
        <div
          onClick={() => setOpen(!open)}
          aria-controls={"lmia_status_table_div_"}
          aria-expanded={open}
          className="w-100"
        >
          <h3 className="heading text-capitalize">
            {props.heading}
            <p className="font-size-3 font-weight-normal">{props.subheading}</p>
            <span className="float-right dash_statistic">{totalData || 0}</span>
          </h3>
        </div>
        <Collapse in={open}>
          <div id={"lmia_status_table_div_"}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Job Name</th>
                  <th>Applicant Name</th>
                  <th>Status</th>
                  <th>Exp. Completion time</th>
                </tr>
              </thead>
              <tbody>
                {(LMIAdata || []).map((item) => (
                  <tr className="text-capitalize">
                    <td>{item.company_name}</td>
                    <td>{item.job_title}</td>
                    <td>{item.name}</td>
                    <td>{item.lmia_status}</td>
                    <td>
                      {moment(item.expected_time_of_completion).format(
                        "Do MMM YY"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};
export default DashboardCard;
