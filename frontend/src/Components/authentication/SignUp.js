import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  let navigate = useNavigate();
  let nameRef = useRef();
  let phoneNoRef = useRef();
  let collegeRef = useRef();
  let targetRef = useRef();
  let usernameRef = useRef();
  let passwordRef = useRef();
  const [disable, setDisable] = useState(false);

  const [inputValues, setInputValues] = useState({
    name: "",
    phoneNo: "",
    college: "",
    target: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    name: "",
    phoneNo: "",
    college: "",
    target: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    setError({
      name: "",
      phoneNo: "",
      college: "",
      target: "",
      username: "",
      password: "",
    });
  }, [inputValues]);

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { ...error };

    if (inputValues.name.trim() === "") {
      isValid = false;
      newErrors.name = "Name is a required field.";
    }

    if (
      inputValues.phoneNo.trim() === "" ||
      !isValidPhoneNumber(inputValues.phoneNo)
    ) {
      isValid = false;
      newErrors.phoneNo = "Enter a valid phone number.";
    }

    if (inputValues.college.trim() === "") {
      isValid = false;
      newErrors.college = "College is a required field.";
    }

    if (inputValues.target.trim() === "") {
      isValid = false;
      newErrors.target = "Target is a required field.";
    }

    if (inputValues.username.trim() === "") {
      isValid = false;
      newErrors.username = "Email address is a required field.";
    }

    if (inputValues.password.trim() === "") {
      isValid = false;
      newErrors.password = "Password is a required field.";
    }

    setError(newErrors);
    return isValid;
  };

  const addUserHandler = async (e) => {
    e.preventDefault();
    setDisable(true);
    if (validateInputs()) {
      try {
        const { name, phoneNo, college, target, username, password } =
          inputValues;

        const response = await axios.post(`/signup`, {
          name,
          phoneNo,
          college,
          target,
          username,
          password,
        });

        if (response.status === 200) {
          setInputValues({
            name: "",
            phoneNo: "",
            college: "",
            target: "",
            username: "",
            password: "",
          });
          setError({
            name: "",
            phoneNo: "",
            college: "",
            target: "",
            username: "",
            password: "",
          });
          notify();
          navigate("/");
        }
      } catch (error) {
        if (error.response) {
          const errorData = error.response.data;
          if (errorData.error) {
            setError((prevError) => ({
              ...prevError,
              username: "A user with the given username is already registered",
            }));
          } else if (errorData.errors) {
            errorData.errors.forEach((err) => {
              updateErrors(err);
            });
          }
        } else {
          toast.error("Server might not be responding", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } finally {
        setDisable(false);
      }
    }
  };

  const notify = () => {
    toast.success("Account created, redirecting to login", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const updateErrors = (errorObj) => {
    const field = errorObj.path;
    if (field in error) {
      setError((prevError) => ({
        ...prevError,
        [field]: errorObj.msg,
      }));
    }
  };

  return (
    <div className="p-5">
      <form onSubmit={addUserHandler}>
        <div className="form-text text-danger">{error.name}</div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control ${error.name && "is-invalid"}`}
            id="name"
            ref={nameRef}
            placeholder="John Doe"
            value={inputValues.name}
            onChange={(e) =>
              setInputValues({ ...inputValues, name: e.target.value })
            }
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-text text-danger">{error.phoneNo}</div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control ${error.phoneNo && "is-invalid"}`}
            ref={phoneNoRef}
            id="phoneNo"
            placeholder="+91 9999999999"
            value={inputValues.phoneNo}
            onChange={(e) =>
              setInputValues({ ...inputValues, phoneNo: e.target.value })
            }
          />
          <label htmlFor="phoneNo">Phone No.</label>
        </div>
        <div className="form-text text-danger">{error.college}</div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control ${error.college && "is-invalid"}`}
            id="college"
            ref={collegeRef}
            placeholder="Some college"
            value={inputValues.college}
            onChange={(e) =>
              setInputValues({ ...inputValues, college: e.target.value })
            }
          />
          <label htmlFor="college">College Name</label>
        </div>
        <div className="form-text text-danger">{error.target}</div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control ${error.target && "is-invalid"}`}
            id="target"
            ref={targetRef}
            placeholder="Target Exam"
            value={inputValues.target}
            onChange={(e) =>
              setInputValues({ ...inputValues, target: e.target.value })
            }
          />
          <label htmlFor="target">Target Exam</label>
        </div>
        <div className="form-text text-danger">{error.username}</div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className={`form-control ${error.username && "is-invalid"}`}
            id="username"
            ref={usernameRef}
            placeholder="name@example.com"
            value={inputValues.username}
            onChange={(e) =>
              setInputValues({ ...inputValues, username: e.target.value })
            }
          />
          <label htmlFor="username">Email address</label>
        </div>
        <div className="form-text text-danger">{error.password}</div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className={`form-control ${error.password && "is-invalid"}`}
            id="password"
            placeholder="Password"
            ref={passwordRef}
            value={inputValues.password}
            onChange={(e) =>
              setInputValues({ ...inputValues, password: e.target.value })
            }
          />
          <label htmlFor="password">Password</label>
        </div>
        <button className="btn btn-primary" disabled={disable}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
