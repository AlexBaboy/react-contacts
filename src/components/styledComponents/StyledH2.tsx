import styled from "styled-components";

export const StyledH2 = styled.h2`
      font-size: ${props => props.fontSize || '28px'};
      color: ${props => props.color || 'gray'};
    `