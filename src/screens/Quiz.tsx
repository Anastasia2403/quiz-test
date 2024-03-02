import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Question } from "../types/Question.type";
import { QuestionType } from "../types/Question.type";
import { handleSingleSelectSave, handleBubbleSave, handleDefaultSave } from "../helpers";
import { ProgressBar } from "../components/ProgressBar";
import { RenderingQuestions } from "../components/RenderQuestions";
import { StyledButton } from "../styles/Button";
import { MainWrapper } from "../styles/MainWrapper";
import { Text } from "../styles/Text";

interface QuizProps {
  question: Question;
  count: number;
  questionNum: number;
}

export const Quiz: React.FC<QuizProps> = ({
  question,
  count,
  questionNum,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string[];
  }>({});
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const storedOptions = localStorage.getItem("results");
    if (storedOptions) {
      setSelectedOptions(JSON.parse(storedOptions));
    }
  }, []);

  const handleSaveData = (value: string) => {
    setSelectedOptions((prevOptions) => {
      const currentOptions = prevOptions[question.id] || [];
      let updatedOptions;
      switch (question.type) {
        case QuestionType.SingleSelect:
        case QuestionType.SingleSelectImage:
          updatedOptions = handleSingleSelectSave(value);
          setIsAnimating(true);

          setTimeout(() => {
            setIsAnimating(false);
            if (questionNum === 1) {
              handleNext();
              window.location.reload();
            } else {
              handleNext();
            }
          }, 2000);
          break;
        case QuestionType.Bubble:
          updatedOptions = handleBubbleSave(currentOptions, value);
          break;
        default:
          updatedOptions = handleDefaultSave(currentOptions, value);
          break;
      }

      const newOptions = { ...prevOptions, [question.id]: updatedOptions };
      localStorage.setItem("results", JSON.stringify(newOptions));

      return newOptions;
    });
  };

  const handleNext = () => {
    if (questionNum < count) {
      navigate(`/quiz/${questionNum + 1}`);
    } else {
      navigate("/processing");
    }
  };

  return (
    <MainWrapper>
      <ProgressBar
        percent={Math.floor((questionNum * 100) / count)}
        count={count}
        questionNum={questionNum}
      ></ProgressBar>
      <Text
        size={"large"}
        weight={"medium"}
        color={"light"}
        lineHeight={32}
        as={"h1"}
        dangerouslySetInnerHTML={{ __html: question.question }}
      />
      <Text
        size={"small"}
        color={"dark"}
        weight={"regular"}
        lineHeight={24}
        dangerouslySetInnerHTML={{ __html: question.subquestion }}
      />
      <RenderingQuestions
        question={question}
        selectedOptions={selectedOptions}
        handleSaveData={handleSaveData}
        isAnimating={isAnimating}
      />
      {(question.type === "multiple-select" || question.type === "bubble") && (
        <StyledButton
          onClick={handleNext}
          disabled={
            !selectedOptions.hasOwnProperty(question.id) ||
            selectedOptions[question.id].length === 0
          }
        >
          {t("next")}
        </StyledButton>
      )}
    </MainWrapper>
  );
};
