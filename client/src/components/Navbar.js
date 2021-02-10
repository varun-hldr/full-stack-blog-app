import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">TECH BLOG</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/adduser" className="nav-link">
                Add User
              </Link>
            </li>
            <li className="nav-item">
              <Link to="dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
          </ul>
          <form className="d-flex login-signup-btns">
            <Link to="signup">
              <i className="bi bi-person-fill"></i>Sign Up
            </Link>

            <Link to="login" className="ms-3">
              <i className="bi bi-box-arrow-in-right"></i>
              Login
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
