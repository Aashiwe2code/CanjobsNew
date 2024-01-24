import React from 'react'
import {PuffLoader}  from 'react-spinners';
function loader({load}) {
  return (
    <div  className={load === "yes" ? 
    "d-flex justify-content-center custom_loader" 
    : "d-flex justify-content-center custom_loader-01"}>
    <PuffLoader color="#FA474A" loading={true} size={100}  />
    </div>
  )
}

export default loader