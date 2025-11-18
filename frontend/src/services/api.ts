import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;
