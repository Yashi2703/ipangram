import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDep } from "../../utils/action"
import Pagination from "../../Pagination";
const Department = () => {
    const [selectDep, setSelectDep] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(5);
    const [totalPosts, setTotalPosts] = useState(0)
    useEffect(() => {
        async function fetchMyAPI() {
            let response = await getAllDep();
            setSelectDep(response.data);
            setTotalPosts(response.data?.length)
        }

        fetchMyAPI();
    }, []);
    const indexOfLastPost = currentPage + postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = selectDep?.slice(indexOfFirstPost, indexOfLastPost)

    const Paginate =(pageNum)=> setCurrentPage(pageNum)
    const prevPage = () => setCurrentPage(currentPage - 1)
    const nextPage = () => setCurrentPage(currentPage + 1)
    return (
        <div>
             <Link to  = "/dashboard">Back</Link>
            <table>
                <tr>
                    <th>Department Name</th>
                    <th>Category Name</th>
                    <th>location</th>
                </tr>
                {currentPosts?.length > 0 && currentPosts?.map((item) => {
                    return (
                        <tr>
                            <td>{item.departmentName}</td>
                            <td>{item.categoryName}</td>
                            <td>{item.location}</td>
                        </tr>
                    )
                })}

            </table>
            <Pagination 
            postPerPage={postPerPage}
             totalPosts={totalPosts} 
             currentPage={currentPage} 
             Paginate={Paginate} 
             prevPage={prevPage} 
             nextPage={nextPage} />
        </div>
    )
}
export default Department;