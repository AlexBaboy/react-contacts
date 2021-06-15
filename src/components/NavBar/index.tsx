import React from 'react'
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";
import {ToggleDataViewMode} from "../../pages/Contacts/ToggleDataViewMode";
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {useDataViewMode} from "../../pages/Contacts/useDataViewMode";

export const NavBar: React.FC = () => {

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

    const classes = useStyles();
    const [dataViewMode, setDataViewMode] = useDataViewMode();

    return (
        <nav>
            <Grid item xs={12} className={classes.headContainer}>
                <Box display="flex" justifyContent="space-between" gridGap="2rem">
                    <Typography variant="h4" component="h1">
                        <NavLink to='/'>Contacts</NavLink>
                    </Typography>
                    <Typography variant="h4" component="h1">
                        <NavLink to='/info'>Info</NavLink>
                    </Typography>
                    <Typography variant="h4" component="h1">
                        <NavLink to='/about'>About</NavLink>
                    </Typography>
                    <ToggleDataViewMode
                        dataViewMode={dataViewMode}
                        setDataViewMode={setDataViewMode}
                    />
                </Box>
            </Grid>
        </nav>
    )
}