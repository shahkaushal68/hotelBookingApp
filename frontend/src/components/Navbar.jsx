import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../context/AuthContext";
import "../style/navbar.css";

const Navbar = () => {
  const {
    dispatch,
    state: { user },
  } = useContext(auth);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark top-nav">
      <div className="container">
        <Link className="navbar-brand" to="/">
          HotelBooking
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          style={{ justifyContent: "flex-end" }}
          id="mynavbar"
        >
          {user ? (
            <div className="auth-button">
              <button className="btn" type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-button">
              <Link to="/login">
                <button className="btn" type="button">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="btn" type="button">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
