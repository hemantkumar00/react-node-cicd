import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "jquery";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStateProvider } from "./GlobalStateContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStateProvider>
      <Router>
        <App />
      </Router>
    </GlobalStateProvider>
  </React.StrictMode>,
);
