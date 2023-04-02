import React,{useState,useEffect} from "react";
import { checkAssign } from "../../utils/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const UserModel = ()=>{
    const[storeData,setStoreData] = useState("")
    const id =  localStorage.getItem("userId")
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchMyAPI() {
            try {
                const response = await checkAssign(id
                );
                if (response.status === false) {
                  throw {
                    message: response.message || "Something went wrong during active.",
                  };
                }
               else{
                  setStoreData(response.data)
                  return;
               }
              } catch (err) {
                let message =
                  err && err?.message
                    ? err?.message
                    : "Something went wrong";
                toast.error(message);
                return false;
              }
        }
        fetchMyAPI()
    }, []);
    const handleLogout =  async(req,res)=>{
        localStorage.removeItem("token")
        navigate("/")
    }
    return(
        <div>
            <table className="customers">
                <tr>
                    <th>DepartmentName</th>  
                    <th>Category</th>
                    <th>Salary</th>
                    <th>EmplyoeId</th>
                    <th>Location</th>
                </tr>
                {storeData.length>0 && storeData.map((item)=>{
                    return(
                        <tr>
                            <td>{item.depId?.departmentName}</td>
                            <td>{item.depId?.categoryName}</td>
                            <td>{item.salary}</td>
                            <td>{item.employeId}</td>
                            <td>{item?.depId?.location}</td>
                        </tr>
                    )
                })}
            </table>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
export default UserModel;