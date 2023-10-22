import React from "react";
import { Link } from "react-router-dom";

const MainFooter = () => {
  return (
    <footer className="  py-4 mt-4" style={{ backgroundColor: "#E1DDE9" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>About MediquizHub</h3>
            <p>
              MediquizHub is your go-to platform for high-quality courses,
              expert instructors, and certifications. Start your learning
              journey with us today!
            </p>
          </div>
          <div className="col-md-3">
            <h3>Quick Links</h3>
            <ul className="list-unstyled">
              <li>
                <Link
                  className="link-offset-2 link-underline link-underline-opacity-0"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="link-offset-2 link-underline link-underline-opacity-0"
                  to="/testseries"
                >
                  TestSeries
                </Link>
              </li>
              <li>
                <Link
                  className="link-offset-2 link-underline link-underline-opacity-0"
                  to="/about-us"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Contact Us</h3>
            <p>
              Email:{" "}
              <a href="mailto:Mediquizhub@gmail.com">Mediquizhub@gmail.com</a>
              {/* <br />
              Phone: <a href="tel:+918949347334">+91-8949347334</a> */}
            </p>
            <p>
              Telegram Doubt group:{" "}
              <a
                href="https://telegram.me/s/railway_rrb_ntpc_je_alp_group_d"
                target="_blank"
                rel="noopener noreferrer"
              >
                Link
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <p>&copy; 2023 MediquizHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default MainFooter;
