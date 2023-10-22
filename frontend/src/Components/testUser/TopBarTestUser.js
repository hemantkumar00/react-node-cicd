import React, { useEffect, useState } from "react";

const TopBarTestUser = ({ time, test, instruction, submitTest }) => {
  // Convert the time string to an integer (in seconds)
  const totalTimeInSeconds = parseInt(time) * 60;
  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);

  // Function to format time in hours, minutes, and seconds
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;
    return `${hours}:${minutes}:${secondsLeft}`;
  };

  useEffect(() => {
    // Create a timer to update the time left every second
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer); // Stop the timer when time is up
          submitTest();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, [submitTest]);

  return (
    <>
      <nav className="navbar navbar-expand-lg px-5">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <p className="nav-link">Test Name: {test}</p>
            </li>
          </ul>
          <p className="text-danger ">
            Don't Refrest else you will loose all your progress
          </p>
        </div>
        <div className="d-flex align-items-center">
          <div className="dropdown show mx-5 dropleft">
            <button
              type="button"
              className="btn btn-outline-primary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Test Instruction
            </button>

            <div
              className="dropdown-menu dropdown-menu-left p-2 mt-2"
              aria-labelledby="dropdownMenuLink"
              style={{ minWidth: "350px" }}
            >
              <p>{instruction}</p>
            </div>
          </div>
          <div style={{ minWidth: "100px" }}>
            <p className="mb-0">Time Left: {formatTime(timeLeft)}</p>
          </div>
        </div>
      </nav>
      <div style={{ borderTop: "1px solid #F8F9FA" }}></div>
    </>
  );
};

export default TopBarTestUser;
