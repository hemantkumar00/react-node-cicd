import React, { useEffect, useRef, useState } from "react";
import ResultHeaderUser from "./ResultHeaderUser";
import { useGlobalState } from "../../GlobalStateContext";
import { Navigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../LoadingSpinner";
import ResultSingleQuestionUser from "./ResultSingleQuestionUser";

const ResultMainUser = () => {
  const { testId } = useParams();
  const { userData } = useGlobalState();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [video, setVideo] = useState(null);
  const targetRef = useRef(null);

  const scrollToTarget = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    async function loadSingleResult() {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `/testseries/result/test/${testId}/user/${userData._id}`,
          { withCredentials: true },
        );

        const testVideo = await axios.get(`/testseries/${testId}/view`, {
          withCredentials: true,
        });
        setVideo(testVideo.data.solutionVideo);
        // Check if the response data is empty
        if (!response.data) {
          throw new Error("No data received");
        }

        // console.log(response.data);
        setResult(response.data);
      } catch (e) {
        // console.log(e);
        const errorMessage = e.message || "An error occurred";
        toast.error(`Error: ${errorMessage}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } finally {
        setIsLoading(false);
      }
    }

    // Call loadSingleResult when the component mounts
    loadSingleResult();
  }, [testId, userData._id]); // The empty dependency array ensures this runs only once

  // Initialize values here
  let attemptedQuestions = 0;
  let correctQuestions = 0;
  let wrongQuestions = 0;
  let notAttemptedQuestions = 0;
  let totalMarks = 0;
  let obtainedMarks = 0;

  // Calculate values based on the result
  if (result) {
    totalMarks = result.totalMarks;
    obtainedMarks = result.optainedMarks;
    result.questionAnswer.forEach((data) => {
      if (data.result === "N") {
        notAttemptedQuestions++;
      } else {
        attemptedQuestions++;
        if (data.result === "R") correctQuestions++;
        else wrongQuestions++;
      }
    });
  }

  if (!userData) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div>
            <ResultHeaderUser
              attemptedQuestions={attemptedQuestions}
              correctQuestions={correctQuestions}
              wrongQuestions={wrongQuestions}
              notAttemptedQuestions={notAttemptedQuestions}
              totalMarks={totalMarks}
              obtainedMarks={obtainedMarks}
              totalQuestions={result.questionAnswer.length}
            />
            <div
              className="my-3"
              style={{ borderTop: "1px solid #F8F9FA" }}
            ></div>
            <h4 className="text-center">Result Question Wise</h4>
            {video && (
              <div>
                <button
                  onClick={scrollToTarget}
                  className="btn btn-outline-primary"
                >
                  Video solution
                </button>
              </div>
            )}
            {result.questionAnswer.map((data, index) => (
              // Use parentheses to wrap JSX and return statement

              <ResultSingleQuestionUser key={index} data={data} />
            ))}
          </div>
          {video && (
            <div
              ref={targetRef}
              class="embed-responsive embed-responsive-16by9 my-5"
            >
              <h2>Video Solution:</h2>

              <iframe
                class="embed-responsive-item"
                width="560"
                height="315"
                src={video}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ResultMainUser;
