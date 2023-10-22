import React, { Fragment, useEffect, useState } from "react";
import SingleTestSeriesUser from "./SingleTestSeriesUser";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../LoadingSpinner";

const TestSeriesUserMain = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchAllTestSeries() {
    setIsLoading(true);
    try {
      const response = await axios.get(`/all/testseries`);
      const responseData = JSON.parse(response.request.response).testSeries;
      setData(responseData);
      // console.log(response);
      setIsLoading(false);
    } catch (e) {
      // const error = JSON.parse(e.request.response).error;
      toast.error(`Msg: Not able to access TestSeries`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
    }
  }
  useEffect(() => {
    fetchAllTestSeries();
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {data &&
            data.map((data, index) => {
              return (
                data.activation && (
                  <SingleTestSeriesUser key={index} data={data} />
                )
              );
            })}
        </div>
      )}
    </Fragment>
  );
};

export default TestSeriesUserMain;
