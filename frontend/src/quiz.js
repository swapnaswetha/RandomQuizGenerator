import React, { useState, useEffect } from 'react';

const QuizApp = ({ exam }) => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(20); // 20 seconds

  const handleRadioChange = (questionId, selectedOption) => {
    const updatedAnswers = [...userAnswers];
    const existingAnswerIndex = updatedAnswers.findIndex((answer) => answer.questionId === questionId);

    if (existingAnswerIndex !== -1) {
      updatedAnswers[existingAnswerIndex].selectedOption = selectedOption;
    } else {
      updatedAnswers.push({ questionId, selectedOption });
    }

    setUserAnswers(updatedAnswers);
  };

  const calculateScore = () => {
    let currentScore = 0;
    userAnswers.forEach((answer) => {
      const question = exam.find((q) => q.id === answer.questionId);
      if (question && question.Corrans === answer.selectedOption) {
        currentScore += 1;
      }
    });

    setScore(currentScore);
    setShowFeedback(true);
  };

  const resetQuiz = () => {
    setUserAnswers([]);
    setScore(0);
    setShowFeedback(false);
  };

  const renderQuestionFeedback = (question) => {
    const userAnswer = userAnswers.find((answer) => answer.questionId === question.id);
    const isCorrect = userAnswer && userAnswer.selectedOption === question.Corrans;

    return (
      <div key={question.id}>
        <p className="text-primary">
          {question.id}) {question.Question}?
        </p>
        <div>
          <input
            type="radio"
            name={question.id}
            id="Option1"
            value={question.Option1}
            disabled
            checked={userAnswer && userAnswer.selectedOption === question.Option1}
          />
          <label htmlFor="Option1" style={{ color: isCorrect ? 'green' : 'red' }}>
            {question.Option1}
          </label>
        </div>
        <div>
          <input
            type="radio"
            name={question.id}
            id="Option3"
            value={question.Option3}
            disabled
            checked={userAnswer && userAnswer.selectedOption === question.Option3}
          />
          <label htmlFor="Option3" style={{ color: isCorrect ? 'green' : 'red' }}>
            {question.Option3}
          </label>
        </div>
        <div>
          <input
            type="radio"
            name={question.id}
            id="Option4"
            value={question.Option4}
            disabled
            checked={userAnswer && userAnswer.selectedOption === question.Option4}
          />
          <label htmlFor="Option4" style={{ color: isCorrect ? 'green' : 'red' }}>
            {question.Option4}
          </label>
        </div>
        <div>
          <label id="corans" style={{ color: 'green' }}>
            <b>Correct Answer: {question.Corrans}</b>
          </label>
        </div>
        <hr />
      </div>
    );
  };

  // Effect to start the timer on component mount
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Set a timeout to close the exam after 20 seconds
    setTimeout(() => {
      calculateScore(); // Automatically submit the quiz
      clearInterval(timer); // Clear the interval to stop the timer
    }, 20000);

    // Clean up the timer on component unmount or when the quiz is submitted or reset
    return () => clearInterval(timer);
  }, []);

  // Effect to check the time remaining and close the quiz when the time is up
  useEffect(() => {
    if (timeRemaining <= 0) {
      calculateScore(); // Automatically submit the quiz
    }
  }, [timeRemaining]);

  return (
    <div className="container">
      <h1 className="text-danger mt-3">Random Question Generation</h1>
      <hr />
      <div>
        <p>Time Remaining: {Math.max(0, Math.floor(timeRemaining / 60))}:{(timeRemaining % 60).toString().padStart(2, '0')}</p>
        {exam &&
          exam.map((question) => (
            <div key={question.id}>
              <p className="text-primary">
                {question.id}) {question.Question}?
              </p>
              <div>
                <input
                  type="radio"
                  name={question.id}
                  id="Option1"
                  value={question.Option1}
                  onChange={() => handleRadioChange(question.id, question.Option1)}
                />
                <label htmlFor="Option1">{question.Option1}</label>
              </div>
              <div>
                <input
                  type="radio"
                  name={question.id}
                  id="Option2"
                  value={question.Option2}
                  onChange={() => handleRadioChange(question.id, question.Option2)}
                />
                <label htmlFor="Option2">{question.Option2}</label>
              </div>
              <div>
                <input
                  type="radio"
                  name={question.id}
                  id="Option3"
                  value={question.Option3}
                  onChange={() => handleRadioChange(question.id, question.Option3)}
                />
                <label htmlFor="Option3">{question.Option3}</label>
              </div>
              <div>
                <input
                  type="radio"
                  name={question.id}
                  id="Option4"
                  value={question.Option4}
                  onChange={() => handleRadioChange(question.id, question.Option4)}
                />
                <label htmlFor="Option4">{question.Option4}</label>
              </div>
              <div>
                <label id="corans" style={{ display: 'none', color: 'green' }}><b>{question.Corrans}</b></label>
              </div>
              <hr />
            </div>
          ))}
        <button className="btn btn-success" onClick={calculateScore}>
          Submit
        </button>
        <br />
        {showFeedback && (
          <div>
            <h4>Your Score: {score}/5</h4>
            {score === 5 ? (
              <p>Congratulations! You passed the quiz.</p>
            ) : (
              <p>Keep practicing! You can do better next time.</p>
            )}
            {exam.map(renderQuestionFeedback)}
            <button className="btn btn-primary" onClick={resetQuiz}>
              Retry Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;