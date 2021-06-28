import React from 'react'
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles} from "@material-ui/core/styles";

import styled from 'styled-components'
import Container from "@material-ui/core/Container";
import { useTranslation } from "react-i18next";
import {StyledNavLan} from "../ui/StyledNavLan";
import {StyledLanSwitch} from "../ui/StyledLanSwitch";

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
            }
        })
    );

    const classes = useStyles();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    return (
        <Container maxWidth="md">

            <NavWrapper className="nav-lan">
                <nav>

                    <StyledNavLan>
                        <StyledLanSwitch id='EN' onClick={() => changeLanguage("en")}>EN</StyledLanSwitch>
                        <span id='break'>|</span>
                        <StyledLanSwitch id='ru' onClick={() => changeLanguage("ru")}>RU</StyledLanSwitch>
                    </StyledNavLan>
                </nav>
            </NavWrapper>

            <NavWrapper>
                <nav>
                    <Grid item xs={12} className={classes.headContainer}>
                        <Box display="flex" justifyContent="space-between" gridGap="2rem">
                            <Typography variant="h4" component="h1">
                                <NavLink to='/'>{t("header-menu.contacts")}</NavLink>
                            </Typography>
                            <Typography variant="h4" component="h1">
                                <NavLink to='/info'>{t("header-menu.info")}</NavLink>
                            </Typography>
                            <Typography variant="h4" component="h1">
                                <NavLink to='/about'>{t("header-menu.about")}</NavLink>
                            </Typography>

                        </Box>
                    </Grid>
                </nav>

            </NavWrapper>

        </Container>
    )
}