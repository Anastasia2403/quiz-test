import React from "react";
import styled, { css } from "styled-components";
import { SingleWrapper } from "../styles/SingleOption";
import { colors } from "../styles/Constants";

const CheckboxWrapper = styled(SingleWrapper)<CheckboxWrapperProps>`
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

  ${({ isSelected }) =>
    isSelected &&
    css`
      label::after {
        background-color: ${colors.secondary};
        background-image: url("/Vector.svg");
        background-repeat: no-repeat;
        background-position: center;
      }
    `}
`;

interface CheckboxProps {
  label: string;
  id: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

type CheckboxWrapperProps = Pick<CheckboxProps, "isSelected">;

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  isSelected,
  onClick,
  className,
}) => (
  <CheckboxWrapper isSelected={isSelected} onClick={onClick} className={className}>
    <input type="checkbox" id={id} checked={isSelected} onClick={onClick} />
    <label htmlFor={id} dangerouslySetInnerHTML={{ __html: label }} />
  </CheckboxWrapper>
);
