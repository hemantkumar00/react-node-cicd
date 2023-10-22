import axios from "axios";
import React, { Fragment, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ExcelQuestion = ({ hitRelaoad }) => {
  const { testId } = useParams();
  const fileRef = useRef(null);

  const uploadExcelQuestion = async (e) => {
    e.preventDefault();

    if (!fileRef.current || !fileRef.current.files[0]) {
      toast.warning("Please select a .xlsx or .csv file", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const file = fileRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `/testseries/${testId}/add/multiple/questions`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      toast.success("Created new questions successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      hitRelaoad(); // Refresh the parent component
    } catch (error) {
      // console.error("Error while uploading questions:", error);
      toast.error("Msg: Some error in adding questions", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const downloadTemplate = async () => {
    try {
      const response = await axios.get(`/test-series/download-template`, {
        withCredentials: true,
        responseType: "blob",
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "template.xlsx";
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error while downloading template:", error);
      toast.error("Error while downloading the template", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Fragment>
      <div className="border mx-auto w-50 my-4 p-4">
        <button
          onClick={downloadTemplate}
          className="btn btn-outline-primary m-2"
        >
          Download the template
        </button>
        <form onSubmit={uploadExcelQuestion}>
          <label className="form-label" htmlFor="file">
            Select a file of questions:
          </label>
          <input
            className="form-control"
            type="file"
            name="xlsxFile"
            id="file"
            accept=".xlsx, .csv"
            ref={fileRef}
          />
          <button type="submit" className="btn btn-outline-primary mt-2">
            Upload
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ExcelQuestion;
