import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { MainWrapper } from "../styles/MainWrapper";
import { Text } from "../styles/Text";
import { colors } from "../styles/Constants";

const ProgressWrapper = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

const Container = styled(MainWrapper)`
  justify-content: center;
`;

const Circle = styled.circle`
  fill: transparent;
  stroke: ${colors.light};
  stroke-linecap: round;
`;

const FilledCircle = styled(Circle)`
  stroke: ${colors.secondary};
  transform: rotate(-90deg);
  transform-origin: 126px 126px;
  transition: stroke-dashoffset 0.5s ease-out;
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CircularProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        }
        clearInterval(interval);
        navigate("/email");
        return 100;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const strokeWidth = 12;
  const radius = 120 - strokeWidth / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <Container>
      <ProgressWrapper>
        <svg
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progress}
          height={252}
          role="progressbar"
          width={252}
          viewBox="0 0 252 252"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Circle cx="126" cy="126" r={radius} strokeWidth={strokeWidth} />

          <FilledCircle
            cx="126"
            cy="126"
            data-testid="progress-bar-bar"
            r={radius}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            strokeWidth={strokeWidth}
          />
        </svg>

        <TextWrapper>
          <Text size="extraLarge" weight="bold" color="white" margin={1}>
            {progress}%
          </Text>
        </TextWrapper>
      </ProgressWrapper>
      <Text size={"small"} weight={"medium"} color={"white"} lineHeight={25}>
        {t("loading")}
      </Text>
    </Container>
  );
};
