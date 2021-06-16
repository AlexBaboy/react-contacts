import React from 'react'
import Container from "@material-ui/core/Container";
import {StyledH2} from "../components/styledComponents/StyledH2";
import {StyledP} from "../components/styledComponents/StyledP";

export const ErrorPage: React.FC = () => {

    return (
        <Container maxWidth="md">
            <StyledH2 color={"red"} font-size={"36px"}>
                No such page!
            </StyledH2>
        </Container>
    )
}