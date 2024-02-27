import React, { useEffect } from "react";
import { getActivityLog } from "../../api/api";
export default function UserTimline() {
  let TimeLineData = async () => {
    try {
      let res = await getActivityLog();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    TimeLineData();
  }, []);
  return <div>TimeLine</div>;
}
