import React, { useCallback } from "react";
import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../store/contacts";
import { contactsFilteredSelector } from "../Selectors";
import { RootState } from "../../store";
import {StyledPaginationItem} from "../styledComponents/StyledPaginationItem";
import {StyledPaginationWrapper} from "../styledComponents/StyledPaginationWrapper";

export const Pagination = React.memo(() => {
  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state: RootState) => state.toolkit.currentPage
  );
  const contactsPerPage = useSelector(
    (state: RootState) => state.toolkit.contactsPerPage
  );

  const contactsFiltered = useSelector(contactsFilteredSelector);

  const paginate = useCallback(
    (pageNumber) => dispatch(setCurrentPage(pageNumber)),
    []
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(contactsFiltered.length / contactsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <StyledPaginationWrapper>
        <ul className={styles.ulStyle}>
          {pageNumbers.map((number) => (
            <li key={number}>
              <StyledPaginationItem
                className={
                  currentPage === number
                    ? styles.currentPageNum
                    : styles.pageNum
                }
                onClick={() => paginate(number)}
              >
                {number}
              </StyledPaginationItem>
            </li>
          ))}
        </ul>
      </StyledPaginationWrapper>
    </div>
  );
});
