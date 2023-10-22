import React from "react";
import { toast } from "react-toastify";
import axios from "axios";

const SingleFeedBack = ({ feedbackData, activationFunction }) => {
  async function handleActivation() {
    try {
      const response = await axios.get(
        `/feedback/activation/${feedbackData._id}/admin`,
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        toast.success(`Toggled the activation`, {
          position: toast.POSITION.TOP_CENTER,
        });

        // Call the activation function to refresh the feedback list
        activationFunction();
      } else {
        toast.error(`Some error in Toggling`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (e) {
      console.error(e);
      toast.error(`Some error in Toggling`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="card-title mb-4">Feedback Details</h5>

        {/* Name */}
        <div className="mb-4">
          <h6 className="card-subtitle text-muted">Name</h6>
          <p className="card-text">{feedbackData.name}</p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <h6 className="card-subtitle text-muted">Email</h6>
          <p className="card-text">{feedbackData.email}</p>
        </div>

        {/* Message */}
        <div className="mb-4">
          <h6 className="card-subtitle text-muted">Message</h6>
          <p className="card-text">{feedbackData.message}</p>
        </div>

        {/* Active Button */}
        <div className="text-center">
          <button
            onClick={handleActivation}
            className={`btn ${
              feedbackData.active ? "btn-primary" : "btn-success"
            }`}
          >
            {feedbackData.active ? "Done" : "Open Again"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleFeedBack;
