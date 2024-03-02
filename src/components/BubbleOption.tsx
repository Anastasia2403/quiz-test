import React from "react";
import styled from "styled-components";
import { SingleWrapper } from "../styles/SingleOption";
import { fontsSize } from "../styles/Constants";

export const BubbleWrapper = styled(SingleWrapper)<BubbleWrapperProps>`
  border-radius: 50%;
  width: 88px;
  height: 88px;
  font-size: ${fontsSize.extraSmall};
  text-align: center;
  padding: 12px 8px 24px 8px;
  justify-content: center;

  & > span{
    font-size: ${fontsSize.large};
  },
`;

interface BubbleOptionProps {
  onClick: () => void;
  isSelected: boolean;
  children: string;
}

type BubbleWrapperProps = Pick<BubbleOptionProps, "isSelected">;

export const BubbleOption: React.FC<BubbleOptionProps> = ({
  onClick,
  isSelected,
  children,
}) => {
  return (
    <BubbleWrapper
      onClick={onClick}
      isSelected={isSelected}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};
