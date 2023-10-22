import { useGlobalState } from "../../GlobalStateContext";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const SingleTestCardUser = ({ data, testseriesId, accessButton }) => {
  const { userData } = useGlobalState();
  const result =
    userData && userData.completedTest.find((value) => value.test === data._id);

  // console.log(userData.completedTest);
  const [isInstructionModalOpen, setIsInstructionModalOpen] = useState(false);

  const openInstructionModal = async () => {
    setIsInstructionModalOpen(true);
  };

  const closeInstructionModal = () => {
    setIsInstructionModalOpen(false);
  };

  const instructionText = data.instruction; // Assuming data.instruction contains the text you provided
  const instructionLines = instructionText.split(".").map((line, index) => (
    <React.Fragment key={index}>
      {line.trim()} {/* Trim to remove leading/trailing whitespace */}
      <br />
    </React.Fragment>
  ));

  return (
    <div>
      <div className="card mt-2">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="card-title">{data.name}</h5>
          <span className="text-muted">Time: {data.time} min</span>
        </div>
        <div className="card-body">
          <p className="card-text">{data.desc}</p>

          {accessButton && (
            <>
              {result ? (
                <>
                  <button
                    onClick={openInstructionModal}
                    className="btn btn-outline-primary mx-1"
                  >
                    Attempt again
                  </button>
                  <Link
                    to={`/testseries/test/result/test/${data._id}`}
                    className="btn btn-primary mx-1"
                  >
                    View Result
                  </Link>
                </>
              ) : (
                <button
                  onClick={openInstructionModal}
                  className="btn btn-outline-primary mx-1"
                >
                  Give Test
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <Modal
        isOpen={isInstructionModalOpen}
        onRequestClose={closeInstructionModal}
        contentLabel="Test Instructions"
      >
        <h2>Test Instructions</h2>
        <p>{instructionLines}</p>
        <button
          onClick={closeInstructionModal}
          className="btn btn-outline-secondary m-2"
        >
          Close
        </button>
        <Link
          to={`/testseries/test/attempt/test/${data._id}/testseries/${testseriesId}`}
          className="btn btn-outline-primary"
        >
          Ok
        </Link>
      </Modal>
    </div>
  );
};

export default SingleTestCardUser;
