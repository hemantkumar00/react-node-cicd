import React, { useEffect, useState } from "react";

const LeftTestUser = ({
  test,
  currentQuestionIndex,
  handleNextQuestion,
  handlePreviousQuestion,
  isLastQuestion,
  selectedOptions,
  setSelectedOptions,
  submitTest,
}) => {
  const currentQuestion = test.question[currentQuestionIndex];
  const [isMultipleSelection, setIsMultipleSelection] = useState(false);

  // Handle option change to send index + 1
  const handleOptionChange = (optionIndex) => {
    if (isMultipleSelection) {
      setSelectedOptions((prevSelectedOptions) => {
        const updatedSelectedOptions = [...prevSelectedOptions];
        if (!updatedSelectedOptions[currentQuestionIndex]) {
          updatedSelectedOptions[currentQuestionIndex] = [];
        }

        if (
          updatedSelectedOptions[currentQuestionIndex].includes(optionIndex)
        ) {
          updatedSelectedOptions[currentQuestionIndex] = updatedSelectedOptions[
            currentQuestionIndex
          ].filter((item) => item !== optionIndex);
        } else {
          updatedSelectedOptions[currentQuestionIndex].push(optionIndex);
        }

        return updatedSelectedOptions;
      });
    } else {
      // Handle single selection
      setSelectedOptions((prevSelectedOptions) => {
        const updatedSelectedOptions = [...prevSelectedOptions];
        updatedSelectedOptions[currentQuestionIndex] = [optionIndex];
        return updatedSelectedOptions;
      });
    }
  };

  useEffect(() => {
    setIsMultipleSelection(
      currentQuestion &&
        currentQuestion.correctOpt &&
        currentQuestion.correctOpt.length > 1,
    );
  }, [currentQuestion]);

  return (
    <>
      {currentQuestion && (
        <div>
          <div className="card mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h3 className="card-title">
                  Q. No. :- {currentQuestionIndex + 1}
                </h3>
              </div>
              <div>
                <div className="d-flex justify-content-center align-items-center">
                  <p className="card-text rounded p-1 bg-light m-1 mx-4 text-primary">
                    {isMultipleSelection ? "Multiple options" : "Single option"}
                  </p>
                  <p className="card-text">
                    Marking Scheme:{" "}
                    <span className="rounded p-1 bg-light text-success">
                      +{currentQuestion.marks}
                    </span>{" "}
                    <span className="rounded p-1 bg-light text-danger">
                      -{currentQuestion.negative}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #F8F9FA" }}></div>
          <div className="card">
            <div
              className="card-body"
              style={{ maxHeight: "65vh", overflowY: "auto" }}
            >
              <h4 className="card-text m-3">
                Question: {currentQuestion.name}
              </h4>

              {/* <p className="card-text">Description: {currentQuestion.desc}</p> */}
              {currentQuestion.image && (
                <div style={{ maxWidth: "700px", maxHeight: "500px" }}>
                  <img
                    src={currentQuestion.image}
                    alt="Question"
                    className="my-4 rounded img-thumbnail col-lg-3"
                  />
                </div>
              )}
              <ul
                className="list-group list-group-flush card"
                style={{ borderRadius: "5px" }}
              >
                {isMultipleSelection
                  ? currentQuestion.options.map((option, index) => (
                      <li
                        className={`list-group-item m-2 ${
                          index === 0 ? `mt-3` : ""
                        }`}
                        key={index}
                      >
                        <label>
                          <input
                            type="checkbox"
                            name="options"
                            onChange={() => handleOptionChange(index + 1)} // Pass index + 1
                            checked={
                              selectedOptions[currentQuestionIndex]?.includes(
                                index + 1,
                              ) || false
                            }
                          />{" "}
                          {option}
                        </label>
                      </li>
                    ))
                  : currentQuestion.options.map((option, index) => (
                      <li
                        className={`list-group-item m-2 ${
                          index === 0 ? `mt-3` : ""
                        }`}
                        key={index}
                      >
                        <label>
                          <input
                            type="radio"
                            name="options"
                            onChange={() => handleOptionChange(index + 1)} // Pass index + 1
                            checked={
                              selectedOptions[currentQuestionIndex]?.[0] ===
                              index + 1
                            }
                          />{" "}
                          {option}
                        </label>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <div>
              <button
                className="btn btn-primary"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
            </div>
            <div>
              {isLastQuestion ? (
                <button className="btn btn-success" onClick={submitTest}>
                  Submit
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleNextQuestion}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftTestUser;
