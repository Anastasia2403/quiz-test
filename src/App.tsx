import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Quiz } from "./screens/Quiz";
import { Processing } from "./screens/Processing";
import { Email } from "./screens/Email";
import { Results } from "./screens/Results";
import enTranslation from "./locales/en.json";
import frTranslation from "./locales/fr.json";
import esTranslation from "./locales/es.json";
import deTranslation from "./locales/de.json";
import { Question } from "./types/Question.type";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
    es: { translation: esTranslation },
    de: { translation: deTranslation },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const App = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<null | Question>(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    fetch(`/questions/${language}Questions.json`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        if (data.length > 0) {
          setCurrentQuestion(data[0]);
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, [language]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    const resultsString = localStorage.getItem("results");

    if (resultsString) {
      const resultsObject = JSON.parse(resultsString);
      const elementWithKeyOne = resultsObject["1"];

      setLanguage(elementWithKeyOne[0]);
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        {questions.map((question, index) => (
          <Route
            key={question.id}
            path={`/quiz/${question.id}`}
            element={
              <Quiz
                question={question}
                count={questions.length}
                questionNum={index + 1}
              />
            }
          />
        ))}
        {currentQuestion && (
          <Route
            path="/"
            element={<Navigate to={`/quiz/${currentQuestion?.id}`} />}
          />
        )}
        <Route path="/processing" element={<Processing />} />
        <Route path="/email" element={<Email />} />
        <Route path="/results" element={<Results questions={questions} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
