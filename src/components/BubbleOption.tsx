import styled from "styled-components";
import { SingleWrapper } from "./SingleOption";
import { fontsSize } from "../styles/Constants";
import React from "react";

export const BubbleWrapper = styled(SingleWrapper)`
  border-radius: 50%;
  width: 88px;
  height: 88px;
  font-size: ${fontsSize.extraSmall};
  text-align: center;
  padding: 12px 8px 24px 8px;

  & > span{
    font-size: ${fontsSize.large};
  },
`;

interface BubbleOptionProps {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}
export const BubbleOption: React.FC<BubbleOptionProps> = ({
  children,
  onClick,
  isSelected,
}) => {
  return (
    <BubbleWrapper onClick={onClick} isSelected={isSelected}>
      {children}
    </BubbleWrapper>
  );
};
