import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [signup, setsignup] = useState({ name: "", email: "", password: "" });
  let navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signup.name,
        email: signup.email,
        password: signup.password,
      }),
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    if (json.auth_token) {
      localStorage.setItem("token", json.auth_token);
      navigate("/");
      props.showAlert("Welcome to iNotebook", "success");
    } else {
      props.showAlert("Please try with valid data", "danger");
    }
  };

  const onChange = (e) => {
    setsignup({ ...signup, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-5">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div
              className="card text-black"
              style={{ borderRadius: 25 + "px" }}
            >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 my-3">
                    <form onSubmit={submit} className="mx-1 mx-md-4 my-3">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <h2 className="mb-4">Sign Up for free!</h2>
                          <input
                            type="text"
                            id="name"
                            className="form-control "
                            name="name"
                            onChange={onChange}
                          />
                          <label className="form-label my-1" htmlFor="name">
                            Your Name
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            name="email"
                            onChange={onChange}
                          />
                          <label className="form-label" htmlFor="email">
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            onChange={onChange}
                            minLength={8}
                            required="required"
                          />
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                            minLength={8}
                            required="required"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4cd"
                          >
                            Confirm password
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4"></div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Sign Up
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
