import { useEffect, useState } from "react";

const Pagination = ({ count, rowsPerPage, activePage, onChangePage }) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (count) {
      let pages = Math.ceil(count / rowsPerPage);
      setTotalPages(pages);
    }
  }, [count, rowsPerPage]);

  const getPages = () => {
    let arr = Array.from(Array(totalPages).keys());
    if (activePage === 0) {
      arr = arr.slice(activePage, activePage + 3);
    } else if (activePage === totalPages - 1) {
      arr = arr.slice(activePage - 2, activePage + 1);
    } else {
      arr = arr.slice(activePage - 1, activePage + 2);
    }
    return arr;
  };

  const from = activePage * 10 + 1;
  const to = activePage * 10 + 10;
  return (
    <div className="row">
      <div className="d-flex justify-content-end">
        <div className="col-2">
          <span>
            {`${from > 9 ? from : `0${from || 0}`}-${
              to > 9 ? to : `0${to || 0}`
            } of
        ${count !== -1 ? count || 0 : 0}`}
          </span>
        </div>
        <nav>
          <ul className="pagination">
            <li
              className={`page-item ${activePage === 0 ? "disabled" : ""}`}
              onClick={() => activePage !== 0 && onChangePage(activePage - 1)}
            >
              <span className="page-link">Previous</span>
            </li>
            {getPages().map((item) => (
              <li
                key={item}
                className={`page-item ${activePage === item ? "active" : ""} `}
                onClick={() => onChangePage(item)}
              >
                <span className="page-link">{item + 1}</span>
              </li>
            ))}
            <li
              className={`page-item ${
                activePage === totalPages - 1 ? "disabled" : ""
              }`}
              onClick={() =>
                activePage !== totalPages - 1 && onChangePage(activePage + 1)
              }
            >
              <span className="page-link">Next</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Pagination;
