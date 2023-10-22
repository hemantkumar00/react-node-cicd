import React, { Fragment } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MainNavigation from "./Components/mainNavigation/MainNavigation";
import SignUp from "./Components/authentication/SignUp";
import SignIn from "./Components/authentication/SignIn";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/dashboard/Dashboard";
import TestseriesLandingPage from "./Components/testSeries/TestseriesLandingPage";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TestLoadingPage from "./Components/test/TestLoadingPage";
import MainHomePage from "./Components/HomePage/MainHomePage";
import MainFooter from "./Components/mainNavigation/MainFooter";
import TestSeriesUserMain from "./Components/testSeriesUserSide/TestSeriesUserMain";
import SingleTestSeriesViewUserMain from "./Components/singleTestSeriesViewUser/SingleTestSeriesViewUserMain";
import TestUserMain from "./Components/testUser/TestUserMain";
import PaymentSuccess from "./Components/paymentTestSeries/PaymentSuccess";
import PaymentFail from "./Components/paymentTestSeries/PaymentFail";
import ResultMainUser from "./Components/result/ResultMainUser";
import ProfileMain from "./Components/profile/ProfileMain";
import UserAccessTS from "./Components/accessTestSeries.js/UserAccessTS";
import AboutUsPage from "./Components/HomePage/AboutUsPage";
import NotFound from "./NotFound";

const App = () => {
  const location = useLocation();

  // Conditionally render MainNavigation and container based on the route
  const shouldRenderMainNavigation = !location.pathname.includes(
    "/testseries/test/attempt/",
  );
  const shouldRenderMainFooter = !location.pathname.includes(
    "/testseries/test/attempt/",
  );
  const shouldRenderContainer =
    !location.pathname.includes("/testseries/test/attempt/") &&
    location.pathname !== "/";

  return (
    <Fragment>
      {shouldRenderMainNavigation && <MainNavigation />}
      <ToastContainer />
      <main className={shouldRenderContainer ? "container" : ""}>
        <Routes>
          <Route path="/" element={<MainHomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard authentication />} />
          <Route path="/testseries" element={<TestSeriesUserMain />} />
          <Route
            path="/testseries/test/attempt/test/:testId/testseries/:testSeriesId"
            element={<TestUserMain />}
          />
          <Route path="/profile" element={<ProfileMain />} />
          <Route
            path="/testseries/test/result/test/:testId"
            element={<ResultMainUser />}
          />
          <Route path="/enrolled-testseries" element={<UserAccessTS />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route
            path="/testseries/single/:testSeriesId"
            element={<SingleTestSeriesViewUserMain />}
          />
          <Route
            path="/testseries/:testSeriesId"
            element={<TestseriesLandingPage />}
          />
          <Route
            path="/testseries/test/:testId"
            element={<TestLoadingPage />}
          />
          <Route path="/success/:testSeriesId" element={<PaymentSuccess />} />
          <Route path="/fail/:testSeriesId" element={<PaymentFail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {shouldRenderMainFooter && <MainFooter />}
    </Fragment>
  );
};

export default App;
