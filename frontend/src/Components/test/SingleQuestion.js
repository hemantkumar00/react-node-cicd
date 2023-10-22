import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CreateUpdateQuestion from "./CreateUpdateQuestion";

const SingleQuestion = ({ data, testId, hitRelaoad }) => {
  const options = data.options.join(", ");
  const correctOption = data.correctOpt.join(", ");
  const [isLoading, setIsLoading] = useState(false);
  const [openUpdateQuestion, setOpenUpdateQuestion] = useState(false);

  //Delete Question handler.

  async function deleteQuestionHandler() {
    setIsLoading(true);
    try {
      await axios.delete(`/testseries/${testId}/${data._id}/delete/question`, {
        withCredentials: true,
      });
      toast.success(`Msg: Question is Deleted Successfully`, {
        position: toast.POSITION.TOP_CENTER,
      });
      hitRelaoad();
    } catch (err) {
      // console.log(err);
      toast.error("Msg: Some error in deleting questions", {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function toggleUpdateForm() {
    await hitRelaoad();
    setOpenUpdateQuestion(false);
  }

  return (
    <div>
      <div className="card mt-2">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="card-title">Question:- {data.name}</h5>
          <span className="text-muted">
            Marks:{data.marks} ,
            {data.negative && <span>Negative: {data.negative}</span>}
          </span>
        </div>
        <div className="card-body">
          {/* <p className="card-text">Description:- {data.desc}</p> */}
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-text">Options:- {options}</p>
            <span className="text-muted">
              Correct options:- {correctOption}
            </span>
          </div>
          {data.rational && (
            <p className="text-muted">Rational:- {data.rational}</p>
          )}
          {data.image && (
            <img
              src={data.image}
              alt="atl img..."
              className="mb-2"
              style={{ maxWidth: "150px", maxHeight: "150px" }}
            />
          )}

          <div>
            <button
              className="btn btn-outline-warning mx-1"
              onClick={() => {
                setOpenUpdateQuestion(!openUpdateQuestion);
              }}
            >
              Update Question
            </button>
            <button
              disabled={isLoading}
              className="btn btn-outline-danger mx-1"
              onClick={() => {
                deleteQuestionHandler();
              }}
            >
              Delete Question
            </button>
          </div>
        </div>
        <div
          className={`px-4 add-test-dropdown ${
            openUpdateQuestion ? "expanded" : ""
          }`}
        >
          <hr />
          {openUpdateQuestion && (
            <CreateUpdateQuestion
              data={data}
              update={true}
              toggleUpdateForm={toggleUpdateForm}
            />
          )}
        </div>
      </div>
      {/* //TODO: will work on this later. */}
    </div>
  );
};

export default SingleQuestion;
