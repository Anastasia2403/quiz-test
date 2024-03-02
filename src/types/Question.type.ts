export interface Question {
    id: number;
    question: string;
    subquestion: string;
    type: string;
    options: { label: string; value: string }[];
}

export enum QuestionType {
    SingleSelect = 'single-select',
    SingleSelectImage = 'single-select-image',
    Bubble = 'bubble',
    MultipleSelect = 'multiple-select',
}