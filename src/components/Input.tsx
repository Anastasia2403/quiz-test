import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colors, fontsSize, fontsWeight } from "../styles/Constants";
import { Text } from "../styles/Text";

interface InputProps {
  error?: boolean;
}
export const Input = styled.input<InputProps>`
  width: 100%;
  padding: 24px 20px;
  align-items: center;
  border-radius: 16px;
  border: 2px solid ${({ error }) => (error ? colors.error : "transparent")};
  background-color: ${colors.primary};
  transition: border 0.3s ease;
  color: ${colors.white};
  font-size: ${fontsSize.small};
  font-weight: ${fontsWeight.normal};

  &:hover,
  &:focus,
  &:not(:placeholder-shown) {
    border: 2px solid
      ${({ error }) => (error ? colors.error : colors.secondary)};
  }

  &:focus-visible {
    outline: none;
  }

  &::placeholder {
    font-weight: ${fontsWeight.normal};
    font-size: ${fontsSize.small};
    line-height: 24px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 56px;
`;

interface StyledInputProps {
  value: string;
  onChange: (e: any) => void;
  error: boolean;
}

export const StyledInput: React.FC<StyledInputProps> = ({
  value,
  onChange,
  error,
}) => {
  const { t } = useTranslation();
  return (
    <Form>
      <Input
        placeholder={t("email.placeholder")}
        type="email"
        value={value}
        onChange={onChange}
        error={error}
      />
      {error && (
        <Text size={"extraSmall"} color={"error"} weight={"regular"}>
          {t("email.invalid")}
        </Text>
      )}
    </Form>
  );
};
