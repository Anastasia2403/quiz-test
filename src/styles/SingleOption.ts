import styled, { css, keyframes } from "styled-components";
import { colors, fontsSize, fontsWeight } from "./Constants";

const topBubbles = keyframes`
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%, 80% 90%, 85% 90%, 90% 90%, 95% 90%;
  }
  50% {
    background-position: 0 80%, 0 20%, 10% 40%, 20% 0, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 80% 30%, 90% 40%, 95% 50%, 100% 60%, 105% 70%;
  }
  100% {
    background-position: 0 70%, 0 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 80% 20%, 90% 30%, 95% 40%, 100% 50%, 105% 60%;
    background-size: 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0;
  }
`;

const bottomBubbles = keyframes`
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0;
  }
  50% {
    background-position: 0 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0;
  }
  100% {
    background-position: 0 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
    background-size: 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0;
  }
`;

const bubbleGradient = css`
  radial-gradient(circle, ${colors.secondary} 20%, transparent 20%),
  radial-gradient(circle, ${colors.secondary} 20%, transparent 20%),
  radial-gradient(circle, transparent 10%, ${colors.secondary} 15%, transparent 20%),
  radial-gradient(circle, ${colors.secondary} 20%, transparent 20%),
  radial-gradient(circle, ${colors.secondary} 20%, transparent 20%),
  radial-gradient(circle, ${colors.secondary} 20%, transparent 20%),
  radial-gradient(circle, ${colors.secondary} 20%, transparent 20%);
`;

export const SingleWrapper = styled.div<SingleWrapperProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${colors.primary};
  padding: 20px;
  color: ${colors.white};
  border-radius: 16px;
  font-size: ${fontsSize.small};
  font-weight: ${fontsWeight.medium};
  cursor: pointer;
  transition: border-color 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    border-color: ${colors.secondary};
  }

  &:before,
  &:after {
    position: absolute;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    transition: all ease-in-out 1.5s;
    background-repeat: no-repeat;
    background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
  }

  &:before {
    display: none;
    top: -75%;
    background-image: ${bubbleGradient};
  }

  &:after {
    display: none;
    bottom: -75%;
    background-image: ${bubbleGradient};
  }

  ${({ isSelected }) =>
  isSelected &&
  css`
      border-color: ${colors.secondary};

      &.animate:before {
        display: block;
        animation: ${topBubbles} ease-in-out 1.5s forwards;
        z-index: 1000;
      }

      &.animate:after {
        display: block;
        animation: ${bottomBubbles} ease-in-out 1.5s forwards;
        z-index: 1000;
      }
    `}

  & > span {
    font-size: ${fontsSize.extraLarge};
  }
`;

interface SingleWrapperProps {
  isSelected: boolean;
}
