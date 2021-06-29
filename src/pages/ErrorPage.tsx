import React from "react";
import Container from "@material-ui/core/Container";
import { StyledH2Error } from "../components/ui/StyledH2";
import {useTranslation} from "react-i18next";


export const ErrorPage: React.FC = () => {

    const { t } = useTranslation();

    return (
    <Container maxWidth="md">
      <StyledH2Error color={"red"} fontSize={"36px"}>{t("route.errors.no such page")}</StyledH2Error>
    </Container>
  );
};
