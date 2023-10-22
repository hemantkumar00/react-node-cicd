import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import TestseriesHeading from "../testSeries/TestseriesHeading";
import SingleTestCardUser from "./SingleTestCardUser";
import LoadingSpinner from "../../LoadingSpinner";
import { useGlobalState } from "../../GlobalStateContext";

const SingleTestSeriesViewUserMain = () => {
  const { testSeriesId } = useParams();
  const [testseries, setTestseries] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userData, setUserData } = useGlobalState();
  // console.log("hello");

  const checkoutHandler = async (amount) => {
    try {
      if (testseries.price === 0) {
        await axios.post(
          `/zeropaymentcheckout/${testseries._id}/${userData._id}`,
          {},
          { withCredentials: true },
        );
        const response = await axios.get(`/user`, {
          withCredentials: true,
        });

        const responseData = JSON.parse(response.request.response);
        setUserData(responseData);
      } else {
        const {
          data: { order },
        } = await axios.post(
          `/checkout`,
          {
            amount,
          },
          {
            withCredentials: true,
          },
        );

        var options = {
          key: "rzp_test_NKFpEzB6fac5qX", // Enter the Key ID generated from the Dashboard
          amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "TestSeries",
          description: "Test Transaction",
          image: "https://avatars.githubusercontent.com/u/64378827?v=4",
          order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url: `/paymentverification/${testSeriesId}/${userData._id}`,
          prefill: {
            name: userData.name,
            email: userData.username,
            contact: userData.phoneNo,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#fff",
          },
        };
        let razor = new window.Razorpay(options);
        razor.open();
      }
    } catch (e) {
      // console.log(e);
    }
  };
  // console.log(
  //   userData &&
  //     userData.testSeriesAccess.some(
  //       (access) => access.testSeries === testSeriesId,
  //     ),
  // );
  useEffect(() => {
    async function loadSingleTestSeries() {
      setIsLoading(true);
      try {
        const response = await axios.get(`/testseries/${testSeriesId}/all`);
        setTestseries(response.data);
      } catch (e) {
        // console.log(e);
        const error = JSON.parse(e.request.response).error;
        toast.error(`Msg: ${error}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadSingleTestSeries();
  }, [testSeriesId]);

  // if (!userData) {
  //   return <Navigate to="/" />;
  // }

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        testseries && (
          <div>
            <TestseriesHeading
              heading={testseries.topic}
              price={testseries.price}
              description={testseries.description}
              image={testseries.image}
              count={testseries.test.length}
              checkoutHandler={checkoutHandler}
              buybutton={
                userData &&
                (userData.role === "Admin" ||
                  (userData.testSeriesAccess &&
                    userData.testSeriesAccess.some(
                      (access) => access.testSeries === testSeriesId,
                    )))
              }
            />
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <h3 style={{ fontSize: "24px", marginBottom: "20px" }}>Tests</h3>
              <p style={{ fontSize: "18px", color: "#777" }}>
                Explore the full range of tests to prepare yourself for success.
              </p>
            </div>
            {testseries.test.map((data, index) => (
              <SingleTestCardUser
                key={index}
                data={data}
                testseriesId={testSeriesId}
                accessButton={
                  userData &&
                  (userData.role === "Admin" ||
                    (userData.testSeriesAccess &&
                      userData.testSeriesAccess.some(
                        (access) => access.testSeries === testSeriesId,
                      )))
                }
              />
            ))}
          </div>
        )
      )}
    </Fragment>
  );
};

export default SingleTestSeriesViewUserMain;
