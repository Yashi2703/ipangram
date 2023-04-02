import React, { useState, useEffect } from "react";
import { getAllDep, getAllUser ,assignTask} from "../../utils/action";
import { Link } from "react-router-dom";
const AssignDep = () => {
  const [dep, setDep] = useState();
  const [user, setUser] = useState();
  const [errors, setErrors] = useState({
    employeId:"",
    salary:"",
    userId:"",
    depId:""

  });
  const[values,setValues]  = useState({
    employeId:"",
    salary:"",
    userId:"",
    depId:""
  })
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getAllDep();
      setDep(response.data);
    }

    fetchMyAPI();
  }, []);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getAllUser();
      setUser(response.data);
    }

    fetchMyAPI();
  }, []);

  const handleSubmit =async(id,e)=>{
    console.log(id,"ppppp")
    setValues({...values,depId:id})
try{
  if (
    values.employeId === "" ||
    values.salary === "" 
  ) {
    setErrors({
      ...errors,
      employeId:
        values.employeId === ""
          ? "Please enter employeId"
          : errors.employeId,
          salary:
        values.salary === "" ? "Please enter salary " : errors.salary,
    });
    return false;
  }
 
  let response = await assignTask({ payload: values })
  console.log(response)
}catch(err){
  console.log(err)
}
  }
  return (
    <div>
       <Link to  = "/dashboard">Back</Link>
      <table>
        <tr>
          <th>CategoryName</th>
          <th>Chhose User</th>
          <th>EmplyoeId</th>
          <th>Salary</th>
          <th>Assign</th>
        </tr>
        {dep?.length > 0 && dep?.map((item,index)=>{
          return(
            <tr>
              <td>{item.categoryName}</td>
              <td>
              <select
            name="cars"
            id="cars"
            onChange={(e) => {
              setErrors({
                ...errors,
                userId: null,
              });
              setValues({ ...values, userId: e.target.value });
            }}
          >
            <option value="volvo">selectUser</option>
            {user?.length > 0 &&
              user?.map((Item) => {
                return <option value={Item._id}> {Item.email} </option>;
              })}
          </select>
              </td>
              <td>
              <input
            type="text"
            placeholder="Enter EmplyoeId"
            onChange={(e) => {
              setErrors({
                ...errors,
                employeId: null,
              });
              setValues({ ...values, employeId: e.target.value });
            }}
          />{" "}
              </td>
              <td>
              <input
            type="text"
            placeholder="Enter Salary"
            onChange={(e) => {
              setErrors({
                ...errors,
                salary: null,
                });
              setValues({ ...values, salary: e.target.value });
            }}
          />{" "}
              </td>
              <td><button onClick={()=>handleSubmit(item._id)}>Assign</button></td>
            </tr>
          )
        })}
      </table>
    </div>
  );
};
export default AssignDep;
