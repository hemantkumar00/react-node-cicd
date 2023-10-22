import React, { useState } from "react";
import UserAccessTestSeries from "./UserAccessTestSeries";
import axios from "axios";
import { toast } from "react-toastify";
import ViewToAddTestSeries from "./ViewToAddTestSeries";

const SingleUser = ({ user, onTestSeriesDeleted }) => {
  const [showTest, setShowTest] = useState(false);
  const [showTestSeries, setShowTestSeries] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [testseries, setTestSeries] = useState(null);

  async function getTestSeries() {
    setIsLoading(true);
    try {
      const testSeries = await axios.get(`/all/testseries`);
      // console.log(testSeries.data.testSeries);
      setTestSeries(testSeries.data.testSeries);
    } catch (e) {
      // console.log(e);
      toast.error(`Msg: error in fetching testSeries`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function UpdateUserRole() {
    try {
      await axios.put(
        `/admin/update/role/${user._id}`,
        {
          role: user.role === "Admin" ? "User" : "Admin",
        },
        { withCredentials: true },
      );
      onTestSeriesDeleted();
    } catch (e) {
      // console.log(e);
      toast.error(`Msg: error in updating role`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">
            <i className="bi bi-person-circle"></i> {user.name}
          </h5>
          <button
            onClick={() => UpdateUserRole()}
            className={`btn btn-${
              user.role === "Admin" ? "success" : "primary"
            }`}
          >
            {user.role === "Admin" ? "Admin" : "User"}
          </button>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <i className="bi bi-person"></i> Username: {user.username}
          </li>
          <li className="list-group-item">
            <i className="bi bi-telephone"></i> Phone No: {user.phoneNo}
          </li>
          <li className="list-group-item">
            <i className="bi bi-building"></i> College: {user.college}
          </li>
          <li className="list-group-item">
            <i className="bi bi-target"></i> Target: {user.target}
          </li>
          <li className="list-group-item">
            <i className="bi bi-person-badge"></i> Role: {user.role}
          </li>
        </ul>
      </div>
      <div className="card-footer">
        <label htmlFor="testSeries" className="form-label">
          Select Test Series:
        </label>
        <div className="row justify-content-between">
          <div className="col">
            <button
              onClick={() => {
                setShowTest(!showTest);
              }}
              className="btn btn-outline-primary mb-2"
            >
              View All Test Series
            </button>
          </div>
          <div className="col text-end">
            <button
              onClick={() => {
                getTestSeries();
                setShowTestSeries(!showTestSeries);
              }}
              className="btn btn-outline-success mb-2"
            >
              Add Test Series
            </button>
          </div>
        </div>
        {showTest && user.testSeriesAccess.length > 0 && (
          <div className="card mb-3">
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {user.testSeriesAccess.map((data, index) => (
                  <UserAccessTestSeries
                    key={index}
                    data={data.testSeries}
                    userId={user._id}
                    onTestSeriesDeleted={onTestSeriesDeleted}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
        {!isLoading && showTestSeries && (
          <div className="card mb-3">
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {testseries.map((data, index) => (
                  <ViewToAddTestSeries
                    key={index}
                    data={data}
                    userId={user._id}
                    onTestSeriesDeleted={onTestSeriesDeleted}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleUser;
