import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import PasswordInput from "../components/PasswordInput";
import LoadingSpinner from "../components/LoadingSpinner";
import { loginUser } from "../services/authService";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res =
        await loginUser(formData);

      localStorage.setItem(
        "token",
        res.data.token
      );

      toast.success(
        "Login Successful"
      );

      navigate("/dashboard");
    } catch {
      toast.error(
        "Invalid Credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <motion.div
        className="auth-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>Blood Bank Login</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />

          <PasswordInput
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            className="btn btn-danger w-100"
          >
            Login
          </button>

          {loading &&
            <LoadingSpinner />
          }

        </form>

        <p className="mt-3">
          New User?
          <Link
            to="/register"
            className="ms-2"
          >
            Register
          </Link>
        </p>

      </motion.div>
    </div>
  );
}

export default Login;