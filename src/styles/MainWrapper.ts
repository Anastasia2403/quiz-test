import styled from "styled-components";
import { colors } from "./Constants";

interface MainWrapperProps {
  paddingTop?: number;
}
export const MainWrapper = styled.div<MainWrapperProps>`
  display: flex;
  flex-direction: column;
  min-width: 360px;
  max-width: 640px;
  width: 100%;
  align-items: center;
  padding: 20px 24px;
  height: 100vh;
  position: relative;
  padding-top: ${({ paddingTop }) => paddingTop && `${paddingTop}px`};
  background-color: ${colors.background};
  margin: 0 auto;
`;
