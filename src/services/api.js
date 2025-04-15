import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ou sua URL de backend
});

export default api;
