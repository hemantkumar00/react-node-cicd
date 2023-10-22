import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const AddNewTest = ({
  testseriesId,
  toggleForm,
  onNewTestCreated,
  name = "",
  desc = "",
  instruction = "",
  time = "",
  testId = "",
  solutionVideo = "",
  update = false,
}) => {
  const nameRef = useRef();
  const descRef = useRef();
  const timeRef = useRef();
  const solutionVideoRef = useRef();
  const instructionRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleNewTestCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const name = nameRef.current.value;
    const desc = descRef.current.value;
    const time = timeRef.current.value;
    const solutionVideo = solutionVideoRef.current.value;
    const instruction = instructionRef.current.value;
    const data = {
      name,
      desc,
      time,
      solutionVideo,
      instruction,
    };

    try {
      if (!update) {
        await axios.post(`/testseries/${testseriesId}/newtest`, data, {
          withCredentials: true,
        });
        toast.success(`Successfully created a new test`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        await axios.patch(`/testseries/${testId}/update`, data, {
          withCredentials: true,
        });
        toast.success(`Successfully Updated a new test`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      toggleForm();
      onNewTestCreated();
      // You can also reset the form fields here if needed
    } catch (error) {
      // console.log(error.request.response);
      // const errorObj = JSON.parse(error.request.response).message;

      toast.error(`Error: Some error while updating`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (update) {
      nameRef.current.value = name;
      descRef.current.value = desc;
      timeRef.current.value = time;
      solutionVideoRef.current.value = solutionVideo;
      instructionRef.current.value = instruction;
    }
  }, [update, name, desc, instruction, solutionVideo, time]);

  return (
    <div>
      <div className="py-5">
        <form className="row" onSubmit={handleNewTestCreate}>
          <div className="col-6 form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Some topic"
              required
              ref={nameRef}
            />
            <label htmlFor="name">Name Of Test</label>
          </div>
          <div className="col-6 form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="desc"
              placeholder="Some Description"
              required
              ref={descRef}
            />
            <label htmlFor="desc">Description Of Test</label>
          </div>
          <div className="col-6 form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="time"
              placeholder="120"
              required
              ref={timeRef}
            />
            <label htmlFor="time">Time in Minutes</label>
          </div>
          <div className="col-6 form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="solutionVideo"
              placeholder="Link..."
              ref={solutionVideoRef}
            />
            <label htmlFor="solutionVideo">
              YouTube video link for solution
            </label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              type="text"
              className="form-control"
              id="instruction"
              placeholder="instruction..."
              ref={instructionRef}
              required
            />
            <label htmlFor="instruction">Instructions for test</label>
          </div>
          <button className="btn btn-primary" disabled={isLoading}>
            {update
              ? isLoading
                ? "Updating..."
                : "Update Test"
              : isLoading
              ? "Adding..."
              : "Add New Test"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTest;
