import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiConstants";

const register = (payload) => axiosInstance.post(`${API_ENDPOINTS.AUTH}/register`, payload);

const login = (payload) => axiosInstance.post(`${API_ENDPOINTS.AUTH}/login`, payload);

const logout = () => axiosInstance.post(`${API_ENDPOINTS.AUTH}/logout`);

const getMe = () => axiosInstance.get(`${API_ENDPOINTS.AUTH}/me`);

export default { register, login, logout, getMe };
