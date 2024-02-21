import styled from "styled-components";
import { fontsSize, fontsWeight, colors } from "../styles/Constants";

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: ${fontsSize.small};
  font-weight: ${fontsWeight.medium};
  line-height: 24px;
  color: ${colors.light};
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${colors.dark};
  }
`;

export const DownloadButton: React.FC = () => {
  return (
    <Button>
      <img src="/download.svg" alt="Download" />
      Download my answers
    </Button>
  );
};
