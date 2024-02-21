import styled from "styled-components";
import { colors, fontsSize, fontsWeight } from "./Constants";

export const StyledInput = styled.input`
  width: 100%;
  padding: 24px 20px;
  align-items: center;
  border-radius: 16px;
  border: 2px solid transparent;
  background-color: ${colors.primary};
  transition: border 0.3s ease;
  color: ${colors.white};
  font-size: ${fontsSize.small};
  font-weight: ${fontsWeight.normal};
  margin-bottom: 56px;

  &:hover,
  &:focus,
  &:not(:placeholder-shown) {
    border: 2px solid ${colors.secondary};
  }

  &:focus-visible {
    outline: none;
  }

  &::placeholder {
    font-weight: ${fontsWeight.normal};
    font-size: ${fontsSize.small};
    line-height: 24px;
  }
`;
