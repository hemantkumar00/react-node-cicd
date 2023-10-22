import React, { Fragment, useEffect, useState } from "react";
import SingleFeedBack from "./SingleFeedBack";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../LoadingSpinner";

const FeedBackMain = () => {
  const [feedBack, setFeedBack] = useState([]);
  const [button, setButton] = useState(true); // Initially, load active feedback
  const [isLoading, setIsLoading] = useState(true);

  async function loadFeedback(activate) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/all/feedback/${activate ? "active/" : ""}admin`,
        {
          withCredentials: true,
        },
      );
      const feedbackData = response.data; // Assuming the response contains the feedback data
      setFeedBack(feedbackData); // Update the state with the received data
      setButton(activate);
    } catch (error) {
      // console.error(error);
      toast.error(`Some error in fetching`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadFeedback(button); // Initially load active feedback
  }, [button]);

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="col-lg-10 col-md-8 col-sm-12 px-5">
          <button
            onClick={() => loadFeedback(false)} // Load all feedback
            className={`btn btn-${button ? "secondary" : "primary"} mb-3`}
          >
            Load All Feedback
          </button>
          <button
            onClick={() => loadFeedback(true)} // Load active feedback
            className={`btn btn-${button ? "primary" : "secondary"} mb-3 ms-2`}
          >
            Load Active Feedback
          </button>

          {feedBack.map((data, index) => (
            <SingleFeedBack
              key={index}
              feedbackData={data}
              activationFunction={() => loadFeedback(button)}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default FeedBackMain;
