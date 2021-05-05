import React, {useCallback} from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useContacts } from "./useContacts";
import Typography from "@material-ui/core/Typography";
import { ContactsTable } from "./ContactsTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box } from "@material-ui/core";
import { ToggleDataViewMode } from "./ToggleDataViewMode";
import { DATA_VIEW_MODES } from "./constants";
import { useDataViewMode } from "./useDataViewMode";
import { useState } from "react";
import { NATIONALITIES_HUMAN_NAME } from "../../constants/nationalities";
import { useDebounce } from "use-debounce";
import { Pagination } from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  setContactsFiltered,
  setContactsInitial, setDebounceValueRedux,
} from "../../reduxToolkit/toolkitSlice";
import { Search } from "../../components/Search";

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

export const contactsFiltered = (state) => state.toolkit.contactsData;

export const Contacts = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  //const contacts = (state) => useSelector((state) => state.toolkit.contactsData);

  const contactsInitial = useSelector((state) => state.toolkit.contactsInitial);
  const isLoading = useSelector((state) => state.toolkit.isLoading);
  const isError = useSelector((state) => state.toolkit.isError);
  const [dataViewMode, setDataViewMode] = useDataViewMode();

  // filter
  const filterData = useSelector((state) => state.toolkit.filterData);
  //dispatch(setDebounceValueRedux(useDebounce(filterData, 1000)));
  const debouncedValueRedux = useSelector((state) => state.toolkit.debounceValueRedux);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(10);

  React.useEffect(() => {
    dispatch(setContactsInitial());
  }, []);

  React.useEffect(() => {

    if (!debouncedValueRedux) return dispatch(setContactsFiltered(contactsInitial));

    console.log("contactsFiltered", contactsFiltered)
    dispatch(setContactsFiltered(contactsFiltered));

    console.log(contactsFiltered);
  }, [debouncedValueRedux]);

  const indexOfLasContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLasContact - contactsPerPage;

  console.log("contactsFiltered", contactsFiltered)
  const currentContacts = contactsFiltered?.slice(
    indexOfFirstContact,
    indexOfLasContact
  );

  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber),[currentPage]);

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
                    totalContacts={contactsFiltered.length}
                    paginate={paginate}
                    currentPage = {currentPage}
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
