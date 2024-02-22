import styled from "styled-components";
import { colors, fontsSize, fontsWeight } from "./Constants";

export const SingleWrapper = styled.div<SingleWrapperProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${colors.primary};
  padding: 20px;
  color: ${colors.white};
  border-radius: 16px;
  font-size:${fontsSize.small};
  font-weight: ${fontsWeight.medium};
  cursor: pointer;
  transition: border-color 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    border-color: ${colors.secondary};
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    border-color: ${colors.secondary};
  `}

  & > span{
    font-size: ${fontsSize.extraLarge};
  },
`;

interface SingleWrapperProps {
  isSelected: boolean;
}
