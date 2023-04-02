import React from "react";

const Pagination = (props) => {
    const { postPerPage, totalPosts, currentPage, Paginate, prevPage, nextPage } = props
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <div className="pagination">
                {currentPage !== 1 && (
                    <li>
                        <button onClick={() => prevPage()}>
                            Prev
                        </button>
                    </li>
                )}
                {
                    pageNumbers.map((num) => (
                        <li key={num}>
                            <a onClick={() => Paginate(num)}>
                                {num}
                            </a>
                        </li>
                    ))
                }
                {pageNumbers.length !== currentPage && (
                    <li>
                        <button onClick={() => nextPage()}>
                            next
                        </button>
                    </li>
                )}
            </div>
        </nav>
    )
}
export default Pagination;