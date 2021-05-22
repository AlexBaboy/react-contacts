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
  console.log("32 Contacts");
  const classes = useStyles();
  const isLoading = useSelector((state: RootState) => state.toolkit.isLoading);
  const isError = useSelector((state: RootState) => state.toolkit.isError);
  const [dataViewMode, setDataViewMode] = useDataViewMode();

  const dispatch = useDispatch();
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
                  <ContactsTable />
                  <Pagination />
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
