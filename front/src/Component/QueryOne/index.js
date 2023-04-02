import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {Queryone} from "../../utils/action";
const QueryOne = ()=>{
    const[value,setValues] = useState()
    useEffect(() => {
        async function fetchMyAPI() {
          let response = await Queryone();
          setValues(response.data);
        }
    
        fetchMyAPI();
      }, []);
    return(
        <div>
           <Link to  = "/dashboard">Back</Link>
            <table>
  <tr>
    <th>DepartmentName</th>
    <th>CategoryName</th>
    <th>location</th>
  </tr>
  {value?.length> 0 && value?.map((item,index)=>{
    return(
        <tr>
            <td>{item.departmentName}</td>
            <td>{item.categoryName}</td>
            <td>{item.location}</td>
        </tr>
    )
  })}
</table>
        </div>
    )
}
export default QueryOne;