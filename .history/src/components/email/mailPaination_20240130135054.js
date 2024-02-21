import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function MailPagination({
  nPages,
  currentPage,
  setCurrentPage,
  total,
  count,
  pageToken,
}) {
  // Create state to manage visible page numbers
  const [visiblePageNumbers, setVisiblePageNumbers] = React.useState([]);

  useEffect(() => {
    // Calculate the start and end index for visible page numbers
    const pageSize = 10;
    const start = Math.max(1, currentPage - Math.floor(pageSize / 2));
    const end = Math.min(nPages, start + pageSize - 1);

    // Update visible page numbers
    const newVisiblePageNumbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
    setVisiblePageNumbers(newVisiblePageNumbers);
  }, [currentPage, nPages]);

  // Function to handle pagination click
  const handlePageClick = (token) => {
    // Call API with the token to fetch data
    // Update current page state
    setCurrentPage(token);
  };
  console.log(nPages);
  return (
    <div>
      {/* {nPages > 1 ? ( */}
      <>
        <nav aria-label="Page navigation example">
          <ul className="pagination pagination-hover-primary rounded-0 ml-n2">
            <li className="page-item px-1">
              <Link
                onClick={() => handlePageClick(pageToken[currentPage - 1])}
                className={
                  currentPage === 1
                    ? "disabled-link page-link  font-size-3 py-2 font-weight-semibold px-3"
                    : "page-link  font-size-3 py-2 font-weight-semibold px-3"
                }
              >
                <i className="fas fa-chevron-left"></i>
              </Link>
            </li>
            {visiblePageNumbers.map((pgNumber) => (
              <li className="page-item px-1" key={pgNumber}>
                <Link
                  onClick={() => handlePageClick(pageToken[pgNumber - 1])}
                  className={`page-link  font-size-3 py-2 font-weight-semibold px-3 ${
                    currentPage === pgNumber ? "active " : ""
                  } `}
                >
                  {pgNumber}
                </Link>
              </li>
            ))}
            <li className="page-item px-1">
              <Link
                onClick={() => handlePageClick(pageToken[currentPage + 1])}
                className={
                  currentPage === nPages
                    ? "disabled-link page-link  font-size-3 py-2 font-weight-semibold px-3"
                    : "page-link  font-size-3 py-2 font-weight-semibold px-3"
                }
              >
                <i className="fas fa-chevron-right"></i>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="d-flex justify-content-center">
          <small>
            {count === "1" || count === 1
              ? count + " record "
              : count + " records "}
            of {total} total records
          </small>
        </div>
      </>
      {/* ) : null} */}
    </div>
  );
}

export default MailPagination;
