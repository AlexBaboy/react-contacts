import React, { useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { ContactsTable } from "./ContactsTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DATA_VIEW_MODES } from "./constants";
import { useDataViewMode } from "./useDataViewMode";

import { Pagination } from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setContactsInitial } from "../../store/contacts";
import { Search } from "../../components/Search";
import { RootState } from "../../store";

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
  const isLoading = useSelector((state: RootState) => state.toolkit.isLoading);
  const isError = useSelector((state: RootState) => state.toolkit.isError);
  const [dataViewMode, setDataViewMode] = useDataViewMode();

  console.log("Contacts dataViewMode", dataViewMode)

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setContactsInitial());
  }, []);

  return (
    <Container className={classes.root}>
      <Search />
      <Grid container spacing={3}>

        <Grid item xs={12}>
          {(() => {
            if (isLoading) {
              return (
                <CircularProgress variant="determinate"></CircularProgress>
              );
            }
            if (isError)
              return <div data-testid="contacts-error">Error...</div>;

            if (dataViewMode === DATA_VIEW_MODES.TABLE)
              return (
                <>
                    <div data-testid="table-container">{dataViewMode}</div>
                  <ContactsTable />
                  <Pagination />
                </>
              );
            if (dataViewMode === DATA_VIEW_MODES.GRID)
              return (
                  <>
                      <div data-testid="grid-container">{dataViewMode}</div>
                      <ContactsTable />
                      <Pagination />
                  </>
              );
              return null;
          })()}
        </Grid>
      </Grid>
    </Container>
  );
};
