import React, { useCallback } from "react";
import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../reduxToolkit/toolkitSlice";

export const Pagination = React.memo(({ totalContacts }) => {
  const dispatch = useDispatch();

  const currentPage = useSelector((state) => state.toolkit.currentPage);
  const contactsPerPage = useSelector((state) => state.toolkit.contactsPerPage);

  const paginate = useCallback(
    (pageNumber) => dispatch(setCurrentPage(pageNumber)),
    []
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalContacts / contactsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav>
        <ul className={styles.ulStyle}>
          {pageNumbers.map((number) => (
            <li key={number}>
              <a
                href="!#"
                className={
                  currentPage === number
                    ? styles.currentPageNum
                    : styles.pageNum
                }
                onClick={() => paginate(number)}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
});
