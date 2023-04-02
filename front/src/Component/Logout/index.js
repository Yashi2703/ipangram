import React from "react";
import { useNavigate } from "react-router-dom";
const Logout = ()=>{
    const navigate = useNavigate()
    const handleLogout =  async(req,res)=>{
        localStorage.removeItem("token")
        navigate("/")
    }
    return(
        <div>
               <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
export default Logout;