import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import PasswordInput from "../components/PasswordInput";

import { registerUser } from "../services/authService";

import "../styles/Register.css";

function Register() {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      bloodGroup: ""
    });

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        formData.password !==
        formData.confirmPassword
      ) {
        toast.error(
          "Passwords do not match"
        );
        return;
      }

      try {

        await registerUser(
          formData
        );

        toast.success(
          "Registration Successful"
        );

        navigate("/");

      } catch {

        toast.error(
          "Registration Failed"
        );
      }
    };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>
          Register
        </h2>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <input
            className="form-control mb-3"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />

          <select
            className="form-select mb-3"
            name="bloodGroup"
            onChange={handleChange}
          >
            <option>
              Blood Group
            </option>

            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>

          </select>

          <PasswordInput
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <PasswordInput
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button
            className="btn btn-danger w-100"
          >
            Register
          </button>

        </form>

        <p className="mt-3">

          Already Registered?

          <Link
            to="/"
            className="ms-2"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
}

export default Register;