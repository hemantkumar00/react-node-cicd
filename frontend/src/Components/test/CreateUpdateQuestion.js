import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { compressImage } from "../../services/ImageCompression";

const CreateUpdateQuestion = ({
  hitRelaoad,
  update = false,
  data,
  toggleUpdateForm,
}) => {
  let nameRef = useRef();
  // let descRef = useRef();
  let optionsRef = useRef();
  let correctOptRef = useRef();
  let marksRef = useRef();
  let negativeRef = useRef();
  let rationalRef = useRef();
  let imageRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { testId } = useParams();

  async function handleNewQuestionCreate(e) {
    e.preventDefault();
    setIsLoading(true);
    const name = nameRef.current.value;
    // const desc = descRef.current.value;
    const options = optionsRef.current.value
      .split(",")
      .map((option) => option.trim()); // Split the input by commas and remove leading/trailing whitespace
    const correctOpt = correctOptRef.current.value
      .split(",")
      .map((num) => parseInt(num.trim()));
    const marks = parseFloat(marksRef.current.value);
    const negative = parseFloat(negativeRef.current.value);
    const rational = rationalRef.current.value;
    const image = imageRef.current.files[0];

    // Validation: Check if marks and negative marks are valid numbers and marks are not less than negative marks
    if (isNaN(marks) || isNaN(negative) || marks < negative) {
      toast.error("Invalid marks or negative marks.", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
      return;
    }

    // Validation: Check if each correct option is a valid number and smaller than the length of options
    if (
      !correctOpt.every(
        (num) => Number.isInteger(num) && num >= 0 && num < options.length + 1,
      )
    ) {
      toast.error("Invalid correct options.", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
      return;
    }

    // Validation: Check if options are unique
    if (new Set(options).size !== options.length) {
      toast.error("Options must be unique.", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
      return;
    }

    // Validation: Check if correct options are unique
    if (new Set(correctOpt).size !== correctOpt.length) {
      toast.error("Correct options must be unique.", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
      return;
    }

    const compressedImage = await compressImage(image);

    let formData = new FormData();
    formData.append("name", name);
    // formData.append("desc", desc);
    formData.append("options", options.join(","));
    formData.append("correctOpt", correctOpt.join(","));
    formData.append("marks", marks);
    formData.append("negative", negative);
    formData.append("rational", rational);
    if (compressedImage) formData.append("image", compressedImage);

    try {
      // TODO: conditional update and add new.
      if (!update) {
        await axios.post(`/testseries/${testId}/new/question`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success(`Msg: Created new Question`, {
          position: toast.POSITION.TOP_CENTER,
        });
        hitRelaoad();
      } else {
        await axios.patch(`/testseries/${data._id}/update/question`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success(`Msg: Updated Question`, {
          position: toast.POSITION.TOP_CENTER,
        });
        toggleUpdateForm();
      }
    } catch (error) {
      toast.error(`Msg: Some error in updating`, {
        position: toast.POSITION.TOP_CENTER,
      });
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (update) {
      nameRef.current.value = data.name;
      // descRef.current.value = data.desc;
      optionsRef.current.value = data.options.join(", ");
      correctOptRef.current.value = data.correctOpt.join(",");
      marksRef.current.value = data.marks;
      negativeRef.current.value = data.negative;
      rationalRef.current.value = data.rational;
    }
  }, [
    update,
    data.correctOpt,
    data.marks,
    data.name,
    data.negative,
    data.rational,
    data.options,
  ]);

  return (
    <div>
      <div className="py-4">
        <form className="row" onSubmit={handleNewQuestionCreate}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Some topic"
              ref={nameRef}
              required
            />
            <label htmlFor="name">Name Of Question</label>
          </div>
          {/* <div className="col-6 form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="desc"
              placeholder="Some Description"
              ref={descRef}
              required
            />
            <label htmlFor="desc">Description Of Question</label>
          </div> */}
          <div className="col-lg-6 form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="options"
              placeholder="option1,option2"
              ref={optionsRef}
              required
            />
            <label htmlFor="options">Options separated by ( , )</label>
          </div>
          <div className="col-lg-6 form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="correctOpt"
              placeholder="0,1"
              ref={correctOptRef}
              required
            />
            <label htmlFor="correctOpt">
              Correct Options separated by ( , )
            </label>
          </div>
          <div className="col-lg-6 form-floating ">
            <div className="row">
              <div className="col-lg-6 form-floating mb-3">
                <input
                  type="number"
                  step="0.01" // Allows decimal numbers
                  className="form-control"
                  id="marks"
                  placeholder="3.00" // Example placeholder with decimals
                  ref={marksRef}
                  required
                />
                <label htmlFor="marks">Marks</label>
              </div>
              <div className="col-lg-6 form-floating mb-3">
                <input
                  type="number"
                  step="0.01" // Allows decimal numbers
                  className="form-control"
                  id="negative"
                  placeholder="1.50" // Example placeholder with decimals
                  ref={negativeRef}
                  required
                />
                <label htmlFor="negative">Negative Marks</label>
              </div>
            </div>
          </div>
          <div className=" col-lg-6 form-floating mb-3">
            <input
              type="file"
              className="form-control"
              id="image"
              placeholder="Some Image"
              ref={imageRef}
            />
            <label htmlFor="image">Question Image</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              type="text"
              className="form-control"
              id="rational"
              placeholder="instruction..."
              ref={rationalRef}
            />
            <label htmlFor="rational">Rational for Question</label>
          </div>

          <button className="btn btn-primary" disabled={isLoading}>
            {update ? "Update Question" : "Create Question"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUpdateQuestion;
