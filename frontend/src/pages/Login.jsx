import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../context/AuthContext";
import "../style/login.css";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const {
    dispatch,
    state: { error, loading },
  } = useContext(auth);
  const navigate = useNavigate();
  //console.log("state", user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
    });
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API_URI}/auth/login`,
        userData
      );
      //console.log("resp", resp.data);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: resp.data,
      });
      //localStorage.setItem("user", JSON.stringify(resp.data));
      //navigate("/");
    } catch (error) {
      //console.log("error", error.response.data);
      dispatch({
        type: "LOGIN_FAIL",
        payload: error.response.data,
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    Email<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn bg-primary"
                  >
                    Login
                  </button>
                </div>
              </form>
              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}
            </div>

            <p style={{ textAlign: "center" }}>
              Not Register! <Link to="/register">Register</Link> First
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
