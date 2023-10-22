import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const UserAccessTestSeries = ({ data, userId, onTestSeriesDeleted }) => {
  function callDeleteFunction() {
    onTestSeriesDeleted();
  }
  async function handleTestSeriesFromUser() {
    try {
      await axios.delete(`/admin/delete/testseries/${userId}/${data._id}`, {
        withCredentials: true,
      });
      // Call the parent component's callback to inform about the deletion
      await callDeleteFunction();
      toast.success(`Msg: Deleted successFully`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (e) {
      // console.log(e);
      toast.error(`Msg: error in deleting`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <i className="bi bi-person"></i> Name: {data.topic}
        </div>
        <div>
          <button
            onClick={() => {
              handleTestSeriesFromUser();
            }}
            className="btn btn-danger"
          >
            X
          </button>
        </div>
      </div>
    </li>
  );
};

export default UserAccessTestSeries;
