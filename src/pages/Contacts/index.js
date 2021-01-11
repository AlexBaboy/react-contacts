import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {useContacts} from "./useContacts";
import Typography from "@material-ui/core/Typography";
import {ContactsTable} from "./ContactsTable";

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

    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.headContainer}>
                    <Typography variant="h3" component="h1">
                    Contacts</Typography>
                </Grid>
                <Grid item xs={12}>
                    {(() => {
                        if (isLoading) return <div>Loading...</div>
                        if (isError) return <div>Error...</div>

                        return <ContactsTable data={data} />
                    })()}
                </Grid>
            </Grid>
        </Container>
    )
}