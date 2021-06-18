import React from "react";
import Container from "@material-ui/core/Container";
import { StyledH2Error } from "../components/styledComponents/StyledH2";


export const ErrorPage: React.FC = () => {

    return (
    <Container maxWidth="md">
      <StyledH2Error color={"red"} fontSize={"36px"}>No such page!</StyledH2Error>
    </Container>
  );
};
