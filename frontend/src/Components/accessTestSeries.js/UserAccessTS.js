import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalState } from "../../GlobalStateContext";
import SingleTestSeriesUser from "../testSeriesUserSide/SingleTestSeriesUser";
import LoadingSpinner from "../../LoadingSpinner";
import { Navigate } from "react-router";

const UserAccessTS = () => {
  const { userData } = useGlobalState();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAllTestSeries() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/all/users/testseries/${userData._id}`,
          {
            withCredentials: true,
          },
        );
        //   console.log(response);
        const responseData = response.data.data;
        setData(responseData);
        // console.log(responseData);
      } catch (e) {
        toast.error(`Msg: Some thing whent wroing`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllTestSeries();
  }, [userData._id]);

  if (!userData) {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : data && data.length > 0 ? (
        <div className="mt-4">
          {data &&
            data.map((data, index) => {
              return (
                data.testSeries.activation && (
                  <SingleTestSeriesUser key={index} data={data.testSeries} />
                )
              );
            })}
        </div>
      ) : (
        <h4>You are not enrolled to any testseries till now</h4>
      )}
    </Fragment>
  );
};

export default UserAccessTS;
