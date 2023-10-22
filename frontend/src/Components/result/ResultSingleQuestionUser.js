import React, { Fragment } from "react";

const ResultSingleQuestionUser = ({ data }) => {
  // Determine the status class based on marks
  const statusClass =
    data.marks > 0 ? "success" : data.marks < 0 ? "warning" : "danger";

  return (
    <Fragment>
      {data.question.length > 0 && (
        <div
          className={`p-lg-4 p-md-1 p-sm-1 my-3 border rounded`}
          style={{
            backgroundColor:
              statusClass === "success"
                ? "#d1e7dd"
                : statusClass === "danger"
                ? "rgb(206, 206, 207)"
                : "#f8d7da",
          }}
        >
          <h3>Question: {data.question[0].name}</h3>
          <hr />
          <p>Description: {data.question[0].desc}</p>
          {data.question[0].image && (
            <div style={{ maxWidth: "400px", maxHeight: "300px" }}>
              <img
                className="my-4 rounded img-thumbnail col-lg-3"
                src={data.question[0].image}
                alt="Question"
              />
            </div>
          )}
          <ul className="list-group">
            {data.question[0].options.map((option, index) => {
              const isSelectedCorrect = data.correctOption.includes(
                index + 1 + "",
              );
              const isSelected = data.sellectedOption.includes(index + 1 + "");
              const optionClass = isSelectedCorrect
                ? "list-group-item-success"
                : isSelected
                ? "list-group-item-danger"
                : "";

              return (
                <li key={index} className={`list-group-item ${optionClass}`}>
                  {index + 1}) {option}
                </li>
              );
            })}
          </ul>
          <p className="mt-3">Rationale: {data.question[0].rational}</p>
          <p>
            Marks: {data.marks}/{data.question[0].marks}
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default ResultSingleQuestionUser;
