import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { compressImage } from "../../services/ImageCompression";

const NewTestSeries = ({
  toggleForm,
  hitReload,
  updateToggleForm,
  isEditMode,
  testData,
}) => {
  let topicRef = useRef();
  let descriptionRef = useRef();
  let imageRef = useRef();
  let priceRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  async function handleNewTestSeriesCreate(e) {
    e.preventDefault();
    setIsLoading(true);
    const topic = topicRef.current.value;
    const description = descriptionRef.current.value;
    const image = imageRef.current.files[0];
    const price = priceRef.current.value;

    // Compress the image using HTML canvas
    const compressedImage = await compressImage(image);

    const formData = new FormData();
    formData.append("topic", topic);
    formData.append("description", description);
    formData.append("price", price);
    if (compressedImage) formData.append("image", compressedImage);

    try {
      if (isEditMode === undefined) {
        await axios.post(`/testseries/new`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success(`Msg: Created new testseries`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        await axios.patch(`/testseries/update/${testData.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success(`Msg: Updated testseries`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      if (isEditMode) {
        updateToggleForm();
      } else toggleForm();
      hitReload();
    } catch (error) {
      // console.log(error);
      const errorObj =
        error &&
        error.request &&
        error.request.response &&
        JSON.parse(error.request.response).errors;
      if (errorObj) {
        toast.success(`Msg: ${errorObj[0].msg}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Image compression code took from ChatGpt

  useEffect(() => {
    if (isEditMode && testData) {
      topicRef.current.value = testData.topic;
      descriptionRef.current.value = testData.description;
      priceRef.current.value = testData.price;
    }
  }, [isEditMode, testData]);

  return (
    <div>
      <div className="py-5 ">
        <form className=" row" onSubmit={handleNewTestSeriesCreate}>
          {/* <div id="emailHelp" className="form-text text-danger">
          {error.username}
        </div> */}
          <div className=" col-6 form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="topic"
              placeholder="Some topic"
              ref={topicRef}
              required
            />
            <label htmlFor="topic">Topic of TestSeries</label>
          </div>
          {/* <div id="emailHelp" className="form-text text-danger">
          {error.password}
        </div> */}
          <div className=" col-6 form-floating  mb-3">
            <input
              type="text"
              className="form-control "
              id="description"
              placeholder="Some Description"
              ref={descriptionRef}
              required
            />
            <label htmlFor="description">Description</label>
          </div>
          <div className=" col-6 form-floating mb-3">
            <input
              type="file"
              className="form-control"
              id="image"
              placeholder="Some Image"
              ref={imageRef}
              required={isEditMode ? false : true}
            />
            <label htmlFor="image">Image</label>
          </div>
          {/* <div id="emailHelp" className="form-text text-danger">
          {error.password}
        </div> */}
          <div className=" col-6 form-floating mb-3">
            <input
              type="Number"
              className="form-control"
              id="price"
              placeholder="₹100"
              ref={priceRef}
              // required
            />
            <label htmlFor="price">Price</label>
          </div>
          <button className="btn btn-primary" disabled={isLoading}>
            {isEditMode ? "Update TestSeries" : "Add TestSeries"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTestSeries;
