
import styled from "styled-components";
import { colors, fontsSize, fontsWeight } from "./Constants";
import { keyframes } from "styled-components";

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

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
    background-color: ${colors.secondary};
    cursor: not-allowed;
    opacity: 0.5;
  }

  &.animate {
    animation: ${pulseAnimation} 1s infinite;
  }
`;
