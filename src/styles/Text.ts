import styled from "styled-components";
import { colors, fontsSize, fontsWeight } from "./Constants";

interface TextProps {
  color: "light" | "dark" | "secondary" | "white" | "error";
  size: "small" | "medium" | "large" | "extraLarge" | "extraSmall";
  weight: "regular" | "medium" | "bold";
  lineHeight?: number;
  margin?: number;
}

export const Text = styled.p<TextProps>`
  font-size: ${({ size }) => fontsSize[size]};
  font-weight: ${({ weight }) => fontsWeight[weight]};
  color: ${({ color }) => colors[color]};
  text-align: center;
  margin-bottom: ${({ margin }) => (margin ? `${margin}px` : "16px")};
  line-height: ${({ lineHeight }) => lineHeight && `${lineHeight}px`};

  & > p span,
  & > span {
    color: ${colors.secondary};
  }
`;
