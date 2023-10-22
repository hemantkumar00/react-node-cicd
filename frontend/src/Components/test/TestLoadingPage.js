import React, { Fragment, useCallback, useEffect, useState } from "react";
import CreateUpdateQuestion from "./CreateUpdateQuestion";
import ExcelQuestion from "./ExcelQuestion";
import SingleQuestion from "./SingleQuestion";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalState } from "../../GlobalStateContext";
import LoadingSpinner from "../../LoadingSpinner";

const TestLoadingPage = () => {
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const { userData } = useGlobalState();
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function handleAddQuestionForm() {
    setOpenAddQuestion(!openAddQuestion);
  }

  const loadSingleTest = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!testId) {
        // Handle missing testId
        toast.error("Test ID is missing", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }

      const response = await axios.get(`/testseries/${testId}/view`, {
        withCredentials: true,
      });
      setTest(response.data);
      // console.log(test);
    } catch (e) {
      // console.log(e);
      const error =
        (e.request &&
          e.request.response &&
          JSON.parse(e.request.response).error) ||
        "An error occurred";
      toast.error(`Msg: ${error}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsLoading(false);
    }
  }, [testId]);

  async function hitRelaoad() {
    setOpenAddQuestion(false);
    await loadSingleTest();
  }

  useEffect(() => {
    loadSingleTest();
  }, [testId, loadSingleTest]);
  if (!userData || userData.role !== "Admin") {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        test && (
          <div className="my-5">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                className="btn btn-primary"
                onClick={handleAddQuestionForm}
              >
                Add New Question
              </button>
            </div>
            <div
              className={`px-4 add-test-dropdown ${
                openAddQuestion ? "expanded" : ""
              }`}
            >
              {openAddQuestion && (
                <CreateUpdateQuestion hitRelaoad={hitRelaoad} />
              )}
            </div>
            <ExcelQuestion hitRelaoad={hitRelaoad} />
            {test.question.map((data, index) => (
              <SingleQuestion
                key={index}
                data={data}
                testId={testId}
                hitRelaoad={hitRelaoad}
              />
            ))}
          </div>
        )
      )}
    </Fragment>
  );
};

export default TestLoadingPage;
