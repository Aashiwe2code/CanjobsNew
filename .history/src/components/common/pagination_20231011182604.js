import React from "react";
import { Link } from "react-router-dom";

function Pagination({ totalPages, currentPage, setCurrentPage, total, itemsPerPage }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startPage = (currentPage - 1) - (currentPage % 10) + 1;
  const endPage = startPage + 9 <= totalPages ? startPage + 9 : totalPages;

  return (
    <div>
      {totalPages > 1 && (
        <>
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item">
                <Link
                  onClick={prevPage}
                  className={`page-link ${currentPage === 1 ? "disabled-link" : ""}`}
                  aria-label="Previous"
                >
                  <i className="fas fa-chevron-left"></i>
                </Link>
              </li>
              {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
                <li className="page-item" key={pageNumber}>
                  <Link
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`page-link ${currentPage === pageNumber ? "active" : ""}`}
                    aria-label={`Page ${pageNumber}`}
                    aria-current={currentPage === pageNumber ? "page" : null}
                  >
                    {pageNumber}
                  </Link>
                </li>
              ))}
              <li className="page-item">
                <Link
                  onClick={nextPage}
                  className={`page-link ${currentPage === totalPages ? "disabled-link" : ""}`}
                 
