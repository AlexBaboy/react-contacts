import styled from 'styled-components'

export interface StyledTextProps {
    fontSize: string | undefined | null;
    backgroundColor?: string | undefined | null;
    placeholder: string
};

export const StyledText = styled.input<StyledTextProps>`
  color: ${(props) => props.color || "gray"};
  font-size: ${(props) => props.fontSize || "16px"};
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
`;
