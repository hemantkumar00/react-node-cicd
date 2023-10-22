import React from "react";

const AboutUsPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 my-4">
          <h1 className="mx-4 d-flex align-items-center">
            About Us
            <img
              src="https://res.cloudinary.com/dunn1w6jk/image/upload/v1697643737/bjtmyn5balzzdskmfhua.png"
              alt="logo"
              className="img-fluid rounded-circle logo ms-2"
              style={{ maxWidth: "40px" }}
            />
          </h1>
        </div>
      </div>
      {/* <div className="row"> */}
      <div className="">
        <div className=" m-4">
          <div className="card-body">
            <h5 className="card-title">About MediquizHub</h5>
            <p className="card-text">
              Welcome to MediquizHub, your trusted destination for online
              medical and nursing exam preparation. At MediquizHub, we are
              committed to helping aspiring healthcare professionals achieve
              their dreams by providing top-notch resources for a wide range of
              entrance and competitive exams in the medical field.
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <div className=" m-4">
          <div className="card-body">
            <h5 className="card-title">Our Mission</h5>
            <p className="card-text">
              Our mission is to empower the next generation of medical and
              nursing professionals with the knowledge and confidence to excel
              in their exams and, ultimately, in their careers. We understand
              the importance of these exams and the impact they have on your
              future, which is why we are dedicated to offering the best tools
              and support to help you succeed.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="card mb-4">
          <div className="card-body m-3">
            <h5 className="card-title">Why Choose MediquizHub?</h5>
            <p className="card-text">
              1. <strong>Comprehensive Exam Coverage:</strong> We offer a vast
              selection of practice tests and mock exams, covering a wide range
              of medical and nursing entrance and competitive exams. Whether
              you're preparing for medical school admissions, nursing board
              exams, or any other healthcare-related test, we've got you
              covered.
            </p>
            <p className="card-text">
              1. <strong>Expertly Crafted Content:</strong> Our practice tests
              are created by experienced healthcare professionals and educators
              who have a deep understanding of the subject matter. This ensures
              that our content is both accurate and aligned with the latest exam
              trends.
            </p>
            <p className="card-text">
              3. <strong>Detailed Solutions and Rationales:</strong> We provide
              detailed explanations and rationales for each question, helping
              you understand the concepts and reasoning behind the correct
              answers. This approach fosters better comprehension and retention.
            </p>
            <p className="card-text">
              4. <strong>Flexible Learning:</strong> MediquizHub is designed to
              fit into your schedule. Study at your own pace, on any device, and
              from anywhere. Whether you prefer to study in the comfort of your
              home or on the go, we've got you covered.
            </p>
            <p className="card-text">
              5. <strong>Community Support:</strong> Join our community of
              like-minded individuals who are also on their journey to becoming
              healthcare professionals. Share experiences, ask questions, and
              provide support to one another.
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <div className=" m-4">
          <div className="card-body">
            <h5 className="card-title">Our Commitment</h5>
            <p className="card-text mb-5">
              At MediquizHub, we're committed to your success. We continuously
              strive to improve our offerings, expand our question banks, and
              stay up-to-date with the latest developments in medical and
              nursing education. Your achievements are our successes, and we
              take pride in being a part of your journey toward a fulfilling
              career in healthcare.
              <br /> Join MediquizHub today and take the first step toward acing
              your medical and nursing exams. We're here to help you every step
              of the way. Your success is our priority.
            </p>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default AboutUsPage;
