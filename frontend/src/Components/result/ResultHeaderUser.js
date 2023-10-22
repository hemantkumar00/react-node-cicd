import React from "react";

const ResultHeaderUser = ({
  attemptedQuestions,
  correctQuestions,
  wrongQuestions,
  notAttemptedQuestions,
  totalMarks,
  obtainedMarks,
  totalQuestions,
}) => {
  // Calculate the percentage
  const percentage = (obtainedMarks / totalMarks) * 100;

  // Define messages based on the percentage
  let message = "";
  let messageColor = "";

  if (percentage >= 80) {
    message = "Excellent! You scored above 80%. Keep it up!";
    messageColor = "text-success";
  } else if (percentage >= 70) {
    message = "Well done! You scored above 70%. Great job!";
    messageColor = "text-primary";
  } else {
    message = "Keep practicing to improve your score.";
    messageColor = "text-warning";
  }

  return (
    <div className="test-header">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4 className="mb-4">Test Summary</h4>
            <div className="stat-item">
              <strong>Attempted:</strong> {attemptedQuestions}
            </div>
            <div className="stat-item">
              <strong>Correct:</strong> {correctQuestions}
            </div>
            <div className="stat-item">
              <strong>Wrong:</strong> {wrongQuestions}
            </div>
            <div className="stat-item">
              <strong>Not Attempted:</strong> {notAttemptedQuestions}
            </div>
          </div>
          <div className="col-md-6">
            <h4 className="mb-4">Test Scores</h4>
            <div className="score-item">
              <strong>Total Questions:</strong> {totalQuestions}
            </div>
            <div className="score-item">
              <strong>Total Marks:</strong> {totalMarks}
            </div>
            <div className="score-item">
              <strong>Obtained Marks:</strong> {obtainedMarks}
            </div>
            <div className={`score-item ${messageColor}`}>
              <strong>Percentage:</strong> {percentage.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <p className={`mb-0 ${messageColor}`}>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultHeaderUser;
