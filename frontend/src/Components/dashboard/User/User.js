import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../LoadingSpinner";
import SingleUser from "./SingleUser";

const User = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State variable to store the search query
  const [filteredUsers, setFilteredUsers] = useState([]); // State variable to store filtered users

  async function fetchAllUsers() {
    setIsLoading(true);
    try {
      const response = await axios.get(`/all/users`, {
        withCredentials: true,
      });
      const responseData = JSON.parse(response.request.response).users;
      setData(responseData);
      setFilteredUsers(responseData); // Initialize filteredUsers with all users
    } catch (e) {
      toast.error(`Msg: Some thing went wrong while fetching users`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter users based on the search query
    const filtered = data.filter((user) =>
      user.username.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredUsers(filtered);
  };

  // Function to handle test series deletion

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="col-lg-10 col-md-8 col-sm-12 px-5">
          {/* Search input field */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by Username"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />

          {filteredUsers.map((userData, index) => (
            <SingleUser
              key={index}
              user={userData}
              onTestSeriesDeleted={fetchAllUsers}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default User;
