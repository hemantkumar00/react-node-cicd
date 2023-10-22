import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../GlobalStateContext";

const SignIn = () => {
  const { userData, setUserData } = useGlobalState();

  let navigate = useNavigate();
  let usernameRef = useRef();
  let passwordRef = useRef();

  const [error, setError] = useState({ username: "", password: "" });
  const [authenticationErr, setAuthenticationErr] = useState(null);
  const [disable, setDisable] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State to track password visibility

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    // Check if userData is null or expired when component mounts
    if (!userData || isSessionExpired(userData.expiresAt)) {
      setUserData(null); // Clear user data when expired or not present
    }
  }, [userData, setUserData]);

  const updateErrors = (errorObj) => {
    if (errorObj) {
      for (let i = 0; i < errorObj.length; i++) {
        if (errorObj[i].path === "password" && error.password === "") {
          setError((prevError) => ({
            ...prevError,
            password: errorObj[i].msg,
          }));
          break;
        }
      }

      for (let i = 0; i < errorObj.length; i++) {
        if (errorObj[i].path === "username" && error.username === "") {
          setError((prevError) => ({
            ...prevError,
            username: errorObj[i].msg,
          }));
          break;
        }
      }
    }
  };

  const UserLoginHandler = async (e) => {
    setDisable(true);
    e.preventDefault();
    setAuthenticationErr("");
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      // Login user
      await axios.post(
        `/signin`,
        { username, password },
        { withCredentials: true },
      );

      setError({ username: "", password: "" });

      // Fetch user data after successful login
      const response = await axios.get(`/user`, {
        withCredentials: true,
      });

      const responseData = JSON.parse(response.request.response);
      setUserData(responseData);
      setAuthenticationErr("");
      toast.success(`Welcome ${responseData.name}`, {
        position: toast.POSITION.TOP_CENTER,
      });

      // Navigate based on user role
      if (responseData.role === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error && error.response && error.response.data.message) {
        setError({ username: "", password: "" });
        setAuthenticationErr(error.response.data.message);
      } else {
        const errorObj =
          error &&
          error.request &&
          error.request.response &&
          JSON.parse(error.request.response).errors;
        updateErrors(errorObj);
        if (!errorObj) {
          toast.error(`Msg: Server might not responding`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    } finally {
      setDisable(false);
    }
  };

  useEffect(() => {
    const notify = () => {
      toast.error(`Msg: ${authenticationErr}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    };
    if (authenticationErr) {
      notify();
    }
  }, [authenticationErr]);

  return (
    <div className="p-5">
      <form onSubmit={UserLoginHandler}>
        <div id="emailHelp" className="form-text text-danger">
          {error.username}
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="username"
            ref={usernameRef}
            placeholder="name@example.com"
          />
          <label htmlFor="username">Email address</label>
        </div>
        <div id="emailHelp" className="form-text text-danger">
          {error.password}
        </div>
        <div className="form-floating mb-3">
          <div className="input-group ">
            {" "}
            {/* Wrap input and button in input-group */}
            <input
              type={passwordVisible ? "text" : "password"} // Toggle password visibility
              className="form-control p-3"
              id="password"
              placeholder="Password"
              ref={passwordRef}
            />
            <button
              type="button"
              className="btn btn-light password-toggle"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button className="btn btn-primary" disabled={disable}>
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignIn;

function isSessionExpired(expirationDate) {
  const now = new Date();
  const expiration = new Date(expirationDate);
  return now > expiration;
}
