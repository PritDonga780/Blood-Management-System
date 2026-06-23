import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://blood-management-system-ufx6.onrender.com/api",

  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

export default API;