import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { StyledInput } from "../components/Input";
import { MainWrapper } from "../styles/MainWrapper";
import { Text } from "../styles/Text";
import { StyledButton } from "../styles/Button";

export const Email: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validateEmail = (email: string) => {
    if (!email) return true;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail.trim());
    const isValid = validateEmail(inputEmail);
    setEmailError(isValid ? "" : "Invalid email");
    setIsDisabled(!isValid);
  };

  const handleNextClick = () => {
    const prevResults = localStorage.getItem("results");

    if (prevResults) {
      const results = JSON.parse(prevResults);
      results.email = email;
      localStorage.setItem("results", JSON.stringify(results));
    }

    handleSendData();
  };

  const handleSendData = () => {
    setIsLoading(true);
    const answers = JSON.parse(localStorage.getItem("results") || "{}");
    delete answers.email;
    const userData = {
      email: email,
    };

    setTimeout(() => {
      fetch("https://api.example.com/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: answers,
          userData: userData,
        })
      })
        .then((response) => {
          console.log(response);
          //navigate must be called here when we will have a correct api
        })
        .catch((error) => {
          //we can show some toast here with error message
          console.error(error);
        })
        .finally(() => {
          //now i use navigate here because i want to navigate after the fetch failed
          navigate("/results");
          setIsLoading(false);
        });
    }, 3000);//i used timeout to simulate the fetch
  };

  return (
    <MainWrapper paddingTop={72}>
      <Text
        size={"large"}
        weight={"medium"}
        color={"light"}
        lineHeight={32}
        as={"h1"}
      >
        {t("email.title")}
      </Text>
      <Text
        size={"small"}
        color={"dark"}
        weight={"regular"}
        lineHeight={24}
        margin={56}
      >
        {t("email.description")}
      </Text>
      <StyledInput
        value={email}
        onChange={handleEmailChange}
        error={!!emailError}
      />
      <Text
        size={"extraSmall"}
        color={"dark"}
        weight={"regular"}
        lineHeight={24}
      >
        {t("email.agree")}
      </Text>
      <StyledButton
        disabled={isDisabled || email.trim().length === 0 || isLoading}
        onClick={handleNextClick}
        className={isLoading ? "animate" : ""}
      >
        {isLoading ? t("submit") : t("next")}
      </StyledButton>
    </MainWrapper>
  );
};
