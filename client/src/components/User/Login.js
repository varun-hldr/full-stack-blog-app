import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/Login.css";

export default class Login extends Component {
  render() {
    return (
      <form className="login-form">
        <h2 className="text-center">Login to your Account</h2>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
          />
        </div>
        <div class="form-group">
          <label for="pwd">Password:</label>
          <input
            type="password"
            class="form-control"
            id="pwd"
            placeholder="Enter password"
            name="pwd"
          />
        </div>
        <div class="checkbox">
          <label>
            New User <Link to="/signup">Create Account</Link>
          </label>
        </div>
        <button type="submit" class="btn btn-dark">
          Login
        </button>
      </form>
    );
  }
}
