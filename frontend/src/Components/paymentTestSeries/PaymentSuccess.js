import React, { useEffect } from "react";
import { useParams } from "react-router";

const PaymentSuccess = () => {
  const { testSeriesId } = useParams();
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      // Replace '/target-route' with the route you want to redirect to
      window.location.href = `/testseries/single/${testSeriesId}`;
    }, 3000); // 3 seconds in milliseconds

    // Clear the timeout if the component unmounts (optional)
    return () => clearTimeout(redirectTimer);
  }, [testSeriesId]);
  return (
    <>
      <div className="loading-spinner-container">
        <h1 className="text-success">Payment Success!</h1>
        <div className="loading-spinner"></div>
        <span>Redirecting...</span>
      </div>
    </>
  );
};

export default PaymentSuccess;
