import styled from "styled-components";
import { colors, fontsSize, fontsWeight } from "./Constants";

export const StyledButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin-top: auto;
  border: none;
  border-radius: 1000px;
  cursor: pointer;
  background-color: ${colors.secondary};
  color: ${colors.white};
  line-height: 24px;
  font-size: ${fontsSize.small};
  font-weight: ${fontsWeight.bold};
  transition: opacity 0.3s ease;

  &:hover {
    background-color: ${colors.secondary};
    opacity: 0.8;
  }

  ,
  &:disabled {
    background-color: ${colors.secondary}; /* Change to your desired color */
    cursor: not-allowed; /* Change cursor to not-allowed when disabled */
    opacity: 0.5; /* Adjust opacity for disabled state */
  }
`;
