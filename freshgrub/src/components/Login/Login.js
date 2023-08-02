import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogin } from "../../auth";
import { login } from "../../services/userService";
import "./login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setFormData({
      ...formData,
      [field]: actualValue,
    });
  };

  //submitting the form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.email.trim() === "" ||
      formData.password.trim() === ""
    ) {
      toast.error("Email or password is empty");
      return;
    }
    if (formData.password.trim() < 8) {
      toast.error("minimum 8 characters required");
      return;
    }

    //call to server to generate token
    login(formData)
      .then((data) => {
        console.log("success log");
        console.log(data);
        //to save data to localStorage
        doLogin(data, () => {
          console.log("login detail is saved to localStorage");
          //redirecting to home page
        });

        toast.success("Login successful!");
        setFormData({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("error log");
        if (error.response.status === 400 || error.response.status === 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong!");
        }

        //handling errors
        setError({
          errors: error,
          isError: true,
        });
      });

  };

  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="form_container p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center">Sign in</h3>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange(e, "email")}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={(e) => handleChange(e, "password")}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="check" className="custom-control custom-checkbox">
              <input type="checkbox" id="check" />
              Remember me
            </label>
          </div>
          <div className="d-grid">
            <button className="btn btn-primary">Sign in</button>
          </div>
          <p className="text-end mt-2">
            Forgot <a href="">Password?</a>
            <Link to="/signup" className="ms-2">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
