import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [cred, setecred] = useState({ email: "", password: "" });
  let history = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: cred.email, password: cred.password }),
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.auth_token);
      history("/");
      props.showAlert("Logged In ", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setecred({ ...cred, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-4">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-75">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: 1 + "rem" }}
            >
              <div className="card-body p-5 text-center">
                <form onSubmit={submit}>
                  <h2 className="my-3">Let's get you Logged In</h2>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={cred.email}
                      className="form-control form-control-lg"
                      onChange={onChange}
                    />
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={cred.password}
                      onChange={onChange}
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div/>
    </div>
  );
}

export default Login;
