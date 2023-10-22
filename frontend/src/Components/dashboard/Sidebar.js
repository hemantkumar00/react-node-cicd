// Sidebar.js
import React from "react";

const Sidebar = ({ testseries, feedback, users, payment, navigation }) => {
  return (
    <div className="col-lg-2 col-md-4 col-sm-12">
      <button
        onClick={() => {
          testseries();
        }}
        className={`btn ${
          navigation.testSeries ? `btn-primary` : `btn-outline-primary`
        } w-100 my-1`}
      >
        TestSeries
      </button>
      <button
        onClick={() => {
          feedback();
        }}
        className={`btn ${
          navigation.feedBack ? `btn-primary` : `btn-outline-primary`
        } w-100 my-1`}
      >
        FeedBack
      </button>
      <button
        onClick={() => {
          users();
        }}
        className={`btn ${
          navigation.users ? `btn-primary` : `btn-outline-primary`
        } w-100 my-1`}
      >
        Users
      </button>
      <button
        onClick={() => {
          payment();
        }}
        className={`btn ${
          navigation.payments ? `btn-primary` : `btn-outline-primary`
        } w-100 my-1`}
      >
        Payments
      </button>
    </div>
  );
};

export default Sidebar;
