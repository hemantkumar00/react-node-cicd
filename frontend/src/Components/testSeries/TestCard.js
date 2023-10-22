import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AddNewTest from "./AddNewTest";
import { useGlobalState } from "../../GlobalStateContext";
import { Link } from "react-router-dom";

const TestCard = ({
  name,
  desc,
  instruction,
  time,
  solutionVideo,
  id,
  testId,
  onNewTestDeleted,
}) => {
  const { userData } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);
  const [openUpdateTest, setOpenUpdateTest] = useState(false);

  function handleUpdateFormToggle() {
    setOpenUpdateTest(!openUpdateTest);
  }

  async function deleteTestHandler() {
    setIsLoading(true);
    try {
      await axios.delete(`/testseries/${id}/${testId}/delete`, {
        withCredentials: true,
      });
      toast.success(`Msg: Test is Deleted Successfully from ${id}`, {
        position: toast.POSITION.TOP_CENTER,
      });
      onNewTestDeleted();
    } catch (err) {
      toast.error("Msg: Some error in deleting test", {
        position: toast.POSITION.TOP_CENTER,
      });
      // console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="card mt-2">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="card-title">{name}</h5>
          <span className="text-muted">Time: {time} min</span>
        </div>
        <div className="card-body">
          <p className="card-text">{desc}</p>
          {userData && userData.role === "Admin" && (
            <div>
              {" "}
              <Link
                to={`/testseries/test/${testId}`}
                className="btn btn-outline-primary mx-1"
              >
                Update Question's
              </Link>
              <button
                onClick={() => {
                  handleUpdateFormToggle();
                }}
                className="btn btn-outline-warning mx-1"
              >
                Update
              </button>
              <button
                disabled={isLoading}
                onClick={() => {
                  deleteTestHandler();
                }}
                className="btn btn-outline-danger mx-1"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        className={`px-4 add-test-dropdown ${openUpdateTest ? "expanded" : ""}`}
      >
        {openUpdateTest && (
          <AddNewTest
            testseriesId={id}
            toggleForm={handleUpdateFormToggle}
            onNewTestCreated={onNewTestDeleted}
            name={name}
            desc={desc}
            instruction={instruction}
            time={time}
            testId={testId}
            solutionVideo={solutionVideo}
            update={true}
          />
        )}
      </div>
    </div>
  );
};

export default TestCard;
