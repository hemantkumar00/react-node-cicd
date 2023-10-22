import React from "react";
import { Link } from "react-router-dom";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};

const SingleTestSeriesUser = ({ data }) => {
  const maxDescriptionLength = 250; // Define your desired maximum length

  return (
    <div>
      <div className="card my-2" style={{ display: "block" }}>
        <h5
          className="card-header"
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          Topic:- {data.topic}
        </h5>
        <div className="card-body d-flex">
          <div className="mr-auto">
            <h5 className="card-title">₹ {data.price}</h5>
            <p className="card-text">
              Description:-{" "}
              {truncateText(data.description, maxDescriptionLength)}
            </p>
            <Link
              to={`/testseries/single/${data._id}`}
              className="btn btn-outline-primary mx-1 mt-auto"
            >
              Open TestSeries
            </Link>
          </div>

          <div
            className="d-flex align-items-end justify-content-end"
            style={{ flex: 1 }}
          >
            {data.image && (
              <img
                src={data.image}
                alt="Test Series"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTestSeriesUser;
