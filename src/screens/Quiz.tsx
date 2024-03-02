import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Question } from "../App";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/CheckboxOption";
import { BubbleOption } from "../components/BubbleOption";
import { Text } from "../styles/Text";
import { StyledButton } from "../styles/Button";
import { Select } from "../styles/Select";
import { SingleWrapper } from "../styles/SingleOption";
import { BubbleSelect } from "../styles/BubbleSelect";
import { MainWrapper } from "../styles/MainWrapper";

interface QuestionProps {
  question: Question;
  count: number;
  questionNum: number;
}
enum QuestionType {
  SingleSelect = 'single-select',
  SingleSelectImage = 'single-select-image',
  Bubble = 'bubble',
  MultipleSelect = 'multiple-select',
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
          updatedOptions = handleSingleSelect(value);
          setIsAnimating(true);

          setTimeout(() => {
            setIsAnimating(false);
            if(questionNum === 1) {
              handleNext();
              window.location.reload();
            } else {
              handleNext();
            }
          }, 2000);
          break;
        case QuestionType.Bubble:
          updatedOptions = handleBubble(currentOptions, value);
          break;
        default:
          updatedOptions = handleDefault(currentOptions, value);
          break;
      }

      const newOptions = { ...prevOptions, [question.id]: updatedOptions };
      localStorage.setItem("results", JSON.stringify(newOptions));

      return newOptions;
    });
  };

  const handleSingleSelect = (value: string) => {
    return [value];
  };
  
  const handleBubble = (currentOptions: string[], value: string) => {
    const optionIndex = currentOptions.indexOf(value);
    if (optionIndex === -1 && currentOptions.length < 3) {
      return [...currentOptions, value];
    } else if (optionIndex !== -1) {
      return currentOptions.filter((option) => option !== value);
    }
    return currentOptions;
  };
  
  const handleDefault = (currentOptions: string[], value: string) => {
    const optionIndex = currentOptions.indexOf(value);
    if (optionIndex === -1) {
      return [...currentOptions, value];
    } else {
      return currentOptions.filter((option) => option !== value);
    }
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
      {question.type === "single-select" && (
        <Select direction={"column"}>
          {question.options.map((option, index) => (
            <SingleWrapper
              key={index}
              isSelected={selectedOptions[question.id]?.includes(option.value)}
              onClick={() => handleSaveData(option.value)}
              dangerouslySetInnerHTML={{ __html: option.label }}
              className={isAnimating ? "animate" : ""}
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
              className={isAnimating ? "animate" : ""}
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
