import styled from "styled-components";
import React from "react";
import { Text } from "../styles/Text";
import { colors } from "../styles/Constants";

const ProgressWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 44px;
`;

const ProgressBody = styled.div`
  height: 4px;
  width: 100%;
  position: relative;
`;

const BaseBox = styled.div`
  height: 100%;
  position: absolute;
  border-radius: 4px;
  transition: width 3s ease-in-out;
`;

const Background = styled(BaseBox)`
  background: ${colors.light};
  width: 100%;
`;

const Progress = styled(BaseBox)<ProgressProps>`
  background: ${colors.secondary};
  width: ${({ percent }) => percent}%;
`;

const ProgressTitle = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
`;

const ButtonBack = styled.button`
  background: none;
  border: none;
  margin-bottom: 16px;
  position: absolute;
  left: 0;
`;

interface ProgressBarProps {
  percent: number;
  questionNum: number;
  count: number;
}

type ProgressProps = Pick<ProgressBarProps, "percent">;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  questionNum,
  count,
}) => {
  return (
    <ProgressWrapper>
      <ProgressTitle>
        {questionNum > 1 && questionNum <= count && (
          <ButtonBack>
            <img src={"/back.svg"} alt={"back"} />
          </ButtonBack>
        )}
        <Text
          color={"secondary"}
          size={"medium"}
          weight={"bold"}
          lineHeight={20}
        >
          {questionNum}
        </Text>
        <Text color={"light"} size={"medium"} weight={"bold"} lineHeight={20}>
          /{count}
        </Text>
      </ProgressTitle>
      <ProgressBody>
        <Background />
        <Progress percent={percent} />
      </ProgressBody>
    </ProgressWrapper>
  );
};
