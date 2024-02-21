import React from "react";
import styled from "styled-components";
import { SingleWrapper } from "./SingleOption";
import { colors } from "../styles/Constants";

const CheckboxWrapper = styled(SingleWrapper)`
  position: relative;
  align-items: flex-start;
  cursor: pointer;
  padding: 0;

  input {
    opacity: 0;
    position: absolute;
  }

  label {
    display: flex;
    cursor: pointer;
    width: 100%;
    padding: 28px 24px;
  }

  label::after {
    content: "";
    width: 24px;
    height: 24px;
    border-radius: 8px;
    border: 1px solid ${colors.secondary};
    background-color: ${colors.lightPrimary};
    position: absolute;
    right: 24px;
    transition: background-color 0.3s ease;
  }

  input:checked + label::after {
    background-color: ${colors.secondary};
    background-image: url("/Vector.svg");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

interface CheckboxProps {
  label: string;
  id: string;
  isSelected: boolean;
  onClick: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  isSelected,
  onClick,
}) => (
  <CheckboxWrapper isSelected={isSelected} onClick={onClick}>
    <input type="checkbox" id={id} />
    <label htmlFor={id}>{label}</label>
  </CheckboxWrapper>
);
