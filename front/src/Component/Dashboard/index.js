import React from "react";

const Dashboard = ()=>{
    return(
        <div>
            <div class="sidenav">
  <a href="/createDep">CreateDepartment</a>
  <a href="/assignDep">assignDepartment</a>
  <a href="/department">DepartmentEdit</a>
  <a href="/queryOne">QueryOne</a>
  <a href = "/queryTwo">QueryTwo</a>
  <a href = "/logout">Logout</a>
</div>

<div class="main">
Hi Welcome To The App .
</div>
        </div>
    )
}
export default Dashboard;