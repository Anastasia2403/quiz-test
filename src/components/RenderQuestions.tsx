import { SingleWrapper } from "../styles/SingleOption";
import { Question, QuestionType } from "../types/Question.type";
import { BubbleOption } from "./BubbleOption";
import { Checkbox } from "./CheckboxOption";
import { BubbleSelect } from "../styles/BubbleSelect";
import { Select } from "../styles/Select";
import { log } from "console";

interface RenderingQuestionsProps {
  question: Question;
  selectedOptions: { [key: string]: string[] };
  handleSaveData: (value: string) => void;
  isAnimating: boolean;
}

export const RenderingQuestions: React.FC<RenderingQuestionsProps> = ({
  question,
  selectedOptions,
  handleSaveData,
  isAnimating,
}) => {
  switch (question.type) {
    case QuestionType.SingleSelect:
    case QuestionType.SingleSelectImage:
      return (
        <Select direction={question.type === QuestionType.SingleSelect ? 'column' : 'row'}>
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
      );
    case QuestionType.MultipleSelect:
      return (
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
      );
    case QuestionType.Bubble:
      return (
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
      );
    default:
      return null;
  }
}