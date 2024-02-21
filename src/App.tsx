import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Quiz } from "./screens/Quiz";
import { Processing } from "./screens/Processing";
import { Email } from "./screens/Email";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/quiz/:quizId" element={<Quiz />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/email" element={<Email />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
