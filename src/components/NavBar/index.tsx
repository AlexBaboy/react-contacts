import React from 'react'
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles} from "@material-ui/core/styles";

import styled from 'styled-components'
import Container from "@material-ui/core/Container";
import i18n from "react-i18next";
import { useTranslation } from "react-i18next";

const NavWrapper = styled.div`
  padding-top: 2rem;
`

export const NavBar: React.FC = () => {

    const { t, i18n } = useTranslation();

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

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    return (
        <Container maxWidth="md">
            <NavWrapper>
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

                            <nav>
                                <div className="languages">
                                    <span id='ru' onClick={() => changeLanguage("ru")}>RU</span>
                                    <span id='break'>|</span>
                                    <span id='EN'>EN</span>
                                </div>
                            </nav>

                        </Box>
                    </Grid>
                </nav>

            </NavWrapper>

        </Container>
    )
}