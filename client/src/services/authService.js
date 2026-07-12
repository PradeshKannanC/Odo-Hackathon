import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiConstants";

const login = (payload) => axiosInstance.post(`${API_ENDPOINTS.AUTH}/login`, payload);

const logout = () => axiosInstance.post(`${API_ENDPOINTS.AUTH}/logout`);

const getMe = () => axiosInstance.get(`${API_ENDPOINTS.AUTH}/me`);

const changePassword = (payload) =>
  axiosInstance.put(`${API_ENDPOINTS.AUTH}/change-password`, payload);

export default { login, logout, getMe, changePassword };
