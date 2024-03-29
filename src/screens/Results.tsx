import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DownloadButton } from "../components/DownloadButton";
import { Question } from "../types/Question.type";
import { MainWrapper } from "../styles/MainWrapper";
import { Text } from "../styles/Text";
import { StyledButton } from "../styles/Button";

interface ResultsProps {
  questions: Question[];
}

export const Results: React.FC<ResultsProps> = ({ questions }) => {
  const navigate = useNavigate();
  const localData = JSON.parse(localStorage.getItem("results") || "{}");
  const { t } = useTranslation();

  const handleRetakeQuiz = () => {
    localStorage.removeItem("results");
    navigate("/");
    window.location.reload();
  };

  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    const headers = ["order", "title", "type", "answer"];
    csvContent += headers.join(",") + "\r\n";

    questions.forEach((question) => {
      const order = question.id.toString();
      const title = question.question.replace(/<\/?[^>]+(>|$)/g, "");
      const type = question.type;
      let answer = localData[order];

      answer = answer
        .map((val: string) => val.replace(/<\/?[^>]+(>|$)/g, ""))
        .join(" ");

      csvContent += `${order},${title},${type},${answer}\r\n`;
    });

    csvContent += `${questions.length + 1},email,email,${localData["email"]}\r\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "quiz_results.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <MainWrapper paddingTop={100}>
      <Text
        size={"large"}
        weight={"medium"}
        color={"light"}
        lineHeight={32}
        as={"h1"}
      >
        <i>{t("thankyou.title")}</i>
      </Text>
      <Text
        size={"small"}
        color={"light"}
        weight={"regular"}
        lineHeight={24}
        margin={56}
      >
        {t("thankyou.description")}
      </Text>
      <img src="/checkmark.svg" alt={"checkmark"} />
      <DownloadButton onClick={downloadCSV} />
      <StyledButton onClick={handleRetakeQuiz}>{t("retake")}</StyledButton>
    </MainWrapper>
  );
};
