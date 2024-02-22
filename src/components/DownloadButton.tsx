import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { fontsSize, fontsWeight, colors } from "../styles/Constants";

const Button = styled.button`
  position: absolute;
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
  bottom: 112px;

  &:hover {
    color: ${colors.dark};
  }
`;

interface DownloadButtonProps {
  onClick?: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <Button onClick={onClick}>
      <img src="/download.svg" alt="Download" />
      {t("download")}
    </Button>
  );
};
