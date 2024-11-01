import React from "react";

const Pagination = ({totalPeople, peoplePerPage, setCurrentPage}) => {

    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPeople / peoplePerPage); i++) {
        pages.push(i);
    }

    return (
        <div>
            {pages.map((page, index) => {
                return (
                    <button key={index} onClick={() => setCurrentPage(page)}>{page}</button>
                )
            })}
        </div>
    );
}

export default Pagination;