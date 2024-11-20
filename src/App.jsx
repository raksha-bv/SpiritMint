import React, { useState } from "react";
import Hero from "./components/Hero";
import Quiz from "./components/Quiz";
import NavBar from "./components/NavBar";

function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  document.body.style.overflow = "hidden";

  return (
    <div className="min-h-screen">
      <NavBar
        onCheckItOut={() => setShowQuiz(true)}
        onGoToHero={() => setShowQuiz(false)}
      />
      {!showQuiz ? <Hero onCheckItOut={() => setShowQuiz(true)} /> : <Quiz />}
    </div>
  );
}

export default App;
