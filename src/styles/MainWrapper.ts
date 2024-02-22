import styled from "styled-components";
import { colors } from "./Constants";

interface MainWrapperProps {
  paddingTop?: number;
}
export const MainWrapper = styled.div<MainWrapperProps>`
  background-color: ${colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 24px;
  height: 100vh;
  position: relative;
  padding-top: ${({ paddingTop }) => paddingTop && `${paddingTop}px`};
`;
