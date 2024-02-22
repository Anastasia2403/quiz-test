import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Quiz } from "./screens/Quiz";
import { Processing } from "./screens/Processing";
import { Email } from "./screens/Email";
import { Results } from "./screens/Results";

export interface Question {
  id: number;
  question: string;
  subquestion: string;
  type: string;
  options: { label: string; value: string }[];
}

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<null | Question>(null);

  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        if (data.length > 0) {
          setCurrentQuestion(data[0]);
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

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
}

export default App;
