import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  var history = useNavigate();
  var host = "http://localhost:5000";
  const [detail, setDetail] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    e.preventDefault();
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: detail.email, password: detail.password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      history("/");
      props.showAlert("Successfully Logged In.");
    } else {
      props.showAlert("Invalid Entries.");
    }

    //console.log(json);
  };
  return (
    <>
      <div className="container">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
