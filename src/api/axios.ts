import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || "An error occurred";
    return Promise.reject(new Error(errorMessage));
  },
);
