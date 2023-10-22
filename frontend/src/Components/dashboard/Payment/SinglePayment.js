import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SinglePayment = ({ id, paymentId }) => {
  const [amount, setAmount] = useState(null);
  const [fetching, setFetching] = useState(false);

  // Function to fetch the amount
  const fetchAmount = async () => {
    setFetching(true);
    try {
      const amount = await axios.post(
        `/admin/get/single/payment`,
        { paymentId },
        { withCredentials: true },
      );
      // console.log(amount.data.amount);
      setAmount(amount.data.amount);
    } catch (e) {
      // const error = JSON.parse(e.request.response).error;
      toast.error(`Msg: Some thing went wrong in fetching payment`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Payment Details</h5>
        <p className="card-text">
          <strong>Razorpay Order ID:</strong> {id}
        </p>
        {fetching ? (
          <p className="card-text">Fetching amount...</p>
        ) : amount !== null ? (
          <p className="card-text">
            <strong>Amount:</strong> ₹{(amount / 100).toFixed(2)}
          </p>
        ) : (
          <button className="btn btn-primary" onClick={fetchAmount}>
            Fetch Amount
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePayment;
