import React from "react";
import styled from "styled-components";
import { SingleWrapper } from "../styles/SingleOption";
import { colors, fontsSize } from "../styles/Constants";

export const BubbleWrapper = styled(SingleWrapper) <BubbleWrapperProps>`
  border-radius: 50%;
  width: 88px;
  height: 88px;
  font-size: ${fontsSize.extraSmall};
  text-align: center;
  padding: 12px 8px 24px 8px;
  justify-content: center;
  transition: transform 0.3s ease, background-color 0.3s ease, opacity 0.3s ease;

  &:hover {
    transform: scale(1.1); 
    background-color: ${colors.lightPrimary};
    border-color: ${({ isSelected }) => (isSelected ? colors.secondary : 'transparent')};
  }

  & > span{
    font-size: ${fontsSize.large};
  },
`;

interface BubbleOptionProps {
  onClick: () => void;
  isSelected: boolean;
  children: string;
  className?: string;
}

type BubbleWrapperProps = Pick<BubbleOptionProps, "isSelected">;

export const BubbleOption: React.FC<BubbleOptionProps> = ({
  onClick,
  isSelected,
  children,
  className,
}) => {
  return (
    <BubbleWrapper
      onClick={onClick}
      isSelected={isSelected}
      dangerouslySetInnerHTML={{ __html: children }}
      className={className}
    />
  );
};
