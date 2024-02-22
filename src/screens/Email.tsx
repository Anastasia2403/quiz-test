import React, { useState } from "react";
import { MainWrapper } from "../styles/MainWrapper";
import { Text } from "../styles/Text";
import { StyledButton } from "../styles/Button";
import { StyledInput } from "../components/Input";
import { useNavigate } from "react-router-dom";

export const Email: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

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

    navigate("/results");
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
        Email
      </Text>
      <Text
        size={"small"}
        color={"dark"}
        weight={"regular"}
        lineHeight={24}
        margin={56}
      >
        Enter your email to get full access
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
        By continuing I agree with <span>Privacy policy</span> and <br />
        <span>Terms of use.</span>
      </Text>
      <StyledButton disabled={isDisabled} onClick={handleNextClick}>
        Next
      </StyledButton>
    </MainWrapper>
  );
};
