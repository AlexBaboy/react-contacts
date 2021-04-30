import React from "react";
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
  setContactsInitial,
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

export const Contacts = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.toolkit.contactsData);
  const contactsInitial = useSelector((state) => state.toolkit.contactsInitial);
  const isLoading = useSelector((state) => state.toolkit.isLoading);
  const isError = useSelector((state) => state.toolkit.isError);
  const [dataViewMode, setDataViewMode] = useDataViewMode();

  // filter
  let filterData = useSelector((state) => state.toolkit.filterData);
  console.log("46 filterData", filterData);
  const [debouncedValue] = useDebounce(filterData, 1000);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(10);

  React.useEffect(() => {
    dispatch(setContactsInitial());
  }, []);

  React.useEffect(() => {
    if (!debouncedValue) return dispatch(setContactsFiltered(contactsInitial));

    let filteredContacts = contacts.filter((contact) => {
      return (
        contact?.location?.city
          .toLowerCase()
          .includes(debouncedValue.toLowerCase()) ||
        contact?.location?.country
          .toLowerCase()
          .includes(debouncedValue.toLowerCase()) ||
        NATIONALITIES_HUMAN_NAME[contact?.nat]
          ?.toLowerCase()
          .includes(debouncedValue.toLowerCase())
      );
    });

    dispatch(setContactsFiltered(filteredContacts));

    console.log(filteredContacts);
  }, [debouncedValue]);

  const indexOfLasContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLasContact - contactsPerPage;

  const currentContacts = contacts.slice(
    indexOfFirstContact,
    indexOfLasContact
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                    totalContacts={contacts.length}
                    paginate={paginate}
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
