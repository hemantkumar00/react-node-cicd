import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../GlobalStateContext";
import { toast } from "react-toastify";

const MainNavigation = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useGlobalState();

  const isSessionExpired = (expirationDate) => {
    const now = new Date();
    const expiration = new Date(expirationDate);
    return now > expiration;
  };

  // const clearUserData = () => {
  //   setUserData(null); // Clear user data
  // };

  const logoutHandler = async () => {
    try {
      // Perform the sign-out action (optional)
      await axios.get(`/signout`, {
        withCredentials: true,
      });

      toast.success(`See you soon again`, {
        position: toast.POSITION.TOP_CENTER,
      });

      // clearUserData();
      setUserData(null);
      navigate("/"); // Redirect to the home page
    } catch (error) {
      // console.error(error);
      toast.error(`An error occurred while signing out`, {
        position: toast.POSITION.TOP_CENTER,
      });

      // Even if sign-out fails, still clear user data
      // clearUserData();
      setUserData(null);
      navigate("/"); // Redirect to the home page
    }
  };

  function getFirstTwoWords(fullName) {
    const words = fullName.split(" ");
    if (words.length >= 2) {
      return `${words[0]} ${words[1]}`;
    }
    return fullName; // Return the full name if it has fewer than two words
  }

  useEffect(() => {
    if (userData && isSessionExpired(userData.expiresAt)) {
      toast.info(`Your session has expired. Please sign in again.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      // clearUserData();
      setUserData(null);
      navigate("/signin");
    }
  }, [userData, navigate, setUserData]);

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#E1DDE9" }}
    >
      <div className="container container-fluid">
        <Link
          className="navbar-brand d-flex align-items-center"
          aria-current="page"
          to="/"
        >
          <img
            src="https://res.cloudinary.com/dunn1w6jk/image/upload/v1697643737/bjtmyn5balzzdskmfhua.png"
            className="img-fluid rounded-circle logo"
            alt="logo"
            style={{ maxWidth: "40px" }}
          />
          <span className=" ms-1">MediquizHub</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/testseries">
                TestSeries
              </Link>
            </li>

            {userData !== null && userData.role === "Admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  DashBoard
                </Link>
              </li>
            )}
            {userData !== null && userData.role === "User" && (
              <li className="nav-item">
                <Link className="nav-link" to="/enrolled-testseries">
                  Enrolled TestSeries
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/about-us">
                About US
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {userData !== null && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <div className="d-flex align-items-center">
                    <span className="mr-2">Welcome,</span>
                    <Link className="nav-link" to={userData ? "/profile" : "/"}>
                      {getFirstTwoWords(userData.name)}
                    </Link>
                  </div>
                </li>
              </ul>
            )}
            {userData !== null ? (
              <button
                onClick={logoutHandler}
                className="btn btn-outline-danger mx-1"
                type="button"
              >
                SignOut
              </button>
            ) : (
              <>
                <Link
                  className="btn btn-primary mx-1"
                  aria-current="page"
                  to="/signup"
                >
                  SignUp
                </Link>
                <Link
                  className="btn btn-outline-primary mx-1"
                  aria-current="page"
                  to="/signin"
                >
                  SignIn
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
