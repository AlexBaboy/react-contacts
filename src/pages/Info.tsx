import React from 'react'
import Container from "@material-ui/core/Container";
import {StyledH2} from "../components/ui/StyledH2";
import {StyledP} from "../components/ui/StyledP";
import {useTranslation} from "react-i18next";

export const Info: React.FC = () => {

    const { t } = useTranslation();

    return (
        <Container maxWidth="md">
            <StyledH2>
                {t("headers.info")}
            </StyledH2>
            <StyledP>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae culpa esse iste iure nam nostrum saepe sint ullam? Deserunt dignissimos ducimus iste molestias non!
                Adipisci culpa cupiditate distinctio dolorem, dolorum esse exercitationem laboriosam mollitia necessitatibus perspiciatis placeat possimus quaerat sequi ullam
                voluptate? Cumque dolorum earum eligendi error harum mollitia temporibus veniam. Architecto asperiores atque blanditiis consequuntur corporis culpa cupiditate
                dignissimos dolore doloribus expedita facere fuga fugiat fugit harum id impedit, incidunt itaque libero magnam magni molestiae mollitia nulla numquam obcaecati
                odio provident quae quas qui quia, quisquam quod recusandae rem sed similique soluta ut voluptatum? Molestiae neque sequi temporibus totam!
            </StyledP>
            <StyledP>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae culpa esse iste iure nam nostrum saepe sint ullam? Deserunt dignissimos ducimus iste molestias non!
                Adipisci culpa cupiditate distinctio dolorem, dolorum esse exercitationem laboriosam mollitia necessitatibus perspiciatis placeat possimus quaerat sequi ullam
                voluptate? Cumque dolorum earum eligendi error harum mollitia temporibus veniam. Architecto asperiores atque blanditiis consequuntur corporis culpa cupiditate
                dignissimos dolore doloribus expedita facere fuga fugiat fugit harum id impedit, incidunt itaque libero magnam magni molestiae mollitia nulla numquam obcaecati
                odio provident quae quas qui quia, quisquam quod recusandae rem sed similique soluta ut voluptatum? Molestiae neque sequi temporibus totam!
            </StyledP>
        </Container>
    )
}