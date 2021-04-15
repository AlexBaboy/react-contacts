import React  from 'react';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {useContacts} from "./useContacts";
import Typography from "@material-ui/core/Typography";
import {ContactsTable} from "./ContactsTable";
import CircularProgress from '@material-ui/core/CircularProgress';
import {Box} from "@material-ui/core";
import {ToggleDataViewMode} from "./ToggleDataViewMode";
import {DATA_VIEW_MODES} from "./constants";
import {useDataViewMode} from "./useDataViewMode";
import {useState} from "react";
import {NATIONALITIES_HUMAN_NAME} from "../../constants/nationalities";
import {useDebounce} from "react-use";

const useStyles = makeStyles ((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(4)
        },
        headContainer: {
            marginBottom: theme.spacing(3)
        }
    })
)

export const Contacts = () => {

    const classes = useStyles()

    const contacts = useContacts([])
    const {isLoading, isError, data} = contacts
    const [dataViewMode, setDataViewMode] = useDataViewMode()
    const [filterData, setFilterData] = useState("")

    let [filteredContacts, setFilteredContacts] = useState(data)

    React.useEffect(() => {

        if(!filterData)
            setFilteredContacts(data)

        console.log('filterData', filterData)

        setTimeout(setFilteredContacts(data.filter(contact=>{
            return contact?.location?.city.toLowerCase().includes(filterData.toLowerCase()) ||
                   contact?.location?.country.toLowerCase().includes(filterData.toLowerCase()) ||
                   NATIONALITIES_HUMAN_NAME[contact?.nat]?.toLowerCase().includes(filterData.toLowerCase())
        })),500)

    }, [filterData])

    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.headContainer}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h4" component="h1">Contacts</Typography>
                        <TextField label="Location or Nationality" margin="normal" variant="outlined" onChange={v => setFilterData(v.target.value)}/>
                        <ToggleDataViewMode dataViewMode={dataViewMode} setDataViewMode={setDataViewMode} />
                    </Box>
                </Grid>
                <Grid item xs={12}>

                    {(() => {

                        if (isLoading) return <CircularProgress data-testid="contacts-loader">Loading...</CircularProgress>
                        if (isError) return <div data-testid="contacts-error">Error...</div>

                        if (dataViewMode === DATA_VIEW_MODES.TABLE) return <ContactsTable data={filteredContacts} />
                        if (dataViewMode === DATA_VIEW_MODES.GRID) return <div data-testid='grid-container'>grid</div>
                        return null

                    })()}
                </Grid>
            </Grid>
        </Container>
    )
}