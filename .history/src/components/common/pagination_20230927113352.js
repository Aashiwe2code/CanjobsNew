import React from "react";
import { Link } from "react-router-dom";

function Pagination({ nPages, currentPage, setCurrentPage, total, count }) {
  //Function to get dynamic page no of the pagination :-
  const pageNumbers = [];
  for (let i = 1; i <= nPages; i++) {
    pageNumbers.push(i);
  }
  //Function to go to next page with pagination :-
  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  //Function to go to previous page with pagination :-
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      {pageNumbers.length > 1 ? (
        <>
          <nav aria-label="Page navigation example">
            <ul className="pagination pagination-hover-primary rounded-0 ml-n2  ">
              {/* To change page perivous page :- */}
              <li className="page-item px-1">
                <Link
                  onClick={() => prevPage()}
                  className={
                    currentPage === 1
                      ? "disabled-link page-link  font-size-3 py-2 font-weight-semibold px-3"
                      : "page-link  font-size-3 py-2 font-weight-semibold px-3"
                  }
                  aria-label="Previous"
                >
                  <i className="fas fa-chevron-left"></i>
                </Link>
              </li>
              {/* No of pagination:- */}
              {pageNumbers.map((pgNumber) => {
                return (
                  <li className="page-item px-1" key={pgNumber}>
                    {pgNumber === 0 ? (
                      <Link className="d-none"></Link>
                    ) : (
                      <Link
                        onClick={() => setCurrentPage(pgNumber)}
                        className={`page-link  font-size-3 py-2 font-weight-semibold px-3 ${
                          currentPage === pgNumber ? "active " : ""
                        } `}
                      >
                        {pgNumber}
                      </Link>
                    )}
                  </li>
                );
              })}
              {/* To change page next page :- */}
              <li className="page-item px-1">
                <Link
                  onClick={() => nextPage()}
                  className={
                    currentPage === pageNumbers.length
                      ? "disabled-link page-link  font-size-3 py-2 font-weight-semibold px-3"
                      : "page-link  font-size-3 py-2 font-weight-semibold px-3"
                  }
                  aria-label="Next"
                >
                  <i className="fas fa-chevron-right"></i>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="d-flex justify-content-center">
            <small>
              {count} records of {total} total records
            </small>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Pagination;
