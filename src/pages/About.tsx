import React from 'react'
import {StyledH2} from "../components/styledComponents/StyledH2";
import Container from "@material-ui/core/Container";
import {StyledP} from "../components/styledComponents/StyledP";

export const About: React.FC = () => {

    return (
        <Container maxWidth="md">
            <StyledH2>
                About
            </StyledH2>
            <StyledP>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae culpa esse iste iure nam nostrum saepe sint ullam? Deserunt dignissimos ducimus iste molestias non!
                Adipisci culpa cupiditate distinctio dolorem, dolorum esse exercitationem laboriosam mollitia necessitatibus perspiciatis placeat possimus quaerat sequi ullam
                voluptate? Cumque dolorum earum eligendi error harum mollitia temporibus veniam. Architecto asperiores atque blanditiis consequuntur corporis culpa cupiditate
                dignissimos dolore doloribus expedita facere fuga fugiat fugit harum id impedit, incidunt itaque libero magnam magni molestiae mollitia nulla numquam obcaecati
                odio provident quae quas qui quia, quisquam quod recusandae rem sed similique soluta ut voluptatum? Molestiae neque sequi temporibus totam!         </StyledP>
        </Container>
    )
}