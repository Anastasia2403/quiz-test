import React from "react";
import styled from "styled-components";
import { colors, fontsSize, fontsWeight } from "../styles/Constants";

export const SingleWrapper = styled.div<SingleWrapperProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${colors.primary};
  padding: 28px 24px;
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

  & > span {
    font-size: ${fontsSize.extraLarge};
  },
`;

interface SingleOptionProps {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

type SingleWrapperProps = Pick<SingleOptionProps, "isSelected">;

export const SingleOption: React.FC<SingleOptionProps> = ({
  children,
  isSelected,
  onClick,
}) => {
  return (
    <SingleWrapper isSelected={isSelected} onClick={onClick}>
      {children}
    </SingleWrapper>
  );
};
