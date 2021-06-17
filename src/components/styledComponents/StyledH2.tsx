import styled from "styled-components";

export const StyledH2 = styled.h2`
  color: ${(props) => props.color || "gray"};
`;

export const StyledH2Error = styled(StyledH2)`
  font-size: 36px;
`;
