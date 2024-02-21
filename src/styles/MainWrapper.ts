import styled from "styled-components";
import { colors } from "./Constants";

export const MainWrapper = styled.div`
  background-color: ${colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 24px;
  height: 100vh;
  position: relative;
`;
