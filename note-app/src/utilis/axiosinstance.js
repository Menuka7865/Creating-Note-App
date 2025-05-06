import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Increased from 1000ms to 10000ms (10 seconds)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify successful responses here
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with a status code outside 2xx range
      const { status, data } = error.response;
      
      if (status === 401) {
        // Handle unauthorized access (token expired/invalid)
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login
      }
      
      // Return a consistent error format
      return Promise.reject({
        message: data?.message || "An error occurred",
        status,
        data,
      });
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({
        message: "No response from server. Please check your network connection.",
      });
    } else {
      // Something happened in setting up the request
      return Promise.reject({
        message: error.message || "Request setup error",
      });
    }
  }
);

export default axiosInstance;