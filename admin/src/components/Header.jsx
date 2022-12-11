import React from "react";
import { Link } from "react-router-dom";
import "../style/header.scss";

const Header = ({ setNavOpen }) => {
  const handleOpen = () => {
    setNavOpen((prev) => !prev);
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
          <Link className="nav-link px-3" to="/">
            Sign out
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
