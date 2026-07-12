import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";
import { TOKEN_KEY, USER_KEY } from "../context/AuthContext";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the auth token to every outgoing request. "Remember Me" decides
// whether the token lives in localStorage or sessionStorage, so check both.
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Clear the session and send the user to the 401 page on an unauthorized response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      [localStorage, sessionStorage].forEach((storage) => {
        storage.removeItem(TOKEN_KEY);
        storage.removeItem(USER_KEY);
      });
      if (window.location.pathname !== "/login") {
        window.location.href = "/unauthorized";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
