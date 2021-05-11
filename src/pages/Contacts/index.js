import React, { useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import { ContactsTable } from "./ContactsTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box } from "@material-ui/core";
import { ToggleDataViewMode } from "./ToggleDataViewMode";
import { DATA_VIEW_MODES } from "./constants";
import { useDataViewMode } from "./useDataViewMode";

import { Pagination } from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  setContactsInitial,
  setCurrentPage,
} from "../../reduxToolkit/toolkitSlice";
import { Search } from "../../components/Search";
import {
  contactsFilteredSelector,
  getCurrentContacts,
} from "../../components/Selectors";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    headContainer: {
      marginBottom: theme.spacing(3),
    },
  })
);

export const Contacts = () => {
  console.log("38 Contacts");
  const classes = useStyles();

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.toolkit.isLoading);
  const isError = useSelector((state) => state.toolkit.isError);
  const [dataViewMode, setDataViewMode] = useDataViewMode();

  // filter
  const contactsFiltered = useSelector(contactsFilteredSelector);

  // pagination
  const currentPage = useSelector((state) => state.toolkit.currentPage);
  const contactsPerPage = useSelector((state) => state.toolkit.contactsPerPage);
  const currentContacts = useSelector(getCurrentContacts);

  const paginate = useCallback(
    (pageNumber) => dispatch(setCurrentPage(pageNumber)),
    [currentPage]
  );

  React.useEffect(() => {
    dispatch(setContactsInitial());
  }, []);

  return (
    <Container className={classes.root}>
      <Search />
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.headContainer}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" component="h1">
              Contacts
            </Typography>

            <ToggleDataViewMode
              dataViewMode={dataViewMode}
              setDataViewMode={setDataViewMode}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (isLoading)
              return (
                <CircularProgress data-testid="contacts-loader">
                  Loading...
                </CircularProgress>
              );
            if (isError)
              return <div data-testid="contacts-error">Error...</div>;

            if (dataViewMode === DATA_VIEW_MODES.TABLE)
              return (
                <>
                  <ContactsTable data={currentContacts} />
                  <Pagination
                    contactsPerPage={contactsPerPage}
                    totalContacts={contactsFiltered?.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  ></Pagination>
                </>
              );
            if (dataViewMode === DATA_VIEW_MODES.GRID)
              return <div data-testid="grid-container">grid</div>;
            return null;
          })()}
        </Grid>
      </Grid>
    </Container>
  );
};
