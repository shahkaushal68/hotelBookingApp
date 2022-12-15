import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../context/AuthContext";
import "../style/header.scss";

const Header = ({ setNavOpen }) => {
  const { dispatch } = useContext(auth);
  const navigate = useNavigate();

  const handleOpen = () => {
    setNavOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" to="/">
        Company name
      </Link>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        onClick={handleOpen}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <input
        className="form-control form-control-dark w-100 rounded-0 border-0"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <button
            className="nav-link px-3 btn btn-ligh"
            type="button"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
