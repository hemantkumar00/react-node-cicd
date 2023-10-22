// Dashboard.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TestSeries from "./TestSeries";
import { Navigate } from "react-router-dom";
import { useGlobalState } from "../../GlobalStateContext";
import User from "./User/User";
import PaymentMain from "./Payment/PaymentMain";
import FeedBackMain from "./FeedBack/FeedBackMain";

const Dashboard = () => {
  const { userData } = useGlobalState();
  const [navigation, setNavigation] = useState({
    testSeries: true,
    feedBack: false,
    users: false,
    payments: false,
  });

  function openTestSeries() {
    setNavigation({
      testSeries: true,
      feedBack: false,
      users: false,
      payments: false,
    });
  }

  function openFeedBack() {
    setNavigation({
      testSeries: false,
      feedBack: true,
      users: false,
      payments: false,
    });
  }
  function openUsers() {
    setNavigation({
      testSeries: false,
      feedBack: false,
      users: true,
      payments: false,
    });
  }

  function openPayments() {
    setNavigation({
      testSeries: false,
      feedBack: false,
      users: false,
      payments: true,
    });
  }

  if (!userData || userData.role !== "Admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="row mt-5">
      <Sidebar
        testseries={openTestSeries}
        feedback={openFeedBack}
        users={openUsers}
        payment={openPayments}
        navigation={navigation}
      />
      {navigation.testSeries ? (
        <TestSeries />
      ) : navigation.feedBack ? (
        <FeedBackMain />
      ) : navigation.users ? (
        <User />
      ) : navigation.payments ? (
        <PaymentMain />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
