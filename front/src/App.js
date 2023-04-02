import logo from './logo.svg';
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from "react-router-dom"
import Login from './Component/Login';
import Dashboard from "./Component/Dashboard";
import './App.css';
import Register from './Component/Register';
import CreateDep from './Component/CreateDep';
import AssignDep from './Component/AssignDep';
import Department from './Component/Department';
import QueryOne from './Component/QueryOne';
import UserModel from './Component/UserModel';
import QueryTwo from './Component/QueryTwo.js';
import Logout from './Component/Logout';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Register/>}/>
        <Route path = "/dashboard" element = {<Dashboard/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/createDep" element = {<CreateDep/>}/>
        <Route path = "/assignDep" element = {<AssignDep/>}/>
         <Route path = "/department" element = {<Department/>}/> 
         <Route path = "/queryOne" element = {<QueryOne/>}/>
         <Route path = "/user" element ={<UserModel/>}/>
         <Route path  = "/queryTwo" element  = {<QueryTwo/>}/>
         <Route path = "/logout" element = {<Logout/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
