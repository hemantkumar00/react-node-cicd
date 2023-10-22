import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import TestseriesHeading from "./TestseriesHeading";
import TestCard from "./TestCard";
import AddNewTest from "./AddNewTest";
import { toast } from "react-toastify";
import axios from "axios";
import { useGlobalState } from "../../GlobalStateContext";
import LoadingSpinner from "../../LoadingSpinner";

const TestseriesLandingPage = () => {
  const { userData } = useGlobalState();
  const { testSeriesId } = useParams();
  const [testseries, setTestseries] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openAddTest, setOpenAddTest] = useState(false);

  function handleAddTestForm() {
    setOpenAddTest(!openAddTest);
  }

  const loadSingleTestSeries = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/testseries/${testSeriesId}/all`);
      setTestseries(response.data);
    } catch (e) {
      // console.log(e);
      // const error = JSON.parse(e.request.response).error;
      toast.error(`Msg: Error in loading testseries`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsLoading(false);
    }
  }, [testSeriesId]);

  useEffect(() => {
    loadSingleTestSeries();
  }, [loadSingleTestSeries]);

  // ... Import statements and component setup ...

  async function handleNewTestCreated() {
    setOpenAddTest(false); // Close the AddNewTest form
    await loadSingleTestSeries(); // Reload the test series data
  }
  if (!userData || userData.role !== "Admin") {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        testseries && (
          <div>
            <TestseriesHeading
              heading={testseries.topic}
              price={testseries.price}
              description={testseries.description}
              image={testseries.image}
              count={testseries.test.length}
            />
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <h3 style={{ fontSize: "24px", marginBottom: "20px" }}>Tests</h3>
              <p style={{ fontSize: "18px", color: "#777" }}>
                Explore the full range of tests to prepare yourself for success.
              </p>
              {userData && userData.role === "Admin" && (
                <div>
                  {" "}
                  <button
                    onClick={() => {
                      setOpenAddTest(!openAddTest);
                    }}
                    className="btn btn-primary"
                  >
                    Create New Test
                  </button>
                  <div
                    className={`px-4 add-test-dropdown ${
                      openAddTest ? "expanded" : ""
                    }`}
                  >
                    {openAddTest && (
                      <AddNewTest
                        testseriesId={testSeriesId}
                        toggleForm={handleAddTestForm}
                        onNewTestCreated={handleNewTestCreated}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
            {testseries.test.map((data, index) => (
              <TestCard
                key={index}
                desc={data.desc}
                instruction={data.instruction}
                name={data.name}
                time={data.time}
                solutionVideo={data.solutionVideo}
                id={testSeriesId}
                testId={data._id}
                onNewTestDeleted={handleNewTestCreated}
              />
            ))}
          </div>
        )
      )}
    </Fragment>
  );
};

export default TestseriesLandingPage;
