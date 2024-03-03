import styled from "styled-components";

interface SelectsWrapperProps {
  direction: "row" | "column";
}

export const Select = styled.div<SelectsWrapperProps>`
  width: 100%;
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: 12px;

  & > * {
    align-items: ${({ direction }) => direction === "row" && "center"};
  }
`;
