import { MainWrapper } from "../styles/MainWrapper";
import { ProgressBar } from "../components/ProgressBar";
import { Text } from "../styles/Text";
import React, { useEffect, useState } from "react";
import { StyledButton } from "../styles/Button";
import { Question } from "../App";
import { Select } from "../styles/Select";
import { SingleWrapper } from "../styles/SingleOption";
import { Checkbox } from "../components/CheckboxOption";
import { BubbleOption } from "../components/BubbleOption";
import { BubbleSelect } from "../styles/BubbleSelect";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface QuestionProps {
  question: Question;
  count: number;
  questionNum: number;
}

export const Quiz: React.FC<QuestionProps> = ({
  question,
  count,
  questionNum,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string[];
  }>({});
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const storedOptions = localStorage.getItem("results");
    if (storedOptions) {
      setSelectedOptions(JSON.parse(storedOptions));
    }
  }, []);

  const handleSaveData = (value: string) => {
    setSelectedOptions((prevOptions) => {
      let updatedOptions: { [key: string]: string[] } = { ...prevOptions };

      if (
        question.type === "single-select" ||
        question.type === "single-select-image"
      ) {
        updatedOptions[question.id] = [value];
      } else if (question.type === "bubble") {
        const currentOptions = prevOptions[question.id] || [];
        const optionIndex = currentOptions.indexOf(value);

        if (optionIndex === -1 && currentOptions.length < 3) {
          updatedOptions[question.id] = [...currentOptions, value];
        } else if (optionIndex !== -1) {
          updatedOptions[question.id] = currentOptions.filter(
            (option) => option !== value,
          );
        }
      } else {
        const currentOptions = prevOptions[question.id] || [];
        const optionIndex = currentOptions.indexOf(value);
        if (optionIndex === -1) {
          updatedOptions[question.id] = [...currentOptions, value];
        } else {
          updatedOptions[question.id] = currentOptions.filter(
            (option) => option !== value,
          );
        }
      }

      //we can send the data to the server here
      localStorage.setItem("results", JSON.stringify(updatedOptions));

      if (
        (question.type === "single-select" ||
          question.type === "single-select-image") &&
        updatedOptions[question.id].length === 1
      ) {
        {
          questionNum === 1 && window.location.reload();
        }
        handleNext();
      }

      return updatedOptions;
    });
  };

  const handleNext = () => {
    if (questionNum < count) {
      navigate(`/quiz/${questionNum + 1}`);
    } else {
      //we can send the all object to the server here
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
      {question.type === "single-select" && (
        <Select direction={"column"}>
          {question.options.map((option, index) => (
            <SingleWrapper
              key={index}
              isSelected={selectedOptions[question.id]?.includes(option.value)}
              onClick={() => handleSaveData(option.value)}
              dangerouslySetInnerHTML={{ __html: option.label }}
            />
          ))}
        </Select>
      )}

      {question.type === "single-select-image" && (
        <Select direction={"row"}>
          {question.options.map((option, index) => (
            <SingleWrapper
              key={index}
              isSelected={selectedOptions[question.id]?.includes(option.value)}
              onClick={() => handleSaveData(option.value)}
              dangerouslySetInnerHTML={{ __html: option.label }}
            />
          ))}
        </Select>
      )}

      {question.type === "multiple-select" && (
        <Select direction={"column"}>
          {question.options.map((option, index) => (
            <Checkbox
              label={option.label}
              id={option.value}
              key={index}
              isSelected={selectedOptions[question.id]?.includes(option.value)}
              onClick={() => handleSaveData(option.value)}
            />
          ))}
        </Select>
      )}

      {question.type === "bubble" && (
        <BubbleSelect>
          {question.options.map((option, index) => (
            <BubbleOption
              onClick={() => handleSaveData(option.value)}
              isSelected={selectedOptions[question.id]?.includes(option.value)}
              key={index}
            >
              {option.label}
            </BubbleOption>
          ))}
        </BubbleSelect>
      )}

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
