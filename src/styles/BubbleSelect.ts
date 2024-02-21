import styled from "styled-components";

export const BubbleSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
  justify-content: space-between;
  & > * {
    align-items: center;
  }

  & > *:nth-child(3n + 2) {
    margin-top: 20px;
  }
`;
