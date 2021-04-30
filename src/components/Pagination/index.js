import React from "react";
import styles from "./Pagination.module.css";

export const Pagination = React.memo(
  ({ contactsPerPage, totalContacts, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalContacts / contactsPerPage); i++) {
      pageNumbers.push(i);
    }
    console.log("totalContacts", totalContacts);
    console.log("contactsPerPage", contactsPerPage);
    console.log("pageNumbers", pageNumbers);
    return (
      <div>
        <nav>
          <ul className={styles.ulStyle}>
            {pageNumbers.map((number) => (
              <li key={number}>
                <a href="!#" className={ currentPage === number ? styles.currentPageNum : styles.pageNum } onClick={() => paginate(number)}>
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
);
