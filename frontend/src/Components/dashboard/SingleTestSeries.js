import React, { useRef, useState } from "react";
import Modal from "react-modal";
import NewTestSeries from "./NewTestSeries";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../GlobalStateContext";

const SingleTestSeries = ({
  topic,
  price,
  description,
  image,
  id,
  hitReload,
  data,
}) => {
  const { userData } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [uploading, setUploading] = useState(false);
  const testData = {
    topic: topic,
    price: price,
    description: description,
    image: image,
    id: id,
  };
  const [addPhoto, setAddPhoto] = useState(false);
  let imageRef = useRef();

  function updateFormToggler() {
    setUpdate(!update);
  }

  function openConfirmation() {
    setIsConfirmingDelete(true);
  }

  function closeConfirmation() {
    setIsConfirmingDelete(false);
  }

  async function deleteTestSeriesHandler() {
    setIsLoading(true);
    try {
      await axios.delete(`/testseries/delete/${id}`, {
        withCredentials: true,
      });

      toast.success(`Msg: TestSeries is Deleted Successfully`, {
        position: toast.POSITION.TOP_CENTER,
      });
      hitReload();
    } catch (err) {
      // console.log(err);
      toast.error(`Msg: error in deleting`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsLoading(false);
      closeConfirmation();
    }
  }

  async function ToggleViewOnHomePageHandler() {
    try {
      await axios.patch(
        `/testseries/active/homepage/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      toast.success(
        `Msg: ${data.homePageActivation ? "Deactivated" : "Activated"}`,
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
      hitReload();
    } catch (err) {
      // console.log(err);
      toast.error(`Msg: Error occured while updating`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  } //TODO: Have to write this function after backend completed

  async function AddHeaderPhotoHandler(e) {
    e.preventDefault();
    setUploading(true);
    try {
      const image = imageRef.current.files[0];
      // console.log(image);
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.patch(
        `/testseries/active/homepage/${id}`,
        formData, // Remove the curly braces around formData
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      const data = response.data; // Make sure to handle the response data

      toast.success(
        `Msg: ${data.homePageActivation ? "Deactivated" : "Activated"}`,
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
      hitReload();
      closeAddPhoto();
    } catch (error) {
      toast.error(`Msg: Error occurred while updating`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setUploading(false);
    }
  }

  async function closeAddPhoto() {
    setAddPhoto(false);
  }
  async function OpenAddPhoto() {
    setAddPhoto(true);
  }

  async function ToggleActivationHandler() {
    try {
      await axios.patch(
        `/testseries/toggle/activation/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      toast.success(`Msg: ${data.activation ? "Deactivated" : "Activated"}`, {
        position: toast.POSITION.TOP_CENTER,
      });
      hitReload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div
        className="card my-2"
        style={{ display: "block" }}
        disabled={isLoading}
      >
        <h5 className="card-header">{topic}</h5>
        <div className="card-body d-flex">
          <div className="mr-auto">
            <h5 className="card-title">₹ {price}</h5>
            <p className="card-text">{description}</p>
            {userData && userData.role === "Admin" && (
              <div>
                <Link
                  to={`/testseries/${id}`}
                  className="btn btn-outline-primary mx-1"
                >
                  Update Test's
                </Link>
                <button
                  className="btn btn-outline-warning mx-1"
                  onClick={() => {
                    updateFormToggler();
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-outline-danger mx-1"
                  onClick={openConfirmation}
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    ToggleActivationHandler();
                  }}
                  className="btn btn-outline-secondary mx-1"
                >
                  {data.activation
                    ? "DeActivate TestSeries"
                    : "Activate TestSeries"}
                </button>
                <button
                  onClick={
                    !data.homePageActivation
                      ? OpenAddPhoto
                      : ToggleViewOnHomePageHandler
                  }
                  className="btn btn-outline-success mx-1"
                >
                  {data && data.homePageActivation
                    ? "DeActivate on Home"
                    : "Activate on Home"}
                </button>
              </div>
            )}
            {/*  TODO: How to work on home activation. */}
          </div>
          <div
            className="d-flex align-items-end justify-content-end"
            style={{ flex: 1 }}
          >
            {image && (
              <img
                src={image}
                alt="Test Series"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            )}
          </div>{" "}
        </div>
      </div>
      {update && (
        <NewTestSeries
          updateToggleForm={updateFormToggler}
          hitReload={hitReload}
          isEditMode={true}
          testData={testData}
        />
      )}

      {/* Confirmation popup using react-modal */}
      <Modal
        isOpen={isConfirmingDelete}
        onRequestClose={closeConfirmation}
        contentLabel="Delete Confirmation"
        className="confirmation-modal"
        overlayClassName="confirmation-modal-overlay"
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        <div className="confirmation-modal-content">
          <h5>Are you sure you want to delete this Test Series?</h5>
          <p> Name: {topic}</p>
          <button
            className="btn btn-danger mx-1"
            onClick={deleteTestSeriesHandler}
          >
            Confirm Delete
          </button>
          <button
            className="btn btn-secondary mx-1"
            onClick={closeConfirmation}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={addPhoto}
        onRequestClose={closeAddPhoto}
        contentLabel="Delete Confirmation"
        className="confirmation-modal"
        overlayClassName="confirmation-modal-overlay"
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        <div className="confirmation-modal-content">
          <form onSubmit={AddHeaderPhotoHandler}>
            <h5>Choose a Photo to add.</h5>
            <div className=" col-6 form-floating mb-3">
              <input
                type="file"
                className="form-control"
                id="image"
                placeholder="Some Image"
                ref={imageRef}
                required={true}
              />
              <label htmlFor="image">Image</label>
            </div>
            <button className="btn btn-primary mx-1" disabled={uploading}>
              Confirm
            </button>
            <button
              className="btn btn-secondary mx-1"
              disabled={uploading}
              onClick={closeAddPhoto}
            >
              Cancel
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SingleTestSeries;
