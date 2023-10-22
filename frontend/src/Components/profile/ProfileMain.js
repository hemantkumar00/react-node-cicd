import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../GlobalStateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router";

const ProfileMain = () => {
  const [user, setUser] = useState({
    username: "",
    name: "",
    phoneNo: "",
    college: "",
    target: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const { userData, setUserData } = useGlobalState();

  const handleEditMode = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/update-profile`,
        { user: user, userId: user._id },
        {
          withCredentials: true,
        },
      );
      const response = await axios.get(`/user`, {
        withCredentials: true,
      });
      const user1 = response.data;
      setUserData(user1);

      toast.success(`Msg: Updated SuccessFully`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsEditMode(false); // Exit edit mode after successful update
    } catch (error) {
      toast.error(`Msg: Some error in updating profile`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    // Fetch the user's profile data when the component mounts
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/user`, {
          withCredentials: true,
        });
        const user = response.data;
        setUser(user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);
  if (!userData) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4">
      <h2>User Profile</h2>
      {isEditMode ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={user.username}
              onChange={handleChange}
              disabled // Disable the input field
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNo" className="form-label">
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              className="form-control"
              value={user.phoneNo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="college" className="form-label">
              College:
            </label>
            <input
              type="text"
              id="college"
              name="college"
              className="form-control"
              value={user.college}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="target" className="form-label">
              Target:
            </label>
            <input
              type="text"
              id="target"
              name="target"
              className="form-control"
              value={user.target}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary m-2">
            Update Profile
          </button>
          <button
            type="button"
            className="btn btn-secondary m-2"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Phone Number:</strong> {user.phoneNo}
          </p>
          <p>
            <strong>College:</strong> {user.college}
          </p>
          <p>
            <strong>Target:</strong> {user.target}
          </p>
          <button onClick={handleEditMode} className="btn btn-primary m-2">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMain;
