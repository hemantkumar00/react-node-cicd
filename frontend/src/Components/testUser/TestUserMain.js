import React, { Fragment, useCallback, useEffect, useState } from "react";
import TopBarTestUser from "./TopBarTestUser";
import LeftTestUser from "./LeftTestUser";
import RightTestUser from "./RightTestUser";
import { Navigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../LoadingSpinner";
import { useGlobalState } from "../../GlobalStateContext";

const TestUserMain = () => {
  const { testId, testSeriesId } = useParams();
  const [test, setTest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { userData, setUserData } = useGlobalState();

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
    } catch (e) {
      // console.error(e);
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

  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.question.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isLastQuestion = () => {
    return currentQuestionIndex === test.question.length - 1;
  };

  const handleSubmitTest = async () => {
    // Combine the selected options into a data structure to send to the server
    const userResponses = selectedOptions.map((options, index) => ({
      questionId: test.question[index]._id,
      selectedOptions: options,
    }));

    try {
      // Send userResponses to the server via an API endpoint
      await axios.post(
        `/testseries/submit/test/${testId}/testseries/${testSeriesId}/user/${userData._id}/result`,
        { result: userResponses },
        {
          withCredentials: true,
        },
      );

      // Fetch updated user data
      const response = await axios.get(`/user`, {
        withCredentials: true,
      });
      // console.log(response.data);
      const responseData = response.data;

      // Update the global user data state
      setUserData(responseData);

      // Redirect to the home page
      window.location.href = `/testseries/single/${testSeriesId}`;
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting the test", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    const enterFullScreen = () => {
      // Request full-screen mode on a user interaction, e.g., a button click
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.error("Failed to enter full screen:", err);
        });
      }
    };

    const exitFullScreen = () => {
      // Exit full-screen mode
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.error("Failed to exit full screen:", err);
        });
      }
    };

    const handleBeforeUnload = (e) => {
      // Display a confirmation dialog when the user tries to close the window
      e.preventDefault();
      e.returnValue = "";
    };

    enterFullScreen(); // Enter full-screen mode when the component mounts
    loadSingleTest();

    // Add the beforeunload event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      exitFullScreen(); // Exit full-screen mode when the component unmounts
      // Remove the beforeunload event listener
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [loadSingleTest]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Display a confirmation dialog when the user tries to leave the page
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave this page?";
    };

    // Add the beforeunload event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Remove the beforeunload event listener
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (!userData) {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        test &&
        userData &&
        (userData.role === "Admin" ||
          (userData.testSeriesAccess &&
            userData.testSeriesAccess.some(
              (access) => access.testSeries === testSeriesId,
            ))) && (
          <div>
            <TopBarTestUser
              time={test.time}
              test={test.name}
              instruction={test.instruction}
              submitTest={handleSubmitTest}
            />
            <div className="row">
              <div className="col-lg-8 col-md-8 p-5">
                <LeftTestUser
                  test={test}
                  currentQuestionIndex={currentQuestionIndex}
                  handleNextQuestion={handleNextQuestion}
                  handlePreviousQuestion={handlePreviousQuestion}
                  isLastQuestion={isLastQuestion()}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  submitTest={handleSubmitTest}
                />
              </div>
              <div className="col-lg-4 col-md-4 p-5">
                <RightTestUser
                  test={test}
                  currentQuestionIndex={currentQuestionIndex}
                  setCurrentQuestionIndex={setCurrentQuestionIndex}
                  selectedOptions={selectedOptions}
                />
              </div>
            </div>
          </div>
        )
      )}
    </Fragment>
  );
};

export default TestUserMain;
